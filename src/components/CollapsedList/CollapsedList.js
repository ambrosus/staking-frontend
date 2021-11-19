import React, { useState } from 'react';
import Block from './Block';
import Paragraph from '../Paragraph';
import { collapsedReducer } from '../../utils/helpers';

const CollapsedList = () => {
  const [activeExpand, setActiveExpand] = useState(-1);
  const initialState = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  const [state, dispatch] = React.useReducer(collapsedReducer, initialState);

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
    <div className="collapsed-list Halvar_Breit">
      <div className="collapsed-list__heading">Arcadia Staking FAQs</div>
      <Block
        title="What is Ambrosus and what is the AMB coin?"
        isOpen={state[0]}
        onToggle={() => toggleActive(0)}
      >
        <div className="collapsed-content Proxima_Nova  ">
          <Paragraph style={{ color: '#9C9C9C' }} size="m-400">
            Ambrosus is a decentralized network of over hundreds of masternodes,
            each validating or storing data from assets and corresponding events
            from supply chains, IoT devices, and more.
            <br />
            AMB is used to keep information on the Ambrosus network up to date
            as tracked products and objects move across a supply chain. The coin
            enables a transparent ecosystem with trustworthy information that
            can be accessed by interested parties.
          </Paragraph>
        </div>
      </Block>
      <Block
        title="How does Arcadia Staking work?"
        isOpen={state[1]}
        onToggle={() => toggleActive(1)}
      >
        <div className="collapsed-content Proxima_Nova">
          <Paragraph style={{ color: '#9C9C9C' }} size="m-400">
            Arcadia allows users to stake AMB coins quickly, without having to
            set up a node manually. Here is how the automation works—all coins
            that go into one of the pools are distributed among running nodes.
            When there is a sufficient amount in the pool to enable another
            node, it will be automatically configured and launched.
          </Paragraph>
        </div>
      </Block>
      <Block
        title="Why stake AMB?"
        isOpen={state[2]}
        onToggle={() => toggleActive(2)}
      >
        <div className="collapsed-content Proxima_Nova">
          <Paragraph style={{ color: '#9C9C9C' }} size="m-400">
            The simplest answer—you earn great rewards while contributing to an
            ecosystem that is constantly expanding through successful
            partnerships and real, working solutions. What’s more, you have the
            flexibility to unstake your coins at any time.{' '}
          </Paragraph>
        </div>
      </Block>
      <Block
        title="Can I trade AMB coins when they are staked?"
        isOpen={state[3]}
        onToggle={() => toggleActive(3)}
      >
        <div className="collapsed-content Proxima_Nova">
          <Paragraph style={{ color: '#9C9C9C' }} size="m-400">
            No, you cannot trade staked coins.
          </Paragraph>
        </div>
      </Block>
      <Block
        title="How often are rewards distributed?"
        isOpen={state[4]}
        onToggle={() => toggleActive(4)}
      >
        <div className="collapsed-content Proxima_Nova">
          <Paragraph style={{ color: '#9C9C9C' }} size="m-400">
            Payments occur approximately every 6 hours, with your reward
            automatically being added to your stake.
          </Paragraph>
        </div>
      </Block>
      <Block
        title="Does staking generate the same rewards as setting up a masternode?"
        isOpen={state[5]}
        onToggle={() => toggleActive(5)}
      >
        <div className="collapsed-content Proxima_Nova">
          <Paragraph style={{ color: '#9C9C9C' }} size="m-400">
            No, as staking is a simplified way of setting up a node. Those who
            have the required amount of AMB and set up a masternode receive
            greater rewards.{' '}
          </Paragraph>
        </div>
      </Block>
      <Block
        title="When can I redeem my staked AMB?"
        isOpen={state[6]}
        onToggle={() => toggleActive(6)}
      >
        <div className="collapsed-content Proxima_Nova">
          <Paragraph style={{ color: '#9C9C9C' }} size="m-400">
            You can redeem staked AMB at any time and withdraw instantly.
          </Paragraph>
        </div>
      </Block>
      <Block
        title="What is the minimum & maximum amount of AMB that can be staked?"
        lastElement
        isOpen={state[7]}
        onToggle={() => toggleActive(7)}
      >
        <div className="collapsed-content Proxima_Nova">
          <Paragraph style={{ color: '#9C9C9C' }} size="m-400">
            The minimum staking amount is 1000 AMB, and there is no upper limit
            to the amount of AMB that can be staked.
          </Paragraph>
        </div>
      </Block>
      <Block
        title="Are there any staking fees?"
        lastElement
        isOpen={state[8]}
        onToggle={() => toggleActive(8)}
      >
        <div className="collapsed-content Proxima_Nova">
          <Paragraph style={{ color: '#9C9C9C' }} size="m-400">
            The commission is set by the pool owner upon creation and cannot be
            changed. We recommend setting the commission between 20% and 30%.
            <br /> Importantly, commission is accrued from staked rewards only,
            not the initial staked AMB.{' '}
          </Paragraph>
        </div>
      </Block>
    </div>
  );
};
export default CollapsedList;
