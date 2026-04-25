import {
  koreaUniversityDefaultSubjectId,
  koreaUniversityQuickFacts,
  koreaUniversitySources,
  koreaUniversityStudyPlan,
  koreaUniversitySubjectGroups,
  koreaUniversitySubjects,
} from "./korea-year1-data.js";

const subjectMap = Object.fromEntries(
  koreaUniversitySubjects.map((subject) => [subject.id, subject])
);

const state = {
  activeSubjectId: koreaUniversityDefaultSubjectId,
};

const statsRoot = document.querySelector("#hero-stats");
const planRoot = document.querySelector("#plan-list");
const sourceRoot = document.querySelector("#source-list");
const subjectGroupsRoot = document.querySelector("#subject-groups");
const subjectDetailRoot = document.querySelector("#subject-detail");

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

function renderStats() {
  statsRoot.innerHTML = koreaUniversityQuickFacts
    .map(
      (fact) => `
        <article class="hero-stat">
          <strong>${escapeHtml(fact.value)}</strong>
          <span>${escapeHtml(fact.label)}</span>
        </article>
      `
    )
    .join("");
}

function renderPlan() {
  planRoot.innerHTML = koreaUniversityStudyPlan
    .map(
      (step, index) => `
        <article class="plan-step">
          <div class="plan-step__number">${index + 1}</div>
          <div>
            <strong>${escapeHtml(step.title)}</strong>
            <p>${escapeHtml(step.body)}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderSources() {
  sourceRoot.innerHTML = koreaUniversitySources
    .map(
      (source) => `
        <article class="source-card">
          <strong>${escapeHtml(source.label)}</strong>
          <p>${escapeHtml(source.note)}</p>
          <p><a href="${source.url}" target="_blank" rel="noreferrer">Open official source</a></p>
        </article>
      `
    )
    .join("");
}

function renderSubjectButtons() {
  subjectGroupsRoot.innerHTML = koreaUniversitySubjectGroups
    .map(
      (group) => `
        <section class="subject-group">
          <div class="subject-group__title">${escapeHtml(group.title)}</div>
          <div class="subject-group-list">
            ${group.ids
              .map((subjectId) => {
                const subject = subjectMap[subjectId];
                const activeClass = subject.id === state.activeSubjectId ? "is-active" : "";
                return `
                  <button class="subject-button ${activeClass}" data-subject-id="${subject.id}">
                    <span class="subject-button__name">${escapeHtml(subject.code)} · ${escapeHtml(subject.titleKo)}</span>
                    <span class="subject-button__meta">${escapeHtml(subject.timing)} · ${escapeHtml(
                  subject.credits
                )}</span>
                  </button>
                `;
              })
              .join("")}
          </div>
        </section>
      `
    )
    .join("");

  subjectGroupsRoot.querySelectorAll("[data-subject-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeSubjectId = button.dataset.subjectId;
      renderSubjectButtons();
      renderSubjectDetail();
    });
  });
}

function renderSubjectDetail() {
  const subject = subjectMap[state.activeSubjectId];

  subjectDetailRoot.innerHTML = `
    <div class="subject-detail__header">
      <div>
        <h2>${escapeHtml(subject.titleKo)}</h2>
        <p class="subject-detail__subtitle">${escapeHtml(subject.code)} · ${escapeHtml(subject.title)}</p>
      </div>
      <div class="subject-meta">
        <span>${escapeHtml(subject.category)}</span>
        <span>${escapeHtml(subject.credits)}</span>
        <span>${escapeHtml(subject.timing)}</span>
      </div>
    </div>

    <div class="subject-note">
      <strong>Official basis</strong>
      <p>${escapeHtml(subject.officialBasis)}</p>
    </div>

    <div class="panel-inline">
      <h3>What this subject is trying to build</h3>
      <p>${escapeHtml(subject.summary)}</p>
    </div>

    <div class="panel-inline">
      <h3>Why it matters for a first-year CS student</h3>
      <p>${escapeHtml(subject.whyItMatters)}</p>
    </div>

    <div class="panel-inline">
      <h3>How to study it well</h3>
      <ul class="checklist">
        ${subject.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </div>

    <div class="panel-inline">
      <h3>Starter Q&amp;A for this subject</h3>
      <div class="qa-list">
        ${subject.qa
          .map(
            (item) => `
              <article class="qa-card">
                <strong>${escapeHtml(item.question)}</strong>
                <p class="qa-card__answer">${escapeHtml(item.answer)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

renderStats();
renderPlan();
renderSources();
renderSubjectButtons();
renderSubjectDetail();
