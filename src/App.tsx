import React, { useState } from 'react';
import Chessboard from './components/Chessboard';
import { BoardOrientation } from './types/basicTypes';
import { Button } from '@material-ui/core';
import { parseFenBoard } from './modules/utils';

const boardFenSetup = '8/2p5/8/8/8/8/8/8';

function App() {
  const [boardOrientation, setBoardOrientation] = useState(BoardOrientation.WHITE);

  const parsedBoardSetup = parseFenBoard(boardFenSetup);

  return (
    <div className="App" style={{ margin: '2rem 0rem', width: '100%' }}>
      <Chessboard
        boardOrientation={boardOrientation}
        boardSetup={parsedBoardSetup}
      />
      <Button
        onClick={e => setBoardOrientation(
          boardOrientation === BoardOrientation.WHITE ? BoardOrientation.BLACK : BoardOrientation.WHITE
        )}
        style={{ margin: '2rem', }}
      >
        Rotate
      </Button>
    </div>
  );
}

export default App;
