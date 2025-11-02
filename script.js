const submitBtn = document.getElementById('submit');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const playerForm = document.getElementById('player-form');
const gameDiv = document.getElementById('game');
const messageDiv = gameDiv.querySelector('.message');
const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));

let player1 = '';
let player2 = '';
let currentPlayer = ''; // current player's name
let currentSymbol = ''; // 'X' or 'O'
let boardState = Array(9).fill(null);
let gameActive = false;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function startGame() {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (!player1 || !player2) {
    alert('Please enter names for both players!');
    return;
  }

  currentPlayer = player1;
  currentSymbol = 'X';
  boardState = Array(9).fill(null);
  gameActive = true;

  // Hide form, show game
  playerForm.style.display = 'none';
  gameDiv.style.display = 'block';

  // Clear board cells
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('disabled');
  });

  setMessage(`${currentPlayer}, you're up`);
}

function setMessage(msg) {
  messageDiv.textContent = msg;
}

function handleCellClick(e) {
  if (!gameActive) return;

  const cell = e.target;
  const cellIndex = parseInt(cell.id) - 1;

  if (boardState[cellIndex] !== null) {
    // Cell already taken
    return;
  }

  boardState[cellIndex] = currentSymbol;
  cell.textContent = currentSymbol;
  cell.classList.add('disabled');

  if (checkWin()) {
    setMessage(`${currentPlayer} congratulations you won!`);
    gameActive = false;
    return;
  }

  if (boardState.every(cell => cell !== null)) {
    setMessage(`It's a draw!`);
    gameActive = false;
    return;
  }

  // Switch turns
  if (currentPlayer === player1) {
    currentPlayer = player2;
    currentSymbol = 'O';
  } else {
    currentPlayer = player1;
    currentSymbol = 'X';
  }

  setMessage(`${currentPlayer}, you're up`);
}

function checkWin() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return boardState[a] &&
           boardState[a] === boardState[b] &&
           boardState[a] === boardState[c];
  });
}

submitBtn.addEventListener('click', startGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));