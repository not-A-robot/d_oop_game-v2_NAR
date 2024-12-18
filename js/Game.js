/* Treehouse FSJS Techdegree, Project 4 - OOP Game App, Game.js */
/* By NotArobot */


//Game Class 
//Setups up new games, Tracks game progress, phrases used, win/lose rules
class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            'promises kept', 
            'callback that function', 
            'scope creeper', 
            'closure encounter', 
            'eventful timing',
            'null and void',
            'youre classless'
        ];
        this.activePhrase = null;
    }; 

    //Function: generates random number & returns phrase at that index
    getRandomPhrase(){
        const randomPhraseIndex = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomPhraseIndex]
    }

    //Function: Hides start screen & runs callbacks getphrase & addPhraseToDisplay
    startGame() {
        //Hide Start Screen
        const startScreen = document.getElementById('overlay');
        startScreen.style.display = 'none';

        //Get & Display Random Phrase
        const getPhrase = this.getRandomPhrase()   //generate phrase
        const phrase = new Phrase(getPhrase) //create phrase class
        phrase.addPhraseToDisplay()  //display phrase from class func

        //Store Active Phrase
        this.activePhrase = phrase; //save phrase class to activePhrase in Game Property

        activeGame = true; //track game status for keypress
    };

    //Function: Checks to see if the word has been revealed & wins game if it has
    checkForWin(){
        const letters = document.getElementsByClassName('letter');
        for(let i = 0; i < letters.length; i++){
            if (letters[i].classList.contains('hide')) {
                return false; // If any letter is hidden, the player hasn't won yet
            }
        }
        // If the loop completes and no 'hide' class is found, the player has won
        this.gameOver(true);
        return true;    
        }

    //Function: Increases the value of the missed property, Removes a life from the scoreboard, Checks if player has remaining lives and ends game if player is out
    removeLife(){
        //html hearts
        const tries = document.getElementsByClassName('tries')

        //current misses to represent heart index
        const missedIndex = this.missed

        // change heart at index to lostheart
        tries[missedIndex].firstElementChild.setAttribute('src','images/lostHeart.png')
        
        //increase missed by 1
        this.missed += 1;

        //if missed 5 times, game over func
        if(this.missed === 5){
            this.gameOver(false)
        }
    };

    //function: true/false, activates/updates overlay screen to win/loss
    gameOver(gameWon) {
        //Show Start Screen
        const startScreen = document.getElementById('overlay');
        startScreen.removeAttribute('style');

        if(gameWon) { //Extra Credit: if won update startscreen text
            startScreen.className = 'win';
            startScreen.children[1].textContent = `You Won!  The Phase was: ${this.activePhrase.phrase}`
            confettiDrop(50); //start confetti

        } else {  //if lost update startscreen text
            startScreen.className = 'lose';
            startScreen.children[1].textContent = `You Lost.  The Phase was: ${this.activePhrase.phrase}`
        }
        //Extra Credit: update button to Play Again
        startScreen.children[2].textContent = 'Play Again'

        //disallow keypress events
        activeGame = false;
    }

    //function: change keyboard letters based on correct/incorrect letter choice
    handleInteraction(button) {
        const buttonLetter = button.textContent  //isolate the letter itself
        if(game.activePhrase.checkLetter(buttonLetter)){   //if letter is in phrase

            this.activePhrase.showMatchedLetter(buttonLetter)  //show letter in display
            this.checkForWin();  //check to see if it's puzzle is sovled yet

            //update keyboard button to show correct choice
            button.classList.add('chosen');
            button.disabled = true;

        } else {   //letter is not in the phrase
            this.removeLife()  //remove a heart and add to missed

            //update keyboard button to show incorrect choice
            button.classList.add('wrong');
            button.disabled = true;
        }
    };

    //function: resets the game
    resetGame(){
        //clear phrase from HTML
        const insertPoint = document.getElementById('phrase')
        insertPoint.firstElementChild.innerHTML = '';

        //reset hearts
        const tries = document.getElementsByClassName('tries')
        for(let i = 0; i < tries.length; i++){
            tries[i].firstElementChild.setAttribute('src','images/liveHeart.png')
        }
        
        //reset keyboard
        const keyboardButton = document.getElementsByClassName('key')
        for(let i = 0; i < keyboardButton.length; i++){
            keyboardButton[i].disabled = false;
            keyboardButton[i].className = 'key';
        }

        //extra: reset Confetti
        confettiDrop(0)
    }

}
