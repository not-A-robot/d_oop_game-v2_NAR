/* Treehouse FSJS Techdegree, Project 4 - OOP Game App, Phrase.js */
/* By NotArobot */


//Phrase Class:  Manages the phrase itself
class Phrase {
    constructor(phrase){
        this.phrase = phrase; //random phrase
    };

    //function: Get the phrase, split it up by letter, generate HTML, insert it into html
    addPhraseToDisplay(){

        const insertPoint = document.getElementById('phrase')
        
        //loop through each letter & generate the code
        for(let i = 0; i < this.phrase.length; i++){
            let letterItem;  //final html to be added
            const letter = this.phrase[i]
            const isValidLetter = /[a-z1-9]/i.test(letter);  //regex: is it a letter/number

            //is letter a valid letter, number or a space
            if(isValidLetter){
                letterItem = `<li class="hide letter ${letter}">${letter}</li>`
            } else if (letter === ' '){
                letterItem = `<li class="space"> </li>`;
            }
            
            //after building insert into the html
            insertPoint.firstElementChild.insertAdjacentHTML('beforeend',letterItem)
        }
    };

    //function: checks if a letter is included in the phrase
    checkLetter(letter){
        return game.activePhrase.phrase.includes(letter);
    }

    //function: reveals the letter if the pick is correct
    showMatchedLetter(letter){
        const letters = document.getElementsByClassName('letter');
        for(let i = 0; i < letters.length; i++){
            if(letters[i].textContent === letter){
                letters[i].classList.remove('hide');
                letters[i].classList.add('show') 
            }
        }
    }
};
