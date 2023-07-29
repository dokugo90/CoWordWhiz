
export interface IBoard {
    isCorrectPosition: boolean,
    isInWord: boolean,
    char: string,
    hasChar: boolean,
    y: number,
    x: number
}

export interface IGridCell {
    pos: { x: number, y: number },
    board: IBoard[][],
    currentY: number,
    currentX: number
}