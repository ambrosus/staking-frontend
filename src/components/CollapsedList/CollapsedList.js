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
        title="What is staking coins?"
        isOpen={state[0]}
        onToggle={() => dispatch({ type: 'toggle', index: 0 })}
      >
        <div className="collapsed-content">
          <P size="m-400">
            Put simply, staking is holding funds in a cryptocurrency wallet to
            maintain a blockchain network’s operations.
          </P>
        </div>
      </Block>
      <Block
        title="How to participate in CEX.IO staking?"
        isOpen={state[1]}
        onToggle={() => dispatch({ type: 'toggle', index: 1 })}
      >
        <div className="collapsed-content">
          <P size="m-400">
            To start participating in staking, you just need to buy supported
            staking crypto on CEX.IO or deposit it to your CEX.IO account. Your
            staking reward will be added to your balance automatically. No
            additional actions are required.
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
        title="What is Proof of Stake?"
        isOpen={state[3]}
        onToggle={() => dispatch({ type: 'toggle', index: 3 })}
      >
        <div className="collapsed-content">
          <P size="m-400">
            Proof of Stake (PoS) is a consensus mechanism. Unlike Proof of Work,
            in which miners solve equations to mine coins, with PoS validators
            “stake” coins in exchange for the right to validate blocks on a
            network. After new blocks are produced, the validators receive a
            reward. The advantage of PoS consensus is that it requires less
            computing power to mine coins and also gives PoS validators another
            source of income.
          </P>
        </div>
      </Block>
      <Block
        title="How does CEX.IO calculate and send rewards?"
        isOpen={state[4]}
        onToggle={() => dispatch({ type: 'toggle', index: 4 })}
      >
        <div className="collapsed-content">
          <P size="m-400">
            Rewards are calculated every hour and are sent to your account once
            a month. In the future, we’ll work on increasing the frequency of
            payouts. If you hold coins less than a month, your reward will still
            be calculated for the period you held the coins in question.
          </P>
        </div>
      </Block>
    </div>
  );
}
export default CollapsedList;
