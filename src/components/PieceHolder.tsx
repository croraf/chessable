import React from 'react';
import { PieceColor, Piece } from '../types/basicTypes';

const PieceHolder = ({ pieceData, }: { pieceData: Piece, }) => {

  return (
    <div
      style={{
        width: '50%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '30px',
        color: pieceData.color === PieceColor.WHITE ? 'white' : 'black',
        fontWeight: 'bold',
        userSelect: 'none',
      }}
    >
      {pieceData.kind.toUpperCase()}
    </div>
  );
};

export default PieceHolder;