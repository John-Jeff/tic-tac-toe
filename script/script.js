const gameBoard = document.getElementById('game-board');
const currentPlayerLabel = document.getElementById('current-player');

// Player information
const player1 = { name: 'Alan', role: 'p1', marble: './resource/tp_pbb.png' };
const player2 = { name: 'Bob', role: 'p2', marble: './resource/tp_rwb.png' };

let currentPlayer = player1;
let winner = '';

let boardArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

currentPlayerLabel.innerText = currentPlayer.name + "'s turn!"

document.addEventListener('DOMContentLoaded', (e) => {

    (function attachListeners() {
        gameBoard.addEventListener('click', (e) => {
            if (!winner) {
                sectionSelection(e);
                checkForWinner(boardArray);
            }
        })
    })();

    document.getElementById('reset-button').addEventListener('click', (e) => {
        resetBoard();
    });

});

/**
 * 
 * @param {object} event the event triggered 
 */
function sectionSelection(event) {
    const clickedSection = event.target;

    if (clickedSection.classList.contains('board-sec')) {

        if (event.target.children.length == 0) {
            // Add current player to boardArray
            addToBoardArray(currentPlayer.role, event.target.dataset.num);
            // Add a player marble to the board
            event.target.appendChild(addPlayerMarble(currentPlayer));
            // Switch turns between players
            (currentPlayer.role == player1.role) ? currentPlayer = player2 : currentPlayer = player1;
            // Change current player label
            currentPlayerLabel.innerText = currentPlayer.name + "'s turn!";
        }
    }
}

/**
 * 
 * @param {string} playerRole the role of the player ex: p1
 * @param {number} num the number of section that was selected, 1-9 
 */
function addToBoardArray(playerRole, num) {
    if (num >= 7 && num <= 9) {
        boardArray[2][num - 7] = playerRole;
    }
    else if (num >= 4 && num <= 6) {
        boardArray[1][num - 4] = playerRole;
    }
    else if (num >= 1 && num <= 3) {
        boardArray[0][num - 1] = playerRole;
    }
}

/**
 * 
 * @param {object} currentPlayer an object containing a players information 
 * @returns {object} a new DOM img element
 */
function addPlayerMarble(currentPlayer) {
    const marbleImg = document.createElement('img');
    marbleImg.classList.add('marble');
    marbleImg.src = currentPlayer.marble;
    return marbleImg;
}

/**
 * Resets the current playing board in order to start a new game
 */
function resetBoard() {
    document.querySelectorAll('.board-sec').forEach((sec) => {
        if (sec.children.length > 0) {
            sec.removeChild(sec.children[0]);
        }
    })
    boardArray = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    winner = '';
    currentPlayerLabel.classList.remove('winner');
    currentPlayerLabel.innerText = currentPlayer.name + "'s turn!"
}

function checkRows(boardArray) {
    boardArray.forEach((row) => {
        if ((row[0] == row[1]) && (row[1] == row[2]) && (row[0] == row[2])) {
            winner = row[0];
        }
    });
}

function checkColumns(boardArray) {
    let columns = [];
    let columnIndex = 0;

    while (columnIndex < 3) {

        columns = [boardArray[0][columnIndex], boardArray[1][columnIndex], boardArray[2][columnIndex]];
        if ((columns[0] == columns[1]) && (columns[1] == columns[2]) && (columns[0] == columns[2])) {
            winner = columns[0];
        }
        columnIndex++;

    }
}

function checkDiagonals(boardArray) {
    if ((boardArray[0][0]) == (boardArray[1][1]) &&
        (boardArray[1][1]) == (boardArray[2][2]) &&
        (boardArray[0][0]) == (boardArray[2][2])) {
        winner = boardArray[0][0];
    }
    else if ((boardArray[0][2]) == (boardArray[1][1]) &&
        (boardArray[1][1]) == (boardArray[2][0]) &&
        (boardArray[0][2]) == (boardArray[2][0])) {
        winner = boardArray[0][2];
    }
}

function checkForWinner(boardArray) {
    // Check winner by rows
    checkRows(boardArray);

    // Check winner by columns
    checkColumns(boardArray);

    // Check winner by diagonals
    checkDiagonals(boardArray);

    displayWinner(winner);
}

function displayWinner(winner) {
    if (winner) {
        currentPlayerLabel.classList.add('winner');
        if (winner == 'p1') {
            currentPlayerLabel.innerText = player1.name + ' wins!';
        }
        else if (winner == 'p2') {
            currentPlayerLabel.innerText = player2.name + ' wins!';
        }
    }
}
