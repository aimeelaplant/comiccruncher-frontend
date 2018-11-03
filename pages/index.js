import React from 'react';
import request from 'superagent';
import { withRouter } from 'next/router';
import { Flex, Box } from 'rebass/emotion';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import Layout from '../components/Layout/Layout';
import Logo from '../components/shared/components/Logo';
import StatBlock from '../components/shared/components/StatBlock';
import Search from '../components/Search/Search';
import HeaderSection from '../components/shared/components/HeaderSection';
import Head from 'next/head';
import CharactersList from '../components/Character/CharactersList';
import { CharacterProps } from '../components/Character/Types';
import Footer from '../components/Layout/Footer';
import { Title, Text } from '../components/shared/styles/type';
import { UI } from '../components/shared/styles/colors';

class Home extends React.Component {
  render() {
    const s = this.props.stats.data;
    return (
      <Layout>
        {/* How to render a title ...
          just import the head and use a title.
          You won't overwrite anything else set. */}
        <Head>
          <title>Comic Cruncher!!!</title>
        </Head>
        <HeaderSection>
          <Flex justifyContent="center" alignItems="center" alignContent="center" style={{ height: '100%' }}>
            <Box alignSelf="center">
              <Logo content="Comic Cruncher">Comic Cruncher</Logo>
              <Search />
            </Box>
          </Flex>
        </HeaderSection>
        <Flex justifyContent="center" alignItems="center" alignContent="center" bg={UI.Background.Red}>
          <StatBlock>
            <Title.Red><CountUp end={s.total_characters} /></Title.Red>
            <Text.Default bold>total characters</Text.Default>
          </StatBlock>
          <StatBlock>
            <Title.Red><CountUp end={s.total_appearances} /></Title.Red>
            <Text.Default bold>total appearances</Text.Default>
          </StatBlock>
          <StatBlock>
            <Title.Red><CountUp end={s.total_issues} /></Title.Red>
            <Text.Default bold>total issues</Text.Default>
          </StatBlock>
          <StatBlock>
            <Title.Red><CountUp end={s.min_year} /></Title.Red>
            <Text.Default bold>and on</Text.Default>
          </StatBlock>
        </Flex>
        <CharactersList characters={this.props.characters} />
        <Footer />
      </Layout>
    );
  }
}

Home.getInitialProps = async ({ req }) => {
  const res = await request.get('https://api.comiccruncher.com/stats?key=batmansmellsbadly');
  const res2 = await request.get('https://api.comiccruncher.com/characters?key=batmansmellsbadly');
  return {
    stats: res.body,
    characters: res2.body,
  };
};

Home.propTypes = {
  stats: PropTypes.shape({
    meta: PropTypes.shape({
      status_code: PropTypes.number,
      error: PropTypes.string,
    }),
    data: PropTypes.shape({
      total_characters: PropTypes.number,
      total_appearances: PropTypes.number,
      min_year: PropTypes.number,
      max_year: PropTypes.number,
      total_issues: PropTypes.number,
    }),
  }),
  characters: PropTypes.shape({
    meta: PropTypes.shape({
      status_code: PropTypes.number,
      error: PropTypes.string,
    }),
    data: PropTypes.arrayOf(CharacterProps),
  }),
};

export default withRouter(Home);
