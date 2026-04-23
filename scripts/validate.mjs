import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { questionBank } from "../src/questions.js";

const requiredFiles = ["index.html", "styles.css", "server.js", "src/app.js", "src/questions.js"];

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

console.log(`Validated ${questionBank.length} study cards and required project files.`);
