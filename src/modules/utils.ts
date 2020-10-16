import { PieceKind } from "../types/basicTypes";

const parseFenRank = (input: string): PieceKind[] => {
  let parsedRank: PieceKind[] = [];
  for (let index = 0; index < input.length; index++) {
    const char = input[index];
    if (Object.keys(PieceKind).includes(char)) {
      /* parsedRank.push(PieceKind[char]); */
    } else {

    }
  }
  return parsedRank;
};

const parseFenBoard = (input: string): PieceKind[][] => {
  const ranks = input.split('/');
  return ranks.map(rank => parseFenRank(rank));
};