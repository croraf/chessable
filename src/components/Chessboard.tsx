import React from 'react';
import { makeStyles } from '@material-ui/core';
import { BoardOrientation, Piece, SquareLocation } from '../types/basicTypes';
import Square from './Square';
import { checkRightClickable, checkSelectable } from '../modules/utils';


const useStyles = makeStyles({
  root: {
    width: '600px',
    height: '600px',
    margin: 'auto',
    border: '5px solid black',
    transition: 'transform 2s',
  },
  rank: {
    width: '100%',
    height: '12.5%',
    display: 'flex',
  },
});


const Chessboard = ({
  boardData,
  selectedPieceLocation,
  onSquareClick,
  onRightClick,
  boardOrientation = BoardOrientation.WHITE,
}: {
  boardData: (Piece | null)[][],
  selectedPieceLocation: SquareLocation | null,
  onSquareClick: (clickedLocation: SquareLocation) => void,
  onRightClick: (moveTargetLocation: SquareLocation) => void,
  boardOrientation?: BoardOrientation,
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{
        transform: `
          rotateX(${boardOrientation === BoardOrientation.WHITE ? 180 : 0}deg)
          rotateY(${boardOrientation === BoardOrientation.WHITE ? 0 : 180}deg)
        `
      }}
      onContextMenu={e => e.preventDefault()}
    >
      {
        boardData.map((rank, rankIndex) => (
          <div key={rankIndex} className={classes.rank}>
            {rank.map((piece, fileIndex) => {

              const isSelected = selectedPieceLocation?.rankIndex === rankIndex && selectedPieceLocation?.fileIndex === fileIndex;
              const isSelectable = checkSelectable({ rankIndex, fileIndex }, boardData);
              const isMoveTarget = checkRightClickable({ rankIndex, fileIndex }, boardData, selectedPieceLocation);
              return (
                <Square
                  containedPiece={piece}
                  isWhite={(rankIndex + fileIndex) % 2 === 1}
                  isSelected={isSelected}
                  isSelectable={isSelectable}
                  isMoveTarget={isMoveTarget}
                  onRightClick={() => {onRightClick({ rankIndex, fileIndex })}}
                  onSquareClick={() => {onSquareClick({ rankIndex, fileIndex })}}
                  boardOrientation={boardOrientation}
                />
              )
            })}
          </div>
        ))
      }
    </div >
  );
};

export default Chessboard;