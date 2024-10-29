import React, { FC } from 'react';
import { Cell } from '../models/Cell';

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) =>  {
  return (
    <div 
      className={['cell', cell.color, selected && cell.figure ? 'selected' : ''].join(' ')}
      onClick={() => click(cell)}
      style={{backgroundColor: cell.figure &&  cell.available? 'green' : ''}}
    >
      {cell.available && !cell.figure && <div className='available'/>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt={cell.figure?.name}/>}
    </div>
  );
}

export default CellComponent;
