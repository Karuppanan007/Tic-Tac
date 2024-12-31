let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');

if (!document.querySelector('script#confetti-script')) {
    const confettiScript = document.createElement('script');
    confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.min.js";
    confettiScript.id = 'confetti-script';
    document.head.appendChild(confettiScript);
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!gameOver && cell.textContent === "") {
            const index = parseInt(cell.id.split('-')[1]);
            makeMove(index);
        }
    });
});

function makeMove(index) {
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        gameOver = true;
        triggerConfetti();
    } else if (board.every(cell => cell !== "")) {
        message.textContent = "It's a draw!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];
    return winningCombos.some(combo =>
        combo.every(index => board[index] === currentPlayer)
    );
}

function resetGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    cells.forEach(cell => {
        cell.textContent = "";
    });
    message.textContent = "";
}

function triggerConfetti() {
    if (typeof confetti === "function") {
        confetti({
            particleCount: 500,
            spread: 180,
            origin: { x: 0.5, y: 0.5 }
        });
    } else {
        console.error("Confetti library failed to load.");
    }
}






