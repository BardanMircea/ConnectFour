const {printBoard, putPiece, checkBoard} = require('./board')

const gameLoop = () => {
    // create an empty board
    let board = [
        ["-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-"]
    ]

    // 
    const prompt = require('prompt-sync')({
        sigint: true 
    });

    // start game
    console.log("Game started");
    while(true){
        printBoard(board);

        const redOrYellow = ["R", "Y"];
        let piece = prompt("Enter next move (R / Y)");
    
        // console.log(redOrYellow.includes(piece.toUpperCase()))
        while(!redOrYellow.includes(piece.toUpperCase())){
            piece = prompt(`Invalid move. Try again. Enter next move (R / Y)?`)
        }

        let position = prompt(`Next move is ${piece.toUpperCase()}. In which column does it go?`)
        
        let isPiecePut = putPiece(board, piece, position)
        // console.log(isPiecePut)
        while(position > board[0].length-1 || isNaN(position) || position < 0 || !isPiecePut){
            position = prompt(`Invalid move. Try again. In which column does it go?`)
            isPiecePut = putPiece(board, piece, position)
        }

        outcome = checkBoard(board)
        console.log(outcome)
        switch(outcome) {
            case "Y": console.log("Y won")
                    printBoard(board)
                    return;
            case "R": console.log("R won")
                    printBoard(board)
                    return;
            case "Draw": console.log("Draw")
                    printBoard(board)
                    return;         
        }
    }
}

gameLoop();