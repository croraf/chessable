import React, { useState } from "react";
import Chessboard from "../features/chess/Chessboard";
import { BoardOrientation, SquareLocation } from "../features/chess/chessTypes";
import { makeStyles } from "@material-ui/core";
import {
  addWhitePawnToBoard,
  calculateBoardDataAfterMove,
  checkRightClickable,
  checkSelectable,
  parseFenBoard
} from "../features/chess/chessUtils";
import ButtonsRow from "../features/ButtonsRow";

// const boardFenInput = '8/2p5/7p/8/3KK3/8/7Q/8';
const boardFenInput = "8/2p5/8/8/8/8/8/8";

const useStyles = makeStyles({
  root: {
    margin: "2rem 0rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

function Home() {
  const classes = useStyles();
  const [boardOrientation, setBoardOrientation] = useState(
    BoardOrientation.WHITE
  );
  const [boardData, setBoardData] = useState(parseFenBoard(boardFenInput));
  const [selectedPieceLocation, setSelectedPieceLocation] = useState(
    null as SquareLocation | null
  );

  const onSquareClick = (clickedLocation: SquareLocation) => {
    if (
      selectedPieceLocation?.rankIndex === clickedLocation.rankIndex &&
      selectedPieceLocation?.fileIndex === clickedLocation.fileIndex
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

    if (checkRightClickable(moveTarget, boardData, selectedPieceLocation)) {
      // a valid move has been made. apply it!
      setBoardData(
        calculateBoardDataAfterMove(
          boardData,
          selectedPieceLocation,
          moveTarget
        )
      );
      setSelectedPieceLocation(null);
    } else {
      // an invalid move has been made. do nothing!
    }
  };

  return (
    <div className={classes.root}>
      <Chessboard
        boardData={boardData}
        selectedPieceLocation={selectedPieceLocation}
        onSquareClick={onSquareClick}
        onRightClick={onRightClick}
        boardOrientation={boardOrientation}
      />
      <ButtonsRow
        rotateButtonClick={() =>
          setBoardOrientation(
            boardOrientation === BoardOrientation.WHITE
              ? BoardOrientation.BLACK
              : BoardOrientation.WHITE
          )
        }
        spawnPawnButtonClick={() =>
          setBoardData(addWhitePawnToBoard(boardData))
        }
        resetButtonClick={() => setBoardData(parseFenBoard(boardFenInput))}
      />
    </div>
  );
}

export default Home;
