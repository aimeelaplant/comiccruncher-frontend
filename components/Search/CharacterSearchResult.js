import React from 'react';
import Link from 'next/link';
import styled from 'react-emotion';
import Spacing from '../shared/styles/spacing';
import { Text } from '../shared/styles/type';
import { withCache } from '../emotion/cache';

const SearchResult = styled('div')`
  display: flex;
  align-items: center;
  text-align: left;
`;

const SearchImg = styled('img')({
  width: '50px',
  height: '50px',
  objectFit: 'cover',
  marginRight: Spacing.Small,
});

const SearchLink = styled('a')({
  textDecoration: 'none',
});

const DisplayName = (props) => (
  <React.Fragment>
    {(props.image || props.vendor_image) && <SearchImg src={props.image || props.vendor_image} alt={props.name} />}
    <Text.SearchResult>
      <p>
        <strong>{props.name}</strong>
      </p>
      {props.other_name && <p>{props.other_name}</p>}
    </Text.SearchResult>
  </React.Fragment>
);

export const CharacterSearchResult = (props) => (
  <div>
    <span className={'suggestion-content ' + props.slug}>
      <span className="name">
        <Link href={`/characters/${encodeURIComponent(props.slug)}`}>
          <SearchLink onClick={props.onClick}>
            <SearchResult>
              {/* lol if there is no suggestion, then display no results... */}
              {props.slug === 'no-suggestion' ? <p>No results.</p> : <DisplayName {...props} />}
            </SearchResult>
          </SearchLink>
        </Link>
      </span>
    </span>
  </div>
);
