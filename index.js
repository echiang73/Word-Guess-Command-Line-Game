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
    console.log(chosenWordToGuess);
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
        // validate: function(value) {
        //     if(value)){
        //       return true;
        //     } else{
        //       return false;
        //     }
        //   }
        // validate: function(value) {
        //     var alpha = /^[A-Za-z]+$/;
        //     if(value = alpha){
        //         return true;
        //     }
        //     else if(value.length !=1){
        //         return false;
        //     }
        // }
    }]).then(function(guessedLetter){
        var letter = guessedLetter.inputtxt;
        Word.makeGuess(letter);
        if(Word.update()){
            console.log("Yes, you guessed correctly " + Word.toString() + "!");
            return;
        }
        else{
            console.log("\n-------------------------");
            // console.log("You have " + (maxGuesses - Word.guessesMade.length) + " guesses left!");
            guessWord();
        }
    })
    // }
}



chooseRandomWord();
guessWord();