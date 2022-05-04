//create array with objects of name and image
const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
];

//randomly sorts array
cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector('#grid');
let cardsChosen = []; //let bc we want to empty and refill it
let cardsChosenIds = [];
const cardsWon = [];
const scoreSpan = document.getElementById('result');

createBoard();
console.log(cardArray);
document.getElementById('result').innerHTML = cardsWon.length;



//function creates 10 image tags with a number next to it from 0 to 9
function createBoard(){
    for(let i=0; i<cardArray.length; i++){
        const card = document.createElement('img');
        //link the image inside tag attribute
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard)//call flipCard function if card is clicked
        //add the img tags into div with grid id (appendChild works too)
        gridDisplay.append(card);
    }
}


function checkMatch(){
    //all images as tag elements html
    const cards = document.querySelectorAll('#grid img'); 
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];

    //clicking the same pic twice
    if (optionOneId == optionTwoId){
        alert('you clicked the same image');
        //cover the image again
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        
    }

    else if (cardsChosen[0] == cardsChosen[1]){
        console.log('its a match!');

        //remove the correct images by making them white
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        //remove eventlistener from found cards - deacivate flipcard
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosenIds[0]);//push the id of won card into new array
    }   
    //else cover the cards of chosencards array back to blank
    else {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
    }
    //clear the array cardsChosen
    cardsChosen =[];
    cardsChosenIds =[];
    scoreSpan.innerHTML = cardsWon.length;
    

    if(cardsWon.length === 6){
        win();
    }

}


function flipCard(){
    if(cardsChosen.length<2){
    const cardId = this.getAttribute('data-id'); //save the attribute value of currently clicked card (this)
    cardsChosen.push(cardArray[cardId].name); //push clicked card's NAME ONLY into new array e.g fries, ice-cream
    cardsChosenIds.push(cardId); //contains ids of the 2 chosen images e.g. 2, 10


    this.setAttribute('src', cardArray[cardId].img); //change image link from blank to new link from array

    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500); //call function checkMatch after 500 ms
    }}
}

function win(){
    scoreSpan.innerHTML = 'YOU WON!!!!';
    const h2 = document.getElementById('h2ForButton');

    againButton = document.createElement('button');
    againButton.setAttribute('id', 'againButton');
    
    h2.append(againButton);
    buttonText = document.createElement('p');
    againButton.append(buttonText);
    buttonText.innerHTML = 'Play Again';
    againButton.addEventListener('click', refresh);

}

function refresh(){
    document.location.reload();
}
