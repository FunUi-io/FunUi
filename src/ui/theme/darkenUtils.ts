import tinycolor from 'tinycolor2';

export const getDarkenAmount = (variable: string): number => {
  if (variable.includes('50')) return 5;
  if (variable.includes('100')) return 10;
  if (variable.includes('200')) return 15;
  if (variable.includes('300')) return 20;
  if (variable.includes('400')) return 25;
  return 20;
};

export const darkenToRgba = (hex: string, darkenAmount: number, alpha = 1): string => {
  const color = tinycolor(hex).darken(darkenAmount).toRgb();
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
};
