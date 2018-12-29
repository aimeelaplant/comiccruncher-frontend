import React from 'react';
import axios from 'axios';
import getConfig from 'next/config';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { Flex, Box } from 'rebass/emotion';
import PropTypes from 'prop-types';
import Layout from '../components/Layout/Layout';
import CharactersList from '../components/Character/CharactersList';
import { RankedCharacterProps } from '../components/Character/Types';
import { MainHeader } from '../components/Layout/Header';
import { MainContent } from '../components/Layout/Content';
import { Title, Section, Text } from '../components/shared/styles/type';
import { Brands } from '../components/shared/styles/colors';

const dcURL = getConfig().publicRuntimeConfig.API.publishersURL + '/dc';

const DC = ({ characters, error }) => (
  <Layout canonical="/dc">
    <Head>
      <title>{`DC Comics | Popular Characters | Comic Cruncher`}</title>
    </Head>
    <MainHeader background={Brands.DC}>
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
            <h1>DC Comics</h1>
          </Title.Large>
        </Box>
      </Flex>
    </MainHeader>
    <MainContent>
      <Flex flexWrap={'wrap'} m={'30px auto'} p={3}>
        <Box width={[1]}>
          <Section.Title>
            <h1>Popular DC Characters</h1>
          </Section.Title>
          <Text.Default>
            {error ? (
              <p>{error}</p>
            ) : (
              <p>
                This page shows most popular DC characters by <strong>main</strong> appearances only (no alternate
                alternate realities)!
              </p>
            )}
          </Text.Default>
        </Box>
      </Flex>
      {!error && <CharactersList characters={characters} referer="/dc" />}
    </MainContent>
  </Layout>
);

DC.getInitialProps = async ({ req }) => {
  const res = await axios.get(`${dcURL}?key=batmansmellsbadly`).catch((error) => {
    return { error: error.toString() };
  });
  return {
    error: res.hasOwnProperty('error') ? res.error : null,
    characters: res.hasOwnProperty('data') ? res.data : null,
  };
};

DC.propTypes = {
  error: PropTypes.string,
  characters: PropTypes.shape({
    meta: PropTypes.shape({
      status_code: PropTypes.number,
      error: PropTypes.string,
    }),
    data: PropTypes.arrayOf(RankedCharacterProps),
  }),
};

export default withRouter(DC);
