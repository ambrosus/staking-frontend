import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import P from '../../../../components/P';
import ButtonGroup from '../../../../components/ButtonGroup';

const Withdraw = ({ hideModal }) => {
  const [inputValue, setInputValue] = useState();
  return (
    <div className="deposit">
      <div className="deposit-heading">Amount</div>
      <div className="deposit-actions">
        <Input
          onchange={setInputValue}
          iconLeft
          placeholder="0.000"
          value={inputValue}
          type="number"
        />
        <div>
          <Button
            buttonStyles={{ height: 48 }}
            priority="secondary"
            type="outline"
            disabled={!inputValue}
            onclick={() => alert(`25% ${inputValue}`)}
          >
            <P size="xs-500">25%</P>
          </Button>
        </div>
        <div>
          <Button
            buttonStyles={{ height: 48 }}
            priority="secondary"
            type="outline"
            disabled={!inputValue}
            onclick={() => alert(`50% ${inputValue}`)}
          >
            <P size="xs-500">50%</P>
          </Button>
        </div>
        <div>
          <Button
            buttonStyles={{ height: 48 }}
            priority="secondary"
            type="outline"
            disabled={!inputValue}
            onclick={() => alert(`75% ${inputValue}`)}
          >
            <P size="xs-500">75%</P>
          </Button>
        </div>
        <div>
          <Button
            priority="secondary"
            buttonStyles={{ height: 48 }}
            type="outline"
            disabled={!inputValue}
            onclick={() => alert(`100% ${inputValue}`)}
          >
            <P size="xs-500">100%</P>
          </Button>
        </div>
      </div>
      <div className="space" />
      <div className="space" />
      <ButtonGroup>
        <Button
          buttonStyles={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            flexBasis: '257%',
            marginRight: 20,
          }}
          type="green"
          disabled={!inputValue}
          onclick={() => alert(`Withdraw ${inputValue}`)}
        >
          <P size="m-500">Withdraw</P>
        </Button>
        <Button type="secondary" onclick={hideModal}>
          <P size="m-500">Close</P>
        </Button>
      </ButtonGroup>
      <div className="space" />
      <div className="space" />
      <div className="deposit-stake-options">
        <div>
          <P size="s-400" style={{ color: '#9198BB' }}>
            Estimated stake after withdraw: 0 AMB
          </P>
        </div>
      </div>
    </div>
  );
};
Withdraw.propTypes = {
  hideModal: PropTypes.bool,
};
export default Withdraw;
