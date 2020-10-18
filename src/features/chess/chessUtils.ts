import { PieceColor, Piece, PieceKind, SquareLocation } from "./chessTypes";

const parseFenRank = (rankInput: string): (Piece | null)[] => {
  let parsedRank: (Piece | null)[] = [];
  for (let index = 0; index < rankInput.length; index++) {
    const char = rankInput[index];
    if (Object.keys(PieceKind).includes(char.toUpperCase())) {
      // if it is a piece
      parsedRank.push({
        kind: char as PieceKind,
        color: char.toUpperCase() === char ? PieceColor.WHITE : PieceColor.BLACK
      });
    } else if (char >= "1" && char <= "8") {
      // if it is a sequence of empty squares
      const newArray: null[] = new Array(parseInt(char, 10)).fill(null);
      parsedRank.push(...newArray);
    } else {
      throw new Error("Unexpected FEN board input symbol");
    }
  }

  if (parsedRank.length !== 8) {
    throw new Error("Unexpected FEN board rank lenght");
  }

  return parsedRank;
};

export const parseFenBoard = (boardFenInput: string): (Piece | null)[][] => {
  const rankInputs = boardFenInput.split("/");
  return rankInputs.map((rankInput) => parseFenRank(rankInput)).reverse();
};

export const addWhitePawnToBoard = (
  boardSetup: (Piece | null)[][]
): (Piece | null)[][] => {
  let randomFileIndex: number;
  let randomRankIndex: number;

  // TODO perhaps handle case when all squares are filled not to enter in a infinite loop
  do {
    randomFileIndex = Math.floor(Math.random() * 8);
    // In 0-based counting the pawns can only occupy ranks with indices 1 (inclusive) to 6 (inclusive).
    randomRankIndex = Math.floor(1 + Math.random() * 6);
  } while (boardSetup[randomRankIndex][randomFileIndex] !== null);

  const rankCopy = [...boardSetup[randomRankIndex]];
  rankCopy[randomFileIndex] = {
    kind: PieceKind.P,
    color: PieceColor.WHITE
  };

  const boardSetupCopy = [...boardSetup];
  boardSetupCopy[randomRankIndex] = rankCopy;
  return boardSetupCopy;
};

export const checkSelectable = (
  { rankIndex, fileIndex }: SquareLocation,
  boardData: (Piece | null)[][]
): boolean => {
  const piece = boardData[rankIndex][fileIndex];
  if (piece?.color === PieceColor.WHITE && piece?.kind === PieceKind.P) {
    return true;
  } else {
    return false;
  }
};

export const checkRightClickable = (
  { rankIndex, fileIndex }: SquareLocation,
  boardData: (Piece | null)[][],
  selectedPieceLocation: SquareLocation | null
): boolean => {
  if (selectedPieceLocation === null) {
    return false;
  }

  //TODO: en-passant not implemented
  if (
    rankIndex === selectedPieceLocation.rankIndex + 1 &&
    fileIndex === selectedPieceLocation.fileIndex &&
    boardData[rankIndex][fileIndex] === null
  ) {
    // the square immediately ahead
    return true;
  } else if (
    rankIndex === selectedPieceLocation.rankIndex + 1 &&
    fileIndex === selectedPieceLocation.fileIndex - 1 &&
    boardData[rankIndex][fileIndex]?.color === PieceColor.BLACK
  ) {
    // diagonal left
    return true;
  } else if (
    rankIndex === selectedPieceLocation.rankIndex + 1 &&
    fileIndex === selectedPieceLocation.fileIndex + 1 &&
    boardData[rankIndex][fileIndex]?.color === PieceColor.BLACK
  ) {
    // diagonal right
    return true;
  } else if (
    selectedPieceLocation.rankIndex === 1 &&
    rankIndex === 3 &&
    fileIndex === selectedPieceLocation.fileIndex &&
    boardData[rankIndex][fileIndex] === null &&
    boardData[rankIndex - 1][fileIndex] === null
  ) {
    // two squares ahead and second rank
    return true;
  } else {
    return false;
  }
};

export const calculateBoardDataAfterMove = (
  boardData: (Piece | null)[][],
  selectedPieceLocation: SquareLocation,
  moveTarget: SquareLocation
): (Piece | null)[][] => {
  const boardDataDeepCopy = JSON.parse(
    JSON.stringify(boardData)
  ) as (Piece | null)[][];

  boardDataDeepCopy[moveTarget.rankIndex][moveTarget.fileIndex] =
    boardData[selectedPieceLocation.rankIndex][selectedPieceLocation.fileIndex];
  boardDataDeepCopy[selectedPieceLocation.rankIndex][
    selectedPieceLocation.fileIndex
  ] = null;

  return boardDataDeepCopy;
};
