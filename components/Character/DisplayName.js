import React from 'react';
import styled from 'react-emotion';
import { Box, Flex } from '@rebass/grid/emotion';
import Spacing from '../shared/styles/spacing';
import { UI } from '../shared/styles/colors';
import Dimensions from '../shared/styles/dimensions';
import Type, { Title, Section, Text } from '../shared/styles/type';

// Shows the display name of the character.
export const DisplayName = (props) => (
  <div>
    <Text.Default bold>{props.name}</Text.Default>
    <Text.Default>{props.other_name}</Text.Default>
  </div>
);
