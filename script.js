//your JS code here. If required.


let player1 = '';
let player2 = '';
let currentPlayer = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Event listener for the submit button
document.getElementById('submit').addEventListener('click', function() {
    startGame();
});


function updateMessage(text)
{
	document.querySelector('.message').textContent = text;
}

function startGame()
{
	player1 = document.getElementById('player-1').value || 'Player1';
	player2 = document.getElementById('player-2').value || 'Player2';

	// Set the current player to player1 and reset the board
    currentPlayer = player1;
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
	document.querySelector('.board').style.display = 'grid';
    updateMessage(`${currentPlayer}, you're up!`);
	document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

// Add event listeners to all the cells for click handling
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Function to handle cell clicks
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.id) - 1;

    if (board[cellIndex] === '' && gameActive) {
        // Mark the cell and update the board
        board[cellIndex] = currentPlayer === player1 ? 'X' : 'O';
        cell.textContent = board[cellIndex];

        // Check if there is a winner
        const winner = checkWinner();
        if (winner) {
            updateMessage(`${currentPlayer}, congratulations you won!`);
            gameActive = false;
            return;
        }

        // Check if the board is full (draw)
        if (!board.includes('')) {
            updateMessage("It's a draw!");
            gameActive = false;
            return;
        }

        // Switch turns
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        updateMessage(`${currentPlayer}, you're up!`);
    }
}

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

// Winning combinations for Tic Tac Toe
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];