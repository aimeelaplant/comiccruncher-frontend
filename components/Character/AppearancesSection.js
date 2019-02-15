import React, { Fragment } from 'react';
import { Flex, Box } from 'rebass/emotion';
import { Section, Text } from '../shared/styles/type';
import { FullCharacterProps } from './Types';
import AppearanceChart from './AppearanceChart';

const prevNextReduce = (prev, next) => prev + next;

export const AppearancesSection = ({ character }) => {
  const { appearances, last_syncs } = character;
  const { aggregates } = appearances;
  const doMap = aggregates && aggregates.length !== 0;
  const mainCounts = doMap ? aggregates.map((item) => item.main).reduce(prevNextReduce) : 0;
  const altCounts = doMap ? aggregates.map((item) => item.alternate).reduce(prevNextReduce) : 0;
  const lastSyncs = last_syncs ? last_syncs.slice(0, 2) : [];
  const newIssues = lastSyncs.length == 2 ? lastSyncs[0].num_issues - lastSyncs[1].num_issues : 0;
  return (
    <Fragment>
      {appearances && (
        <Fragment>
          <Section.Title>
            <h3>Appearances per year</h3>
          </Section.Title>
          <Flex flexWrap="wrap" alignItems="center" alignContent="center">
            <Box width={[1, 1 / 3, 1 / 3]}>
              <Section.Byline>
                <Text.Default>
                  <strong>{mainCounts + altCounts}</strong> total appearances
                </Text.Default>
              </Section.Byline>
            </Box>
            <Box width={[1, 1 / 3, 1 / 3]}>
              <Section.Byline>
                <Text.Default>
                  <strong>{mainCounts}</strong> main reality appearances
                </Text.Default>
              </Section.Byline>
            </Box>
            <Box width={[1, 1 / 3, 1 / 3]}>
              <Section.Byline>
                <Text.Default>
                  <strong>{altCounts}</strong> alternate reality appearances
                </Text.Default>
              </Section.Byline>
            </Box>
          </Flex>
          {doMap && (
            <Fragment>
              <AppearanceChart character={character} />
              <Flex flexWrap="wrap" alignItems="center" alignContent="center" py={16}>
                <Box width={[1]}>
                  {lastSyncs && (
                    <Text.Small>
                      Last synced at {new Date(lastSyncs[0].synced_at).toLocaleDateString('en-us')}{' '}
                      {`with ${newIssues} new issues analyzed`}
                    </Text.Small>
                  )}
                </Box>
              </Flex>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

AppearancesSection.propTypes = {
  character: FullCharacterProps.isRequired,
};
