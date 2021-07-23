import { remPx } from '../constants';

export const getRemUnitFlat: (n: number) => number = (n) => Math.round(n * remPx || 16);

export const getRemUnit: (n: number) => string = (n) =>
  `${getRemUnitFlat(n)}px`;

export const getPxUnit: (n: number) => string = (n) => `${Math.round(n)}px`;

export const hexToRGBA: (hexColor: string, alpha: number) => string = (
  hexColor,
  alpha = 1,
) => {
  const [r, g, b] = (hexColor.match(/\w\w/g) as RegExpMatchArray).map((x) =>
    parseInt(x, 16),
  );
  return `rgba(${r},${g},${b},${alpha})`;
};
