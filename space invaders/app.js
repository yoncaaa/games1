const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []


//create a square 225 times and add it into the grid div tag
for (let i = 0; i < 225; i++){
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))


//make an array with all the indexes that you want the invaders to be in 
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

//make the invaders purple
function draw(){
    for(let i =0; i< alienInvaders.length; i++){
        //only if the square is not removed yet through boom, then you can make it an invader
        if(!aliensRemoved.includes(i)){
            squares[alienInvaders[i]].classList.add('invader')
        }
    }
}

draw()

//remove function removes invader tag from all the invader elements, so they arent purple anymore
function remove(){
    for (let i= 0; i<alienInvaders.length; i++){
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

//declare that one square as shooter - green
squares[currentShooterIndex].classList.add('shooter')

//move shooter right or left if keydown eventlistener
function moveShooter(e){
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key){
        case 'ArrowLeft':
            //we can go left if the shooter is not in the most left row
            if (currentShooterIndex % width !== 0) currentShooterIndex -=1
            break
        case 'ArrowRight' :
            if(currentShooterIndex % width < width -1) currentShooterIndex +=1
            break 
    }
    squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)


function moveInvaders(){
    //if first element in array is on the left edge
    //(elements in this array are always changing bc moveInvaders)
    const leftEdge = alienInvaders[0] % width === 0
    //if last element in array is on the right edge
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
    remove()
    
    //if we hit right edge and goingright is still true (it will get turned false here)
    //RIGHT AND LEFT EDGE change the direction and set the invaders one row lower
    if(rightEdge && goingRight){
        for(let i= 0; i< alienInvaders.length; i++){
            //change array of invaders, each invader gets plus 15 (one row lower) and we add 1 so it doesnt go left diagonally
            alienInvaders[i] += width +1
            //change the direction to left bc we hit the right edge
            direction = -1
            //initial was going Right true, now we want to go left
            goingRight = false
        }
    }

    //if we hit left edge and its not the initial position
    if (leftEdge && !goingRight){
        for(let i = 0; i<alienInvaders.length; i++){
            alienInvaders[i] += width -1
            direction = 1
            goingRight = true
        }
    }

    //each element in invader array (indexes of purple elements) gets plus 1
    for (let i = 0; i < alienInvaders.length; i++){
        alienInvaders[i] += direction
    }

    draw()

    //end moving invaders if hit the shooter
    if(squares[currentShooterIndex].classList.contains('invader','shooter')){
        resultsDisplay.innerHTML = 'GAME OVER'
        clearInterval(invadersId)
    }

    //end moving shooters if we hit bottom
    for(let i= 0; i<alienInvaders.length; i++){
        if(alienInvaders[i] === squares.length-1){
            resultsDisplay.innerHTML = 'GAME OVER'
            clearInterval(invadersId)
        }
    }
}
invadersId = setInterval(moveInvaders, 500)

function shoot(e){
    let laserId
    let currentLaserIndex = currentShooterIndex
    
    //define moveLaser function
    function moveLaser(){
        //remove it from current laser square (initial its shooterindex)
        squares[currentLaserIndex].classList.remove('laser')
        //move the laser one row up
        currentLaserIndex -= width
        //new laser is the new current 
        squares[currentLaserIndex].classList.add('laser')

        //if we hit an invader with laser
        if(squares[currentLaserIndex].classList.contains('invader')){
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.remove('laser')
            //make the hit square red
            squares[currentLaserIndex].classList.add('boom')
            
            //after 300ms remove boom - red
            setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
            //stop moving the laser
            clearInterval(laserId)

            //go into the alienInvaders array and save the index that square we just hit in a separate array, so it wont get repainted
            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
        }
    }
    //call moveLaser function if press up
    switch(e.key){
            case 'ArrowUp':
                laserId = setInterval(moveLaser, 100)
    }
}

document.addEventListener('keydown', shoot)











