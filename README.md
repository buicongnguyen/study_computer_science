# CS Study Sprint

CS Study Sprint is a lightweight browser-based study app for core computer science topics. It gives you:

- Flashcards with reveal-answer flow
- Quiz mode with multiple-choice practice
- Topic filters and search
- Local progress tracking using browser storage
- Built-in question bank covering algorithms, data structures, operating systems, networking, databases, computer architecture, and software engineering

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

## Project structure

- `index.html` contains the app shell
- `styles.css` contains the visual design and responsive layout
- `src/questions.js` stores the study cards
- `src/app.js` contains the flashcard, quiz, filter, and progress logic
- `server.js` serves the app locally with no external dependencies

## Future ideas

- Add your own custom questions through a form or imported JSON
- Track progress by topic over time
- Add spaced repetition scheduling
- Add difficulty-based quiz sessions
