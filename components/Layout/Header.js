import React from 'react';
import styled from 'react-emotion';
import { UI } from '../shared/styles/colors';
import Responsive from '../shared/styles/responsive';
import Spacing from '../shared/styles/spacing';
import Lines from '../shared/components/Lines';

const HeaderSection = styled('header')((props) => ({
  overflow: props.overflow || 'visible',
  position: 'relative',
  background: props.background || UI.Background.RedGradient,
  minHeight: '420px',
  textAlign: props.textAlign || 'center',
  padding: Spacing.xxxLarge,
  [Responsive.Mobile]: {
    padding: Spacing.Large,
  },
}));

const GenericHeader = styled('header')((props) => ({
  overflow: props.overflow || 'visible',
  background: props.background,
  position: 'relative',
  padding: props.padding || 0,
  textAlign: props.textAlign || 'center',
}));

// A generic fluid header with options to customize the CSS.
export const Header = (props) => (
  <React.Fragment>
    <GenericHeader {...props}>
      {props.children}
    </GenericHeader>
  </React.Fragment>
);

// The main header for the frontpage.
export const MainHeader = (props) => (
  <React.Fragment>
    <HeaderSection background={props.background} textAlign={props.textAlign}>
      {props.children}
    </HeaderSection>
  </React.Fragment>
);
