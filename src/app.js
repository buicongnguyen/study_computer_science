import {
  courseByTopic,
  courseCatalog,
  moduleIndex,
  questionBank,
  topics,
  totalModules,
} from "./questions.js";

const STORAGE_KEY = "cs-study-sprint-progress-v2";
const validQuestionIds = new Set(questionBank.map((card) => card.id));

const state = {
  mode: "flashcards",
  topic: "All",
  moduleId: "All",
  query: "",
  currentCardId: questionBank[0]?.id ?? null,
  answerVisible: false,
  currentQuiz: null,
  quizLocked: false,
  selectedAnswer: null,
  progress: loadProgress(),
};

const statsGrid = document.querySelector("#stats-grid");
const topicFilters = document.querySelector("#topic-filters");
const moduleFilters = document.querySelector("#module-filters");
const searchInput = document.querySelector("#search-input");
const courseBrief = document.querySelector("#course-brief");
const studyStage = document.querySelector("#study-stage");
const courseOutline = document.querySelector("#course-outline");
const questionList = document.querySelector("#question-list");
const recommendations = document.querySelector("#recommendations");
const focusSummary = document.querySelector("#focus-summary");
const focusTopic = document.querySelector("#focus-topic");
const focusModule = document.querySelector("#focus-module");
const focusDifficulty = document.querySelector("#focus-difficulty");

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]
  );
}

function loadProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      mastered: (parsed?.mastered ?? []).filter((id) => validQuestionIds.has(id)),
      review: (parsed?.review ?? []).filter((id) => validQuestionIds.has(id)),
      quizAsked: parsed?.quizAsked ?? 0,
      quizCorrect: parsed?.quizCorrect ?? 0,
      streak: parsed?.streak ?? 0,
    };
  } catch {
    return {
      mastered: [],
      review: [],
      quizAsked: 0,
      quizCorrect: 0,
      streak: 0,
    };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function updateModeButtons() {
  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === state.mode);
  });
}

function setMode(mode) {
  state.mode = mode;
  updateModeButtons();
  if (state.mode === "quiz") {
    ensureQuizCard();
  }
}

function getActiveCourse() {
  return courseByTopic[state.topic] ?? null;
}

function getActiveModule() {
  const course = getActiveCourse();
  if (!course || state.moduleId === "All") {
    return null;
  }
  return course.modules.find((module) => module.id === state.moduleId) ?? null;
}

function getQuestionCountForTopic(topic) {
  return questionBank.filter((card) => card.topic === topic).length;
}

function getQuestionCountForModule(moduleId) {
  return questionBank.filter((card) => card.moduleId === moduleId).length;
}

function getModuleTitle(moduleId) {
  return moduleIndex[moduleId]?.title ?? "General";
}

function ensureModuleIsVisible() {
  const course = getActiveCourse();
  if (!course) {
    state.moduleId = "All";
    return;
  }

  if (state.moduleId !== "All" && !course.modules.some((module) => module.id === state.moduleId)) {
    state.moduleId = "All";
  }
}

function getFilteredQuestions() {
  ensureModuleIsVisible();
  const query = state.query.toLowerCase();

  return questionBank.filter((card) => {
    const topicMatches = state.topic === "All" || card.topic === state.topic;
    const moduleMatches = state.moduleId === "All" || card.moduleId === state.moduleId;
    const haystack = [
      card.topic,
      getModuleTitle(card.moduleId),
      card.question,
      card.answer,
      card.explanation,
    ]
      .join(" ")
      .toLowerCase();

    return topicMatches && moduleMatches && (!query || haystack.includes(query));
  });
}

function getCurrentCard(filtered) {
  return filtered.find((card) => card.id === state.currentCardId) ?? filtered[0] ?? null;
}

function pickNextCard(filtered, currentId = null) {
  if (!filtered.length) {
    return null;
  }

  const reviewCards = filtered.filter((card) => state.progress.review.includes(card.id));
  const studyPool = reviewCards.length ? reviewCards : filtered;
  const alternatives = studyPool.filter((card) => card.id !== currentId);
  const pool = alternatives.length ? alternatives : studyPool;
  return pool[Math.floor(Math.random() * pool.length)];
}

