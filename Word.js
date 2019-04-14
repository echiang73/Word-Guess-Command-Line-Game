// Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:
var Letter = require("./Letter.js");

var Word = function (word) {
  // An array of new Letter objects representing the letters of the underlying word "that user is trying to guess"
  this.word = word;
  this.lettersToGuess = [];
  // this.attempts = 0;
  this.guessesMade = "";
  // this.numBlanks = 0;

  // A function that returns a string representing the word. 
  this.makeLetters = function () {
    var wordArr = this.word.split("");
    for (var i = 0; i < wordArr.length; i++) {
      var newLetter = new Letter(wordArr[i]);
      this.lettersToGuess.push(newLetter);
      // this.numBlanks = this.lettersToGuess.length;
    }
  }
  // This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
  this.update = function () {
    var displayedWord = "";
    for (var i = 0; i < this.lettersToGuess.length; i++) {
      displayedWord += this.lettersToGuess[i].display() + " ";
    }
    return displayedWord;
  }
  // A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)
  this.makeGuess = function (guessCharacter) {
    var isFound = false;
    var lowerGuessCharacter = guessCharacter.toLowerCase();
    if (this.guessesMade.indexOf(lowerGuessCharacter) !== -1) {
      console.log("Duplicate! Please enter a new letter!")
      return false;
    }
    this.guessesMade += lowerGuessCharacter; // Record the guess to guessesMade
    for (var i = 0; i < this.lettersToGuess.length; i++) {
      if (this.lettersToGuess[i].character.toLowerCase() == lowerGuessCharacter) {
        this.lettersToGuess[i].guessedLetterToShow = true;
        isFound = true;
      }
    }
    return isFound;
  };

  this.isComplete = function(){
    for(var i = 0; i < this.lettersToGuess.length; i++){
      // console.log(this.lettersToGuess[i].guessedLetterToShow);
      if(!this.lettersToGuess[i].guessedLetterToShow) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Word;