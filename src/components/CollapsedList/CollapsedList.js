import React from 'react';
import Block from './Block';
import collapsedReducer from '../../utils/collapsedReducer';
import P from '../P';

function CollapsedList() {
  const initialState = [false, false, false];

  const [state, dispatch] = React.useReducer(collapsedReducer, initialState);

  return (
    <div className="collapsed-list">
      <div
        className="collapsed-list__heading"
        style={{ paddingBottom: 60, paddingTop: 120 }}
      >
        FAQ
      </div>
      <Block
        title="What is Lorem Ipsum?"
        isOpen={state[0]}
        onToggle={() => dispatch({ type: 'toggle', index: 0 })}
      >
        <div className="collapsed-content">
          <P size="m-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </P>
        </div>
      </Block>
      <Block
        title="Why do we use it?
"
        isOpen={state[1]}
        onToggle={() => dispatch({ type: 'toggle', index: 1 })}
      >
        <div className="collapsed-content">
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using , making it look like
            readable English. Many desktop publishing packages and web page
            editors now use Lorem Ipsum as their default model text, and a
            search for will uncover many web sites still in their infancy.
            Various versions have evolved over the years, sometimes by accident,
            sometimes on purpose (injected humour and the like).
          </p>
        </div>
      </Block>
      <Block
        title="Where does it come from?"
        lastElement
        isOpen={state[3]}
        onToggle={() => dispatch({ type: 'toggle', index: 3 })}
      >
        <div className="collapsed-content">
          <P size="m-400">
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, comes from a line in
            section 1.10.32.
          </P>
        </div>
      </Block>
    </div>
  );
}
export default CollapsedList;