function ensureCurrentCardIsVisible() {
  const filtered = getFilteredQuestions();
  if (!filtered.some((card) => card.id === state.currentCardId)) {
    state.currentCardId = filtered[0]?.id ?? null;
    state.answerVisible = false;
  }
}

function pickDistractorAnswers(card) {
  const candidates = questionBank.filter(
    (candidate) => candidate.id !== card.id && candidate.answer !== card.answer
  );

  const prioritized = [
    ...candidates.filter(
      (candidate) => candidate.topic === card.topic && candidate.moduleId === card.moduleId
    ),
    ...candidates.filter(
      (candidate) => candidate.topic === card.topic && candidate.moduleId !== card.moduleId
    ),
    ...candidates.filter((candidate) => candidate.topic !== card.topic),
  ];

  const answers = [];
  for (const candidate of prioritized) {
    if (!answers.includes(candidate.answer)) {
      answers.push(candidate.answer);
    }
    if (answers.length === 3) {
      break;
    }
  }

  return answers;
}

function shuffle(items) {
  const clone = [...items];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[randomIndex]] = [clone[randomIndex], clone[index]];
  }
  return clone;
}

function buildQuizCard(filtered) {
  const focusPool = filtered.filter((card) => state.progress.review.includes(card.id));
  const basePool = focusPool.length ? focusPool : filtered;
  const card = basePool[Math.floor(Math.random() * basePool.length)];
  const options = shuffle([card.answer, ...pickDistractorAnswers(card)]).slice(0, 4);
  return { card, options };
}

function ensureQuizCard() {
  const filtered = getFilteredQuestions();
  if (!filtered.length) {
    state.currentQuiz = null;
    state.quizLocked = false;
    state.selectedAnswer = null;
    return;
  }

  if (!state.currentQuiz || !filtered.some((card) => card.id === state.currentQuiz.card.id)) {
    state.currentQuiz = buildQuizCard(filtered);
    state.quizLocked = false;
    state.selectedAnswer = null;
  }
}

function updateProgress(id, target) {
  const mastered = new Set(state.progress.mastered);
  const review = new Set(state.progress.review);

  if (target === "mastered") {
    mastered.add(id);
    review.delete(id);
  } else if (target === "review") {
    review.add(id);
    mastered.delete(id);
  } else if (target === "clear") {
    mastered.delete(id);
    review.delete(id);
  }

  state.progress.mastered = [...mastered];
  state.progress.review = [...review];
  saveProgress();
}

function handleQuizAnswer(answer) {
  if (!state.currentQuiz || state.quizLocked) {
    return;
  }

  state.quizLocked = true;
  state.selectedAnswer = answer;
  state.progress.quizAsked += 1;

  if (answer === state.currentQuiz.card.answer) {
    state.progress.quizCorrect += 1;
    state.progress.streak += 1;
    updateProgress(state.currentQuiz.card.id, "mastered");
  } else {
    state.progress.streak = 0;
    updateProgress(state.currentQuiz.card.id, "review");
  }

  saveProgress();
  render();
}

function nextFlashcard() {
  const filtered = getFilteredQuestions();
  const next = pickNextCard(filtered, state.currentCardId);
  state.currentCardId = next?.id ?? null;
  state.answerVisible = false;
  render();
}

function nextQuizCard() {
  const filtered = getFilteredQuestions();
  if (!filtered.length) {
    return;
  }

  state.currentQuiz = buildQuizCard(filtered);
  state.quizLocked = false;
  state.selectedAnswer = null;
  render();
}

function openCourse(topic) {
  state.topic = topic;
  state.moduleId = "All";
  state.answerVisible = false;
  ensureCurrentCardIsVisible();
  ensureQuizCard();
  render();
}

function openModule(moduleId) {
  state.moduleId = moduleId;
  state.answerVisible = false;
  ensureCurrentCardIsVisible();
  ensureQuizCard();
  render();
}

