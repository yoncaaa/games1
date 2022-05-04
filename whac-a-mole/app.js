const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score')
const button = document.querySelector('.button')
const buttonText = document.querySelector('#buttonText')
const alertText = document.querySelector('.alertText')


let result = 0
let hitPosition
let currentTime = 10
let timerId
let countDownTimerId
let abc = 0

function randomSquare(){//picks a random square and classes it as mole
    squares.forEach(square =>{
        square.classList.remove('mole')/// classList gets a list with the classes of this
    } )

    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')

    hitPosition = randomSquare.id //id of mole square
}

squares.forEach(square =>{
    square.addEventListener('mousedown' , () => {
        if (square.id == hitPosition){
            result++
            score.textContent = result
            hitPosition = null
        }
    })
})

function moveMole(){
    timerId = setInterval(randomSquare, 1000)   // do this function randomSquare every 500 ms
}// we saved the function in a variable so that it can be stopped by changing value of that variable!!!



function countDown(){
    currentTime--
    timeLeft.textContent = currentTime

    if (currentTime == 0){ //end game
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alertText.textContent = 'Game Over! Your final score is ' + result
        
        buttonText.textContent = 'Play Again'
        button.setAttribute('onclick', 'restartGame()')
        button.disabled = false
    }
}

function startGame(){
    button.disabled = true
    alertText.textContent = ''
    moveMole() 
    countDownTimerId = setInterval(countDown, 1000)
}
 
function restartGame(){
    button.disabled = true
    alertText.textContent = ''
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    currentTime = 10
    result = 0
    score.textContent = 0
    timeLeft.textContent = 10
    moveMole() 
    countDownTimerId = setInterval(countDown, 1000)
}
