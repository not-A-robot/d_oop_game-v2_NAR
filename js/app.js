/* Treehouse FSJS Techdegree, Project 4 - OOP Game App, app.js */
/* By NotArobot */

//--Declare/Select--//

//Declare: Game class object
let game 

//Select: HTML location of Phrase letters
const insertPoint = document.getElementById('phrase')

//Select: HTML Start Button
const overlayButton = document.getElementById('btn__reset');

//Select: html Keyboard Buttons
const keyboardButton = document.getElementsByClassName('key')


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
    // console.log(game.activePhrase.phrase) // Cheat: Shows phrase in console
})

//Listener: Add listener to each keyboard button. Triggers handleInteraction func
for (let i = 0; i < keyboardButton.length; i++){
    keyboardButton[i].addEventListener('click', (e) => {
    game.handleInteraction(e.target)
    });
}