function openCard(cardId) {
  const card = questionBank.find((candidate) => candidate.id === cardId);
  if (!card) {
    return;
  }

  state.topic = card.topic;
  state.moduleId = card.moduleId;
  state.currentCardId = card.id;
  state.answerVisible = false;
  setMode("flashcards");
  ensureQuizCard();
  render();
}

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    setMode(button.dataset.mode);
    render();
  });
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value.trim();
  ensureCurrentCardIsVisible();
  ensureQuizCard();
  render();
});

function renderStats(filtered) {
  const activeCourse = getActiveCourse();
  const accuracy = state.progress.quizAsked
    ? Math.round((state.progress.quizCorrect / state.progress.quizAsked) * 100)
    : 0;

  const cards = [
    {
      label: "Courses researched",
      value: courseCatalog.length,
      detail: activeCourse ? `${activeCourse.topic} selected` : "All course maps visible",
    },
    {
      label: "Modules mapped",
      value: totalModules,
      detail: activeCourse ? `${activeCourse.modules.length} in this course` : "Structured into study trees",
    },
    {
      label: "Q&A cards",
      value: questionBank.length,
      detail: `${filtered.length} match current filters`,
    },
    {
      label: "Progress",
      value: state.progress.mastered.length,
      detail: `${state.progress.review.length} in review · ${accuracy}% quiz accuracy`,
    },
  ];

  statsGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="stat-card">
          <p class="stat-card__label">${escapeHtml(card.label)}</p>
          <p class="stat-card__value">${escapeHtml(card.value)}</p>
          <p class="stat-card__detail">${escapeHtml(card.detail)}</p>
        </article>
      `
    )
    .join("");
}

function renderTopicFilters() {
  topicFilters.innerHTML = topics
    .map((topic) => {
      const isActive = topic === state.topic;
      const count = topic === "All" ? questionBank.length : getQuestionCountForTopic(topic);

      return `
        <button class="topic-pill ${isActive ? "is-active" : ""}" data-topic="${escapeHtml(topic)}">
          ${escapeHtml(topic)} · ${count}
        </button>
      `;
    })
    .join("");

  topicFilters.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.topic = button.dataset.topic;
      state.moduleId = "All";
      state.answerVisible = false;
      ensureCurrentCardIsVisible();
      ensureQuizCard();
      render();
    });
  });
}

function renderModuleFilters() {
  const activeCourse = getActiveCourse();
  if (!activeCourse) {
    moduleFilters.innerHTML = `
      <p class="module-filter-note">Open a course to unlock module filtering and a detailed tree.</p>
    `;
    return;
  }

  moduleFilters.innerHTML = [
    `
      <button class="topic-pill ${state.moduleId === "All" ? "is-active" : ""}" data-module-id="All">
        All modules · ${getQuestionCountForTopic(activeCourse.topic)}
      </button>
    `,
    ...activeCourse.modules.map((module) => {
      const isActive = module.id === state.moduleId;
      return `
        <button class="topic-pill ${isActive ? "is-active" : ""}" data-module-id="${module.id}">
          ${escapeHtml(module.title)} · ${getQuestionCountForModule(module.id)}
        </button>
      `;
    }),
  ].join("");

  moduleFilters.querySelectorAll("[data-module-id]").forEach((button) => {
    button.addEventListener("click", () => {
      openModule(button.dataset.moduleId);
    });
  });
}

function renderCourseBrief() {
  const activeCourse = getActiveCourse();
  const activeModule = getActiveModule();

  if (!activeCourse) {
    courseBrief.innerHTML = `
      <div class="course-brief__header">
        <div>
          <p class="eyebrow">Curriculum Plan</p>
          <h2>Source-backed course trees</h2>
          <p class="course-brief__lead">
            Each course below is adapted from official university course pages and reorganized into
            app-friendly modules with matching study cards.
          </p>
        </div>
        <div class="course-brief__summary-card">
          <strong>${courseCatalog.length} courses</strong>
          <span>${totalModules} modules · ${questionBank.length} Q&amp;A cards</span>
        </div>
      </div>
      <div class="course-selector-grid">
        ${courseCatalog
          .map(
            (course) => `
              <article class="course-selector-card">
                <div>
                  <p class="course-selector-card__eyebrow">${escapeHtml(course.topic)}</p>
                  <strong>${escapeHtml(course.tagline)}</strong>
                  <p>${escapeHtml(course.overview)}</p>
                </div>
                <div class="course-selector-card__meta">
                  <span class="chip">${course.modules.length} modules</span>
                  <span class="chip">${getQuestionCountForTopic(course.topic)} cards</span>
                </div>
                <div class="course-selector-card__actions">
                  <button class="ghost-button" data-open-topic="${escapeHtml(course.topic)}">Open course</button>
                  <a class="source-link" href="${course.sources[0].url}" target="_blank" rel="noreferrer">
                    ${escapeHtml(course.sources[0].label)}
                  </a>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    `;

    courseBrief.querySelectorAll("[data-open-topic]").forEach((button) => {
      button.addEventListener("click", () => openCourse(button.dataset.openTopic));
    });
    return;
  }

  courseBrief.innerHTML = `
    <div class="course-brief__header">
      <div>
        <p class="eyebrow">Curriculum Plan</p>
        <h2>${escapeHtml(activeCourse.topic)}</h2>
        <p class="course-brief__lead">${escapeHtml(activeCourse.overview)}</p>
      </div>
      <div class="course-brief__summary-card">
        <strong>${getQuestionCountForTopic(activeCourse.topic)} Q&amp;A cards</strong>
        <span>${activeCourse.modules.length} modules grounded in official course material</span>
      </div>
    </div>

    <div class="course-brief__grid">
      <article class="info-block">
        <h3>Study goals</h3>
        <ul class="info-list">
          ${activeCourse.studyGoals
            .map((goal) => `<li>${escapeHtml(goal)}</li>`)
            .join("")}
        </ul>
      </article>
      <article class="info-block">
        <h3>Source references</h3>
        <div class="source-list">
          ${activeCourse.sources
            .map(
              (source) => `
                <a class="source-link" href="${source.url}" target="_blank" rel="noreferrer">
                  ${escapeHtml(source.label)}
                </a>
              `
            )
            .join("")}
        </div>
      </article>
    </div>

    ${
      activeModule
        ? `
          <article class="module-focus">
            <div class="module-focus__header">
              <div>
                <h3>${escapeHtml(activeModule.title)}</h3>
                <p>${escapeHtml(activeModule.summary)}</p>
              </div>
              <button class="ghost-button" id="clear-module-focus">Show all modules</button>
            </div>
            <ul class="info-list">
              ${activeModule.lessons
                .map(
                  (lesson) => `
                    <li>
                      <strong>${escapeHtml(lesson.title)}.</strong>
                      ${escapeHtml(lesson.note)}
                    </li>
                  `
                )
                .join("")}
            </ul>
          </article>
        `
        : `
          <article class="module-focus">
            <div class="module-focus__header">
              <div>
                <h3>Suggested path</h3>
                <p>Move left to right through the module tree, then use flashcards or quiz mode for each segment.</p>
              </div>
            </div>
            <div class="path-grid">
              ${activeCourse.modules
                .map(
                  (module, index) => `
                    <button class="path-step" data-jump-module="${module.id}">
                      <span class="path-step__index">Module ${index + 1}</span>
                      <strong>${escapeHtml(module.title)}</strong>
                      <span>${getQuestionCountForModule(module.id)} cards</span>
                    </button>
                  `
                )
                .join("")}
            </div>
          </article>
        `
    }
  `;

  courseBrief.querySelectorAll("[data-jump-module]").forEach((button) => {
    button.addEventListener("click", () => openModule(button.dataset.jumpModule));
  });

  const clearButton = courseBrief.querySelector("#clear-module-focus");
  if (clearButton) {
    clearButton.addEventListener("click", () => openModule("All"));
  }
}

function renderCourseOutline() {
  const activeCourse = getActiveCourse();

  if (!activeCourse) {
    courseOutline.innerHTML = courseCatalog
      .map(
        (course) => `
          <article class="outline-course-card">
            <strong>${escapeHtml(course.topic)}</strong>
            <p>${escapeHtml(course.tagline)}</p>
            <div class="question-list__meta">
              <span class="chip">${course.modules.length} modules</span>
              <span class="chip">${getQuestionCountForTopic(course.topic)} cards</span>
            </div>
            <button class="ghost-button outline-course-card__button" data-open-topic="${escapeHtml(course.topic)}">
              Open course tree
            </button>
          </article>
        `
      )
      .join("");

    courseOutline.querySelectorAll("[data-open-topic]").forEach((button) => {
      button.addEventListener("click", () => openCourse(button.dataset.openTopic));
    });
    return;
  }

  courseOutline.innerHTML = `
    <button class="ghost-button course-outline__clear ${state.moduleId === "All" ? "is-highlighted" : ""}" data-module-id="All">
      All modules
    </button>
    ${activeCourse.modules
      .map((module) => {
        const isActive = module.id === state.moduleId;
        const reviewCount = questionBank.filter(
          (card) => card.moduleId === module.id && state.progress.review.includes(card.id)
        ).length;

        return `
          <article class="module-card ${isActive ? "is-active" : ""}" data-module-id="${module.id}">
            <div class="module-card__header">
              <strong>${escapeHtml(module.title)}</strong>
              <span class="module-card__count">${getQuestionCountForModule(module.id)} cards</span>
            </div>
            <p>${escapeHtml(module.summary)}</p>
            <div class="question-list__meta">
              ${reviewCount ? `<span class="chip">${reviewCount} review</span>` : `<span class="chip">No review flags</span>`}
            </div>
            <ul class="module-lessons">
              ${module.lessons
                .map(
                  (lesson) => `
                    <li>
                      <strong>${escapeHtml(lesson.title)}:</strong>
                      ${escapeHtml(lesson.note)}
                    </li>
                  `
                )
                .join("")}
            </ul>
          </article>
        `;
      })
      .join("")}
  `;

  courseOutline.querySelectorAll("[data-module-id]").forEach((item) => {
    item.addEventListener("click", () => openModule(item.dataset.moduleId));
  });
}

function renderFocus(card) {
  if (!card) {
    focusSummary.textContent = "No cards match the current filter yet.";
    focusTopic.textContent = "Adjust the course filter";
    focusModule.textContent = "Module view paused";
    focusDifficulty.textContent = "Study queue paused";
    return;
  }

  focusSummary.textContent = card.question;
  focusTopic.textContent = card.topic;
  focusModule.textContent = getModuleTitle(card.moduleId);
  focusDifficulty.textContent = `${card.difficulty} difficulty`;
}

function renderFlashcards(filtered) {
  const card = getCurrentCard(filtered);
  renderFocus(card);

  if (!card) {
    studyStage.innerHTML = `
      <div class="empty-state">
        <div>
          <h2>No matching questions</h2>
          <p>Try clearing the search, opening a different course, or resetting the module filter.</p>
        </div>
      </div>
    `;
    return;
  }

  const isMastered = state.progress.mastered.includes(card.id);
  const isReview = state.progress.review.includes(card.id);

  studyStage.innerHTML = `
    <div class="stage-header">
      <div>
        <h2>Flashcard practice</h2>
        <p>Reveal the answer, compare it with your recall, and tag what still needs review.</p>
      </div>
      <div class="stage-badges">
        <span class="stage-badge">${escapeHtml(card.topic)}</span>
        <span class="stage-badge">${escapeHtml(getModuleTitle(card.moduleId))}</span>
        <span class="stage-badge">${escapeHtml(card.difficulty)}</span>
      </div>
    </div>

    <article class="prompt-card">
      <p class="prompt-card__label">Prompt</p>
      <p class="prompt-card__question">${escapeHtml(card.question)}</p>

      <div class="answer-panel" ${state.answerVisible ? "" : "hidden"}>
        <h3>Answer</h3>
        <p class="answer-text">${escapeHtml(card.answer)}</p>
        <p>${escapeHtml(card.explanation)}</p>
      </div>

      <div class="action-row">
        <button class="action-button" id="reveal-answer">
          ${state.answerVisible ? "Hide answer" : "Reveal answer"}
        </button>
        <button class="ghost-button ${isMastered ? "is-highlighted" : ""}" id="mark-mastered">
          ${isMastered ? "Mastered" : "Mark mastered"}
        </button>
        <button class="ghost-button ${isReview ? "is-warning" : ""}" id="mark-review">
          Needs review
        </button>
        <button class="ghost-button" id="clear-status">Clear tag</button>
        <button class="ghost-button" id="next-card">Next card</button>
      </div>
    </article>
  `;

  studyStage.querySelector("#reveal-answer").addEventListener("click", () => {
    state.answerVisible = !state.answerVisible;
    render();
  });

  studyStage.querySelector("#mark-mastered").addEventListener("click", () => {
    updateProgress(card.id, isMastered ? "clear" : "mastered");
    render();
  });

  studyStage.querySelector("#mark-review").addEventListener("click", () => {
    updateProgress(card.id, isReview ? "clear" : "review");
    render();
  });

  studyStage.querySelector("#clear-status").addEventListener("click", () => {
    updateProgress(card.id, "clear");
    render();
  });

  studyStage.querySelector("#next-card").addEventListener("click", nextFlashcard);
}

function renderQuiz(filtered) {
  ensureQuizCard();
  const quiz = state.currentQuiz;
  renderFocus(quiz?.card ?? null);

  if (!quiz) {
    studyStage.innerHTML = `
      <div class="empty-state">
        <div>
          <h2>No quiz available</h2>
          <p>Change the current filters so the app has at least one question to ask.</p>
        </div>
      </div>
    `;
    return;
  }

  const isCorrect = state.selectedAnswer === quiz.card.answer;

  studyStage.innerHTML = `
    <div class="stage-header">
      <div>
        <h2>Quiz mode</h2>
        <p>Use the course tree to narrow the scope, then answer from memory before checking the explanation.</p>
      </div>
      <div class="stage-badges">
        <span class="stage-badge">${escapeHtml(quiz.card.topic)}</span>
        <span class="stage-badge">${escapeHtml(getModuleTitle(quiz.card.moduleId))}</span>
        <span class="stage-badge">${escapeHtml(quiz.card.difficulty)}</span>
      </div>
    </div>

    <article class="prompt-card">
      <p class="prompt-card__label">Question</p>
      <p class="prompt-card__question">${escapeHtml(quiz.card.question)}</p>

      <div class="quiz-options">
        ${quiz.options
          .map((option, index) => {
            const classNames = [
              "quiz-option",
              state.quizLocked && option === quiz.card.answer ? "is-correct" : "",
              state.quizLocked && option === state.selectedAnswer && option !== quiz.card.answer
                ? "is-incorrect"
                : "",
            ]
              .filter(Boolean)
              .join(" ");

            return `
              <button class="${classNames}" data-option-index="${index}" ${state.quizLocked ? "disabled" : ""}>
                ${escapeHtml(option)}
              </button>
            `;
          })
          .join("")}
      </div>

      ${
        state.quizLocked
          ? `
            <div class="feedback-panel ${isCorrect ? "is-correct" : "is-incorrect"}">
              <h3>${isCorrect ? "Correct" : "Review this one"}</h3>
              <p class="feedback-answer">Correct answer: ${escapeHtml(quiz.card.answer)}</p>
              <p>${escapeHtml(quiz.card.explanation)}</p>
            </div>
          `
          : ""
      }

      <div class="action-row">
        ${state.quizLocked ? `<button class="action-button" id="next-quiz">Next question</button>` : ""}
        <button class="ghost-button" id="switch-to-cards">Open in flashcards</button>
      </div>
    </article>
  `;

  studyStage.querySelectorAll("[data-option-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const option = quiz.options[Number(button.dataset.optionIndex)];
      handleQuizAnswer(option);
    });
  });

  if (state.quizLocked) {
    studyStage.querySelector("#next-quiz").addEventListener("click", nextQuizCard);
  }

  studyStage.querySelector("#switch-to-cards").addEventListener("click", () => {
    state.currentCardId = quiz.card.id;
    state.answerVisible = false;
    setMode("flashcards");
    render();
  });
}

