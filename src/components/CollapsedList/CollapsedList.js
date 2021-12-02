import React, { useState } from 'react';
import Block from './Block';
import Paragraph from '../Paragraph';
import { collapsedReducer } from '../../utils/helpers';
import { faqsList } from '../../config';

const CollapsedList = () => {
  const [activeExpand, setActiveExpand] = useState(() => -1);
  const [state, dispatch] = React.useReducer(collapsedReducer, false);

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
