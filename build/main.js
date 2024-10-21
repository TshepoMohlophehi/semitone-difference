/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helper_functions.js":
/*!*********************************!*\
  !*** ./src/helper_functions.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { semitoneNotes } = __webpack_require__(/*! ./helper_objects.js */ \"./src/helper_objects.js\");\r\n\r\nfunction getRandomIndexHelper() {\r\n  return Math.floor(Math.random() * semitoneNotes.notes.length);\r\n}\r\n\r\nfunction getNotesDistanceHelper(firstNoteIndex, secondNoteIndex, totalNotes) {\r\n  return (secondNoteIndex - firstNoteIndex + totalNotes) % totalNotes;\r\n}\r\n\r\nfunction getNoteIndex(note) {\r\n  for (let i = 0; i < semitoneNotes.notes.length; i++) {\r\n    if (semitoneNotes.notes[i].includes(note)) {\r\n      return i;\r\n    }\r\n  }\r\n  return -1; \r\n}\r\n\r\n\r\nmodule.exports = {\r\n \r\n  getRandomIndexHelper,\r\n  getNotesDistanceHelper,\r\n  getNoteIndex,\r\n\r\n};\r\n\n\n//# sourceURL=webpack://semitone-difference-basic-algorithm/./src/helper_functions.js?");

/***/ }),

/***/ "./src/helper_objects.js":
/*!*******************************!*\
  !*** ./src/helper_objects.js ***!
  \*******************************/
/***/ ((module) => {

eval("const errorMessages = {\r\n  invalidInput: \"Please provide an array of 2 non-empty semitone notes.\",\r\n  invalidNote: \"Incorrect notes passed\",\r\n  noNotes: \"No valid notes were passed.\",\r\n  arrayLength: \"The notes must be an array of 2 notes\",\r\n  duplicateNotes: \"Duplicate notes detected\",\r\n  checkAnswer: \"Please provide an integer to check the answer \",\r\n  invalidAnswer: \"The distance is outside the range, distance has to be within range of 0 to 12\"\r\n};\r\n\r\nconst semitoneNotes = {\r\n  notes: [\"A\", [\"A#\",\"Bb\"], \"B\", \"C\", [\"C#\",\"Db\"], \"D\", [\"D#\",\"Eb\"], \"E\", \"F\", [\"F#\",\"Gb\"], \"G\", [\"G#\",\"Ab\"]],\r\n  currentNotes: [],\r\n};\r\n\r\n\r\nmodule.exports = { errorMessages, semitoneNotes };\n\n//# sourceURL=webpack://semitone-difference-basic-algorithm/./src/helper_objects.js?");

/***/ }),

