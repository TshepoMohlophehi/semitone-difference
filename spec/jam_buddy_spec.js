const { JamBuddy } = require("../src/jam_buddy.js");

const { errorMessages } = require("../src/helper_objects.js");

describe("JamBuddy Class", () => {
  let buddy;
  let buddy1;

  beforeEach(() => {
    buddy = new JamBuddy();
    buddy1 = new JamBuddy();
  });

  describe("setCurrentNotes function", () => {
    it("should set the current notes if valid", () => {
      buddy.setCurrentNotes(["C", "D#"]);
      expect(buddy.getCurrentNotes()).toEqual(["C", "D#"]);
    });

    it("should throw an error if an invalid note is passed", () => {
      expect(() => buddy.setCurrentNotes(["C", "B#"])).toThrowError(
        errorMessages.invalidNote
      );
      expect(() => buddy.setCurrentNotes(["E#", "B"])).toThrowError(
        errorMessages.invalidNote
      );
    });

    it("should throw an error if nothing is passed", () => {
      expect(() => buddy.setCurrentNotes()).toThrowError(errorMessages.noNotes);
    });

    it("should throw an error if less than two notes are passed", () => {
      expect(() => buddy.setCurrentNotes(["A"])).toThrowError(
        errorMessages.arrayLength
      );
    });

    it("should throw an error if more than two notes are passed", () => {
      expect(() => buddy.setCurrentNotes(["A", "C#", "F#"])).toThrowError(
        errorMessages.arrayLength
      );
    });

    it("should throw an error if duplicate notes are passed", () => {
      expect(() => buddy.setCurrentNotes(["A", "A"])).toThrowError(
        errorMessages.duplicateNotes
      );

      expect(() => buddy.setCurrentNotes(["C#", "C#"])).toThrowError(
        errorMessages.duplicateNotes
      );
    });

    it("should throw an error if nothing is passed inside the array", () => {
      expect(() => buddy.setCurrentNotes([])).toThrowError(
        errorMessages.arrayLength
      );
    });
  });

  describe("getCurrentNotes function", () => {
    it("should return the current notes if valid", () => {
      buddy.setCurrentNotes(["A", "D#"]);
      expect(buddy.getCurrentNotes()).toEqual(["A", "D#"]);
    });
    it("should return the current notes for flats if valid", () => {
      buddy.setCurrentNotes(["A", "Eb"]);
      expect(buddy.getCurrentNotes()).toEqual(["A", "Eb"]);
    });
  });

  describe("randomizeCurrentNotes function", () => {
    it("should set two different random notes which are not similar to each other", () => {
      buddy.randomizeCurrentNotes();
      const currentNotes = buddy.getCurrentNotes();
      expect(currentNotes.length).toBe(2);
      expect(currentNotes[0]).not.toBe(currentNotes[1]);
    });
  });

  describe("checkAnswer function", () => {
    beforeEach(() => {
      buddy.setCurrentNotes(["C", "D#"]);
      buddy1.setCurrentNotes(["C", "Eb"]);
    });

    it("should return false if an incorrect distance between sharp notes is passed", () => {
      expect(buddy.checkAnswer(1)).toBe(false);
    });

    it("should return false if an incorrect distance between flat notes is passed", () => {
      expect(buddy1.checkAnswer(2)).toBe(false);
    });

    it("should return true if the distance between the sharp notes is correct for the clockwise direction", () => {
      expect(buddy.checkAnswer(3)).toBe(true);
    });

    it("should return true if the distance between the flat notes is correct for the clockwise direction", () => {
      expect(buddy1.checkAnswer(3)).toBe(true);
    });

    it("should return true if the distance between the sharp notes is correct for the anticlockwise direction", () => {
      expect(buddy.checkAnswer(9)).toBe(true);
    });

    it("should return true if the distance between the flat notes is correct for the anticlockwise direction", () => {
      expect(buddy1.checkAnswer(3)).toBe(true);
    });

    it("should handle flats and sharps correctly", () => {
      buddy.setCurrentNotes(["A", "Bb"]);
      expect(buddy.checkAnswer(1)).toBe(true);
      expect(buddy.checkAnswer(11)).toBe(true);

      buddy.setCurrentNotes(["Bb", "A"]);
      expect(buddy.checkAnswer(11)).toBe(true);
      expect(buddy.checkAnswer(1)).toBe(true);
    });

    it("should handle flats and sharps that occupy the same index position", () => {
      buddy.setCurrentNotes(["B", "C#"]);
      expect(buddy.checkAnswer(2)).toBe(true);
      expect(buddy.checkAnswer(10)).toBe(true);

      buddy1.setCurrentNotes(["B", "Db"]);
      expect(buddy1.checkAnswer(2)).toBe(true);
      expect(buddy1.checkAnswer(10)).toBe(true);
    });

    it("should handle notes that occupy the same index position", () => {
      buddy.setCurrentNotes(["A#", "Bb"]);
      expect(buddy.checkAnswer(0)).toBe(true);
      expect(buddy.checkAnswer(12)).toBe(true);

      buddy1.setCurrentNotes(["C#", "Db"]);
      expect(buddy1.checkAnswer(0)).toBe(true);
      expect(buddy1.checkAnswer(12)).toBe(true);
    });

    it("should throw an error if the answer is outside the range of 0 to 12", () => {
      buddy1.setCurrentNotes(["A", "B"]);
      expect(() => buddy1.checkAnswer(15)).toThrowError(
        errorMessages.invalidAnswer
      );

      buddy.setCurrentNotes(["C#", "F"]);
      expect(() => buddy.checkAnswer(-2)).toThrowError(
        errorMessages.invalidAnswer
      );
    });

    it("should throw an error if a string is passed to check the answer", () => {
      expect(() => buddy.checkAnswer("1")).toThrowError(
        errorMessages.checkAnswer
      );
    });
  });
});
