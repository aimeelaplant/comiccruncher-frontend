import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'react-emotion';
import Spacing from '../shared/styles/spacing';
import { UI } from '../shared/styles/colors';
import { UIFontStack, Weight } from '../shared/styles/type';
import { Flex, Box } from 'rebass/emotion';
import { Github } from '../shared/components/Icons';

const FooterContainer = styled('footer')({
  textAlign: 'center',
  padding: Spacing.xLarge,
  ul: {
    listStyle: 'none',
  },
  li: {
    display: 'inline-block',
    padding: Spacing.Tiny,
  },
  a: {
    color: UI.Text.Dark,
    fontFamily: UIFontStack,
    fontWeight: Weight.Medium,
    padding: 0,
    transition: 'all .3s ease-in-out',
    '&:hover': {
      color: UI.Text.Light,
    },
  },
});

const IconsContainer = styled('div')({
  margin: '10px auto',
});

const Footer = ({ showFooterText = true }) => (
  <React.Fragment>
    <Flex>
      <Box width={1}>
        <FooterContainer>
          {showFooterText && (
            <React.Fragment>
              <ul>
                <li>
                  <Link href={`/`}>
                    <a>Comic Cruncher</a>
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href={`https://twitter.com/aimeelaplant`}>
                    <a>@aimeelaplant</a>
                  </Link>
                </li>
                <li>
                  <Link href={`https://twitter.com/ghanbak`}>
                    <a>@ghanbak</a>
                  </Link>
                </li>
              </ul>
              <IconsContainer>
                <a href="https://github.com/aimeelaplant/comiccruncher" rel="noopener noreferer" target="_blank">
                  <Github width="32" height="32" />
                </a>
              </IconsContainer>
            </React.Fragment>
          )}
        </FooterContainer>
      </Box>
    </Flex>
  </React.Fragment>
);

Footer.propTypes = {
  showFooterText: PropTypes.bool,
};

export default Footer;
