// index.js: The file containing the logic for the course of the game, which depends on Word.js and:

var Word = require("./Word.js");
var inquirer = require("inquirer");

var maxGuesses;
var wins = 0;
var losses = 0;

var wordsToGuessArray = ["Boston Celtics", "Houston Rockets", "Phoenix Suns", "Chicago Bulls"];
var randomWordToGuess;
var chosenWordToGuess;
var inputtxt;


// Randomly selects a word and uses the Word constructor to store it
function chooseRandomWord() {
    randomWordToGuess = wordsToGuessArray[Math.floor(Math.random() * wordsToGuessArray.length)];
    chosenWordToGuess = new Word(randomWordToGuess);
    console.log(randomWordToGuess);
    chosenWordToGuess.makeLetters();
    // console.log(chosenWordToGuess);
}

// var generateMaxGuesses = function() {
//     maxGuesses = chosenWordToGuess.makeLetters();
//     // console.log(chosenWordToGuess);
//     // console.log("You have " + maxGuesses + " attempts to solve this word.")
//   }

// Prompts the user for each guess and keeps track of the user's remaining guesses
function guessWord() {
    console.log(chosenWordToGuess.update());
	if (maxGuesses <= 0){
		console.log("You have no more guesses left. Game Over!");
	return;
	}
    // if (guesses > 0 && checker.indexOf("_ ") !==-1){
    //     guesses--;
    inquirer.prompt([{
        name: "inputtxt",
        type: "text",
        message: "Guess a letter!",
        validate: function(value) {
            if(value.length >1){
                console.log("\nPlease enter a single letter!");
                return false;
            }
            else if(isNaN(value) !== true){
                console.log("\nPlease enter a letter!");
                return false;
            }
            else{
                return true;
            }
          }
    }]).then(function(guessedLetter){
        var letter = guessedLetter.inputtxt;
        // console.log(letter);
        chosenWordToGuess.makeGuess(letter)
        console.log(chosenWordToGuess.makeGuess(letter));
        guessWord();
        
        // if(this.guessedLetterToShow == true){
        //     // chosenWordToGuess.update();
        //     console.log("Yes, " + letter + " is correct!");
        //     // return;
        //     guessWord();
        // }
        // else{
        //     console.log("\n-------------------------");
        //     // console.log("You have " + (maxGuesses - Word.guessesMade.length) + " guesses left!");
        //     guessWord();
        // }
    })
    // }
}



chooseRandomWord();
guessWord();