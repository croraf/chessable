import { PieceKind } from "../types/basicTypes";

const parseFenRank = (rankInput: string): (PieceKind | null)[] => {
  let parsedRank: (PieceKind | null)[] = [];
  for (let index = 0; index < rankInput.length; index++) {
    const char = rankInput[index];
    if (Object.keys(PieceKind).includes(char)) {
      parsedRank.push(char as PieceKind);
    } else if (char >= '1' && char <= '8') {
      const newArray: null[] = new Array(parseInt(char)).fill(null);
      parsedRank.concat(newArray);
    } else {
      throw new Error('Unexpected FEN board input');
    }
  }
  return parsedRank;
};

const parseFenBoard = (input: string): (PieceKind | null)[][] => {
  const rankInputs = input.split('/');
  return rankInputs.map(rankInput => parseFenRank(rankInput));
};

export {parseFenBoard};