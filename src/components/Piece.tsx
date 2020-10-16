import React from 'react';
import { PieceKind } from '../types/basicTypes';
import King from './pieces/King';
import Queen from './pieces/Queen';

const Piece = ({ pieceKind }: { pieceKind: PieceKind }) => {

  let pieceElement: string | null;

  switch (pieceKind) {
    case PieceKind.K:
      pieceElement = 'K';
      break;
    default:
      pieceElement = null;
      break;
  }

  return (
    <div style={{
      width: '50%',
      height: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '20px',
      cursor: 'pointer',
    }}>{pieceElement}</div>
  );
};

export default Piece;