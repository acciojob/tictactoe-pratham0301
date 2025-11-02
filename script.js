let submitBn = document.getElementById("submit");
let maincontainer = document.querySelector(".container");
let gameContainer = document.getElementById("game-container");
let initial = document.getElementById("initial-container");
submitBn.addEventListener("click", () => {

    let player1 = document.getElementById("player1").value;
    let player2 = document.getElementById("player2").value;
    console.log(player1, player2);

    if (player1.trim() !== "" && player2.trim() !== "") {
        alert("Form submitted successfully!");

        document.getElementById("input-container").style.display = "none";
        game(player1, player2);
    } else {
        alert("Please fill in all fields.");
    }
})


let board = ["", "", "", "", "", "", "", "", ""];



function game(player1, player2) {
    let salut = document.createElement("h2");
	salut.classList.add("message");
    salut.textContent = `${player1}, you're up`;
	
    initial.appendChild(salut);
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("box");
        cell.setAttribute("id", i);
        cell.style.cssText = `
        display: grid;
        place-items: center;
        width: 100px;
        height: 100px;
        font-size: 2rem;
        cursor: pointer;
        background-color: rgb(255, 161, 161);
        border: 1px solid black;
        text-align: center;
        margin: none;
        padding: 0;
    `;
        gameContainer.appendChild(cell);
        gameContainer.style.display = "grid";
        gameContainer.style.gridTemplateColumns = "repeat(3, 100px)";



    }
    let player1turn = true;
    let player2turn = false;

    document.querySelectorAll(".box").forEach((box) => {
        box.addEventListener("click", () => {

            if (box.innerHTML === "x" || box.innerHTML === "o") {
                alert("This box is already filled!");
            }
            if (player1turn) {
                box.innerHTML = "x";
                board[box.id] = "x";
               
                let result = checkWin(board);
                if (result === "x") {
                    salut.innerHTML = `${player1} congratulations you won!`
                    document.querySelectorAll(".box").forEach((box) => {
                        box.style.pointerEvents = "none";
                    });
					return;
                } else if (result === "o") {
                   salut.innerHTML = `${player2} congratulations you won!`
                   document.querySelectorAll(".box").forEach((box) => {
                    box.style.pointerEvents = "none";
                });
					return;
                } else if (result === "draw") {
                    salut.innerHTML = `It's a draw`
                    document.querySelectorAll(".box").forEach((box) => {
                        box.style.pointerEvents = "none";
                    });
					return;
                } else {
                    // No winner yet, game continues

                }
                
                box.style.pointerEvents = "none";
                player1turn = false;
                player2turn = true;
                salut.textContent = `${player2}, you're up`;
               
            }
            else if (player2turn) {
                box.innerHTML = "o";
                board[box.id] = "o";
               
                let result = checkWin(board);
                if (result === "x") {
                   salut.innerHTML = `${player1} congratulations you won!`
                    document.querySelectorAll(".box").forEach((box) => {
                        box.style.pointerEvents = "none";
                    });
					return;
                } else if (result === "o") {
                    salut.innerHTML = `${player2} congratulations you won!`
                   document.querySelectorAll(".box").forEach((box) => {
                    box.style.pointerEvents = "none";
                });
					return;
                } else if (result === "draw") {
                    salut.innerHTML = `It's a draw`
                    document.querySelectorAll(".box").forEach((box) => {
                        box.style.pointerEvents = "none";
                    });
					return;
                } else {
                    // No winner yet, game continues

                }
                
                box.style.pointerEvents = "none";
                player2turn = false;
                player1turn = true;
                salut.textContent = `${player1}, you're up`;
                
            }
        });
    });

};


function checkWin(board) {
   
    const winCombos = [
        [0,1,2], [3,4,5], [6,7,8],   // rows
        [0,3,6], [1,4,7], [2,5,8],   // columns
        [0,4,8], [2,4,6]             // diagonals
    ];

   
    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
            return board[a]; 
        }
    }

    // Check for draw: if no empty cells
    if (!board.includes("")) {
        return "draw";
    }

  
    return null;
}
