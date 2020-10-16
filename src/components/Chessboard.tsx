import React from 'react';
import { makeStyles } from '@material-ui/core';
import { BoardOrientation, PieceKind } from '../types/basicTypes';
import Piece from './Piece';

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
  black: {
    backgroundColor: 'rgba(0, 20, 0, 0.6)',
  },
  white: {
    backgroundColor: 'rgba(233, 212, 96, 0.4)',
  }
});

const Chessboard = ({ 
  boardSetup,
  boardOrientation = BoardOrientation.WHITE,
}: { 
  boardSetup: (PieceKind | null)[][],
  boardOrientation?: BoardOrientation,
}) => {
  const classes = useStyles();

  console.log(boardSetup[0].length);

  const data: (PieceKind | null)[][] = [
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, PieceKind.K, null, null, null,],
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null,],
  ];

  return (
    <div
      className={classes.root}
      style={{
        transform: `
          rotateX(${boardOrientation === BoardOrientation.WHITE ? 0 : 180}deg)
          rotateY(${boardOrientation === BoardOrientation.WHITE ? 0 : 180}deg)
        `
      }}
    >
      {
        boardSetup.map((rank, rankIndex) => (
          <div key={rankIndex} className={classes.rank}>
            {rank.map((square, fileIndex) => (
              <div
                key={fileIndex}
                className={classes.square + ' ' + (((rankIndex + fileIndex) % 2) ? classes.black : classes.white)}
                style={{
                  transform: `
                    rotateX(${boardOrientation === BoardOrientation.WHITE ? 0 : 180}deg)
                    rotateY(${boardOrientation === BoardOrientation.WHITE ? 0 : 180}deg)
                  `
                }}
              >
                {/* [{8 - rankIndex}, {fileIndex + 1}] */}
                {square !== null && <Piece pieceKind={square} />}
              </div>
            ))}
          </div>
        ))
      }
    </div>
  );
};

export default Chessboard;