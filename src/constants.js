// global app constants
export const NUM_SQUARES_ROW = 8;
export const TIME_CONTROL = 30;
export const WIN_CONDITION_CHECKMATE = 'Checkmate';
export const WIN_CONDITION_TIMEOUT = 'Timeout';
export const WIN_CONDITION_RESIGNATION = 'Resignation';
export const WIN_CONDITION_DRAW = 'Drawn';
export const SYSTEM = 'system';

export const COORDINATE_CHARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const COORDINATE_NUMS = [1, 2, 3, 4, 5, 6, 7, 8];

export const mapSquareNumToPGN = function (x, y) {
  return COORDINATE_CHARS[x - 1] + '' + COORDINATE_NUMS[y - 1];
}