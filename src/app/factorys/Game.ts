import { IBoard } from "../types/interfaces"


export default function Gameboard() {
    return {
        init: function({ rows, cols }: { rows: number, cols: number }) {
            let newBoard: IBoard[][] = [];
            for (let i = 0; i < rows; i++) {
                let rows: IBoard[] = []
                for (let j = 0; j < cols; j++) {
                    rows.push({ isCorrectPosition: false, char: "", hasChar: false, isInWord: false, y: j, x: i })
                }
                newBoard.push(rows);
            }
            return newBoard;
        }
    }
}