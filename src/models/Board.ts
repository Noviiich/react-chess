import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board {
    cells: Cell[][] = []

    lostBlackFigures: Figure[] = []
    lostWhiteFigures: Figure[] = []

    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null))
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null))
                }
            }
            this.cells.push(row)
        }
    }

    public getCells(x: number, y: number) {
        return this.cells[y][x]
    }

    public getCopyBoard(): Board {
        const newBoard = new Board()
        newBoard.cells = this.cells
        return newBoard
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target)
            }
        }

    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCells(i, 1))
            new Pawn(Colors.WHITE, this.getCells(i, 6))
        }
    }

    private addRooks() {
        new Rook(Colors.BLACK, this.getCells(0, 0))
        new Rook(Colors.BLACK, this.getCells(7, 0))
        new Rook(Colors.WHITE, this.getCells(0, 7))
        new Rook(Colors.WHITE, this.getCells(7, 7))
    }

    private addBishops() {
        new Bishop(Colors.BLACK, this.getCells(2, 0))
        new Bishop(Colors.BLACK, this.getCells(5, 0))
        new Bishop(Colors.WHITE, this.getCells(2, 7))
        new Bishop(Colors.WHITE, this.getCells(5, 7))
    }

    private addKnights() {
        new Knight(Colors.BLACK, this.getCells(1, 0))
        new Knight(Colors.BLACK, this.getCells(6, 0))
        new Knight(Colors.WHITE, this.getCells(1, 7))
        new Knight(Colors.WHITE, this.getCells(6, 7))
    }

    private addKings() {
        new King(Colors.BLACK, this.getCells(4, 0))
        new King(Colors.WHITE, this.getCells(4, 7))
    }

    private addQueens() {
        new Queen(Colors.BLACK, this.getCells(3, 0))
        new Queen(Colors.WHITE, this.getCells(3, 7))
    }

    public addFigures() {
        this.addPawns()
        this.addRooks()
        this.addBishops()
        this.addKnights()
        this.addKings()
        this.addQueens()
    }
}