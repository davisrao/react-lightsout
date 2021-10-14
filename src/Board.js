import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import { lightCell } from "./helpers";




/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.75 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < nrows; y++) {
      initialBoard.push(Array.from({ length: ncols }, () => lightCell(chanceLightStartsOn)))
    }

    console.log("initial board", initialBoard)
    return initialBoard;
  }

  // [ 
  //   ['t', 'f', 't'],
  //   ['f', 't', 'f'],
  //   ['t', 'f', 't']
  //  ]

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return !(board.some(row => {
      return row.some(cell => cell === true)
    }))
  }
  // coord: "4-4"
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      // let boardCopy = [...oldBoard];
      let boardCopy = oldBoard.map( row => [...row] );

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);

      // TODO: return the copy
      console.log("boardCopy", boardCopy);
      return boardCopy;
    });
  }

  const won = hasWon();
  return (
    <div>
      {won &&
        <div>
          You have Won!
        </div>}
      {!won &&
        <table>
        <tbody>{board.map((row, y) => {
          return (
            <tr>
              {row.map((cell, x) => {
                return (
                  <Cell
                    key={`${y}-${x}`}
                    isLit={cell}
                    flipCellsAroundMe={()=>flipCellsAround(`${y}-${x}`)}
                  />)
              })}
            </tr>)
        })}
        </tbody>
        </table>
      }
    </div>
  );
  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
}

export default Board;
