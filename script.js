// Elements for initial form
const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player1"); // note id player1
const player2Input = document.getElementById("player2"); // note id player2
const playerForm = document.getElementById("player-form");
const gameArea = document.getElementById("game-area");

// Game state
let players = ["", ""];
let currentPlayer = 0; // 0 => player1 (x), 1 => player2 (o)
let boardState = Array(9).fill("");
let gameOver = false;

const wins = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function createGameView() {
  gameArea.innerHTML = "";

  const message = document.createElement("div");
  message.className = "message";
  message.id = "message";
  gameArea.appendChild(message);

  const board = document.createElement("div");
  board.className = "board";
  board.id = "board";

  for (let i = 1; i <= 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = String(i);           // ids "1" .. "9" as tests expect
    cell.dataset.index = String(i - 1);
    cell.addEventListener("click", onCellClick);
    board.appendChild(cell);
  }

  gameArea.appendChild(board);

  const restart = document.createElement("button");
  restart.id = "restart";
  restart.textContent = "Restart";
  restart.addEventListener("click", resetGame);
  gameArea.appendChild(restart);

  updateMessage();
}

function updateMessage(winName) {
  const msgEl = document.getElementById("message");
  if (!msgEl) return;
  if (winName) {
    msgEl.textContent = `${winName} congratulations you won!`;
  } else if (gameOver && !winName) {
    msgEl.textContent = "It's a draw!";
  } else {
    // EXACT format tests expect: "Player1, you're up"
    const name = players[currentPlayer];
    msgEl.textContent = `${name}, you're up`;
  }
}

function onCellClick(e) {
  if (gameOver) return;
  const cell = e.currentTarget;
  const idx = Number(cell.dataset.index);

  if (boardState[idx]) return;

  // Use lowercase 'x' and 'o' to match test assertions
  const symbol = currentPlayer === 0 ? "x" : "o";
  boardState[idx] = symbol;
  cell.textContent = symbol;

  const winner = checkWinner();
  if (winner !== null) {
    gameOver = true;
    const winName = players[winner];
    updateMessage(winName);
    highlightWinningCells(winner);
    return;
  }

  if (boardState.every(c => c !== "")) {
    gameOver = true;
    updateMessage();
    return;
  }

  currentPlayer = currentPlayer === 0 ? 1 : 0;
  updateMessage();
}

function checkWinner() {
  for (const combo of wins) {
    const [a,b,c] = combo;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[b] === boardState[c]) {
      return boardState[a] === "x" ? 0 : 1;
    }
  }
  return null;
}

function highlightWinningCells(winnerIdx) {
  const symbol = winnerIdx === 0 ? "x" : "o";
  for (const combo of wins) {
    const [a,b,c] = combo;
    if (boardState[a] === symbol && boardState[b] === symbol && boardState[c] === symbol) {
      [a,b,c].forEach(i => {
        const el = document.querySelector(`.cell[data-index="${i}"]`);
        if (el) {
          el.style.background = "#ffeaa7";
          el.style.borderColor = "#f6c85f";
        }
      });
      break;
    }
  }
}

function resetGame() {
  boardState = Array(9).fill("");
  currentPlayer = 0;
  gameOver = false;
  const cells = document.querySelectorAll(".cell");
  cells.forEach(c => {
    c.textContent = "";
    c.style.background = "";
    c.style.borderColor = "";
  });
  updateMessage();
}

// Submit handler: show board after validating names
submitBtn.addEventListener("click", function () {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();

  if (!p1 || !p2) {
    alert("Please enter both player names.");
    return;
  }

  players[0] = p1;
  players[1] = p2;

  // hide form and show game area
  playerForm.style.display = "none";
  gameArea.style.display = "block";

  createGameView();
});

// Allow Enter to submit
[player1Input, player2Input].forEach(inp => {
  inp.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitBtn.click();
    }
  });
});