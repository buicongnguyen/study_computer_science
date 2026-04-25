# CS Study Sprint

CS Study Sprint is now a two-part static site:

- the default homepage is a Korea University Computer Science first-year study guide
- the original broader computer science Q&A app lives at `study.html`

The site includes researched course maps adapted from official university course pages and a Korea University-focused study hub for first-year students.

## What it includes

- A Korea University Computer Science year-one homepage with official subject mapping
- A study plan for building subject-by-subject Korea University Q&A content
- Starter Q&A sets for first-year Korea University subjects
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
- The default homepage is the Korea University first-year study guide
- Open `http://localhost:3000/study.html` for the broader CS Study Sprint app
- On GitHub Pages, the same static app will be available at `https://<your-user>.github.io/<repo>/` after the workflow deploys successfully

## Project structure

- `index.html` contains the Korea University first-year landing page
- `study.html` contains the original broader study app
- `home.css` contains the homepage styling
- `styles.css` contains the visual design and responsive layout
- `src/questions.js` stores the researched course catalog, module trees, and Q&A bank
- `src/app.js` contains the course explorer, flashcard, quiz, filter, and progress logic
- `src/korea-year1-data.js` stores the Korea University first-year subject map and starter Q&A
- `src/korea-year1.js` renders the Korea University homepage content
- `server.js` serves the app locally with no external dependencies
- `.github/workflows/pages.yml` validates and deploys the static app with GitHub Actions
- `CURRICULUM_PLAN.md` summarizes the source-backed course structure used in the app

## Research sources

The course trees in the app are adapted from these official pages:

- Korea University CS curriculum for 2025 entrants: <https://cs.korea.ac.kr/cs/under/computer_Curriculum.do?article.offset=0&articleLimit=10&articleNo=765285&mode=view>
- Korea University course-code guide: <https://univ.korea.ac.kr/uc/curriculum/initial.do>
- Korea University CS registration guidelines: <https://registrar.korea.ac.kr/_res/eduinfo/etc/info_caution_info.pdf>
- Korea University Academic Inquiry I: <https://univ.korea.ac.kr/uc/curriculum/requirements_research_intro.do>
- Korea University Writing: <https://univ.korea.ac.kr/uc/curriculum/requirements_writing_intro.do>
- Korea University Academic English I: <https://univ.korea.ac.kr/uc/curriculum/requirements_english_intro.do>
- Korea University First-Year Seminar: <https://univ.korea.ac.kr/uc/curriculum/requirements_seminar_intro.do>
- Korea University SW Programming Basics: <https://univ.korea.ac.kr/uc/curriculum/requirements_sw_intro.do>
- Korea University Data Science and AI: <https://univ.korea.ac.kr/uc/curriculum/requirements_data_intro.do>
- Korea University World of Life Sciences: <https://univ.korea.ac.kr/uc/curriculum/requirements_biology_intro.do>
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

- The repository is currently `PUBLIC`
- GitHub Pages is already enabled for this repository through GitHub Actions

## Future ideas

- Add your own custom questions through a form or imported JSON
- Replace starter Korea University Q&A with semester-specific professor syllabi once they are posted
- Track progress by topic over time
- Add spaced repetition scheduling
- Add difficulty-based quiz sessions
