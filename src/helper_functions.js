const { semitoneNotes } = require("./helper_objects.js");

function getRandomIndexHelper() {
  return Math.floor(Math.random() * semitoneNotes.notes.length);
}

function getNotesDistanceHelper(firstNoteIndex, secondNoteIndex, totalNotes) {
  return (secondNoteIndex - firstNoteIndex + totalNotes) % totalNotes;
}

function getNoteIndex(note) {
  for (let i = 0; i < semitoneNotes.notes.length; i++) {
    if (semitoneNotes.notes[i].includes(note)) {
      return i;
    }
  }
  return -1; 
}


module.exports = {
 
  getRandomIndexHelper,
  getNotesDistanceHelper,
  getNoteIndex,

};
