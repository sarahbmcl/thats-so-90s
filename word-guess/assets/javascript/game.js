const wordList = ["nirvana", "oasis", "radiohead", "weezer", "toadies", "cake"];
let wordToGuess = "";
let userGuess;
let guessesLeft;
let guessedLetters = [];
let letterReveal = []; //shows blanks and revealed letters
let correctIndex = [];
let wins=0; //start at zero

//--------------FUNCTIONS--------------

//assign initial value to variables for start of game
function initialize(){
    console.log("INITIALIZE");
    guessesLeft = 7;
    guessedLetters = [];
    letterReveal = [];
    correctIndex = [];

    //returns and records the value
    document.getElementById("guesses-left").innerHTML = guessesLeft;
    document.getElementById("guessed").innerHTML = "";
    document.getElementById("notification").innerHTML = "";
    document.getElementById("play-again").style.display = "none";

    //assigns blanks to random word
    randomWord();
    createBlanks();
}

//obtain a random word to guess 
function randomWord(){
    wordToGuess = wordList[Math.floor(Math.random()*((wordList.length-1)-1+1)+1)];
}

//respond to user keys
function captureUserInput(){
    document.onkeyup = function(event){ 
        console.log(event.key); 
        userGuess = event.key; 
        
        if(!isWinner()){
            if(!isGameOver()){
                if(userGuess !== undefined){ 
                    if( isGuessCorrect2() ){
                        revealLetter2();
                    } else if( guessedBefore() === false ){
                        if(isLetter(userGuess)) wrongGuess();
                    }

                    recordGuesses(); //every time key is pressed record the guess
                    if(isWinner())winner(); //check winning conditions in reponse to action
                }
            }else{
                console.log("GAME OVER");
                document.getElementById("notification").innerHTML = "You Lose!";
                document.getElementById("play-again").style.display = "block";
            }
        }else{ //WINNER
            console.log("WINNER");
            winner();
        }
    }
}

//winning conditions
function isWinner(){
    const winner = true;
    for(let i=0; i<wordToGuess.length; i++ ){
        if(letterReveal[i] !== wordToGuess[i]){
            winner = false;
        }
    }
    return winner;
}

//response to winning conditions
function winner(){
    wins++;
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("notification").innerHTML = "WINNER!";
    document.getElementById("play-again").style.display = "block";
}

//response to user reaching 0 guesses left
function isGameOver(){
    if(guessesLeft>0){
        return false;
    }else{
        return true;
    }
}

//minus 1 for incorrect guesses
function isGuessCorrect(){
    const correct = true;

    if( wordToGuess.indexOf(userGuess) == -1 ){ //WRONG
        correct = false;
    }else{ //CORRECT
        correct = true;
    }
    return correct;
}

//log guesses left in response to wron answer
function wrongGuess(){
    console.log("WRONG");
    guessesLeft--;
    document.getElementById("guesses-left").innerHTML = guessesLeft;
}

//send correct letter guessed by user
function isGuessCorrect2(){
    const correct = false;
    for(let i=0; i<wordToGuess.length; i++){     

        if(wordToGuess[i] === userGuess){
            correctIndex.push(i);
            correct = true;
        }
    }
    return correct;
}

//log letter from alphabet string on correct guess in lieu of blank
function revealLetter(){
    console.log("RIGHT - Reveal Letter");
    letterReveal[ wordToGuess.indexOf(userGuess) ] = userGuess;
    console.log(letterReveal.toString());
    document.getElementById("word").innerHTML = letterReveal;
}

function revealLetter2(){
    for(let i=0; i < correctIndex.length; i++){
       letterReveal[correctIndex[i]] = wordToGuess[correctIndex[i]]; 
       console.log("letterreveal: " + letterReveal[correctIndex[i]] + "wordtoguess: " + wordToGuess[correctIndex[i]]);
    }    

    console.log("RIGHT - Reveal Letter");
    console.log(letterReveal.toString());
    document.getElementById("word").innerHTML = letterReveal;
}

//for each letter, create blanks that populate assigned letter on user guess
function createBlanks(){
    const theWordBlank;
    document.getElementById("word").innerHTML = "";
    for(let i=0; i<wordToGuess.length; i++){
        theWordBlank = document.getElementById("word");
        theWordBlank.innerHTML += " _ ";
        letterReveal[i] = " _ "
        console.log(theWordBlank.innerHTML);
        console.log(letterReveal);
    } 
    document.getElementById("word").innerHTML = letterReveal;
}

//Guess options from alphabet string
function isLetter( string ){
    return (/[a-zA-Z]/.test(string) && string.length === 1 );
}

//response of user guess action of picking a letter
function recordGuesses(){
    if(isLetter(userGuess)){
        guessedLetters.push(userGuess);
    }
    document.getElementById("guessed").innerHTML = guessedLetters;
    console.log("recordGuesses " + guessedLetters);
}

//----------END FUNCTIONS----------------

//On reset
window.onload = function(){

    const resetButton = document.getElementById("play-again");
    resetButton.onclick = initialize;

    initialize();
//    randomWord();
//    createBlanks();

    captureUserInput();  

};