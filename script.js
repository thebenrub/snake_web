const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let appleIndex = 0;
let timerId = 20;
let intervalTime = 200;
const bgm=new Audio('assets/b.mp3');
const eat_apple=new Audio('assets/eat.mp3');
const game_over=new Audio('assets/go.mp3');
function backGMusic() {
    bgm.play();
    bgm.loop();
}
function eating() {
    eat_apple.currentTime = 0;
    eat_apple.play();
}
function dead() {
    bgm.pause();
    bgm.currentTime = 0;
    game_over.play();
}


function createBoard() {
    for (let i = 0; i < 400; i++) {
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);
    }
}
createBoard();

function startGame() {
    backGMusic();
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    score = 0; direction = 1; intervalTime = 200;
    scoreDisplay.textContent = score;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    timerId = setInterval(move, intervalTime);
    generateApple();
}


function move() {
    const hitBottom = (currentSnake[0] + 20 >= 400 && direction === 20);
    const hitTop = (currentSnake[0] - 20 < 0 && direction === -20);
    const hitRight = (currentSnake[0] % 20 === 19 && direction === 1);
    const hitLeft = (currentSnake[0] % 20 === 0 && direction == -1);
    const hitSelf = squares[currentSnake[0] + direction]?.classList.contains('snake');

    if (hitRight || hitBottom || hitTop || hitLeft || hitSelf) {
        return endGame();
    }
    
    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    const newHead = currentSnake[0] + direction;
    squares[newHead].classList.add('snake'); 
         currentSnake.unshift(newHead);
  

    if (squares[newHead].classList.contains('apple')) {
        eating();
        squares[newHead].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        score++; scoreDisplay.textContent = score;
        generateApple();
    }
   
}
function endGame(){
    dead();
    return clearInterval(timerId);
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}


function changeDir(newDir) {

    if (direction + newDir) {
        direction = newDir
    }
}


document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, false)




function handleSwipe() {
    const dx = touchEndX - touchEndX;
    const dy = touchEndY - touchEndY;


    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDx) > 30) {
        if (absDx > absDy) {


            if (dx > 0) changeDir(-1);
            else changeDir(1);
        } else {
            
            if (dy > 0) changeDir(20);
            else changeDir(-20);
        }
    }
}
    

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') changeDir(-20);
    if (e.key === 'ArrowDown') changeDir(20);
    if (e.key === 'ArrowLeft') changeDir(1);
    if (e.key === 'ArrowRight') changeDir(-1);
})

