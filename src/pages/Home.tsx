import React, { useState } from 'react';
import Chessboard from '../components/Chessboard';
import { BoardOrientation, SquareLocation } from '../types/basicTypes';
import { Button } from '@material-ui/core';
import { addWhitePawnToBoard, calculateBoardDataAfterMove, checkRightClickable, checkSelectable, parseFenBoard } from '../modules/utils';


// const boardFenInput = '8/2p5/7p/8/3KK3/8/7Q/8';
const boardFenInput = '8/2p5/8/8/8/8/8/8';


function Home() {
  const [boardOrientation, setBoardOrientation] = useState(BoardOrientation.WHITE);
  const [boardData, setBoardData] = useState(parseFenBoard(boardFenInput));
  const [selectedPieceLocation, setSelectedPieceLocation] = useState(null as (SquareLocation | null));

  const onSquareClick = (clickedLocation: SquareLocation) => {
    if (
      selectedPieceLocation?.rankIndex === clickedLocation.rankIndex
      && selectedPieceLocation?.fileIndex === clickedLocation.fileIndex
    ) {
      // clicked again on the selected piece. unselect!
      setSelectedPieceLocation(null);
    } else if (checkSelectable(clickedLocation, boardData)) {
      // clicked on another selectable piece. select!
      setSelectedPieceLocation(clickedLocation);
    } else {
      // clicked on empty square, do nothing
    }
  };

  const onRightClick = (moveTarget: SquareLocation) => {
    if (selectedPieceLocation === null) {
      // cannot move if there is no selection
      return;
    }
    if (!checkRightClickable(moveTarget, boardData, selectedPieceLocation)) {
      // cannot move if we clicked on the invalid target square
      return;
    }
    // if we are here a valid move has been made, so apply it
    setBoardData(
      calculateBoardDataAfterMove(boardData, selectedPieceLocation, moveTarget)
    );
    setSelectedPieceLocation(null);
  };

  return (
    <div style={{ margin: '2rem 0rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
      <Chessboard
        boardData={boardData}
        selectedPieceLocation={selectedPieceLocation}
        onSquareClick={onSquareClick}
        onRightClick={onRightClick}
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
