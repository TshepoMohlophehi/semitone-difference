const errorMessages = {
  invalidInput: "Please provide an array of 2 non-empty semitone notes.",
  invalidNote: "Incorrect notes passed",
  noNotes: "No valid notes were passed.",
  arrayLength: "The notes must be an array of 2 notes",
  duplicateNotes: "Duplicate notes detected",
  checkAnswer: "Please provide an integer to check the answer ",
  invalidAnswer: "The distance is outside the range, distance has to be within range of 0 to 12"
};

const semitoneNotes = {
  notes: ["A", ["A#","Bb"], "B", "C", ["C#","Db"], "D", ["D#","Eb"], "E", "F", ["F#","Gb"], "G", ["G#","Ab"]],
  currentNotes: [],
};


module.exports = { errorMessages, semitoneNotes };