/***/ "./src/jam_buddy.js":
/*!**************************!*\
  !*** ./src/jam_buddy.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { semitoneNotes, errorMessages } = __webpack_require__(/*! ./helper_objects.js */ \"./src/helper_objects.js\");\r\n\r\nconst {\r\n  getRandomIndexHelper,\r\n  getNotesDistanceHelper,\r\n  getNoteIndex,\r\n} = __webpack_require__(/*! ./helper_functions.js */ \"./src/helper_functions.js\");\r\nclass JamBuddy {\r\n  constructor() {\r\n    this.notes = semitoneNotes.notes;\r\n    this.currentNotes = semitoneNotes.currentNotes;\r\n  }\r\n\r\n  setCurrentNotes(notes) {\r\n    if (!notes) {\r\n      throw new Error(errorMessages.noNotes);\r\n    } else if (!Array.isArray(notes)) {\r\n      throw new Error(errorMessages.invalidInput);\r\n    } else if (notes.length !== 2) {\r\n      throw new Error(errorMessages.arrayLength);\r\n    }\r\n\r\n    for (let note of notes) {\r\n      if (getNoteIndex(note) === -1) {\r\n        throw new Error(errorMessages.invalidNote);\r\n      }\r\n    }\r\n\r\n    const [note1, note2] = notes;\r\n    if (note1 === note2) {\r\n      throw new Error(errorMessages.duplicateNotes);\r\n    }\r\n\r\n    this.currentNotes = notes;\r\n  }\r\n\r\n  getCurrentNotes() {\r\n    return this.currentNotes;\r\n  }\r\n\r\n  randomizeCurrentNotes() {\r\n    const randomIndex1 = getRandomIndexHelper();\r\n    let randomIndex2 = getRandomIndexHelper();\r\n    if (randomIndex2 === randomIndex1) {\r\n      randomIndex2 = getRandomIndexHelper();\r\n    }\r\n\r\n    if (\r\n      this.notes[randomIndex1].length == 2 &&\r\n      this.notes[randomIndex2].length == 2\r\n    ) {\r\n      let multiIndex1 = Math.floor(Math.random() * 2);\r\n      let multiIndex2 = Math.floor(Math.random() * 2);\r\n\r\n      this.currentNotes = [\r\n        this.notes[randomIndex1][multiIndex1],\r\n        this.notes[randomIndex2][multiIndex2],\r\n      ];\r\n    }\r\n\r\n    if (\r\n      this.notes[randomIndex1].length == 2 &&\r\n      this.notes[randomIndex2].length != 2\r\n    ) {\r\n      let multiIndex1 = Math.floor(Math.random() * 2);\r\n\r\n      this.currentNotes = [\r\n        this.notes[randomIndex1][multiIndex1],\r\n        this.notes[randomIndex2],\r\n      ];\r\n    }\r\n\r\n    if (\r\n      this.notes[randomIndex2].length == 2 &&\r\n      this.notes[randomIndex1].length != 2\r\n    ) {\r\n      let multiIndex2 = Math.floor(Math.random() * 2);\r\n\r\n      this.currentNotes = [\r\n        this.notes[randomIndex1],\r\n        this.notes[randomIndex2][multiIndex2],\r\n      ];\r\n    }\r\n\r\n    if (\r\n      this.notes[randomIndex2].length != 2 &&\r\n      this.notes[randomIndex1].length != 2\r\n    ) {\r\n      this.currentNotes = [this.notes[randomIndex1], this.notes[randomIndex2]];\r\n    }\r\n  }\r\n\r\n  checkAnswer(answer) {\r\n    if (typeof answer === \"string\" || answer === undefined) {\r\n      throw new Error(errorMessages.checkAnswer);\r\n    }\r\n\r\n    if (answer < 0 || answer > 12) {\r\n      throw new Error(errorMessages.invalidAnswer);\r\n    }\r\n\r\n    const totalNotes = this.notes.length;\r\n    const firstNoteIndex = getNoteIndex(this.currentNotes[0]);\r\n    const secondNoteIndex = getNoteIndex(this.currentNotes[1]);\r\n\r\n    const clockwiseDistance = getNotesDistanceHelper(\r\n      firstNoteIndex,\r\n      secondNoteIndex,\r\n      totalNotes\r\n    );\r\n    const anticlockwiseDistance = getNotesDistanceHelper(\r\n      secondNoteIndex,\r\n      firstNoteIndex,\r\n      totalNotes\r\n    );\r\n\r\n    if (clockwiseDistance == anticlockwiseDistance) {\r\n      return answer === clockwiseDistance || answer === 12;\r\n    }\r\n    return answer === clockwiseDistance || answer === anticlockwiseDistance;\r\n  }\r\n\r\n  getAllNotes() {\r\n    return this.notes.flat(); \r\n  }\r\n  getCorrectInterval() {\r\n    const firstNoteIndex = getNoteIndex(this.currentNotes[0]);\r\n    const secondNoteIndex = getNoteIndex(this.currentNotes[1]);\r\n    const totalNotes = this.notes.length;\r\n\r\n    const clockwiseDistance = getNotesDistanceHelper(\r\n      firstNoteIndex,\r\n      secondNoteIndex,\r\n      totalNotes\r\n    );\r\n\r\n    const anticlockwiseDistance = getNotesDistanceHelper(\r\n      secondNoteIndex,\r\n      firstNoteIndex,\r\n      totalNotes\r\n    );\r\n\r\n    if (clockwiseDistance == anticlockwiseDistance) {\r\n      return `${clockwiseDistance} for clockwise and ${12} for anticlockwise semitones.`;\r\n    }\r\n\r\n    return `${clockwiseDistance} for clockwise and ${anticlockwiseDistance} for anticlockwise semitones.`;\r\n\r\n  }\r\n\r\n}\r\n\r\nmodule.exports = { JamBuddy };\r\n\n\n//# sourceURL=webpack://semitone-difference-basic-algorithm/./src/jam_buddy.js?");

/***/ }),

