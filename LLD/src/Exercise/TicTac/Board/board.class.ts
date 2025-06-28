import { Piece } from "../Piece/piece.abstract"

export class Board {
    private size: number
    private board: Piece[][]

    constructor(size: number) {
        this.size = size
        this.board = Array.from({ length: size }, () => Array(size).fill(null));
    }

    addPiece(row: number, col: number, piece: Piece): boolean {

        if (this.board[row][col] != null) {
            return false
        }

        this.board[row][col] = piece
        return true
    }

    print() {

        this.board.forEach(row => {
            const rowStr = '| ' + row.map(val => `${val?.piece ?? " "}`).join(' | ') + ' |';
            console.log(rowStr);
        });
    }

    isCellsAvailable() {

        return this.board.some(row => row.some(cell => cell === null));
    }

    getBoard() {
        return this.board
    }

    getSize() {
        return this.size
    }

    isCellEmpty(row: number, col: number): boolean {
        return this.board[row][col] === null;
    }
}