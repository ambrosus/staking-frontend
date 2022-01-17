import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Deposit from '../../../pages/Staking/components/Deposit';
import Withdraw from '../../../pages/Staking/components/Withdraw';
import { useTabs } from 'hooks';

const CollapsedContentTabs = ({ poolInfo }) => {
  const content = [
    {
      idx: 0,
      tab: 'Deposit AMB',
      content: <Deposit depositInfo={poolInfo} />,
    },
    {
      idx: 1,
      tab: 'Unstake',
      content: <Withdraw withdrawContractInfo={poolInfo} />,
    },
  ];
  const { currentItem, changeItem, selectedTabIndex } = useTabs(0, content);

  return (
    <div className="collapsed-content__body">
      <div className="collapsed-content__body__tabs-titles">
        {content.map((section, idx) => (
          <div
            key={section.tab}
            onClick={() => changeItem(idx)}
            role="presentation"
            className={cx('collapsed-content__body__tabs-titles--tab', {
              'active-tab': selectedTabIndex === section.idx,
            })}
          >
            <p>
              <span style={{ fontWeight: 'normal', fontSize: 20 }}>
                {section.tab}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div>{currentItem.content}</div>
    </div>
  );
};

CollapsedContentTabs.propTypes = {
  poolInfo: PropTypes.object,
};

export default React.memo(CollapsedContentTabs);