function renderRecommendations(filtered) {
  const cards = [];
  const activeCourse = getActiveCourse();

  if (activeCourse) {
    const rankedModules = activeCourse.modules
      .map((module) => ({
        module,
        reviewCount: questionBank.filter(
          (card) => card.moduleId === module.id && state.progress.review.includes(card.id)
        ).length,
      }))
      .sort((left, right) => right.reviewCount - left.reviewCount);

    if (rankedModules[0]?.reviewCount > 0) {
      cards.push({
        title: `Review ${rankedModules[0].module.title} next`,
        description: `${rankedModules[0].reviewCount} card${
          rankedModules[0].reviewCount === 1 ? "" : "s"
        } in this module are still flagged for review.`,
      });
    } else {
      cards.push({
        title: `Work through ${activeCourse.modules[0].title}`,
        description: "The course tree is ordered from foundations toward more advanced system ideas.",
      });
    }
  } else {
    const topReviewTopic = courseCatalog
      .map((course) => ({
        topic: course.topic,
        reviewCount: questionBank.filter(
          (card) => card.topic === course.topic && state.progress.review.includes(card.id)
        ).length,
      }))
      .sort((left, right) => right.reviewCount - left.reviewCount)[0];

    if (topReviewTopic?.reviewCount > 0) {
      cards.push({
        title: `Return to ${topReviewTopic.topic}`,
        description: `${topReviewTopic.reviewCount} review card${
          topReviewTopic.reviewCount === 1 ? "" : "s"
        } are waiting there.`,
      });
    } else {
      cards.push({
        title: "Open one course at a time",
        description: "Choosing a course narrows the tree, module filters, and quiz distractors in a useful way.",
      });
    }
  }

  cards.push({
    title: state.query ? "Search is active" : "Use the course tree to focus",
    description: state.query
      ? `${filtered.length} card${filtered.length === 1 ? "" : "s"} match "${state.query}".`
      : activeCourse
        ? "Select a module when you want a tighter study session inside the current course."
        : "Pick a course card to see its module breakdown and source links.",
  });

  cards.push({
    title: "Keep the streak moving",
    description: `Current quiz streak: ${state.progress.streak}. Mastered: ${state.progress.mastered.length}/${questionBank.length}.`,
  });

  recommendations.innerHTML = cards
    .map(
      (card) => `
        <article class="recommendation-card">
          <strong>${escapeHtml(card.title)}</strong>
          <p>${escapeHtml(card.description)}</p>
        </article>
      `
    )
    .join("");
}

