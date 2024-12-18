/* Treehouse FSJS Techdegree, Project 4 - OOP Game App, app.js */
/* By NotArobot */

//--Declare/Select--//

//Declare: Game class object
let game 

//to disable keypress if overlay is up
let activeGame = false; 

//Select: HTML location of Phrase letters
const insertPoint = document.getElementById('phrase')

//Select: HTML Start Button
const overlayButton = document.getElementById('btn__reset');

//Select: html Keyboard Buttons
const keyboardButton = document.getElementsByClassName('key')

const overlay = document.getElementById('overlay')

//--Listeners--//

//Listener: Start Button Click
overlayButton.addEventListener('click', (e) => {

    //If game has already been played, reset everything
    if(overlayButton.textContent === 'Play Again'){
        game.resetGame()
    }

    //Create new Game Class Object to start the game
    game = new Game();  
    game.startGame() //run game func to hide overlay and setup phrase
    console.log(game.activePhrase.phrase) // Cheat: Shows phrase in console
    stopTextAnimation()
})

//Listener: Add listener to each keyboard button. Triggers handleInteraction func
for (let i = 0; i < keyboardButton.length; i++){
    keyboardButton[i].addEventListener('click', (e) => {
    game.handleInteraction(e.target)
    });
}


//Extra Credit: function: keyboard press
document.addEventListener('keydown', (e) => {
    if(activeGame == true){  //disables when overlay is on

        //on keypress, look for the letter & coresponding keyboard button html
        for (let i = 0; i < keyboardButton.length; i++){
            if(keyboardButton[i].textContent == e.key){
                game.handleInteraction(keyboardButton[i]);
            }
        }
    }
});

//Extra Credit: Animate Header Text for fun
    const titleLetter = document.getElementsByClassName('titletext')
    let intervalId = setInterval(animateLetter, 1000);   //start interval

    // Function: stop the interval
    function stopTextAnimation() {
        clearInterval(intervalId);
        for (let i = 0; i < titleLetter.length; i++) {
            titleLetter[i].classList.remove('animateletter');
        }
    }

    // Function: animate a letter
    function animateLetter() {
        // Remove 'animateletter' from previous letters
        for (let i = 0; i < titleLetter.length; i++) {
            titleLetter[i].classList.remove('animateletter');
        }
        // Add class to a random letter
        const randomTitleLetter = Math.floor(Math.random() * titleLetter.length);
        titleLetter[randomTitleLetter].classList.add('animateletter');
    }



