export enum BoardOrientation {
  WHITE,
  BLACK,
}

export enum PieceKind {
  K = 'K',
  Q = 'Q',
  R = 'R',
  N = 'N',
  B = 'B',
  P = 'P',
  k = 'k',
  q = 'q',
  r = 'r',
  n = 'n',
  b = 'b',
  p = 'p',
}

export enum PieceColor {
  WHITE,
  BLACK,
}

export interface Piece {
  kind: PieceKind,
  color: PieceColor,
}

export interface SquareLocation {
  rankIndex: number,
  fileIndex: number,
}