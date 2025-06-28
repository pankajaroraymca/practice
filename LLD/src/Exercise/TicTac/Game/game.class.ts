import { Board } from "../Board/board.class";
import { PieceO } from "../Piece/pieceO.class";
import { PieceX } from "../Piece/pieceX.class";
import { Player } from "../Player/player.class";
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => rl.question(question, resolve));
}

export class Game {
    playersList: Player[]
    board: Board

    constructor() {
        this.playersList = []
        this.initialize()
    }

    initialize() {

        const board = new Board(3)
        this.board = board

        const pieceX = new PieceX()
        const pieceO = new PieceO()

        const player1 = new Player('Pankaj', pieceX)
        const player2 = new Player('Shubham', pieceO)

        this.playersList.push(player1)
        this.playersList.push(player2)

    }

    async startGame() {
        let isWinnerAvailable = false;

        while (!isWinnerAvailable) {
            if (!this.board.isCellsAvailable()) {
                console.log("Game is Tie");
                break;
            }

            const playerTurn = this.playersList.shift();

            const row = Number(await askQuestion(`Enter Row for player ${playerTurn.name}: `));
            const col = Number(await askQuestion(`Enter Col for player ${playerTurn.name}: `));

            if (isNaN(row) || isNaN(col) || row >= this.board.getSize() || col >= this.board.getSize()) {
                console.log("Invalid Inputs");
                this.playersList.unshift(playerTurn);
                continue;
            }

            if (!this.board.isCellEmpty(row, col)) {
                console.log("Cell already occupied");
                this.playersList.unshift(playerTurn);
                continue;
            }

            this.board.addPiece(row, col, playerTurn.piece);
            this.board.print();

            if (this.hasWinner()) {
                console.log("Winner is player", playerTurn.name);
                break;
            }

            this.playersList.push(playerTurn);
        }

        rl.close();
    }


    hasWinner() {
        const N = this.board.getSize();
        const board = this.board.getBoard();

        for (let i = 0; i < N; i++) {
            const rowSymbol = board[i][0];
            const colSymbol = board[0][i];

            if (rowSymbol && board[i].every(cell => cell === rowSymbol)) {
                return true;
            }

            if (colSymbol && board.every(row => row[i] === colSymbol)) {
                return true;
            }
        }

        const mainDiagSymbol = board[0][0];
        if (mainDiagSymbol && board.every((row, idx) => row[idx] === mainDiagSymbol)) {
            return true;
        }

        const antiDiagSymbol = board[0][N - 1];
        if (antiDiagSymbol && board.every((row, idx) => row[N - 1 - idx] === antiDiagSymbol)) {
            return true;
        }

        return false;
    }


}