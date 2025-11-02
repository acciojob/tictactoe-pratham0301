//your JS code here. If required.
let currentPlayer = "X";
let board = Array(9).fill("");
let player1 = "";
let player2 = "";
let gameActive = true;

document.getElementById("submit").addEventListener("click", () => {
  player1 = document.getElementById("player-1").value || "Player 1";
  player2 = document.getElementById("player-2").value || "Player 2";

  document.getElementById("player-form").style.display = "none";
  document.getElementById("game").style.display = "block";

  updateMessage();
});

function updateMessage(text = null) {
  const messageBox = document.querySelector(".message");
  if (text) {
    messageBox.textContent = text;
  } else {
    const name = currentPlayer === "X" ? player1 : player2;
    messageBox.textContent = `${name}, you're up`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],  // rows
    [0,3,6],[1,4,7],[2,5,8],  // columns
    [0,4,8],[2,4,6]           // diagonals
  ];

  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      const winnerName = board[a] === "X" ? player1 : player2;
      updateMessage(`${winnerName}, congratulations you won!`);
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    updateMessage("It's a draw!");
    gameActive = false;
  }
}

document.querySelectorAll(".cell").forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();

    if (gameActive) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateMessage();
    }
  });
});