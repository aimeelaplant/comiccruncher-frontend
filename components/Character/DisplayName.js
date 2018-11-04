import React from 'react';
import { Text } from '../shared/styles/type';

// Shows the display name of the character.
export const DisplayName = (props) => (
  <div className="DisplayName">
    <Text.Default bold>{props.name}</Text.Default>

    {/* Can we move these stats to FullCharacter.js? */}
    {props.issue_count &&
      props.issue_count_rank && (
        <Text.Default>
          #{props.issue_count_rank}, {props.issue_count} issues
        </Text.Default>
      )}
  </div>
);
