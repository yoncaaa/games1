document.addEventListener('DOMContentLoaded', () =>{
    const squares = document.querySelectorAll('.grid div')
    const result = document.querySelector('.grid div')
    const displayCurrentPlayer = document.querySelector('#current-player')
    const takenSquares = document.querySelectorAll('.taken')
    let currentPlayer = 1

    function checkBoard(){
        for(let y = 0; y < squares.length; y++){
            //check if current and next square is taken 
            let currentSquare = squares[y]
            let nextSquare = squares[y+1]
            if (currentSquare.classList.contains('taken')){
                //check if next square is taken too
                if (nextSquare.classList.contains('taken')){
                    //check if they have same color
                    if (currentSquare.classList.contains('player-one') && nextSquare.classList.contains('player-one')
                    || currentSquare.classList.contains('player-two') && nextSquare.classList.contains('player-two')){
                        console.log('2 next to each other')
                    }
                }
            }
        } 
    }



    for(let i = 0; 1<squares.length; i++){
        squares[i].onclick = () =>{
            //if square below your current square is taken you can go on top of it
            if(squares[i+7].classList.contains('taken')){
                if(currentPlayer == 1){
                    squares[i].classList.add('taken')
                    squares[i].classList.add('player-one')
                    currentPlayer = 2
                    displayCurrentPlayer.innerHTML = currentPlayer
                }
                else if (currentPlayer == 2){
                    squares[i].classList.add('taken')
                    squares[i].classList.add('player-two')
                    currentPlayer = 1
                    displayCurrentPlayer.innerHTML = currentPlayer
                }
                
            }else console.log('cant go here')

            checkBoard()
        }
    }


})