# CS Study Sprint

CS Study Sprint is a lightweight browser-based study app for core computer science topics. It now includes researched course maps adapted from official university course pages.

## What it includes

- Flashcards with reveal-answer flow
- Quiz mode with multiple-choice practice
- Topic and module filters
- Course overview cards with study goals and source links
- Course trees that break each subject into structured modules
- Local progress tracking using browser storage
- An expanded question bank covering algorithms, data structures, operating systems, networking, databases, computer architecture, and software engineering

## Run locally

1. Open a terminal in this project.
2. Start the local server:

```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000)

## Validate the project

```bash
npm test
```

## Build the static site bundle

```bash
npm run build
```

This creates a `dist/` folder that contains only the files GitHub Pages needs to serve the app.

## Browse the Q&A app

- Locally, run `npm start` and open `http://localhost:3000`
- Inside the app, use the course cards, module tree, filters, and Q&A browser to jump to any question and answer
- On GitHub Pages, the same static app will be available at `https://<your-user>.github.io/<repo>/` after the workflow deploys successfully

## Project structure

- `index.html` contains the app shell
- `styles.css` contains the visual design and responsive layout
- `src/questions.js` stores the researched course catalog, module trees, and Q&A bank
- `src/app.js` contains the course explorer, flashcard, quiz, filter, and progress logic
- `server.js` serves the app locally with no external dependencies
- `.github/workflows/pages.yml` validates and deploys the static app with GitHub Actions
- `CURRICULUM_PLAN.md` summarizes the source-backed course structure used in the app

## Research sources

The course trees in the app are adapted from these official pages:

- MIT OpenCourseWare 6.006 lecture notes: <https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/lecture-notes/>
- Berkeley CS 61B Spring 2025: <https://sp25.datastructur.es/>
- MIT 6.1810 syllabus: <https://ocw.mit.edu/courses/6-1810-operating-system-engineering-fall-2023/pages/syllabus/>
- MIT 6.1810 Fall 2023 schedule: <https://pdos.csail.mit.edu/6.1810/2023/schedule.html>
- Stanford CS144: <https://cs144.github.io/>
- CMU 15-445/645 schedule: <https://15445.courses.cs.cmu.edu/spring2026/schedule.html>
- Berkeley CS61C: <https://cs61c.org/sp26/>
- Berkeley CS61C course notes: <https://notes.cs61c.org/>
- Berkeley CS169: <https://www2.eecs.berkeley.edu/Courses/CS169/>
- Berkeley CSW169A: <https://www2.eecs.berkeley.edu/Courses/CSW169A/>

## GitHub Actions and GitHub Pages

The repository now includes a GitHub Actions workflow that:

- runs `npm test`
- builds a static `dist/` bundle
- uploads that bundle as a Pages artifact
- deploys it with GitHub Pages on pushes to `main`

To finish enabling web hosting on GitHub:

1. Open the repository on GitHub.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to `main` or re-run the `Deploy Pages` workflow from the `Actions` tab.

Important:

- The repository is currently `PRIVATE`
- GitHub Pages for private repositories depends on your GitHub plan
- If your account does not support Pages for private repositories, make the repo public or use another host before expecting a public URL

## Future ideas

- Add your own custom questions through a form or imported JSON
- Track progress by topic over time
- Add spaced repetition scheduling
- Add difficulty-based quiz sessions
