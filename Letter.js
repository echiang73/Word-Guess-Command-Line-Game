
// Contains a constructor, Letter. 
// This constructor should be able to either display an underlying character or a blank placeholder (such as an underscore), 
// depending on whether or not the user has guessed the letter. That means the constructor should define:

var Letter = function (character) {
    // A string value to store the underlying character for the letter
    this.character = character;
    // A boolean value that stores whether that letter has been guessed yet
    this.guessedLetterToShow = false;
    
    // A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed
    this.display = function () {
        if (this.guessedLetterToShow) {
            return (this.character + " ");
        }
        else if (character === " ") { // Takes into account of space in word
            this.guessedLetterToShow = true; // This will allow boolean to always be true for spaces so we can use two/three words for the name of randomWordToGuess!
            return ("  ");
        }
        else {
            return ("_ ");
        }
    }
    
    // A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly
    this.checkLetter = function (guessCharacter) {
        if (guessCharacter.toLowerCase() === this.character.toLowerCase()) {
            this.guessedLetterToShow = true;
        }
    }
}

module.exports = Letter;