import React from 'react';
import styled from 'react-emotion';
import Link from 'next/link';
import { Box, Flex } from 'rebass/emotion';
import Dimensions from '../shared/styles/dimensions';
import Spacing from '../shared/styles/spacing';
import Logo from '../shared/components/Logo';
import Responsive from '../shared/styles/responsive';
import Search from '../Search/Search';
import MainNav from '../shared/components/MainNav';
import { withCache } from '../emotion/cache';

const Container = styled.div((props) => ({
  paddingRight: Spacing.Small,
  paddingLeft: Spacing.Small,
  background: props.background || '#fff',
  [Responsive.Mobile]: {
    padding: Spacing.Small,
  }
}));

const LogoContainer = styled.div({
  [Responsive.Mobile]: {
    textAlign: 'center',
  },
});

const NavItems = [
  {
    href: '/trending',
    displayText: 'Trending',
    prefetch: true,
  },
  {
    href: '/marvel',
    displayText: 'Marvel',
    prefetch: true,
  },
  {
    href: '/dc',
    displayText: 'DC',
    prefetch: true,
  },
  {
    href: '/faq',
    displayText: 'FAQ',
    prefetch: true,
  },
];

const Navigation = (props) => (
  <Container background={props.background}>
    <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center" alignContent="center">
      <Box flex="1 0 auto" width={[1, `${Dimensions.GoldenRatio.Small}`, 2 / 5]}>
        <LogoContainer>
          <Link href={'/'} prefetch>
            <Logo>Comic Cruncher</Logo>
          </Link>
        </LogoContainer>
      </Box>
      <Box flex="1 0 auto" width={[1, `${Dimensions.GoldenRatio.Large}`, 3 / 5]}>
        <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center" alignContent="center">
          <Box width={[1, 2 / 5, 1 / 5]} style={{ position: 'relative' }}>
            <MainNav items={NavItems} activeHref={props.activeHref} />
          </Box>
          <Box width={[1, 3 / 5, 4 / 5]}>
            <Search id="navsearch" />
          </Box>
        </Flex>
      </Box>
    </Flex>
  </Container>
);

export default Navigation;
