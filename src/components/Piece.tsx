import React from 'react';
import { PieceColor, PieceData } from '../types/basicTypes';

const Piece = ({ pieceData }: { pieceData: PieceData }) => {

  return (
    <div style={{
      width: '50%',
      height: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '30px',
      cursor: 'pointer',
      color: pieceData.color === PieceColor.WHITE ? 'white' : 'black',
      fontWeight: 'bold',
    }}>
      {pieceData.kind.toUpperCase()}
    </div>
  );
};

export default Piece;