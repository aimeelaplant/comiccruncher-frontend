export const Palette = {
  // Colors
  Red: {
    Default: '#D00000',
    Light: '#E55555',
  },
  Blue: {
    Default: '#1A71FF',
    Light: '#1984E7',
  },
  Yellow: {
    Default: '#F2EE1B',
  },

  // Neutrals
  Gray: {
    Dark: '#121017',
    Default: '#272830',
    Light: '#828282',
    Pale: '#EEEEEE',
  },
  White: {
    Default: '#FFFFFF',
  },
};

export const UI = {
  Border: {
    Dark: Palette.Gray.Dark,
    Default: Palette.Gray.Default,
    White: Palette.White.Default,
  },
  Text: {
    Dark: Palette.Gray.Dark,
    Default: Palette.Gray.Default,
    Light: Palette.Gray.Light,
    Pale: Palette.Gray.Pale,
    Yellow: Palette.Yellow.Default,
    Blue: Palette.Blue.Light,
    White: Palette.White.Default,
  },
  Background: {
    Red: Palette.Red.Default,
    Blue: Palette.Blue.Default,
    BlueHover: Palette.Blue.Light,
    White: Palette.White.Default,
    Dark: Palette.Gray.Dark,
    Yellow: Palette.Yellow.Default,
  },
};

const Brands = {
  Marvel: '#FF0000',
  DC: '#0282f9',
};

const Colors = {};
Colors.Palette = Palette;
Colors.UI = UI;
Colors.Brands = Brands;

export default Colors;
