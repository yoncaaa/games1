const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div') //find all divs under the grid class element

const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

let currentIndex = 76 //starting block index

let timerId //set to null
let currentTime = 20

let outcomeTimerId

function moveFrog(e){
    squares[currentIndex].classList.remove('frog') //remove frog class from current square bc its gonna change
    switch(e.key){
        case 'ArrowLeft' :
            if(currentIndex%9 >0){
                currentIndex -= 1
            }
            break
        case 'ArrowRight' :
            if(currentIndex%9 <8){
                currentIndex += 1
            }
            break
        case 'ArrowUp' :
            if(currentIndex >8){
                currentIndex -= 9
            }
            break
        case 'ArrowDown' :
            if(currentIndex < 72){
                currentIndex += 9
            }
            break
    }
    
    squares[currentIndex].classList.add('frog')
}

document.addEventListener('keyup', moveFrog)

function autoMoveElements(){
    if(currentTime>0){
        currentTime--
        timeLeftDisplay.textContent = currentTime
    }
    logsLeft.forEach(element => moveLogLeft(element))
    logsRight.forEach(element => moveLogRight(element))
    carsLeft.forEach(element => moveCarLeft(element))
    carsRight.forEach(element => moveCarRight(element))
    
}//pass each logLeft through the move log left function

function checkOutcomes(){
    lose()
    win()
}

function moveLogLeft(logLeft){
    switch(true){
        case logLeft.classList.contains('l1'): 
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2'): 
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
        case logLeft.classList.contains('l3'): 
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4'): 
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5'): 
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }//move the l2 to the left, an l1 is now l2
}

function moveLogRight(logRight){
    switch(true){
        case logRight.classList.contains('l1'): 
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2'): 
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
        case logRight.classList.contains('l3'): 
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l4'): 
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5'): 
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }
}

function moveCarLeft(carLeft){
    switch(true){
        case carLeft.classList.contains('c1'): 
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'): 
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'): 
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }//move the l2 to the left, an l1 is now l2
}

function moveCarRight(carRight){
    switch(true){
        case carRight.classList.contains('c1'): 
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c2'): 
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3'): 
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
    }
}

function lose(){
    if(  //c1 is black, so its a car
        squares[currentIndex].classList.contains('c1') || 
        squares[currentIndex].classList.contains('l4') || 
        squares[currentIndex].classList.contains('l5') ||
        currentTime <=0
        ){ 
            resultDisplay.textContent = 'You lose!'
            clearInterval(timerId)//stop the moving cars and logs
            clearInterval(outcomeTimerId)//stop checking for win or lose
            squares[currentIndex].classList.remove('frog')
            document.removeEventListener('keyup', moveFrog)
        }
}

function win(){
    if(squares[currentIndex].classList.contains('ending-block')){
        resultDisplay.textContent = 'You Win!'
        clearInterval(timerId)//stop the moving cars and logs
        clearInterval(outcomeTimerId) //stop checking win or lose
        document.removeEventListener('keyup', moveFrog)
    }
}

startPauseButton.addEventListener('click',() => {
    if(timerId){//if we already playing, if interval is going on
        clearInterval(timerId) //pause
        clearInterval(outcomeTimerId)//stop checking if won or lost
        outcomeTimerId = null
        timerId = null
        document.removeEventListener('keyup', moveFrog)
    }
    else{
        timerId = setInterval(autoMoveElements, 1000)
        outcomeTimerId = setInterval(checkOutcomes, 50)
        document.addEventListener('keyup', moveFrog)//make it movable again
    }
}) 
















