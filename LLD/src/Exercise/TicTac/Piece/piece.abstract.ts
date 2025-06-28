export enum EPiece {
    X = 'X',
    O = 'O'
}

export abstract class Piece {
    piece: EPiece

    constructor(piece: EPiece) {
        this.piece = piece
    }
}