import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { courseCatalog, moduleIndex, questionBank, totalModules } from "../src/questions.js";
import {
  koreaUniversityQuickFacts,
  koreaUniversitySources,
  koreaUniversityStudyPlan,
  koreaUniversitySubjects,
} from "../src/korea-year1-data.js";

const requiredFiles = [
  "index.html",
  "study.html",
  "home.css",
  "styles.css",
  "server.js",
  "src/app.js",
  "src/questions.js",
  "src/korea-year1-data.js",
  "src/korea-year1.js",
];

for (const file of requiredFiles) {
  await access(new URL(`../${file}`, import.meta.url), constants.R_OK);
}

if (questionBank.length < 30) {
  throw new Error("Question bank should include at least 30 study cards.");
}

const ids = new Set();
for (const card of questionBank) {
  for (const key of ["id", "topic", "difficulty", "question", "answer", "explanation"]) {
    if (!card[key] || typeof card[key] !== "string") {
      throw new Error(`Invalid or missing "${key}" on card ${card.id ?? "<unknown>"}.`);
    }
  }

  if (ids.has(card.id)) {
    throw new Error(`Duplicate question id found: ${card.id}`);
  }

  ids.add(card.id);
}

if (courseCatalog.length < 7) {
  throw new Error("Expected at least 7 researched CS courses.");
}

if (totalModules < 20) {
  throw new Error("Expected at least 20 mapped course modules.");
}

for (const course of courseCatalog) {
  for (const key of ["id", "topic", "tagline", "overview"]) {
    if (!course[key] || typeof course[key] !== "string") {
      throw new Error(`Invalid or missing "${key}" on course ${course.id ?? "<unknown>"}.`);
    }
  }

  if (!Array.isArray(course.studyGoals) || course.studyGoals.length < 3) {
    throw new Error(`Course ${course.id} should include at least 3 study goals.`);
  }

  if (!Array.isArray(course.sources) || course.sources.length < 1) {
    throw new Error(`Course ${course.id} should include at least 1 source.`);
  }

  if (!Array.isArray(course.modules) || course.modules.length < 4) {
    throw new Error(`Course ${course.id} should include at least 4 modules.`);
  }

  for (const module of course.modules) {
    for (const key of ["id", "title", "summary"]) {
      if (!module[key] || typeof module[key] !== "string") {
        throw new Error(`Invalid or missing "${key}" on module ${module.id ?? "<unknown>"}.`);
      }
    }

    if (!Array.isArray(module.lessons) || module.lessons.length < 3) {
      throw new Error(`Module ${module.id} should include at least 3 lessons.`);
    }
  }
}

if (questionBank.length < 80) {
  throw new Error("Expected at least 80 study cards after the curriculum expansion.");
}

for (const card of questionBank) {
  if (!moduleIndex[card.moduleId]) {
    throw new Error(`Card ${card.id} references an unknown module: ${card.moduleId}`);
  }
}

if (koreaUniversitySubjects.length < 10) {
  throw new Error("Expected at least 10 Korea University first-year subjects.");
}

if (koreaUniversitySources.length < 5) {
  throw new Error("Expected at least 5 Korea University official sources.");
}

if (koreaUniversityStudyPlan.length < 4) {
  throw new Error("Expected at least 4 Korea University study-plan steps.");
}

if (koreaUniversityQuickFacts.length < 4) {
  throw new Error("Expected at least 4 Korea University quick facts.");
}

for (const subject of koreaUniversitySubjects) {
  for (const key of ["id", "code", "title", "titleKo", "category", "credits", "timing", "summary"]) {
    if (!subject[key] || typeof subject[key] !== "string") {
      throw new Error(`Invalid or missing "${key}" on Korea University subject ${subject.id ?? "<unknown>"}.`);
    }
  }

  if (!Array.isArray(subject.qa) || subject.qa.length < 3) {
    throw new Error(`Korea University subject ${subject.id} should include at least 3 Q&A items.`);
  }

  if (!Array.isArray(subject.checklist) || subject.checklist.length < 3) {
    throw new Error(`Korea University subject ${subject.id} should include at least 3 checklist items.`);
  }
}

console.log(
  `Validated ${courseCatalog.length} courses, ${totalModules} modules, ${questionBank.length} study cards, ${koreaUniversitySubjects.length} Korea University subjects, and required project files.`
);
