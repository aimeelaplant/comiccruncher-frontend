import styled from 'react-emotion';
import { Box, Flex } from 'rebass/emotion';
import { UI } from '../styles/colors';
import Dimensions from '../styles/dimensions';
import Spacing from '../styles/spacing';
import Type, { UIFontStack, BangersFontStack } from '../styles/type';
import Responsive from '../styles/responsive';

const HeaderSection = styled('div')({
  background: UI.Background.DarkGradient,
  minHeight: '420px',
  textAlign: 'center',
  padding: Spacing.xxLarge,
  [Responsive.Mobile]: {
    padding: Spacing.Large,
  },
});

export default HeaderSection;
