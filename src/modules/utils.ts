import { PieceColor, PieceData, PieceKind } from "../types/basicTypes";

const parseFenRank = (rankInput: string): (PieceData | null)[] => {
  let parsedRank: (PieceData | null)[] = [];
  for (let index = 0; index < rankInput.length; index++) {
    const char = rankInput[index];
    if (Object.keys(PieceKind).includes(char.toUpperCase())) {
      // if it is a piece
      parsedRank.push({
        kind: char as PieceKind,
        color: char.toUpperCase() === char ? PieceColor.WHITE : PieceColor.BLACK,
      });
    } else if (char >= '1' && char <= '8') {
      // if it is a sequence of empty squares
      const newArray: null[] = new Array(parseInt(char)).fill(null);
      parsedRank.push(...newArray);
    } else {
      throw new Error('Unexpected FEN board input symbol');
    }
  }

  if (parsedRank.length !== 8) {
    throw new Error('Unexpected FEN board rank lenght');
  }

  return parsedRank;
};

const parseFenBoard = (boardFenInput: string): (PieceData | null)[][] => {
  const rankInputs = boardFenInput.split('/');
  return rankInputs.map(rankInput => parseFenRank(rankInput));
};

const addWhitePawnToBoard = (boardSetup: (PieceData | null)[][]): (PieceData | null)[][] => {
  let randomFileIndex: number;
  let randomRankIndex: number;

  // TODO perhaps handle case when all squares are filled not to enter in a infinite loop 
  do {
    randomFileIndex = Math.floor(Math.random() * 8);
    // In 0-based counting the pawns can only occupy ranks with indices 1 (inclusive) to 6 (inclusive). 
    randomRankIndex = Math.floor(1 + Math.random() * 6);
  } while (boardSetup[randomRankIndex][randomFileIndex] !== null)

  const rankCopy = [...boardSetup[randomRankIndex]];
  rankCopy[randomFileIndex] = {
    kind: PieceKind.P,
    color: PieceColor.WHITE,
  };

  const boardSetupCopy = [...boardSetup];
  boardSetupCopy[randomRankIndex] = rankCopy;
  return boardSetupCopy;
}

export { parseFenBoard, addWhitePawnToBoard };