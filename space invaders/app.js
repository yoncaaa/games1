const grid = document.querySelector('.grid')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId


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
        squares[alienInvaders[i]].classList.add('invader')
    }
}

draw()

squares[currentShooterIndex].classList.add('shooter')

//move shooter right or left if keydown eventlistener
function moveShooter(e){
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key){
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0){
                currentShooterIndex -=1
            }
            break
        case 'ArrowRight' :
            if(currentShooterIndex % width < width -1){
                currentShooterIndex +=1
            }
            break
            
    }
    squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)


function moveInvaders(){
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width-1
    remove()

    if(rightEdge){
        for(let i= 0; i< alienInvaders.length; i++){
            alienInvaders[i] += width +1
            direction = -1
        }
    }

    for (let i = 0; i < alienInvaders.length; i++){
        alienInvaders[i] += direction
    }
    draw()
}


invadersId = setInterval(moveInvaders, 500)










