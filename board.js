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

// function to place the piece inside the board
const putPiece = (board, piece, colNum) => {

    // try to insert the piece at the bottom of the indicated column; if that cell is occupied, try to insert it a level higher
    for(let i = board.length-1; i >= 0; i--){
        if(board[i][colNum] === "-"){
            board[i][colNum] = piece;
            return true;
        }
    }
    
    // if the column is full
    return false;
}


// function to check the board for connected pieces (horizontally, vertically and diagonally)
const checkBoard = (board) => {
    
    // first, check the lines and columns
    let winner = checkLinesForWinner(board);
    if(winner != undefined){
        return winner;
    }

    winner = checkColumnsForWinner(board);
    if(winner != undefined){
        return winner;
    }


    // second, start checking the diagonals
    // extract the left-to-right diagonals into an array, so we can traverse it easily
    const leftToRightDiagonals =  extractLeftToRightDiags(board);

    // check the left-to-right diagonals array for 4 connected pieces 
    winner = checkDiagonalsForWinner(leftToRightDiagonals);
    if(winner != undefined){
        return winner;                                                                   // if a player won, return the winner
    }

    // extract the right-to-left diagonals arrayinto an array
    const rightToLeftDiagonals = extractRightToLeftDiags(board);

    // check the right-to-left diagonals array for 4 connected pieces 
    winner = checkDiagonalsForWinner(rightToLeftDiagonals);
    if(winner != undefined){
        return winner;                                                                   // if a player won, return the winner
    }


    // if there are still empty positions left and no one won yet
    if(isStillPending(board)){
        return "Pending"                                                                 
    } 

    // if all places are full, and no one won 
    return "Draw"
}


// function to check if there is at least one unoccupied position on the board
function isStillPending(board){
    for(const line of board){
        for(const char of line){
            if(char === "-"){
                return true;
            }
        }
    }
    return false;
}


// function to check the lines for 4 connected pieces
function checkLinesForWinner(board){

    for(let i = 0; i < board.length; i++){
        let connectFour = 1;
        for(let j = 1; j < board[i].length; j++){

            if(board[i][j] === "-"){                        
                connectFour = 1;                            // if we encounter an unoccupied space, reinitialize the count
            } else {
                if(board[i][j-1] === board[i][j]){
                    connectFour++                           // if we encounter the same consecutive piece, increment the count
                } else {
                    connectFour = 1;                        // if we encounter a different piece, reinitialize the count
                }
            }
            
            if(connectFour === 4){                          // if we have 4 horizontally connected pieces, return the winner
                return board[i][j] 
            }
        }
    }

}

// function to check the columns for 4 connected pieces
function checkColumnsForWinner(board){
    for(let i = 0; i < board[0].length; i++){
        let connectFour = 1;
        for(let j = 1; j < board.length; j++){
            if(board[j][i] === "-"){
                connectFour = 1;
            } else {
                if(board[j-1][i] === board[j][i]){
                    connectFour++
                } else {
                    connectFour = 1;
                }
            }
            
            if(connectFour === 4){                           // if we have 4 vertically connected pieces, return the winner
                return board[j][i];
            }
        }
    }

}


// function to check the diagonals for connected pieces
function checkDiagonalsForWinner(diagonalsArr) {
    for (const line of diagonalsArr) {
        let connectFour = 1
        for (let i = 1; i < line.length; i++) {
            if (line[i] === "-") {                                   // if we encounter an unoccupied space, reinitialize the count
                connectFour = 1;
            } else {
                if (line[i - 1] === line[i]) {
                    connectFour++;                                   // if we encounter the same consecutive piece, increment the count
                } else {
                    connectFour = 1;                                 // if we encounter a different piece, reinitialize the count
                }
            }
            if(connectFour === 4){                                   // if we have 4 connected pieces, return the winner
                return line[i];
            }
        }  
    }
}

// function to extract the right-to-left diagonals 
function extractRightToLeftDiags(board) {

    let rightToLeftDiags = [];

    // 1. top-half extraction
    for (let j = 3; j > 0; j--) {                                          // we only need the diagonals that are at least 4 positions long
        let tempJ = j;
        let i = 0;
        let row = "";
        while (tempJ < board[0].length) {
            row += board[i][tempJ];
            i++;
            tempJ++;
        }
        rightToLeftDiags.push(row);
    }

    // 2. bottom-half extraction                                            // we only need the diagonals that are at least 4 positions long
    for (let i = 0; i < board.length - 3; i++) {
        let tempI = i;
        let j = 0;
        let row = "";
        while (tempI < board.length) {
            row += board[tempI][j];
            tempI++;
            j++;
        }
        rightToLeftDiags.push(row);
    }

    return rightToLeftDiags;
}


// function to extract the left-to-right diagonals 
function extractLeftToRightDiags(board) {
    let leftToRightDiags = [];

    // 1. top-half extraction
    for (let i = 3; i < board.length; i++) {                     
        let tempI = i;
        let j = 0;
        let row = "";
        while (j <= i) {
            row += board[tempI][j];
            j++;
            tempI--;
        }
        leftToRightDiags.push(row);
    }

    // 2. bottom-half extraction
    for (let j = 1; j <= 3; j++) {                              
        let tempJ = j;
        let i = board.length - 1;
        let row = "";
        while (i >= j - 1) {
            row += board[i][tempJ];
            tempJ++;
            i--;
        }
        leftToRightDiags.push(row);
    }

    return leftToRightDiags;
}

module.exports = {printBoard, putPiece, checkBoard}
