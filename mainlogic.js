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
    square.innerHTML = `<span>${whoseTurn}</span>`;
    if (whoseTurn === 'X') whoseTurn = '〇';
    else whoseTurn = 'X';
}

runGame(initBoard());