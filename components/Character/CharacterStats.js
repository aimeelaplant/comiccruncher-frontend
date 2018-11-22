import React from 'react';
import CountUp from 'react-countup';
import { Box, Flex } from 'rebass/emotion';
import { Title, Text } from '../shared/styles/type';
import { StatBlock } from '../Stats/Stats';

export const CharacterStats = (props) => {
  const c = props;
  const allTime = c.stats ? c.stats.find((stat) => stat.category === 'all_time') : null;
  const main = c.stats ? c.stats.find((stat) => stat.category === 'main') : null;
  return (
    <React.Fragment>
      {allTime &&
        main && (
          <React.Fragment>
            <Flex flexWrap={'wrap'} mt={30} mb={30}>
              <Box width={[1 / 2, 1 / 4, 1 / 4, 1 / 4]}>
                <div className={StatBlock} style={{ transform: 'rotate(6deg)' }}>
                  <Title.Red>
                    #<CountUp end={allTime.issue_count_rank} />
                  </Title.Red>
                  <Text.Default bold>All Time</Text.Default>
                </div>
              </Box>
              <Box width={[1 / 2, 1 / 4, 1 / 4, 1 / 4]}>
                <div className={StatBlock} style={{ transform: 'rotate(6deg)' }}>
                  <Title.Red>
                    #<CountUp end={main.issue_count_rank} />
                  </Title.Red>
                  <Text.Default bold>{c.publisher.name}</Text.Default>
                </div>
              </Box>
              <Box width={[1 / 2, 1 / 4, 1 / 4, 1 / 4]}>
                <div className={StatBlock} style={{ transform: 'rotate(6deg)' }}>
                  <Title.Red>
                    #<CountUp end={main.average_issues_per_year_rank} />
                  </Title.Red>
                  <Text.Default bold>avg issues/year</Text.Default>
                </div>
              </Box>
              <Box width={[1 / 2, 1 / 4, 1 / 4, 1 / 4]}>
                <div className={StatBlock} style={{ transform: 'rotate(6deg)' }}>
                  <Title.Red>
                    <CountUp end={main.average_issues_per_year} />
                  </Title.Red>
                  <Text.Default bold>avg issues/year</Text.Default>
                </div>
              </Box>
            </Flex>
          </React.Fragment>
        )}
    </React.Fragment>
  );
};
