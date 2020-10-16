import React, { useState } from 'react';
import Chessboard from '../components/Chessboard';
import { BoardOrientation } from '../types/basicTypes';
import { Button } from '@material-ui/core';
import { addWhitePawnToBoard, parseFenBoard } from '../modules/utils';

//const boardFenInput = '8/2p5/7p/8/3KK3/8/7Q/8';
const boardFenInput = '8/2p5/8/8/8/8/8/8';

function Home() {
  const [boardOrientation, setBoardOrientation] = useState(BoardOrientation.WHITE);
  const [boardData, setBoardData] = useState(parseFenBoard(boardFenInput));

  return (
    <div style={{ margin: '2rem 0rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
      <Chessboard
        boardOrientation={boardOrientation}
        boardData={boardData}
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
