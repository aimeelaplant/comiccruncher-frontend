import React from 'react';
import request from 'superagent';
import { withRouter } from 'next/router';
import { Flex, Box } from 'rebass/emotion';
import PropTypes from 'prop-types';
import Layout from '../components/Layout/Layout';
import Search from '../components/Search/Search';
import CharactersList from '../components/Character/CharactersList';
import { RankedCharacterProps } from '../components/Character/Types';
import { MainHeader } from '../components/Layout/Header';
import { MainContent } from '../components/Layout/Content';
import { Section, Text } from '../components/shared/styles/type';
import { Brands } from '../components/shared/styles/colors';

class Marvel extends React.Component {
  state = {
    isLoading: false,
  };

  render() {
    return (
      <React.Fragment>
        <Layout title={'Marvel Comics | Popular Characters | Comic Cruncher'}>
          <MainHeader background={Brands.Marvel}>
            <div css={{ 'margin-top': '50px' }}>
              <Flex>
                <Box width={1152} m="0 auto" p={3}>
                  <h1>Marvel</h1>
                  <Search />
                </Box>
              </Flex>
            </div>
          </MainHeader>
          <MainContent>
            <Flex flexWrap={'wrap'} m={'30px auto'} p={3}>
              <Box width={[1]}>
                <Section.Title>
                  <h1>Popular Marvel Characters</h1>
                </Section.Title>
                <Text.Default>
                  <p>
                    This page shows most popular Marvel characters by <strong>main</strong> appearances only (no
                    alternate realities)!
                  </p>
                </Text.Default>
              </Box>
            </Flex>
            <CharactersList characters={this.state.characters || this.props.characters} referer="/marvel" />
          </MainContent>
        </Layout>
      </React.Fragment>
    );
  }
}

Marvel.getInitialProps = async ({ req }) => {
  const res2 = await request.get('https://api.comiccruncher.com/publishers/marvel?key=batmansmellsbadly');
  return {
    characters: res2.body,
  };
};

Marvel.propTypes = {
  characters: PropTypes.shape({
    meta: PropTypes.shape({
      status_code: PropTypes.number,
      error: PropTypes.string,
    }),
    data: PropTypes.arrayOf(RankedCharacterProps),
  }),
};

export default withRouter(Marvel);
