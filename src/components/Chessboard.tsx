import React from 'react';
import { makeStyles } from '@material-ui/core';
import { BoardOrientation, Piece, SquareLocation } from '../types/basicTypes';
import PieceHolder from './PieceHolder';
import cx from 'classnames';
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
  square: {
    width: '12.5%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 2s',
  },
  squareBlack: {
    backgroundColor: 'rgba(0, 20, 0, 0.6)',
  },
  squareWhite: {
    backgroundColor: 'rgba(233, 212, 96, 0.8)',
  },
  squareSelected: {
    backgroundColor: 'gold',
  },
  squareMovable: {
    backgroundColor: 'rgba(255, 100, 0, 0.7)',
  },
});


const Chessboard = ({
  boardData,
  selectedPieceLocation,
  onSelectablePieceClick,
  onPieceMove,
  boardOrientation = BoardOrientation.WHITE,
}: {
  boardData: (Piece | null)[][],
  selectedPieceLocation: SquareLocation | null,
  onSelectablePieceClick: (clickedLocation: SquareLocation) => void,
  onPieceMove: (moveTargetLocation: SquareLocation) => void,
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
            {rank.map((square, fileIndex) => {
              const isSelectable = checkSelectable({ rankIndex, fileIndex }, boardData);
              const isMoveTarget = checkRightClickable({ rankIndex, fileIndex }, boardData, selectedPieceLocation);

              return (
                <div
                  key={fileIndex}
                  className={cx(
                    classes.square,
                    ((rankIndex + fileIndex) % 2) ? classes.squareWhite : classes.squareBlack,
                    selectedPieceLocation?.rankIndex === rankIndex && selectedPieceLocation?.fileIndex === fileIndex && classes.squareSelected,
                    isMoveTarget && classes.squareMovable,
                  )}
                  style={{
                    transform: `
                    rotateX(${boardOrientation === BoardOrientation.WHITE ? 180 : 0}deg)
                    rotateY(${boardOrientation === BoardOrientation.WHITE ? 0 : 180}deg)
                  `,
                    cursor: isSelectable ? 'pointer' : 'initial',
                  }}
                  onClick={() => { isSelectable && onSelectablePieceClick({ rankIndex, fileIndex }) }}
                  onContextMenu={() => { isMoveTarget && onPieceMove({ rankIndex, fileIndex }) }}
                >
                  {/* [{8 - rankIndex}, {fileIndex + 1}] */}
                  {square !== null && <PieceHolder pieceData={square} />}
                </div>
              );
            })}
          </div>
        ))
      }
    </div >
  );
};

export default Chessboard;