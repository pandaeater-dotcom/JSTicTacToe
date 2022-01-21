let gameOver = false;
let whoseTurn = 'X';

function initBoard() {
    const squareList = [];

    grid = document.querySelector('.grid');
    for (i = 0; i < 9; i++) {
        square = document.createElement('div');
        square.setAttribute('id', `s${i}`);
        grid.append(square);
        squareList.push(square);
    }
    return squareList;
}

function runGame(squareList) {
    grid = document.querySelector('.grid');
    for (let square of squareList) {
        square.addEventListener('mousedown', e => {
            if (!gameOver) clicked(square, squareList);
        })
    }
}

function clicked(square, squareList) {
    if (square.classList.contains('checked')) return;
    square.classList.add('checked');
    checkGameWon(whoseTurn, square, squareList);
    square.setAttribute('data', whoseTurn);
    square.innerHTML = `<span>${whoseTurn}</span>`;
    if (checkGameWon(whoseTurn, square, squareList)) {
        gameOver = true;
        document.querySelector('#menuTitle').innerText = 'Game Over!';
        document.querySelector('#outcome').innerText = `Player ${whoseTurn} won!`; 
        togglePopup();
        return;
    }
    if (whoseTurn === 'X') whoseTurn = '〇';
    else whoseTurn = 'X';
}

function checkGameWon(whoseTurn, square, squareList) {
    const index = parseInt(square.getAttribute('id').slice(1));
    const leftEdge = index % 3 === 0;
    const rightEdge = index % 3 === 1;

    for (let i = 0; i < 9; i+=3) {
        if (squareList[i].getAttribute('data') === whoseTurn && 
        squareList[i+1].getAttribute('data') === whoseTurn && 
        squareList[i+2].getAttribute('data') === whoseTurn) return true;
    }

    for (let i = 0; i < 3; i++) {
        if (squareList[i].getAttribute('data') === whoseTurn && 
        squareList[i+3].getAttribute('data') === whoseTurn && 
        squareList[i+6].getAttribute('data') === whoseTurn) return true;
    }

    if (squareList[0].getAttribute('data') === whoseTurn &&
    squareList[4].getAttribute('data') === whoseTurn &&
    squareList[8].getAttribute('data') === whoseTurn) return true;

    if (squareList[2].getAttribute('data') === whoseTurn &&
    squareList[4].getAttribute('data') === whoseTurn &&
    squareList[6].getAttribute('data') === whoseTurn) return true;

    return false;
}


function togglePopup() {
    document.querySelector('.popup').classList.toggle('active');
}

runGame(initBoard());