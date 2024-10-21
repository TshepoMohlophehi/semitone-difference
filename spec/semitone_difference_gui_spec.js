const {
  handleAnswerSubmission,
  buddy,
  handleGiveUp,
  handleRestart,
} = require("../src/semitone_main.js");

describe("Semitone Difference Calculator", function () {
  let answerInput,
    notesDisplay,
    explanationDisplay,
    messageDisplay,
    streakDisplay,
    giveUpButton,
    randomizeButton,
    submitButton;
  beforeEach(function () {
    answerInput = document.getElementById("answerInput");
    notesDisplay = document.getElementById("notesDisplay");
    explanationDisplay = document.getElementById("explanation");
    messageDisplay = document.getElementById("message");
    streakDisplay = document.getElementById("streak");
    giveUpButton = document.getElementById("give-up-button");
    randomizeButton = document.getElementById("randomize-button");
    submitButton = document.getElementById("submit-button");
    jasmine.clock().install();
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it("should display random notes when the page loads", function () {
    expect(notesDisplay.textContent).toContain("Current Notes:");
  });

  it("should change the notes when the randomize button is clicked", function () {
    const randomizeBtn = document.getElementById("randomize-button");

    const initialNotes = notesDisplay.textContent;

    randomizeBtn.click();
    jasmine.clock().tick(2000);
    const afterClickNotes = notesDisplay.textContent;
    expect(initialNotes).not.toEqual(afterClickNotes);
  });

  it("should display an incorrect message after 1 second when the incorrect answer is submitted", function () {
    const mockNotes = ["C", "E"];
    buddy.setCurrentNotes(mockNotes);

    const incorrectAnswer = 5;

    const messageDisplay = document.getElementById("message");

    answerInput.value = incorrectAnswer;
    handleAnswerSubmission({ preventDefault: () => {} });

    jasmine.clock().tick(1000);
    expect(messageDisplay.textContent).toBe("Incorrect, try again!");
    expect(messageDisplay.className).toBe("text-red-500");
  });

  it("should display a correct message when the correct answer is submitted", function () {
    const mockNotes = ["A", "B"];
    buddy.setCurrentNotes(mockNotes);

    const correctAnswer = 2;

    const messageDisplay = document.getElementById("message");

    answerInput.value = correctAnswer;
    handleAnswerSubmission({ preventDefault: () => {} });

    jasmine.clock().tick(1000);
    expect(messageDisplay.textContent).toBe("Correct! Well done!");
    expect(messageDisplay.className).toBe("text-green-500");
  });

  it("should display a correct message when an invalid input is supplied", function () {
    const messageDisplay = document.getElementById("message");

    answerInput.value = "incorrect input";
    handleAnswerSubmission({ preventDefault: () => {} });

    expect(messageDisplay.textContent).toBe("Please enter a valid number!");
    expect(messageDisplay.className).toBe("text-red-500");
  });

  it("should display all individual notes with the correct ones highlighted when the user gives up", () => {
    handleGiveUp();

    const highlightedNotes = document.querySelectorAll(".highlighted-note");
    expect(highlightedNotes.length).toBe(2);

    const allNotesDisplayed = explanationDisplay.querySelectorAll(".note-card");
    expect(allNotesDisplayed.length).toBe(17);

    expect(messageDisplay.textContent).toBe("You gave up!");
    expect(explanationDisplay.style.display).toBe("block");
  });

  it("should restart the game and clear the explanation when the restart button is clicked", () => {
    handleRestart();

    expect(explanationDisplay.style.display).toBe("none");
    expect(streakDisplay.textContent).toBe("Streak: 0");
    expect(messageDisplay.textContent).toBe("");
  });

  it("should populate explanation with correct notes and congratulate the user when the correct answer is submitted", () => {
    spyOn(buddy, "checkAnswer").and.returnValue(true);

    const event = new Event("submit");
    answerInput.value = 5;
    handleAnswerSubmission(event);

    expect(messageDisplay.textContent).toBe("Correct! Well done!");
    const explanationText = explanationDisplay.innerHTML;
    expect(explanationText).toContain("highlight");
    expect(explanationDisplay.style.display).toBe("block");
  });

  it("should update streak correctly based on user answers", () => {
    spyOn(buddy, "checkAnswer").and.returnValue(true);
    const event = new Event("submit");
    answerInput.value = 5;

    handleAnswerSubmission(event);
    expect(streakDisplay.textContent).toBe("Streak: 1");

    handleAnswerSubmission(event);
    expect(streakDisplay.textContent).toBe("Streak: 2");

    buddy.checkAnswer.and.returnValue(false);
    handleAnswerSubmission(event);
    expect(streakDisplay.textContent).toBe("Streak: 0");
  });

  it("should disable buttons after user gives up", () => {
    handleGiveUp();

    expect(answerInput.disabled).toBe(true);
    expect(giveUpButton.disabled).toBe(true);
    expect(randomizeButton.disabled).toBe(true);
  });
});
