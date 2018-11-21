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
import { HeadingH1, Text } from '../components/shared/styles/type';
import { LoadingIcon } from '../components/shared/components/Icons';
import { Brands } from '../components/shared/styles/colors';

class DC extends React.Component {
  state = {
    isLoading: false,
  };

  render() {
    return (
      <React.Fragment>
        <Layout title={'DC Comics | Popular Characters | Comic Cruncher'}>
          <MainHeader background={Brands.DC}>
            <div css={{ 'margin-top': '50px' }}>
              <Flex>
                <Box width={1152} m="0 auto" p={3}>
                  <h1>DC</h1>
                  <Search />
                </Box>
              </Flex>
            </div>
          </MainHeader>
          <MainContent>
            <Flex flexWrap={'wrap'} m={'30px auto'} p={3}>
              <Box width={[1]}>
                <HeadingH1>Popular DC Characters</HeadingH1>
                <Text.Default>
                  <p>
                    This page shows most popular DC characters by <strong>main</strong> appearances only (no alternate
                    alternate realities)!
                  </p>
                </Text.Default>
              </Box>
            </Flex>
            <Flex pl={3}>
              <Box>
                {!this.state.isLoading && (
                  <CharactersList characters={this.state.characters || this.props.characters} referer="/dc" />
                )}
                {this.state.isLoading && (
                  <div css={loadingDiv}>
                    <LoadingIcon />
                  </div>
                )}
              </Box>
            </Flex>
          </MainContent>
        </Layout>
      </React.Fragment>
    );
  }
}

DC.getInitialProps = async ({ req }) => {
  const res2 = await request.get('https://api.comiccruncher.com/publishers/dc?key=batmansmellsbadly');
  return {
    characters: res2.body,
  };
};

DC.propTypes = {
  characters: PropTypes.shape({
    meta: PropTypes.shape({
      status_code: PropTypes.number,
      error: PropTypes.string,
    }),
    data: PropTypes.arrayOf(RankedCharacterProps),
  }),
};

export default withRouter(DC);
