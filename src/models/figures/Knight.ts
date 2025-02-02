import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-knight.png'
import whiteLogo from '../../assets/white-knight.png'
import { Colors } from "../Colors";
import { Cell } from "../Cell";

export class Knight extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KNIGHT;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target))
            return false;
        const dx = Math.abs(target.x - this.cell.x)
        const dy = Math.abs(target.y - this.cell.y)

        return (dx === 2 && dy === 1) || (dx === 1 && dy === 2)
    }
}