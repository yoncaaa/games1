const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
let userChoice;


//for each loop for array of possibleChoices buttons, 
//possibleChoice is the element that is currently picked 
//and for each element we add eventListener that
//if the element gets clicked, then "(e) =>" function

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) =>{
    //store the id of clicked element
    userChoice = e.target.id; 
    //print the chosen elements id next to h2 User Choice
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice();
    getResult();
}))

function generateComputerChoice(){
    //get a random number up to 3
    const randomNumber = Math.floor(Math.random() * 3) + 1; //or you can use possibleChoices.length (which is 3 for us, bc array of buttons has 3)
    
    if (randomNumber === 1){
        computerChoice = 'rock';
    }
    if (randomNumber === 2){
        computerChoice = 'scissors';
    }
    if (randomNumber === 3){
        computerChoice = 'paper';
    }
    computerChoiceDisplay.innerHTML = computerChoice;

}

function getResult(){
    if (computerChoice === userChoice){
        result = 'DRAW!';
    }
    else if (computerChoice === 'scissors' && userChoice === 'paper' || computerChoice === 'paper' && userChoice === 'rock' || computerChoice === 'rock' && userChoice === 'scissors'){
        result = 'YOU LOSE!';
    }
    else {
        result = 'YOU WON!';
    }
    resultDisplay.innerHTML = result;
} 

let abcd