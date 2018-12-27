import React from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import getConfig from 'next/config';
import axios from 'axios';
import styled from 'react-emotion';
import { Flex, Box } from 'rebass/emotion';
import { CharacterCard } from './CharacterCard';
import Button from '../shared/components/Button';
import Modal from 'react-modal';
import { RankedCharacterProps } from './Types';
import FullCharacter from './FullCharacter';
import Spacing from '../shared/styles/spacing';
import { LoadingSVG } from '../shared/components/Icons';
import { Text } from '../shared/styles/type';
import { withCache } from '../emotion/cache';

const charactersURL = getConfig().publicRuntimeConfig.API.charactersURL;

const CharacterLink = styled.a({
  textDecoration: 'none',
});

class CharactersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: props.characters.data,
      hasMoreItems: true,
      nextHref: null,
      error: null,
      currentCharacterData: null,
      isNextPageLoading: false,
      requestedCharacterSlug: null,
    };
  }

  componentDidMount() {
    this.listenBeforePopState();
  }

  /**
   * Loads data for the next page.
   */
  loadData = () => {
    this.setState({ isNextPageLoading: true });
    let link = 'https://api.comiccruncher.com' + this.props.characters.meta.pagination.next_page;
    if (this.state.nextHref) {
      link = this.state.nextHref;
    }
    axios
      .get(link)
      .then((res) => {
        const body = res.data;
        this.setState((prevState) => ({
          characters: prevState.characters.concat(body.data),
          isNextPageLoading: false,
        }));
        const nextPage = body.meta.pagination.next_page;
        if (nextPage) {
          this.setState({ nextHref: 'https://api.comiccruncher.com' + nextPage });
        } else {
          this.setState({ hasMoreItems: false, nextHref: null });
        }
      })
      .catch((err) => {
        this.setState({ error: err.toString() });
      });
  };

  /**
   * Closes the modal and propagates the history change.
   */
  handleModalCloseRequest = () => {
    this.setState(
      {
        currentCharacterData: null,
        requestedCharacterSlug: null,
      },
      () => {
        Router.push(this.props.referer);
      }
    );
  };

  /**
   * Shows the character modal.
   */
  handleModalOpenRequest(e, slug) {
    e.preventDefault();
    this.setState({ requestedCharacterSlug: slug }, () => {
      this.loadCharacter(slug);
    });
  }

  resetCurrentCharacterData() {
    this.setState({ currentCharacterData: null });
  }

  /**
   * Loads the character.
   */
  loadCharacter = (slug) => {
    this.resetCurrentCharacterData();
    slug = encodeURIComponent(slug);
    const link = `${charactersURL}/${slug}`;
    axios
      .get(link, { params: { key: 'batmansmellsbadly' } })
      .then((res) => {
        const data = res.data.data;
        this.setState({ currentCharacterData: data }, () => {
          // todo: fix document.title and <Layout> so we get a dynamic title.
          document.title = `${data.name} ${data.other_name && `(${data.other_name})`} | Comic Cruncher`;
          Router.push(`${this.props.referer}?character=${slug}`, `/characters/${slug}`);
        });
      })
      .catch((error) => {
        this.setState({ error: error.toString() });
      });
  };

  /**
   * Listens on when the route changes and handles opening the modal.
   */
  listenBeforePopState = () => {
    Router.beforePopState(({ url, as, options }) => {
      console.log('listenBeforePopState');
      if (as === this.props.referer) {
        this.handleModalCloseRequest();
      }
      if (url.includes(`${this.props.referer}?character=`) || url.includes('/character?slug=')) {
        Router.push(as);
        return false;
      }
      return true;
    });
  };

  render() {
    const characters = this.state.characters;
    const currentCharacter = this.state.currentCharacterData;
    const reqSlug = this.state.requestedCharacterSlug;
    return (
      <React.Fragment>
        <Flex flexWrap="wrap" alignItems="center" alignContent="center" pl={3}>
          {characters.map((character, i) => {
            return (
              <Box pr={3} pb={3} width={[1, 1 / 3, 1 / 3, 1 / 4]} key={character.slug}>
                <Modal
                  closeTimeoutMS={500}
                  className="Modal"
                  overlayClassName="Overlay"
                  id={character.slug}
                  onRequestClose={this.handleModalCloseRequest}
                  isOpen={currentCharacter ? currentCharacter.slug === character.slug : false}
                  shouldCloseOnOverlayClick={true}
                >
                  <Button
                    onClick={this.handleModalCloseRequest}
                    style={{ position: 'absolute', top: Spacing.Small, right: Spacing.Small, zIndex: 20 }}
                  >
                    Close
                  </Button>
                  {currentCharacter && <FullCharacter character={currentCharacter} showFooterText={false} />}
                </Modal>
                <CharacterLink
                  href={`/characters/${character.slug}`}
                  onClick={(e) => this.handleModalOpenRequest(e, character.slug)}
                >
                  <CharacterCard {...character} isLoading={reqSlug === character.slug} />
                </CharacterLink>
              </Box>
            );
          })}
        </Flex>
        <Flex justifyContent="center" alignItems="center" alignContent="center" py={24}>
          <Box alignSelf="center">
            {this.state.hasMoreItems &&
              !this.state.isNextPageLoading && (
                <Button type="primary" onClick={this.loadData} style={{ textAlign: 'center' }}>
                  Load More
                </Button>
              )}
            {!this.state.error && this.state.isNextPageLoading && <LoadingSVG />}
            {this.state.error && (
              <Text.Default>
                <p>{this.state.error}.</p>
              </Text.Default>
            )}
          </Box>
        </Flex>
      </React.Fragment>
    );
  }
}

CharactersList.propTypes = {
  referer: PropTypes.string,
  characters: PropTypes.shape({
    meta: PropTypes.shape({
      status_code: PropTypes.number,
      error: PropTypes.string,
      pagination: PropTypes.shape({
        previous_page: PropTypes.string,
        current_page: PropTypes.string,
        next_page: PropTypes.string,
      }),
    }),
    data: PropTypes.arrayOf(RankedCharacterProps),
  }),
};

Modal.setAppElement('#__next');

export default withRouter(CharactersList);
