import React, { useState } from 'react';
import cx from 'classnames';
import Block from './Block';
import { collapsedReducer } from '../../utils/helpers';
import { faqsList } from '../../config';

const CollapsedList = () => {
  const [activeExpand, setActiveExpand] = useState(-1);
  const [state, dispatch] = React.useReducer(collapsedReducer, false);
  const [showMore, setShowMore] = useState(false);
  const toggleActive = (index) => {
    setActiveExpand(index);
    dispatch({ type: 'toggle', index });
    if (index === activeExpand) {
      dispatch({ type: 'hide', index });
    }
    if (index === activeExpand && !state[index]) {
      dispatch({ type: 'toggle', index });
    }
  };
  const showMoreHandler = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className="collapsed-list">
      <div className="section-heading" style={{ color: '#212121' }}>
        FAQ
      </div>
      <div className={cx('faq-list', { 'faq-list--expand': showMore })}>
        {faqsList.map((block) => (
          <Block
            lastElement={block.last}
            key={block.key}
            title={block.title}
            isOpen={state[block.key]}
            onToggle={() => toggleActive(block.key)}
          >
            <div className="collapsed-content ">
              <p>{block.description}</p>
            </div>
          </Block>
        ))}
      </div>
      <div className="btn-group">
        {' '}
        <button type="button" className="btn white" onClick={showMoreHandler}>
          {!showMore ? '↖ See more ' : '↖ Roll up'}
        </button>
      </div>
    </div>
  );
};
export default CollapsedList;
