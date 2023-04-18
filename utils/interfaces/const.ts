import {PIECE_TYPES} from "~/utils/constants/primitives";

export interface ICellBackgroundColor {
    index: number;
    priColor: string;
    secColor: string;
    type: string;
}

export interface IPiece {
    index: number,
    // type: keyof typeof PIECE_TYPES,
    type: string,
    player: number,
    value: any,
    currentPos: [number, number],

}