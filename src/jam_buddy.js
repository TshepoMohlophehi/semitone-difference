const { semitoneNotes, errorMessages } = require("./helper_objects.js");

const {
  getRandomIndexHelper,
  getNotesDistanceHelper,
  getNoteIndex,
} = require("./helper_functions.js");
class JamBuddy {
  constructor() {
    this.notes = semitoneNotes.notes;
    this.currentNotes = semitoneNotes.currentNotes;
  }

  setCurrentNotes(notes) {
    if (!notes) {
      throw new Error(errorMessages.noNotes);
    } else if (!Array.isArray(notes)) {
      throw new Error(errorMessages.invalidInput);
    } else if (notes.length !== 2) {
      throw new Error(errorMessages.arrayLength);
    }

    for (let note of notes) {
      if (getNoteIndex(note) === -1) {
        throw new Error(errorMessages.invalidNote);
      }
    }

    const [note1, note2] = notes;
    if (note1 === note2) {
      throw new Error(errorMessages.duplicateNotes);
    }

    this.currentNotes = notes;
  }

  getCurrentNotes() {
    return this.currentNotes;
  }

  randomizeCurrentNotes() {
    const randomIndex1 = getRandomIndexHelper();
    let randomIndex2 = getRandomIndexHelper();
    if (randomIndex2 === randomIndex1) {
      randomIndex2 = getRandomIndexHelper();
    }

    if (
      this.notes[randomIndex1].length == 2 &&
      this.notes[randomIndex2].length == 2
    ) {
      let multiIndex1 = Math.floor(Math.random() * 2);
      let multiIndex2 = Math.floor(Math.random() * 2);

      this.currentNotes = [
        this.notes[randomIndex1][multiIndex1],
        this.notes[randomIndex2][multiIndex2],
      ];
    }

    if (
      this.notes[randomIndex1].length == 2 &&
      this.notes[randomIndex2].length != 2
    ) {
      let multiIndex1 = Math.floor(Math.random() * 2);

      this.currentNotes = [
        this.notes[randomIndex1][multiIndex1],
        this.notes[randomIndex2],
      ];
    }

    if (
      this.notes[randomIndex2].length == 2 &&
      this.notes[randomIndex1].length != 2
    ) {
      let multiIndex2 = Math.floor(Math.random() * 2);

      this.currentNotes = [
        this.notes[randomIndex1],
        this.notes[randomIndex2][multiIndex2],
      ];
    }

    if (
      this.notes[randomIndex2].length != 2 &&
      this.notes[randomIndex1].length != 2
    ) {
      this.currentNotes = [this.notes[randomIndex1], this.notes[randomIndex2]];
    }
  }

  checkAnswer(answer) {
    if (typeof answer === "string" || answer === undefined) {
      throw new Error(errorMessages.checkAnswer);
    }

    if (answer < 0 || answer > 12) {
      throw new Error(errorMessages.invalidAnswer);
    }

    const totalNotes = this.notes.length;
    const firstNoteIndex = getNoteIndex(this.currentNotes[0]);
    const secondNoteIndex = getNoteIndex(this.currentNotes[1]);

    const clockwiseDistance = getNotesDistanceHelper(
      firstNoteIndex,
      secondNoteIndex,
      totalNotes
    );
    const anticlockwiseDistance = getNotesDistanceHelper(
      secondNoteIndex,
      firstNoteIndex,
      totalNotes
    );

    if (clockwiseDistance == anticlockwiseDistance) {
      return answer === clockwiseDistance || answer === 12;
    }
    return answer === clockwiseDistance || answer === anticlockwiseDistance;
  }

  getAllNotes() {
    return this.notes.flat(); 
  }
  getCorrectInterval() {
    const firstNoteIndex = getNoteIndex(this.currentNotes[0]);
    const secondNoteIndex = getNoteIndex(this.currentNotes[1]);
    const totalNotes = this.notes.length;

    const clockwiseDistance = getNotesDistanceHelper(
      firstNoteIndex,
      secondNoteIndex,
      totalNotes
    );

    const anticlockwiseDistance = getNotesDistanceHelper(
      secondNoteIndex,
      firstNoteIndex,
      totalNotes
    );

    if (clockwiseDistance == anticlockwiseDistance) {
      return `${clockwiseDistance} for clockwise and ${12} for anticlockwise semitones.`;
    }

    return `${clockwiseDistance} for clockwise and ${anticlockwiseDistance} for anticlockwise semitones.`;

  }

}

module.exports = { JamBuddy };
