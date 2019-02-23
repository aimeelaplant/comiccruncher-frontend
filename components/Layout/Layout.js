import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import getConfig from 'next/config';
import { withRouter } from 'next/router';
import { injectGlobal } from 'emotion';
import Responsive from '../shared/styles/responsive';
import { UI, Palette } from '../shared/styles/colors';
import { UIFontStack } from '../shared/styles/type';
import Spacing from '../shared/styles/spacing';
import Navigation from './Navigation';
import { withCache } from '../emotion/cache';

const { siteURL, cdnURL } = getConfig().publicRuntimeConfig;

injectGlobal`
  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: inherit;
    font-size: inherit;
  }

  html {
    -webkit-text-size-adjust: 100%; /* Prevent font scaling in landscape while allowing user zoom */
    -ms-text-size-adjust: 100%;
  }

  .app {
    width: 100%;
    max-width: 1152px;
    margin: 0 auto ${Spacing.xLarge}px;
    border-top: 4px solid ${UI.Background.Dark};
    border-bottom: 4px solid ${UI.Background.Dark};
    border-right: 4px solid ${UI.Background.Dark};
    border-left: 3px solid ${UI.Background.Dark};
    box-shadow: 15px 10px ${UI.Background.Dark};
  }

  .react-autosuggest__container {
    position: relative;
    font-family: ${UIFontStack};
    font-weight: 400;
    font-size: 14px;
  }

  .react-autosuggest__input {
    width: 240px;
    height: 30px;
    padding: 10px 20px;
    border: 1px solid ${UI.Border.Dark};
    border-radius: 0;
  }

  .react-autosuggest__container--open .react-autosuggest__input {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__container--open .react-autosuggest__suggestions-container {
    display: block;
    position: absolute;
    width: 100%;
    border: 2px solid ${UI.Border.Dark};
    border-radius: 0;
    background-color: ${UI.Background.White};
    z-index: 15;
    top: 100%;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 16px;
  }

  .react-autosuggest__suggestion:not(:first-child) {
    border-top: 1px solid ${UI.Border.Light};
  }

  .react-autosuggest__suggestion--highlighted {
    background: ${UI.Background.PaleGray};
    outline: normal;
  }

  .react-autosuggest__suggestion--focused {
    background-color: ${UI.Background.PaleGray};
    color: ${UI.Text.White};
  }

  .suggestion-content {
    display: flex;
    align-items: center;
    background-repeat: no-repeat;
    font-size: 14px;
    line-height: 1.4;
    font-family: ${UIFontStack};
    font-weight: 400;
  }

  .name {
    margin-left: 0;
    line-height: 45px;
  }

  .highlight {
    color: #ee0000;
    font-weight: bold;
  }

  .react-autosuggest__suggestion--focused .highlight {
    color: #120000;
  }

  .Modal {
    position:relative;
    height: auto;
    border:0;
    margin: 0 auto;
    width:100%;
    max-width: 1152px;
    border: 4px solid #000;
    box-shadow: 10px 10px #1f1f1f;
    margin: 0 auto;
    outline: 0;
  }

  .Overlay {
    -webkit-overflow-scrolling: touch;
    position: fixed;
    background: rgba(0,0,0,.6);
    bottom: 0;
    left: 0;
    overflow: auto;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100;
    padding: ${Spacing.Small}px;
  }

  ${Responsive.Mobile} {
    .Overlay {
      padding: 0;
    }
  }

  @keyframes blowUpModal {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes blowUpModalTwo {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }

  .ReactModal__Body--open {
    overflow: hidden!important;
    width: 100%;
  }

  .ReactModal__Overlay {
    background: rgba(0,0,0,.7);
  }

  .ReactModal__Content--after-open{
    animation: blowUpModal 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    opacity: 1;

  }
  .ReactModal__Content--before-close{
    opacity: 0;
  }

  .recharts-legend-item {
    margin-top: 5px;
  }
`;

const Layout = ({
  children,
  navBackground,
  router,
  canonical = null,
  description = null,
  image = null,
  socialTitle = null,
}) => (
  <Fragment>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href={`${cdnURL}/fonts/fonts.css`} rel="stylesheet" />
      <link rel="apple-touch-icon-precomposed" sizes="57x57" href={`${cdnURL}/apple-touch-icon-57x57.png`} />
      <link rel="apple-touch-icon-precomposed" sizes="114x114" href={`${cdnURL}/apple-touch-icon-114x114.png`} />
      <link rel="apple-touch-icon-precomposed" sizes="72x72" href={`${cdnURL}/apple-touch-icon-72x72.png`} />
      <link rel="apple-touch-icon-precomposed" sizes="144x144" href={`${cdnURL}/apple-touch-icon-144x144.png`} />
      <link rel="apple-touch-icon-precomposed" sizes="60x60" href={`${cdnURL}/apple-touch-icon-60x60.png`} />
      <link rel="apple-touch-icon-precomposed" sizes="120x120" href={`${cdnURL}/apple-touch-icon-120x120.png`} />
      <link rel="apple-touch-icon-precomposed" sizes="76x76" href={`${cdnURL}/apple-touch-icon-76x76.png`} />
      <link rel="apple-touch-icon-precomposed" sizes="152x152" href={`${cdnURL}/apple-touch-icon-152x152.png`} />
      <link rel="icon" type="image/png" href={`${cdnURL}/favicon-196x196.png`} sizes="196x196" />
      <link rel="icon" type="image/png" href={`${cdnURL}/favicon-96x96.png`} sizes="96x96" />
      <link rel="icon" type="image/png" href={`${cdnURL}/favicon-32x32.png`} sizes="32x32" />
      <link rel="icon" type="image/png" href={`${cdnURL}/favicon-16x16.png`} sizes="16x16" />
      <link rel="icon" type="image/png" href={`${cdnURL}/favicon-128.png`} sizes="128x128" />
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta name="msapplication-TileImage" content={`${cdnURL}/mstile-144x144.png`} />
      <meta name="msapplication-square70x70logo" content={`${cdnURL}/mstile-70x70.png`} />
      <meta name="msapplication-square150x150logo" content={`${cdnURL}/mstile-150x150.png`} />
      <meta name="msapplication-wide310x150logo" content={`${cdnURL}/mstile-310x150.png`} />
      <meta name="msapplication-square310x310logo" content={`${cdnURL}/mstile-310x310.png`} />
      <meta property="og:site_name" content="Comic Cruncher" />
      {canonical !== null && (
        <Fragment>
          <link rel="canonical" href={`${siteURL}${canonical}`} />
          <meta property="og:url" content={`${siteURL}${canonical}`} />
          <meta property="twitter:url" content={`${siteURL}${canonical}`} />
        </Fragment>
      )}
      {description && (
        <Fragment>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </Fragment>
      )}
      {image && (
        <Fragment>
          <meta property="og:image" content={image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={image} />
        </Fragment>
      )}
      {socialTitle && (
        <Fragment>
          <meta property="og:title" content={socialTitle} />
          <meta name="twitter:title" content={socialTitle} />
        </Fragment>
      )}
    </Head>
    <div className="app">
      <Navigation background={navBackground} activeHref={router.asPath} />
      {children}
    </div>
  </Fragment>
);

Layout.propTypes = {
  router: PropTypes.object,
  navBackground: PropTypes.string,
  children: PropTypes.node,
  canonical: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  socialTitle: PropTypes.string,
};

export default withRouter(Layout);
