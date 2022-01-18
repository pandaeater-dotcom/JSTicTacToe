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
    for (let i = 1; i <= 4; i++) if (!(leftEdge && i % 3 === 0) || !(rightEdge && i === 1)) {
        if (squareList[index-i] && squareList[index-i].getAttribute('data') === whoseTurn && 
            squareList[index+i] && squareList[index+i].getAttribute('data') === whoseTurn) return true;
        else if (squareList[index-i] && squareList[index-i].getAttribute('data') === whoseTurn) {
            if (squareList[index-2*i] && squareList[index-2*i].getAttribute('data') === whoseTurn) return true;
        }
        else if (squareList[index+i] && squareList[index+i].getAttribute('data') === whoseTurn) {
            if (squareList[index+2*i] && squareList[index+2*i].getAttribute('data') === whoseTurn) return true;
        }
    }
    return false;
}

function togglePopup() {
    document.querySelector('.popup').classList.toggle('active');
}

runGame(initBoard());