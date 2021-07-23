import { getRemUnit } from '../utils';

export const remPx = 16;

export const oneRem = 1;
export const oneHalfRem = 1.5;
export const twoRem = 2;
export const twoHalfRem = 2.5;
export const threeRem = 3;


export type Space = {
  spaceXXXSmall: string;
  spaceXXSmall: string;
  spaceXSmall: string;
  spaceSmall: string;
  spaceMedium: string;
  spaceLarge: string;
  spaceXLarge: string;
  spaceXXLarge: string;
  spaceXXXLarge: string;
};

export const space: Space = {
  spaceXXXSmall: getRemUnit(0.125),
  spaceXXSmall: getRemUnit(0.25),
  spaceXSmall: getRemUnit(0.5),
  spaceSmall: getRemUnit(0.75),
  spaceMedium: getRemUnit(1),
  spaceLarge: getRemUnit(1.5),
  spaceXLarge: getRemUnit(2),
  spaceXXLarge: getRemUnit(2.5),
  spaceXXXLarge: getRemUnit(3.25),
};