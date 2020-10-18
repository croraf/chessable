import React from "react";
import PieceRenderer from "./PieceRenderer";
import cx from "classnames";
import { BoardOrientation, Piece } from "./types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  square: {
    width: "12.5%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "transform 2s"
  },
  squareBlack: {
    backgroundColor: "rgba(0, 20, 0, 0.6)"
  },
  squareWhite: {
    backgroundColor: "rgba(233, 212, 96, 0.8)"
  },
  squareSelected: {
    backgroundColor: "gold"
  },
  squareMovable: {
    backgroundColor: "rgba(255, 100, 0, 0.7)"
  }
});

const Square = ({
  containedPiece,
  isWhite,
  isSelected,
  isSelectable,
  isMoveTarget,
  onSquareClick,
  onRightClick,
  boardOrientation
}: {
  containedPiece: Piece | null;
  isWhite: boolean;
  isSelected: boolean;
  isSelectable: boolean;
  isMoveTarget: boolean;
  onSquareClick: () => void;
  onRightClick: () => void;
  boardOrientation: BoardOrientation;
}) => {
  const classes = useStyles();

  return (
    <div
      className={cx(
        classes.square,
        isWhite ? classes.squareWhite : classes.squareBlack,
        isSelected && classes.squareSelected,
        isMoveTarget && classes.squareMovable
      )}
      style={{
        transform: `
          rotateX(${boardOrientation === BoardOrientation.WHITE ? 180 : 0}deg)
          rotateY(${boardOrientation === BoardOrientation.WHITE ? 0 : 180}deg)
        `,
        cursor: isSelectable ? "pointer" : "initial"
      }}
      onClick={onSquareClick}
      onContextMenu={onRightClick}
    >
      {containedPiece !== null && <PieceRenderer piece={containedPiece} />}
    </div>
  );
};

export default Square;