/***/ "./src/semitone_main.js":
/*!******************************!*\
  !*** ./src/semitone_main.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { JamBuddy } = __webpack_require__(/*! ./jam_buddy.js */ \"./src/jam_buddy.js\");\r\n\r\nconst buddy = new JamBuddy();\r\nbuddy.randomizeCurrentNotes();\r\n\r\n\r\nconst notesDisplay = document.getElementById(\"notesDisplay\");\r\nconst randomizeButton = document.getElementById(\"randomize-button\");\r\nconst answerForm = document.getElementById(\"answerForm\");\r\nconst answerInput = document.getElementById(\"answerInput\");\r\nconst messageDisplay = document.getElementById(\"message\");\r\nconst giveUpButton = document.getElementById(\"give-up-button\");\r\nconst restartButton = document.getElementById(\"restart-button\");\r\nconst submitButton = document.getElementById(\"submit-button\");\r\nconst explanationDisplay = document.getElementById(\"explanation\");\r\nconst streakDisplay = document.getElementById(\"streak\");\r\n\r\nlet streak = 0;\r\n\r\n\r\nupdateNotesDisplay();\r\n\r\nupdateStreakDisplay();  \r\n\r\n\r\nfunction updateStreakDisplay() {\r\n  streakDisplay.textContent = `Streak: ${streak}`;\r\n}\r\n\r\nfunction updateNotesDisplay() {\r\n  const domCurrentNotes = buddy.getCurrentNotes();\r\n\r\n  notesDisplay.innerHTML = `\r\n    <h2>Current Notes:</h2>\r\n    <div class=\"note-card\" id=\"note1\">${domCurrentNotes[0]}</div>\r\n    <span>and</span>\r\n    <div class=\"note-card\" id=\"note2\">${domCurrentNotes[1]}</div>\r\n  `;\r\n}\r\n\r\n\r\nfunction handleAnswerSubmission(event) {\r\n  event.preventDefault();\r\n\r\n  if (giveUpButton.disabled) {\r\n    // Prevent answer submission if the user has given up\r\n    return;\r\n  }\r\n\r\n  const userAnswer = parseInt(answerInput.value, 10);\r\n\r\n  if (isNaN(userAnswer)) {\r\n    messageDisplay.textContent = \"Please enter a valid number!\";\r\n    messageDisplay.className = \"text-red-500\";\r\n    return;\r\n  }\r\n\r\n  const isCorrect = buddy.checkAnswer(userAnswer);\r\n\r\n  if (isCorrect) {\r\n    messageDisplay.textContent = \"Correct! Well done!\";\r\n    messageDisplay.className = \"text-green-500\";\r\n    explanationDisplay.innerHTML = `You got it! The correct interval between notes: <span class=\"highlight\">${buddy.getCurrentNotes()[0]}</span> and <span class=\"highlight\">${buddy.getCurrentNotes()[1]}</span>. is ${buddy.getCorrectInterval()}.`;\r\n    explanationDisplay.style.display = \"block\";\r\n    streak += 1; \r\n    updateStreakDisplay();\r\n    submitButton.classList.add('disabled-btn-g');\r\n    giveUpButton.classList.add('disabled-btn-g');\r\n    answerInput.classList.add('disabled-btn-g');\r\n    notesDisplay.classList.add(\"note-correct-g\")\r\n  } else {\r\n    messageDisplay.textContent = \"Incorrect, try again!\";\r\n    messageDisplay.className = \"text-red-500\";\r\n    streak = 0;\r\n    updateStreakDisplay();\r\n    submitButton.classList.add('disabled-btn-g');\r\n    notesDisplay.classList.add(\"note-giveUp\")\r\n    setTimeout(() => {\r\n      messageDisplay.textContent = \"\";\r\n      answerInput.value = \"\";\r\n      notesDisplay.classList.remove(\"note-giveUp\")\r\n      submitButton.classList.remove('disabled-btn-g');\r\n    }, 3000);\r\n    \r\n  }\r\n}\r\n\r\n\r\nfunction handleGiveUp() {\r\n  const allNotes = buddy.getAllNotes();\r\n  const currentNotes = buddy.getCurrentNotes();\r\n  \r\n  const allNotesContainer = document.createElement('div');\r\n  allNotesContainer.className = 'all-notes-container';\r\n\r\n  allNotes.forEach(note => {\r\n    const noteCard = document.createElement('div');\r\n    noteCard.className = 'note-card';\r\n    noteCard.textContent = note;\r\n\r\n    if (currentNotes.includes(note)) {\r\n      noteCard.classList.add('highlighted-note');\r\n    }\r\n\r\n    allNotesContainer.appendChild(noteCard);\r\n  });\r\n\r\n  const explanationText = document.createElement('p');\r\n  explanationText.textContent = `All notes are as follows:`;\r\n  explanationText.style.fontWeight = 'bold';\r\n\r\n  const explanationAnswer = document.createElement('p');\r\n  explanationAnswer.textContent = `The correct interval between note ${currentNotes[0]} and note ${currentNotes[1]} is: ${buddy.getCorrectInterval()} semitones.`;\r\n  answerInput.value = \"\";\r\n\r\n  \r\n  explanationDisplay.innerHTML = ''; \r\n  explanationDisplay.appendChild(explanationText);\r\n  explanationDisplay.appendChild(allNotesContainer);\r\n  explanationDisplay.appendChild(explanationAnswer);\r\n\r\n  explanationDisplay.style.display = \"block\";\r\n  messageDisplay.textContent = \"You gave up!\";\r\n  messageDisplay.className = \"text-red-500\";\r\n  \r\n\r\n  answerInput.disabled = true;\r\n  giveUpButton.disabled = true;\r\n  randomizeButton.disabled = true;\r\n\r\n  answerInput.classList.add('disabled-btn');\r\n  giveUpButton.classList.add('disabled-btn');\r\n  randomizeButton.classList.add('disabled-btn');\r\n  submitButton.classList.add('disabled-btn');\r\n  \r\n  notesDisplay.classList.add(\"note-giveUp\")\r\n\r\n  restartButton.style.display = \"block\"\r\n}\r\n\r\n\r\nfunction handleRestart() {\r\n  buddy.randomizeCurrentNotes();\r\n  \r\n  messageDisplay.textContent = \"\";\r\n  answerInput.value = \"\";\r\n  explanationDisplay.style.display = \"none\"; \r\n  streak = 0; \r\n  updateStreakDisplay();\r\n\r\n  answerInput.disabled = false;\r\n  giveUpButton.disabled = false;\r\n  randomizeButton.disabled = false;\r\n\r\n  answerInput.classList.remove('disabled-btn');\r\n  giveUpButton.classList.remove('disabled-btn');\r\n  randomizeButton.classList.remove('disabled-btn');\r\n  submitButton.classList.remove('disabled-btn');\r\n  \r\n  notesDisplay.classList.remove(\"note-giveUp\")\r\n\r\n\r\n\r\n  restartButton.style.display = \"none\";  \r\n}\r\n\r\n\r\n\r\n\r\n  randomizeButton.addEventListener(\"click\", () => {\r\n\r\n    answerInput.classList.remove('disabled-btn-g');\r\n    giveUpButton.classList.remove('disabled-btn-g');\r\n    submitButton.classList.remove('disabled-btn-g');\r\n\r\n    answerInput.value = \"\";\r\n    explanationDisplay.style.display = \"none\";\r\n\r\n    const note1Card = document.getElementById(\"note1\");\r\n    const note2Card = document.getElementById(\"note2\");\r\n  \r\n\r\n    if (note1Card && note2Card) {\r\n      note1Card.classList.add(\"shuffle-effect\");\r\n      note2Card.classList.add(\"shuffle-effect\");\r\n  \r\n  \r\n      setTimeout(() => {\r\n        buddy.randomizeCurrentNotes();\r\n        updateNotesDisplay();\r\n      }, 2000);\r\n    } else {\r\n      buddy.randomizeCurrentNotes();\r\n      updateNotesDisplay();\r\n    }\r\n  \r\n    messageDisplay.textContent = \"\"; \r\n  });\r\n\r\n\r\nanswerForm.addEventListener(\"submit\", handleAnswerSubmission);\r\ngiveUpButton.addEventListener(\"click\", handleGiveUp);\r\nrestartButton.addEventListener(\"click\", handleRestart);\r\n\r\nmodule.exports = {\r\n  handleGiveUp,\r\n  handleRestart,\r\n  updateNotesDisplay,\r\n  handleAnswerSubmission,\r\n  randomizeButton,\r\n  giveUpButton,\r\n  restartButton,\r\n  buddy,\r\n};\r\n\n\n//# sourceURL=webpack://semitone-difference-basic-algorithm/./src/semitone_main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/semitone_main.js");
/******/ 	
/******/ })()
;