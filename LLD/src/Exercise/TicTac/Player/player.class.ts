import { Piece } from "../Piece/piece.abstract"

export class Player {
    name: string
    piece: Piece

    constructor(name: string, piece: Piece) {
        this.name = name
        this.piece = piece
    }
}