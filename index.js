// index.js: The file containing the logic for the course of the game, which depends on Word.js and:

var Word = require("./Word.js");
var inquirer = require("inquirer");
var figlet = require("figlet");

var maxGuesses = 15;
var wins = 0;
var losses = 0;
var wordsToGuessArray = ["Hawks", "Celtics", "Nets", "Hornets", "Bulls", "Cavaliers", "Mavericks", "Nuggets", "Pistons", "Warriors", "Rockets", "Pacers", "Clippers", "Lakers", "Grizzlies", "Heat", "Bucks", "Timberwolves", "Pelicans", "Knicks", "Thunder", "Magic", "Sixers", "Suns", "Blazers", "Kings", "Spurs", "Raptors", "Jazz", "Wizards"];
// var wordsToGuessArray = ["Boston Celtics", "Houston Rockets", "Phoenix Suns", "Chicago Bulls"];
var randomWordToGuess;
var chosenWordToGuess;

// var displayedWord = "";

figlet("NBA Word Guess Game", function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    console.log("\nWelcome to the JavaScript Constructor Word Guess Game!"); 
    chooseRandomWord();
});

// Randomly selects a word and uses the Word constructor to store it
function chooseRandomWord() {
    randomWordToGuess = wordsToGuessArray[Math.floor(Math.random() * wordsToGuessArray.length)];
    chosenWordToGuess = new Word(randomWordToGuess);
    console.log("\nCan you guess the name of the NBA team?");
    // console.log(randomWordToGuess); // Displays the answer!
    chosenWordToGuess.makeLetters();
    // console.log(chosenWordToGuess);
    guessWord();
}

// Prompts the user for each guess and keeps track of the user's remaining guesses
function guessWord() {
    console.log(chosenWordToGuess.update());
    if (chosenWordToGuess.guessesMade.length >= maxGuesses) {
        console.log("You have no more guesses left. The word to guess was " + randomWordToGuess + ", Game Over!");
        return;
    }
    inquirer.prompt([{
        name: "inputtxt",
        type: "text",
        message: "Guess a letter!",
        validate: function (value) {
            if (value.length > 1) {
                console.log("\nPlease enter a single letter!");
                return false;
            }
            else if (isNaN(value) !== true) {
                console.log("\nPlease enter a letter!");
                return false;
            }
            else {
                return true;
            }
        }
    }]).then(function (guessedLetter) {
        var letter = guessedLetter.inputtxt;
        // console.log(letter);
        chosenWordToGuess.makeGuess(letter);
        // console.log(chosenWordToGuess.makeGuess(letter));

        if (chosenWordToGuess.isComplete()) {
            console.log("Congratulations! It was the:");
            figlet(randomWordToGuess, function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log(data)
            });
            // return;
            askPlayAgain();
        }
        else {
            console.log("You have " + (maxGuesses - chosenWordToGuess.guessesMade.length) + " guesses left.");
            console.log("----------------------------");
            console.log();
            guessWord();
        }
    })
}

function askPlayAgain() {
    inquirer.prompt({
        name: "confirm",
        type: "confirm",
        message: "Would you like to play again?"
    }).then(function (answer) {
        if (answer.confirm) {
            chooseRandomWord();
        }
        else {
            console.log("\nThanks for playing. Come back again!");
            // figlet("Thanks for playing. Come back again!", function(err, data) {
            //     if (err) {
            //         console.log('Something went wrong...');
            //         console.dir(err);
            //         return;
            //     }
            //     console.log(data)
            // });
            return;
        }
    });
}

// chooseRandomWord();