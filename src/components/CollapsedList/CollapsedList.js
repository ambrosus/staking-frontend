import React, { useCallback, useReducer, useState } from 'react';
import Block from './Block';
import Paragraph from '../Paragraph';
import { collapsedReducer } from '../../utils/reducers';
import { faqsList } from '../../config';
import { useSafeDispatch } from '../../hooks';

const CollapsedList = () => {
  const [activeExpand, setActiveExpand] = useState(-1);
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
  return (
    <div className="collapsed-list">
      <div className="collapsed-list__heading">Arcadia Staking FAQs</div>
      {faqsList.map((block) => (
        <Block
          key={block.key}
          title={block.title}
          isOpen={state[block.key]}
          onToggle={() => toggleActive(block.key)}
        >
          <div className="collapsed-content ">
            <Paragraph style={{ color: '#9C9C9C' }} size="m-400">
              {block.description}
            </Paragraph>
          </div>
        </Block>
      ))}
    </div>
  );
};
export default CollapsedList;
