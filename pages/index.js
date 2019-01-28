import React, { Fragment } from 'react';
import Head from 'next/head';
import { Flex, Box } from 'rebass/emotion';
import styled from 'react-emotion';
import { Title, Section } from '../components/shared/styles/type';
import Spacing from '../components/shared/styles/spacing';
import PropTypes from 'prop-types';
import CharactersList from '../components/Character/CharactersList';
import { RankedCharacterProps } from '../components/Character/Types';
import { Stats } from '../components/Stats/Stats';
import { MainHeader } from '../components/Layout/Header';
import { WithFooter, MainPageFlex } from '../components/Layout/Content';
import Layout from '../components/Layout/Layout';
import ErrorDisplayTracker from '../components/shared/components/Error';
import { getHomeProps } from './_utils';

const InnerHeader = styled(Box)({
  width: '100%',
  height: '100%',
  paddingBottom: Spacing.xxLarge,
  paddingTop: Spacing.xxLarge,
});

const Home = ({ meta, stats, characters }) => (
  <Fragment>
    <Layout>
      <Head>
        <title>Home | All-Time Popular Characters | Comic Cruncher</title>
      </Head>
      <MainHeader>
        <Flex flexWrap="wrap" alignItems="center" alignContent="center" justifyContent="center">
          <InnerHeader alignSelf="center">
            <Title.Large>Comic Book Appearances</Title.Large>
            <Title.Byline>See popular character appearances</Title.Byline>
            {stats && <Stats {...stats.data} />}
          </InnerHeader>
        </Flex>
      </MainHeader>
      <WithFooter>
        <MainPageFlex>
          <Box width={[1]}>
            <Section.Title>
              <h1>Popular Characters</h1>
            </Section.Title>
            {meta &&
              meta.error && (
                <ErrorDisplayTracker
                  status_code={meta.status_code}
                  error="Sorry, we couldn't load the characters. The issue has been logged!"
                />
              )}
          </Box>
        </MainPageFlex>
        {characters && <CharactersList characters={characters} referer="/" />}
      </WithFooter>
    </Layout>
  </Fragment>
);

Home.getInitialProps = async ({ req, res }) => {
  const result = await getHomeProps(req, res);
  return {
    stats: result.hasOwnProperty('stats') ? result.stats : null,
    characters: result.hasOwnProperty('characters') ? result.characters : null,
    meta: result.meta,
  };
};

Home.propTypes = {
  meta: PropTypes.shape({
    status_code: PropTypes.number,
    error: PropTypes.string,
  }),
  stats: PropTypes.shape({
    data: PropTypes.shape({
      total_characters: PropTypes.number,
      total_appearances: PropTypes.number,
      min_year: PropTypes.number,
      max_year: PropTypes.number,
      total_issues: PropTypes.number,
    }),
  }),
  characters: PropTypes.shape({
    data: PropTypes.arrayOf(RankedCharacterProps),
  }),
};

export default Home;
