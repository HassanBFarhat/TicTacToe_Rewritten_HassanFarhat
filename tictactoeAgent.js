// Tic Tac Toe
class Agent {
    constructor() {

    }

    minimax(theBoard, isMaximizing) {

        // Base cases
        let gameOver = theBoard.gameOver();
        if (gameOver !== 0) {
            if (gameOver === 1) return 1; // X wins
            if (gameOver === 2) return -1; // O wins
            if (gameOver === 3) return 0; // Draw
        }

        let bestScore = isMaximizing ? -Infinity : Infinity;

        // Recursive case
        for (let i = 0; i < theBoard.cells.length; i++) {
            let cell = i + 1;
            if (theBoard.cellFree(cell)) {
                let newtheBoard = theBoard.clone();
                newtheBoard.move(cell);
                let score = this.minimax(newtheBoard, !isMaximizing);
                bestScore = isMaximizing ? Math.max(bestScore, score) : Math.min(bestScore, score);
            }
        }

        return bestScore;
    }

    selectMove(theBoard) {

        let bestScore = theBoard.playerOne ? -Infinity : Infinity;
        let bestMove = null;

        for (let i = 0; i < theBoard.cells.length; i++) {
            let cell = i + 1;
            if (theBoard.cellFree(cell)) {
                let newtheBoard = theBoard.clone();
                newtheBoard.move(cell);

                let score = this.minimax(newtheBoard, !theBoard.playerOne);

                if ((theBoard.playerOne && score > bestScore) || 
                    (!theBoard.playerOne && score < bestScore)) {
                    bestScore = score;
                    bestMove = cell;
                }
            }
        }
        return bestMove;
    }

}