import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import getConfig from 'next/config';
import { withRouter } from 'next/router';
import { Flex, Box } from 'rebass/emotion';
import PropTypes from 'prop-types';
import Layout from '../components/Layout/Layout';
import CharactersList from '../components/Character/CharactersList';
import { RankedCharacterProps } from '../components/Character/Types';
import { MainHeader } from '../components/Layout/Header';
import { MainContent } from '../components/Layout/Content';
import { Title, Section, Text } from '../components/shared/styles/type';

const trendingURL = getConfig().publicRuntimeConfig.API.trendingURL;

const Trending = ({ characters, error }) => (
  <Layout canonical={'/trending'}>
    <Head>
      <title>Marvel Comics | Popular Characters | Comic Cruncher</title>
    </Head>
    <MainHeader>
      <Flex
        flexWrap="wrap"
        alignItems="center"
        alignContent="center"
        justifyContent="center"
        flexDirection="column"
        style={{ height: '420px' }}
      >
        <Box alignSelf="center" p={3}>
          <Title.Large>
            <h1>Trending Characters</h1>
          </Title.Large>
          <Title.Byline>Currently popular characters from Marvel and DC</Title.Byline>
        </Box>
      </Flex>
    </MainHeader>
    <MainContent>
      <Flex flexWrap={'wrap'} m={'30px auto'} p={3}>
        <Box width={[1]}>
          <Section.Title>
            <h2>Trending Marvel Characters</h2>
          </Section.Title>
          <Text.Default>
            {error ? (
              <p>{error}</p>
            ) : (
              <p>
                This page shows trending Marvel characters by <strong>main</strong> appearances only (no alternate
                realities)!
              </p>
            )}
          </Text.Default>
        </Box>
      </Flex>
      {!error && <CharactersList characters={characters} referer="/trending" />}
    </MainContent>
  </Layout>
);

Trending.getInitialProps = async ({ req }) => {
  const res = await axios.get(`${trendingURL}/marvel?key=batmansmellsbadly`).catch((error) => {
    return { error: error.toString() };
  });
  return {
    error: res.hasOwnProperty('error') ? res.error : null,
    characters: res.hasOwnProperty('data') ? res.data : null,
  };
};

Trending.propTypes = {
  error: PropTypes.string,
  characters: PropTypes.shape({
    meta: PropTypes.shape({
      status_code: PropTypes.number,
      error: PropTypes.string,
    }),
    data: PropTypes.arrayOf(RankedCharacterProps),
  }),
};

export default withRouter(Trending);
