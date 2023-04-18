import {IPiece} from "~/utils/interfaces/const";

export const PIECE_TYPES = {
    pawn: 'pawn',
    rook: 'rook',
    knight: 'knight',
    bishop: 'bishop',
    queen: 'queen',
    king: 'king',
}

export const PIECE_VALUES = () => {
    let pieces: IPiece[] = [];
    [1, 2].forEach(item => {
        const player = item;
        for (let i = 0; i < 8; i++) {
            pieces.push({
                index: player === 1 ? i + 8 : i + 16,
                type: PIECE_TYPES.pawn,
                player,
                value: null,
                currentPos: [i, player === 1 ? 1 : 6]
            })
        }
    })
    return pieces;
}