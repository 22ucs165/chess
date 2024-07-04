document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('chessboard');
    const board = initializeBoard();
    renderBoard(board, boardElement);

    let selectedPiece = null;
    let selectedSquare = null;

    boardElement.addEventListener('click', (event) => {
        const square = event.target;
        const position = square.dataset.position;

        if (selectedPiece) {
            movePiece(board, selectedSquare, position);
            selectedPiece = null;
            selectedSquare = null;
            renderBoard(board, boardElement);
        } else if (square.innerText) {
            selectedPiece = square.innerText;
            selectedSquare = position;
        }
    });
});

function initializeBoard() {
    return [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];
}

function renderBoard(board, boardElement) {
    boardElement.innerHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = 'square ' + ((row + col) % 2 === 0 ? 'light' : 'dark');
            square.dataset.position = `${row}-${col}`;
            square.innerText = board[row][col];
            boardElement.appendChild(square);
        }
    }
}

function movePiece(board, from, to) {
    const [fromRow, fromCol] = from.split('-').map(Number);
    const [toRow, toCol] = to.split('-').map(Number);

    board[toRow][toCol] = board[fromRow][fromCol];
    board[fromRow][fromCol] = '';
}
