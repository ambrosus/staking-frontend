import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import P from '../../../../components/P';
import ButtonGroup from '../../../../components/ButtonGroup';

const Withdraw = ({ hideModal, availableSumForWithdraw }) => {
  const [inputValue, setInputValue] = useState();
  const [afterWithdraw, setAfterWithdraw] = useState(0);
  const calculateSumAfterWithdraw = () => {
    setAfterWithdraw(availableSumForWithdraw - inputValue);
  };
  useEffect(() => {
    calculateSumAfterWithdraw();
    return () => {
      calculateSumAfterWithdraw();
    };
  }, [inputValue]);

  return (
    <div className="deposit">
      <div className="deposit-heading">
        <P size="s-400s">Amount</P>
      </div>
      <div className="deposit-actions">
        <Input
          onchange={setInputValue}
          iconLeft
          placeholder="0.000"
          value={inputValue}
          type="number"
        />
        <div className="deposit-actions__buttons">
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
      </div>
      <div className="space" />
      <ButtonGroup>
        <div style={{ width: 665 }}>
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
            disabled={afterWithdraw <= 0}
            onclick={() => alert(`Withdraw ${inputValue}`)}
          >
            <P size="m-500">Withdraw</P>
          </Button>
        </div>
        <div className="close-btn">
          <Button type="secondary" onclick={hideModal}>
            <P size="m-500">Close</P>
          </Button>
        </div>
      </ButtonGroup>
      <div className="space" style={{ marginBottom: 5 }} />
      <div className="deposit-stake-options">
        <div>
          <P size="s-400" style={{ color: '#9198BB' }}>
            Estimated stake after withdraw:{' '}
            {afterWithdraw <= 0 ? 0 : afterWithdraw} AMB
          </P>
        </div>
      </div>
    </div>
  );
};
Withdraw.propTypes = {
  hideModal: PropTypes.func,
  availableSumForWithdraw: PropTypes.number,
};
export default Withdraw;
