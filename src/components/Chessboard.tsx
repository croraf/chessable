import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { BoardOrientation, Piece, SquareLocation } from '../types/basicTypes';
import PieceHolder from './PieceHolder';
import cx from 'classnames';
import { checkRightClickable, checkSelectable } from '../modules/utils';
// Friday 15:15 - 


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
  squareHighlighted: {
    backgroundColor: 'gold',
  }
});

const Chessboard = ({
  boardData,
  boardOrientation = BoardOrientation.WHITE,
}: {
  boardData: (Piece | null)[][],
  boardOrientation?: BoardOrientation,
}) => {
  const classes = useStyles();
  const [selectedPieceLocation, setSelectedPieceLocation] = useState(null as (SquareLocation | null));

  const onSquareClick = (clickedLocation: SquareLocation) => {
    if (selectedPieceLocation?.rankIndex === clickedLocation.rankIndex
      && selectedPieceLocation?.fileIndex === clickedLocation.fileIndex) {
      setSelectedPieceLocation(null);
    } else {
      setSelectedPieceLocation(clickedLocation);
    }
  };

  return (
    <div
      className={classes.root}
      style={{
        transform: `
          rotateX(${boardOrientation === BoardOrientation.WHITE ? 0 : 180}deg)
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
              const isRightClickable = checkRightClickable({ rankIndex, fileIndex }, boardData, selectedPieceLocation);

              return (
                <div
                  key={fileIndex}
                  className={cx(
                    classes.square,
                    ((rankIndex + fileIndex) % 2) ? classes.squareBlack : classes.squareWhite,
                    selectedPieceLocation?.rankIndex === rankIndex && selectedPieceLocation?.fileIndex === fileIndex && classes.squareHighlighted,
                  )}
                  style={{
                    transform: `
                    rotateX(${boardOrientation === BoardOrientation.WHITE ? 0 : 180}deg)
                    rotateY(${boardOrientation === BoardOrientation.WHITE ? 0 : 180}deg)
                  `,
                    cursor: isSelectable ? 'pointer' : 'initial',
                  }}
                  onClick={() => { isSelectable && onSquareClick({ rankIndex, fileIndex }) }}
                  onContextMenu={() => { isRightClickable && console.log('move')}}
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