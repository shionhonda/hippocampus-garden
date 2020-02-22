import Typography from "typography"

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: ['Noto Serif JP', 'serif'],
  bodyFontFamily: ['Noto Serif JP', 'serif'],
});

export default typography

export const rhythm = typography.rhythm
export const scale = typography.scale
