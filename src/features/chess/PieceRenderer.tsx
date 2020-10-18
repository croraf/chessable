import React from "react";
import { PieceColor, Piece } from "./chessTypes";

const PieceRenderer = ({ piece }: { piece: Piece }) => {
  return (
    <div
      style={{
        width: "50%",
        height: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "30px",
        color: piece.color === PieceColor.WHITE ? "white" : "black",
        fontWeight: "bold",
        userSelect: "none"
      }}
    >
      {piece.kind.toUpperCase()}
    </div>
  );
};

export default PieceRenderer;
