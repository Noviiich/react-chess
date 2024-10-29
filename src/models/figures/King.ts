import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-king.png'
import whiteLogo from '../../assets/white-king.png'
import { Colors } from "../Colors";
import { Cell } from "../Cell";

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target))
            return false;
        if  ((target.x === this.cell.x || Math.abs(target.x - this.cell.x) === 1)
            && (target.y === this.cell.y || Math.abs(target.y - this.cell.y) === 1))
            return true
        return false
    }
}