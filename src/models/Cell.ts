import { Board } from "./Board"
import { Colors } from "./Colors"
import { Figure } from "./figures/Figure"

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean;
    id: number;

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random();
    }

    isEmpty() {
        return this.figure === null;
    }

    isEnemy(target: Cell): boolean {
        const stopPawn = this.board.getCells(this.x, target.y)
        if (target.figure && stopPawn.figure) {
            return this.figure?.color !== target.figure.color
        }
        return false
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x)
            return false
        
        const min = Math.min(this.y, target.y)
        const max = Math.max(this.y, target.y)
        for (let row = min + 1; row < max; row++) {
            if (!this.board.getCells(this.x, row).isEmpty()) {
                return false
            }
        }
        return true
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y)
            return false
        
        const min = Math.min(this.x, target.x)
        const max = Math.max(this.x, target.x)
        for (let col = min + 1; col < max; col++) {
            if (!this.board.getCells(col, this.y).isEmpty()) {
                return false
            }
        }
        return true
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(this.x - target.x)
        const absY = Math.abs(this.y - target.y)
        if (absX !== absY)
            return false
        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1

        for (let i = 1; i < absX; i++) {
            if (!this.board.getCells(this.x + dx*i, this.y + dy*i).isEmpty()) {
                return false
            }
        }
        return true
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    addLostFigure(figure: Figure) {
        figure.color === Colors.BLACK
            ? this.board.lostBlackFigures.push(figure)
            : this.board.lostWhiteFigures.push(figure)
    }

    public moveFigure(target: Cell) {
        if(this.figure?.canMove(target)) {
            this.figure.moveFigure(target)
            if (target.figure) {
                this.addLostFigure(target.figure)
            }
            target.setFigure(this.figure)
            this.figure = null
        }
    }
}