function renderQuestionList(filtered) {
  if (!filtered.length) {
    questionList.innerHTML = `
      <div class="recommendation-card">
        <strong>No questions found</strong>
        <p>Clear the search or expand the course filters to bring the bank back.</p>
      </div>
    `;
    return;
  }

  const items = filtered.slice(0, 12);
  questionList.innerHTML = items
    .map((card) => {
      const activeCardId = state.mode === "quiz" ? state.currentQuiz?.card.id : state.currentCardId;
      const isActive = activeCardId === card.id;
      const status = state.progress.mastered.includes(card.id)
        ? "Mastered"
        : state.progress.review.includes(card.id)
          ? "Review"
          : null;

      return `
        <article class="question-list__item ${isActive ? "is-active" : ""}" data-card-id="${card.id}">
          <strong>${escapeHtml(card.question)}</strong>
          <p>${escapeHtml(card.answer)}</p>
          <div class="question-list__meta">
            <span class="chip">${escapeHtml(card.topic)}</span>
            <span class="chip">${escapeHtml(getModuleTitle(card.moduleId))}</span>
            <span class="chip">${escapeHtml(card.difficulty)}</span>
            ${status ? `<span class="chip">${escapeHtml(status)}</span>` : ""}
          </div>
        </article>
      `;
    })
    .join("");

  questionList.querySelectorAll("[data-card-id]").forEach((item) => {
    item.addEventListener("click", () => openCard(item.dataset.cardId));
  });
}

function render() {
  ensureModuleIsVisible();
  const filtered = getFilteredQuestions();
  ensureCurrentCardIsVisible();
  renderStats(filtered);
  renderTopicFilters();
  renderModuleFilters();
  renderCourseBrief();
  renderCourseOutline();
  renderRecommendations(filtered);
  renderQuestionList(filtered);

  if (state.mode === "quiz") {
    renderQuiz(filtered);
  } else {
    renderFlashcards(filtered);
  }
}

updateModeButtons();
render();
