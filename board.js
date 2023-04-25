// function to print the board
const printBoard = (boardArr) => {

    // create a variable to hold the board line's indexes
    let indexesLine = "";

    // get the length of the board's row line
    const lenghtOfLine = boardArr[0].length;

    // populate the indexesLine, while adding a space between indexes
    for(let i = 0; i < lenghtOfLine; i++){
        indexesLine += i + " ";
    }

    // print the indexes
    console.log(indexesLine.trim());

    // print the board rows, with spaces between each row element
    for(const row of boardArr){
        let rowLine = "";
        for(const elem of row){
            rowLine += elem + " ";
        }
        console.log(rowLine)
    }
}

const putPiece = (board, piece, colNum) => {
    // check if colNum is a valid column number, return false otherwise
    // if(colNum > board[0].length-1 ){
    //     return false;
    // }

    // try to insert the piece at the bottom of the indicated column; if that cell is occupied, try to insert it a level higher
    for(let i = board.length-1; i >= 0; i--){
        if(board[i][colNum] === "-"){
            // console.log(board[i][colNum])
            board[i][colNum] = piece.toUpperCase();
            // console.log(board[i][colNum])
            return true;
        }
    }

    return false;
    // printBoard(board);
}

const checkBoard = (board) => {
    let connectFour = 1;
    // let connectFourX = 0;
    let isStillPending = false

    // check lines for 4 connected pieces
    for(let i = 0; i < board.length; i++){
        for(let j = 1; j < board[i].length; j++){
            if(board[i][j] === "-"){
                isStillPending = true;
                // continue;
            }

            if(board[i][j] != "-"){
                if(board[i][j-1] === board[i][j]){
                    connectFour++
                } else {
                    connectFour = 1;
                }
            }
            
            if(connectFour === 4){
                return board[i][j] 
            }
        }
    }

    // check columns for 4 connected pieces
    connectFour = 1;
    for(let i = 0; i < board[0].length; i++){
        for(let j = 1; j < board.length; j++){

            if(board[j][i] != "-"){
                if(board[j-1][i] === board[j][i]){
                    connectFour++
                } else {
                    connectFour = 1;
                }
                console.log(connectFour);
            }
            
            if(connectFour === 4){
                return board[j][i];
            }
        }
    }

    // if there are still empty places left 
    if(isStillPending){
        return "Pending"
    } 

    // if all places are full, and no one won
    return "Draw"
}

module.exports = {printBoard, putPiece, checkBoard}