import React from 'react';
import Block from './Block';
import collapsedReducer from '../../utils/collapsedReducer';
import P from '../P';

function CollapsedList() {
  const initialState = [false, false, false];

  const [state, dispatch] = React.useReducer(collapsedReducer, initialState);

  return (
    <div className="collapsed-list">
      <div className="collapsed-list__heading">FAQ</div>
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
          <P size="m-400">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using , making it look like
            readable English. Many desktop publishing packages and web page
            editors now use Lorem Ipsum as their default model text, and a
            search for will uncover many web sites still in their infancy.
            Various versions have evolved over the years, sometimes by accident,
            sometimes on purpose (injected humour and the like).
          </P>
        </div>
      </Block>
      <Block
        title="Can I trade while staking?"
        isOpen={state[2]}
        onToggle={() => dispatch({ type: 'toggle', index: 2 })}
      >
        <div className="collapsed-content">
          <P size="m-400">
            Yes, you can trade your Proof of Stake coins. Your reward will be
            calculated as long as these coins sit in your CEX.IO account, even
            if you place an order. However, once your order is fulfilled, the
            amount of staked coins will change, and your rewards will change
            accordingly.
          </P>
        </div>
      </Block>
      <Block
        title="Where does it come from?
"
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
