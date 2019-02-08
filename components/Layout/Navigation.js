import React from 'react';
import styled from 'react-emotion';
import Link from 'next/link';
import Router from 'next/router';
import { Box, Flex } from 'rebass/emotion';
import Dimensions from '../shared/styles/dimensions';
import Spacing from '../shared/styles/spacing';
import Logo from '../shared/components/Logo';
import Responsive from '../shared/styles/responsive';
import Search from '../Search/Search';
import PropTypes from 'prop-types';
import { UI } from '../shared/styles/colors';
import Size, { UIFontStack, Weight } from '../shared/styles/type';
import Button from '../shared/components/Button';
import { Event, TrackEvent } from '../ga/Tracker';
import Toggle from '../shared/enhancers/Toggle';
import { withOuterClick } from '../shared/enhancers/withOuterClick';
import { withCache } from '../emotion/cache';

const Container = styled.div((props) => ({
  paddingRight: Spacing.Small,
  paddingLeft: Spacing.Small,
  background: props.background || '#fff',
  [Responsive.Mobile]: {
    padding: Spacing.Small,
  },
}));

const LogoContainer = styled.div({
  [Responsive.Mobile]: {
    textAlign: 'center',
  },
});

const SearchContainer = styled.div({
  [Responsive.Mobile]: {
    marginTop: '20px',
  },
});

const TrackNavClick = (e, label, href) => {
  e.preventDefault();
  TrackEvent('menu', 'click', label).then(() => Router.push(href));
};

const MainNavLinks = [
  {
    href: '/marvel',
    displayText: 'Marvel',
    prefetch: true,
    tabIndex: 4,
    onClick: (e) => TrackNavClick(e, 'marvel', '/marvel'),
  },
  {
    href: '/dc',
    displayText: 'DC',
    prefetch: true,
    tabIndex: 5,
    onClick: (e) => TrackNavClick(e, 'dc', '/dc'),
  },
];

const NavItemProps = PropTypes.arrayOf(
  PropTypes.shape({
    href: PropTypes.string.isRequired,
    displayText: PropTypes.string.isRequired,
    prefetch: PropTypes.bool,
    isActive: PropTypes.bool,
  })
);

const NavContainer = styled('div')({
  display: 'block',
  textAlign: 'right',
  marginRight: '20px',
  [Responsive.Mobile]: {
    textAlign: 'center',
    marginRight: 0,
  },
});

const Nav = styled('nav')({
  position: 'absolute',
  top: '100%',
  right: 0,
  zIndex: 100,
  backgroundColor: UI.Background.White,
  paddingTop: Spacing.Tiny,
  paddingBottom: Spacing.Tiny,
  minWidth: Spacing.xxLarge * 4,
  borderTop: `2px solid ${UI.Text.Dark}`,
  borderBottom: `2px solid ${UI.Text.Dark}`,
  borderRight: `2px solid ${UI.Text.Dark}`,
  borderLeft: `2px solid ${UI.Text.Dark}`,
  boxShadow: `-4px 4px ${UI.Text.Dark}`,
  display: 'block',
  '> ul': {
    'list-style-type': 'none',
    ' > li': {
      display: 'block',
    },
  },
  [Responsive.Mobile]: {
    width: '100%',
    margin: '0 auto',
  },
});

const NavLink = styled.a((props) => ({
  fontFamily: UIFontStack,
  color: UI.Text.Dark,
  fontSize: Size.Default,
  fontWeight: Weight.Bold,
  cursor: 'pointer',
  display: 'block',
  textAlign: 'center',
  paddingTop: Spacing.Tiny,
  paddingBottom: Spacing.Tiny,
  paddingLeft: Spacing.Small,
  paddingRight: Spacing.Small,
  textDecoration: props.isActive ? 'underline' : 'none',
  '&:hover': {
    textDecoration: 'underline',
    backgroundColor: UI.Background.Gray,
  },
}));

const OuterNavBox = styled(Box)({
  position: 'relative',
});

const NavItems = ({ items, activeHref }) => (
  <Nav>
    Marvel DC
    <ul>
      {items &&
        items.map((item, i) => {
          return (
            <li key={item.href}>
              <Link href={item.href} prefetch={item.prefetch || false}>
                <NavLink
                  isActive={activeHref === item.href}
                  href={item.href}
                  tabIndex={item.tabIndex}
                  onClick={item.onClick}
                >
                  {item.displayText}
                </NavLink>
              </Link>
            </li>
          );
        })}
    </ul>
  </Nav>
);

NavItems.propTypes = {
  activeHref: PropTypes.string,
  showMenu: PropTypes.bool,
  items: NavItemProps,
};

const EnhancedNavItems = withOuterClick(NavItems);

class MainNav extends React.Component {
  handleClick = (showMenu) => {
    Event('menu', showMenu ? 'open' : 'close', null);
  };

  render() {
    return (
      <Toggle>
        {({ hide, isOpen, toggle }) => (
          <NavContainer>
            <Button onClick={() => this.handleClick(!isOpen) || toggle()} tabIndex="2">
              Menu &#9662;
            </Button>
            {isOpen && (
              <EnhancedNavItems
                onOuterClick={() => this.handleClick(!isOpen) || hide()}
                items={this.props.items}
                activeHref={this.props.activeHref}
              />
            )}
          </NavContainer>
        )}
      </Toggle>
    );
  }
}

MainNav.propTypes = {
  activeHref: PropTypes.string,
  items: NavItemProps,
};

const TrackNav = (e) => {
  e.preventDefault();
  TrackEvent('Logo', 'click', 'Comic Cruncher').then(() => Router.push('/'));
};

const Navigation = (props) => (
  <Container background={props.background}>
    <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center" alignContent="center">
      <Box flex="1 0 auto" width={[1, `${Dimensions.GoldenRatio.Small}`, 2 / 5]}>
        <LogoContainer>
          <Link href={'/'} prefetch>
            <Logo href="/" tabIndex="1" onClick={(e) => TrackNav(e)}>
              Comic Cruncher
            </Logo>
          </Link>
        </LogoContainer>
      </Box>
      <Box flex="1 0 auto" width={[1, `${Dimensions.GoldenRatio.Large}`, 3 / 5]}>
        <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center" alignContent="center">
          <OuterNavBox width={[1, 2 / 5]}>
            <MainNav items={MainNavLinks} activeHref={props.activeHref} />
          </OuterNavBox>
          <Box width={[1, 3 / 5]}>
            <SearchContainer>
              <Search id="navsearch" />
            </SearchContainer>
          </Box>
        </Flex>
      </Box>
    </Flex>
  </Container>
);

export default Navigation;
