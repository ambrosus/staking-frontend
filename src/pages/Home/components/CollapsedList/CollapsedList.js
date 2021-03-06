import React, { useCallback, useReducer, useState } from 'react';
import cx from 'classnames';
import Block from './Block';
import { collapsedReducer } from 'utils/reducers';
import { useSafeDispatch } from 'hooks';

const CollapsedList = ({PData}) => {
  const [activeExpand, setActiveExpand] = useState(-1);
  const [showMore, setShowMore] = useState(false);
  const [state, unsafeDispatch] = useReducer(collapsedReducer, false);
  const dispatch = useSafeDispatch(unsafeDispatch);

  const toggleActive = useCallback(
    (index) => {
      setActiveExpand(index);
      dispatch({ type: 'toggle', index });
      if (index === activeExpand) {
        dispatch({ type: 'hide', index });
      }
      if (index === activeExpand && !state[index]) {
        dispatch({ type: 'toggle', index });
      }
    },
    [activeExpand, state],
  );

  const showMoreHandler = () => {
    setShowMore((prev) => !prev);
  };

    return (
    <div className="collapsed-list">
      <div className="back-figure6" />

      <div className="section-heading" style={{ color: '#212121' }}>
          {PData.faq_title}
      </div>
      <div
        className={cx(' faq-list', {
          'faq-list--expand': showMore,
        })}
      >
        {PData.faqsList.map((block) => (
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
        <div className={`${!showMore && 'gradiento'}`} />
      </div>

      <div className="btn-group" style={{ paddingTop: 50 }}>
        {' '}
        <button type="button" className="btn white" onClick={showMoreHandler}>
          {!showMore ? PData.see_more : PData.roll_up}
        </button>
      </div>
    </div>
  );
};
export default React.memo(CollapsedList);
