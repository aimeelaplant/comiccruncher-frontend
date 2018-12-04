import React from 'react';
import axios from 'axios';
import { withRouter } from 'next/router';
import { Flex, Box } from 'rebass/emotion';
import { Section, Text } from '../components/shared/styles/type';
import Spacing from '../components/shared/styles/spacing';
import PropTypes from 'prop-types';
import Search from '../components/Search/Search';
import CharactersList from '../components/Character/CharactersList';
import { RankedCharacterProps } from '../components/Character/Types';
import { Stats } from '../components/Stats/Stats';
import { MainHeader } from '../components/Layout/Header';
import { MainContent } from '../components/Layout/Content';
import Button from '../components/shared/components/Button';
import Layout from '../components/Layout/Layout';
import { css } from 'react-emotion';
import { withCache } from '../components/emotion/cache';

const buttonDiv = css({
  'text-align': 'right',
  '@media (max-width: 640px)': {
    'text-align': 'left',
  },
});

const charactersURL = 'https://api.comiccruncher.com/characters';
const statsURL = 'https://api.comiccruncher.com/stats';

export class Home extends React.Component {
  state = {
    isMain: true,
    isAlternate: true,
    isLoading: false,
    characters: null,
  };

  handleButton = (e, category) => {
    e.preventDefault();
    if (this.state.isMain || this.state.isAlternate) {
      this.setState({ isLoading: true });
    }
    if (category === `main`) {
      this.setState({ isMain: !this.state.isMain }, this.loadCharacters);
    }
    if (category === `alternate`) {
      this.setState({ isAlternate: !this.state.isAlternate }, this.loadCharacters);
    }
  };

  loadCharacters = (s) => {
    if (!this.state.isMain && !this.state.isAlternate) {
      return;
    }
    let query = '';
    if (!this.state.isMain && this.state.isAlternate) {
      query = 'alternate';
    }
    if (!this.state.isAlternate && this.state.isMain) {
      query = 'main';
    }
    axios.get(charactersURL, { params: { key: 'batmansmellsbadly', type: query } }).then((result) => {
      this.setState({ characters: result.data.data, isLoading: false });
    });
  };

  render() {
    const error = this.props.error;
    const stats = this.props.stats;
    const characters = this.props.characters;
    return (
      <React.Fragment>
        <Layout title={'Home | All-Time Popular Characters | Comic Cruncher'} canonical="/">
          <MainHeader>
            <Flex flexWrap='wrap' alignItems='center' alignContent='center' justifyContent='center'>
              <Box alignSelf='center' style={{width: '100%', height: '100%', paddingBottom: Spacing.xxLarge, paddingTop: Spacing.xxLarge }}>
                  {!error && <Stats {...stats.data} />}
              </Box>
            </Flex>
          </MainHeader>
          <MainContent>
            <Flex flexWrap={'wrap'} m={'30px auto'} pl={3}>
              <Box width={[1, 2 / 4, 2 / 4, 2 / 4]}>
                <Section.Title>
                  <h1>Popular Characters</h1>
                </Section.Title>
                {error && (
                  <Text.Default>
                    <p>{error}</p>
                  </Text.Default>
                )}
                {this.state.isMain && !this.state.isAlternate && <Section.Byline>Main Appearances Only</Section.Byline>}
                {this.state.isAlternate &&
                  !this.state.isMain && <Section.Byline>Alternate Appearances Only</Section.Byline>}
              </Box>
              <Box width={[1, 2 / 4, 2 / 4, 2 / 4]} css={buttonDiv} pr={3}>
                <Button
                  isInactive={!this.state.isMain}
                  style={{ marginRight: '10px' }}
                  type={'dark'}
                  onClick={(e) => this.handleButton(e, 'main')}
                >
                  Main
                </Button>
                <Button
                  isInactive={!this.state.isAlternate}
                  type={'dark'}
                  onClick={(e) => this.handleButton(e, 'alternate')}
                >
                  Alternate
                </Button>
              </Box>
            </Flex>
            {!error && <CharactersList characters={this.state.characters || characters} referer="/" />}
          </MainContent>
        </Layout>
      </React.Fragment>
    );
  }
}

Home.getInitialProps = async ({ req }) => {
  const params = { params: { key: 'batmansmellsbadly' } };
  const res = await Promise.all([axios.get(statsURL, params), axios.get(charactersURL, params)])
    .then(
      axios.spread((stats, characters) => {
        return [stats ? stats.data : [], characters ? characters.data : []];
      })
    )
    .catch((error) => {
      return { error: error.toString() };
    });
  return {
    stats: res ? res[0] : {},
    characters: res ? res[1] : {},
    error: res.hasOwnProperty('error') ? res.error : null,
  };
};

Home.propTypes = {
  error: PropTypes.string,
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
    data: PropTypes.arrayOf(RankedCharacterProps),
  }),
};

export default withRouter(Home);
