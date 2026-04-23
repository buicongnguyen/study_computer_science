import { questionBank, topics } from "./questions.js";

const STORAGE_KEY = "cs-study-sprint-progress-v1";

const state = {
  mode: "flashcards",
  topic: "All",
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
const searchInput = document.querySelector("#search-input");
const studyStage = document.querySelector("#study-stage");
const questionList = document.querySelector("#question-list");
const recommendations = document.querySelector("#recommendations");
const focusSummary = document.querySelector("#focus-summary");
const focusTopic = document.querySelector("#focus-topic");
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

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    document.querySelectorAll("[data-mode]").forEach((candidate) => {
      candidate.classList.toggle("is-active", candidate === button);
    });
    if (state.mode === "quiz") {
      ensureQuizCard();
    }
    render();
  });
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value.trim();
  ensureCurrentCardIsVisible();
  ensureQuizCard();
  render();
});

function loadProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      mastered: parsed?.mastered ?? [],
      review: parsed?.review ?? [],
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

function getFilteredQuestions() {
  const query = state.query.toLowerCase();
  return questionBank.filter((card) => {
    const topicMatches = state.topic === "All" || card.topic === state.topic;
    const queryMatches =
      !query ||
      [card.topic, card.question, card.answer, card.explanation]
        .join(" ")
        .toLowerCase()
        .includes(query);
    return topicMatches && queryMatches;
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
  if (!filtered.find((card) => card.id === state.currentCardId)) {
    state.currentCardId = filtered[0]?.id ?? null;
    state.answerVisible = false;
  }
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

function buildQuizCard(filtered) {
  const focusPool = filtered.filter((card) => state.progress.review.includes(card.id));
  const basePool = focusPool.length ? focusPool : filtered;
  const card = basePool[Math.floor(Math.random() * basePool.length)];

  const distractors = [];
  for (const candidate of questionBank) {
    if (candidate.id === card.id || candidate.answer === card.answer) {
      continue;
    }
    if (!distractors.find((option) => option.answer === candidate.answer)) {
      distractors.push(candidate);
    }
    if (distractors.length === 3) {
      break;
    }
  }

  const options = shuffle([card, ...distractors]).map((option) => option.answer);
  return { card, options };
}

function shuffle(items) {
  const clone = [...items];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[randomIndex]] = [clone[randomIndex], clone[index]];
  }
  return clone;
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
  ensureQuizCard();
  const filtered = getFilteredQuestions();
  if (!filtered.length) {
    return;
  }
  state.currentQuiz = buildQuizCard(filtered);
  state.quizLocked = false;
  state.selectedAnswer = null;
  render();
}

function renderStats(filtered) {
  const total = questionBank.length;
  const masteredCount = state.progress.mastered.length;
  const reviewCount = state.progress.review.length;
  const accuracy = state.progress.quizAsked
    ? Math.round((state.progress.quizCorrect / state.progress.quizAsked) * 100)
    : 0;

  const cards = [
    {
      label: "Question bank",
      value: total,
      detail: `${filtered.length} visible with current filters`,
    },
    {
      label: "Mastered",
      value: masteredCount,
      detail: `${Math.round((masteredCount / total) * 100)}% of all cards`,
    },
    {
      label: "Needs review",
      value: reviewCount,
      detail: reviewCount ? "Focused practice is ready" : "Nothing flagged right now",
    },
    {
      label: "Quiz accuracy",
      value: `${accuracy}%`,
      detail: `${state.progress.streak} correct in current streak`,
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

function renderTopicFilters(filtered) {
  topicFilters.innerHTML = topics
    .map((topic) => {
      const isActive = topic === state.topic;
      const count =
        topic === "All" ? questionBank.length : questionBank.filter((card) => card.topic === topic).length;

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
      ensureCurrentCardIsVisible();
      ensureQuizCard();
      render();
    });
  });
}

function renderFocus(card) {
  if (!card) {
    focusSummary.textContent = "No cards match the current filter yet.";
    focusTopic.textContent = "Adjust the topic or search";
    focusDifficulty.textContent = "Study queue paused";
    return;
  }

  focusSummary.textContent = card.question;
  focusTopic.textContent = card.topic;
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
          <p>Try clearing the search or switching back to the full question bank.</p>
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
        <p>Reveal the answer, then mark how confident you feel before moving on.</p>
      </div>
      <div class="stage-badges">
        <span class="stage-badge">${escapeHtml(card.topic)}</span>
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
          ${isReview ? "Needs review" : "Needs review"}
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
    updateProgress(card.id, state.progress.mastered.includes(card.id) ? "clear" : "mastered");
    render();
  });

  studyStage.querySelector("#mark-review").addEventListener("click", () => {
    updateProgress(card.id, state.progress.review.includes(card.id) ? "clear" : "review");
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
        <p>Answer from memory first, then use the explanation to tighten the concept.</p>
      </div>
      <div class="stage-badges">
        <span class="stage-badge">${escapeHtml(quiz.card.topic)}</span>
        <span class="stage-badge">${escapeHtml(quiz.card.difficulty)}</span>
      </div>
    </div>

    <article class="prompt-card">
      <p class="prompt-card__label">Question</p>
      <p class="prompt-card__question">${escapeHtml(quiz.card.question)}</p>

      <div class="quiz-options">
        ${quiz.options
          .map((option) => {
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
              <button class="${classNames}" data-answer="${escapeHtml(option)}" ${state.quizLocked ? "disabled" : ""}>
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

  studyStage.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => handleQuizAnswer(button.dataset.answer));
  });

  if (state.quizLocked) {
    studyStage.querySelector("#next-quiz").addEventListener("click", nextQuizCard);
  }

  studyStage.querySelector("#switch-to-cards").addEventListener("click", () => {
    state.mode = "flashcards";
    state.currentCardId = quiz.card.id;
    state.answerVisible = false;
    document.querySelectorAll("[data-mode]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.mode === "flashcards");
    });
    render();
  });
}

function renderRecommendations(filtered) {
  const countsByTopic = questionBank.reduce((accumulator, card) => {
    accumulator[card.topic] ??= { review: 0, mastered: 0 };
    if (state.progress.review.includes(card.id)) {
      accumulator[card.topic].review += 1;
    }
    if (state.progress.mastered.includes(card.id)) {
      accumulator[card.topic].mastered += 1;
    }
    return accumulator;
  }, {});

  const topReviewTopics = Object.entries(countsByTopic)
    .sort((left, right) => right[1].review - left[1].review || left[1].mastered - right[1].mastered)
    .slice(0, 3);

  const cards = [];

  if (state.progress.review.length) {
    const [topic, values] = topReviewTopics[0];
    cards.push({
      title: `Review ${topic} next`,
      description: `${values.review} question${values.review === 1 ? "" : "s"} still flagged for review.`,
    });
  } else {
    cards.push({
      title: "You’re in a clean state",
      description: "No cards are flagged for review, so quiz mode is a great next step.",
    });
  }

  cards.push({
    title: state.query ? "Search is active" : "Use filters for focused practice",
    description: state.query
      ? `${filtered.length} card${filtered.length === 1 ? "" : "s"} match "${state.query}".`
      : "Pick one topic when you want a shorter, high-signal study session.",
  });

  cards.push({
    title: "Keep the streak moving",
    description: `Current quiz streak: ${state.progress.streak}. Consecutive correct answers build retention fast.`,
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
        <p>Clear the search to bring the full bank back.</p>
      </div>
    `;
    return;
  }

  const items = filtered.slice(0, 10);
  questionList.innerHTML = items
    .map((card) => {
      const activeCardId = state.mode === "quiz" ? state.currentQuiz?.card.id : state.currentCardId;
      const isActive = activeCardId === card.id;
      const mastered = state.progress.mastered.includes(card.id) ? "Mastered" : null;
      const review = state.progress.review.includes(card.id) ? "Review" : null;

      return `
        <article class="question-list__item ${isActive ? "is-active" : ""}" data-card-id="${card.id}">
          <strong>${escapeHtml(card.question)}</strong>
          <p>${escapeHtml(card.answer)}</p>
          <div class="question-list__meta">
            <span class="chip">${escapeHtml(card.topic)}</span>
            <span class="chip">${escapeHtml(card.difficulty)}</span>
            ${mastered ? `<span class="chip">${escapeHtml(mastered)}</span>` : ""}
            ${review ? `<span class="chip">${escapeHtml(review)}</span>` : ""}
          </div>
        </article>
      `;
    })
    .join("");

  questionList.querySelectorAll("[data-card-id]").forEach((item) => {
    item.addEventListener("click", () => {
      const cardId = item.dataset.cardId;
      state.currentCardId = cardId;
      state.mode = "flashcards";
      state.answerVisible = false;
      document.querySelectorAll("[data-mode]").forEach((button) => {
        button.classList.toggle("is-active", button.dataset.mode === "flashcards");
      });
      render();
    });
  });
}

function render() {
  const filtered = getFilteredQuestions();
  ensureCurrentCardIsVisible();
  renderStats(filtered);
  renderTopicFilters(filtered);
  renderRecommendations(filtered);
  renderQuestionList(filtered);

  if (state.mode === "quiz") {
    renderQuiz(filtered);
  } else {
    renderFlashcards(filtered);
  }
}

render();
