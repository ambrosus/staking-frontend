import React from 'react';
import Block from './Block';
import collapsedReducer from '../../utils/collapsedReducer';
import P from '../P';

function CollapsedList() {
  const initialState = [false, false, false, false, false, false];

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
        title="How does AmberStaking work?"
        isOpen={state[0]}
        onToggle={() => dispatch({ type: 'toggle', index: 0 })}
      >
        <div className="collapsed-content">
          <P size="m-400">
            The new AMB staking service allows users to stake AMB coins quickly,
            without having to set up a node. The process of enabling,
            configuring, and onboarding the node is fully automated.
            <br />
            Here is how the automation works — all coins that go into one of the
            pools will be distributed among running nodes, and as soon as there
            is a sufficient amount in the pool to enable another node, it will
            be automatically set up.
          </P>
        </div>
      </Block>
      <Block
        title="Can I trade AMB coins when they are staked?"
        isOpen={state[1]}
        onToggle={() => dispatch({ type: 'toggle', index: 1 })}
      >
        <div className="collapsed-content">
          <p>No, you cannot trade staked coins.</p>
        </div>
      </Block>
      <Block
        title="How often are rewards distributed?"
        isOpen={state[2]}
        onToggle={() => dispatch({ type: 'toggle', index: 2 })}
      >
        <div className="collapsed-content">
          <P size="m-400">
            Payments occur approximately every 6 hours, with your reward
            automatically being added to your stake. However, the coins can be
            unstaked at any time.
          </P>
        </div>
      </Block>
      <Block
        title="When can I redeem my staked AMB?"
        isOpen={state[3]}
        onToggle={() => dispatch({ type: 'toggle', index: 3 })}
      >
        <div className="collapsed-content">
          <P size="m-400">
            You can redeem staked AMB at any time and cash out instantly.
          </P>
        </div>
      </Block>
      <Block
        title="What is the minimum & maximum amount of AMB that can be staked? "
        isOpen={state[4]}
        onToggle={() => dispatch({ type: 'toggle', index: 4 })}
      >
        <div className="collapsed-content">
          <P size="m-400">
            The minimum staking amount is 1000 AMB.
            <br />
            There is no limit to the amount of AMB that can be staked.
          </P>
        </div>
      </Block>
      <Block
        title="Are there any staking fees?"
        lastElement
        isOpen={state[5]}
        onToggle={() => dispatch({ type: 'toggle', index: 5 })}
      >
        <div className="collapsed-content">
          <P size="m-400">
            The commission is set by the pool owner upon creation and cannot be
            changed. We recommend setting the commission at 20%. Importantly,
            commission is accrued from staked rewards only, not the initial
            staked AMB.
          </P>
        </div>
      </Block>
    </div>
  );
}
export default CollapsedList;
