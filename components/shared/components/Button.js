import styled from 'react-emotion';
import { UI } from '../styles/colors';
import Dimensions from '../styles/dimensions';
import Spacing from '../styles/spacing';
import Type, { UIFontStack, BangersFontStack } from '../styles/type';

const Button = styled.button(
  {
    border: 'none',
    userSelect: 'none',
    borderRadius: Dimensions.BorderRadius.Default,
    fontSize: Type.Size.Default,
    fontFamily: UIFontStack,
    fontWeight: Type.Weight.Normal,
    backgroundColor: UI.Background.Dark,
    color: UI.Text.White,
    paddingTop: Spacing.Tiny,
    paddingBottom: Spacing.Tiny,
    paddingLeft: Spacing.Large,
    paddingRight: Spacing.Large,
    cursor: 'pointer',
    transition: 'all .3s ease-in-out',
  },
  (props) =>
    props.type === 'primary' && {
      backgroundColor: UI.Background.Blue,
      '&:hover': {
        backgroundColor: UI.Background.BlueHover,
      },
    },
  (props) =>
    props.disabled && {
      opacity: '0.3',
      backgroundColor: UI.Background.Gray,
      color: UI.Text.Dark,
    },
  (props) =>
    props.isInactive && {
      opacity: '0.3',
      backgroundColor: UI.Background.Gray,
      color: UI.Text.White,
    },
  (props) =>
    props.type === 'dark' && {
      backgroundColor: UI.Text.Default,
      '&:hover': {
        backgroundColor: UI.Background.Gray,
        color: UI.Text.Dark,
      },
    }
);

export default Button;
