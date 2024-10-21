const { JamBuddy } = require("./jam_buddy.js");

const buddy = new JamBuddy();
buddy.randomizeCurrentNotes();


const notesDisplay = document.getElementById("notesDisplay");
const randomizeButton = document.getElementById("randomize-button");
const answerForm = document.getElementById("answerForm");
const answerInput = document.getElementById("answerInput");
const messageDisplay = document.getElementById("message");
const giveUpButton = document.getElementById("give-up-button");
const restartButton = document.getElementById("restart-button");
const submitButton = document.getElementById("submit-button");
const explanationDisplay = document.getElementById("explanation");
const streakDisplay = document.getElementById("streak");

let streak = 0;


updateNotesDisplay();

updateStreakDisplay();  


function updateStreakDisplay() {
  streakDisplay.textContent = `Streak: ${streak}`;
}

function updateNotesDisplay() {
  const domCurrentNotes = buddy.getCurrentNotes();

  notesDisplay.innerHTML = `
    <h2>Current Notes:</h2>
    <div class="note-card" id="note1">${domCurrentNotes[0]}</div>
    <span>and</span>
    <div class="note-card" id="note2">${domCurrentNotes[1]}</div>
  `;
}


function handleAnswerSubmission(event) {
  event.preventDefault();

  if (giveUpButton.disabled) {
    return;
  }

  const userAnswer = parseInt(answerInput.value, 10);

  if (isNaN(userAnswer)) {
    messageDisplay.textContent = "Please enter a valid number!";
    messageDisplay.className = "text-red-500";
    return;
  }

  const isCorrect = buddy.checkAnswer(userAnswer);

  if (isCorrect) {
    messageDisplay.textContent = "Correct! Well done!";
    messageDisplay.className = "text-green-500";
    explanationDisplay.innerHTML = `You got it! The correct interval between notes: <span class="highlight">${buddy.getCurrentNotes()[0]}</span> and <span class="highlight">${buddy.getCurrentNotes()[1]}</span>. is ${buddy.getCorrectInterval()}.`;
    explanationDisplay.style.display = "block";
    streak += 1; 
    updateStreakDisplay();
    submitButton.classList.add('disabled-btn-g');
    giveUpButton.classList.add('disabled-btn-g');
    answerInput.classList.add('disabled-btn-g');
    notesDisplay.classList.add("note-correct-g")
  } else {
    messageDisplay.textContent = "Incorrect, try again!";
    messageDisplay.className = "text-red-500";
    streak = 0;
    updateStreakDisplay();
    submitButton.classList.add('disabled-btn-g');
    notesDisplay.classList.add("note-giveUp")
    setTimeout(() => {
      messageDisplay.textContent = "";
      answerInput.value = "";
      notesDisplay.classList.remove("note-giveUp")
      submitButton.classList.remove('disabled-btn-g');
    }, 3000);
    
  }
}


function handleGiveUp() {
  const allNotes = buddy.getAllNotes();
  const currentNotes = buddy.getCurrentNotes();
  
  const allNotesContainer = document.createElement('div');
  allNotesContainer.className = 'all-notes-container';

  allNotes.forEach(note => {
    const noteCard = document.createElement('div');
    noteCard.className = 'note-card';
    noteCard.textContent = note;

    if (currentNotes.includes(note)) {
      noteCard.classList.add('highlighted-note');
    }

    allNotesContainer.appendChild(noteCard);
  });

  const explanationText = document.createElement('p');
  explanationText.textContent = `All notes are as follows:`;
  explanationText.style.fontWeight = 'bold';

  const explanationAnswer = document.createElement('p');
  explanationAnswer.textContent = `The correct interval between note ${currentNotes[0]} and note ${currentNotes[1]} is: ${buddy.getCorrectInterval()} semitones.`;
  answerInput.value = "";

  
  explanationDisplay.innerHTML = ''; 
  explanationDisplay.appendChild(explanationText);
  explanationDisplay.appendChild(allNotesContainer);
  explanationDisplay.appendChild(explanationAnswer);

  explanationDisplay.style.display = "block";
  messageDisplay.textContent = "You gave up!";
  messageDisplay.className = "text-red-500";
  

  answerInput.disabled = true;
  giveUpButton.disabled = true;
  randomizeButton.disabled = true;

  answerInput.classList.add('disabled-btn');
  giveUpButton.classList.add('disabled-btn');
  randomizeButton.classList.add('disabled-btn');
  submitButton.classList.add('disabled-btn');
  
  notesDisplay.classList.add("note-giveUp")

  restartButton.style.display = "block"
}


function handleRestart() {
  buddy.randomizeCurrentNotes();
  
  messageDisplay.textContent = "";
  answerInput.value = "";
  explanationDisplay.style.display = "none"; 
  streak = 0; 
  updateStreakDisplay();

  answerInput.disabled = false;
  giveUpButton.disabled = false;
  randomizeButton.disabled = false;

  answerInput.classList.remove('disabled-btn');
  giveUpButton.classList.remove('disabled-btn');
  randomizeButton.classList.remove('disabled-btn');
  submitButton.classList.remove('disabled-btn');
  
  notesDisplay.classList.remove("note-giveUp")



  restartButton.style.display = "none";  
}




  randomizeButton.addEventListener("click", () => {

    answerInput.classList.remove('disabled-btn-g');
    giveUpButton.classList.remove('disabled-btn-g');
    submitButton.classList.remove('disabled-btn-g');

    answerInput.value = "";
    explanationDisplay.style.display = "none";

    const note1Card = document.getElementById("note1");
    const note2Card = document.getElementById("note2");
  

    if (note1Card && note2Card) {
      note1Card.classList.add("shuffle-effect");
      note2Card.classList.add("shuffle-effect");
  
  
      setTimeout(() => {
        buddy.randomizeCurrentNotes();
        updateNotesDisplay();
      }, 2000);
    } else {
      buddy.randomizeCurrentNotes();
      updateNotesDisplay();
    }
  
    messageDisplay.textContent = ""; 
  });


answerForm.addEventListener("submit", handleAnswerSubmission);
giveUpButton.addEventListener("click", handleGiveUp);
restartButton.addEventListener("click", handleRestart);

module.exports = {
  handleGiveUp,
  handleRestart,
  updateNotesDisplay,
  handleAnswerSubmission,
  randomizeButton,
  giveUpButton,
  restartButton,
  buddy,
};
