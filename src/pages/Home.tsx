import React, { useState } from 'react';
import Chessboard from '../components/Chessboard';
import { BoardOrientation, SquareLocation } from '../types/basicTypes';
import { Button } from '@material-ui/core';
import { addWhitePawnToBoard, calculateBoardDataAfterMove, parseFenBoard } from '../modules/utils';

// Friday 15:15 - 

//const boardFenInput = '8/2p5/7p/8/3KK3/8/7Q/8';
const boardFenInput = '8/2p5/8/8/8/8/8/8';


function Home() {
  const [boardOrientation, setBoardOrientation] = useState(BoardOrientation.WHITE);
  const [boardData, setBoardData] = useState(parseFenBoard(boardFenInput));
  const [selectedPieceLocation, setSelectedPieceLocation] = useState(null as (SquareLocation | null));

  const onSelectablePieceClick = (clickedLocation: SquareLocation) => {
    if (selectedPieceLocation?.rankIndex === clickedLocation.rankIndex
      && selectedPieceLocation?.fileIndex === clickedLocation.fileIndex) {
      setSelectedPieceLocation(null);
    } else {
      setSelectedPieceLocation(clickedLocation);
    }
  };

  const onPieceMove = (moveTarget: SquareLocation) => {
    setBoardData(
      calculateBoardDataAfterMove(boardData, selectedPieceLocation as SquareLocation, moveTarget)
    );
    setSelectedPieceLocation(null);
  };

  return (
    <div style={{ margin: '2rem 0rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
      <Chessboard
        boardData={boardData}
        selectedPieceLocation={selectedPieceLocation}
        onSelectablePieceClick={onSelectablePieceClick}
        onPieceMove={onPieceMove}
        boardOrientation={boardOrientation}
      />
      <div>
        <Button
          onClick={e => setBoardOrientation(
            boardOrientation === BoardOrientation.WHITE ? BoardOrientation.BLACK : BoardOrientation.WHITE
          )}
          style={{ margin: '1rem', }}
        >
          Rotate
        </Button>
        <Button
          onClick={e => setBoardData(addWhitePawnToBoard(boardData))}
          style={{ margin: '1rem', }}
        >
          Spawn a white pawn
        </Button>
        <Button
          onClick={e => setBoardData(parseFenBoard(boardFenInput))}
          style={{ margin: '1rem', }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default Home;
