const { printBoard, putPiece, checkBoard } = require("./board");
const prompt = require("prompt-sync")({ sigint: true });

const gameLoop = () => {
  // create an empty board
  let board = [
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
  ];

  // start game
  console.log("Game started");
  printBoard(board);

  // ask the players for the piece that goes first
  const redOrYellow = ["R", "Y"];
  let piece = prompt("Enter first move (R / Y): ").toUpperCase();

  // check if piece is valid (only 'R' or 'Y' allowed)
  while (!redOrYellow.includes(piece)) {
    piece = prompt(
      `Invalid move. Try again. Enter next move (R / Y)?`
    ).toUpperCase();
  }

  // if starting piece is validated, begin the game loop
  while (true) {
    // ask the current player for his move
    let position = prompt(`Next move is ${piece}. In which column does it go?`);

    // check if the move is possible
    let isPiecePut = putPiece(board, piece, position);

    // if move impossible, ask for a valid move
    while (
      position > board[0].length - 1 ||
      isNaN(position) ||
      position < 0 ||
      !isPiecePut
    ) {
      position = prompt(`Invalid move. Try again. In which column does it go?`);
      isPiecePut = putPiece(board, piece, position);
    }

    // check the turn outcome
    piece = checkTurnOutcome(outcome, board, piece);
    if (piece === undefined) {
      // if the piece is not switched, an endgame condition was satisfied upon calling checkTurnOutcome(), so we return
      return;
    } // else, the game is still Pending, so the game loop continues
  }
};

gameLoop();

//function to check if game continues or ends
function checkTurnOutcome(outcome, board, piece) {
  switch (outcome) {
    case "Y":
      printBoard(board);
      console.log("Y won the game!");
      return;
    case "R":
      printBoard(board);
      console.log("R won the game!");
      return;
    case "Draw":
      printBoard(board);
      console.log("Nobody won today.");
      return;
    case "Pending": // if no end game condition is satisfied, print the current board and switch turns
      printBoard(board);
      piece = piece === "R" ? "Y" : "R";
      return piece;
  }
}
