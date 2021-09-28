import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import P from '../../../../components/P';
import ButtonGroup from '../../../../components/ButtonGroup';

const Withdraw = ({
  withdrawContractInfo = {
    abi: [],
  },
  hideModal,
  availableSumForWithdraw,
}) => {
  const [inputValue, setInputValue] = useState();
  const { ethereum } = window;
  const [afterWithdraw, setAfterWithdraw] = useState(
    availableSumForWithdraw - inputValue,
  );
  const withdrawPayment = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum, 'any');
      if (provider) {
        const signer = provider.getSigner();
        if (signer) {
          const poolContract = new ethers.Contract(
            '0x349065aE4D828F6116D8964df28DBbE5A91220CF',
            withdrawContractInfo.abi,
            signer,
          );
          const contractWithSigner = poolContract.connect(signer);
          const overrides = {
            value: `${ethers.utils.formatUnits(inputValue)}`,
            gasPrice: ethers.utils.parseUnits('20', 'gwei'),
            gasLimit: 1000000,
          };
          if (contractWithSigner) {
            const tx = await contractWithSigner
              .unstake(overrides)
              .then(console.log)
              .catch((e) => console.log(e, 'error'));
            if (tx) {
              tx.wait();
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  };

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
              disabled={
                !availableSumForWithdraw || availableSumForWithdraw === 0
              }
              onclick={() => setInputValue(availableSumForWithdraw * 0.25)}
            >
              <P size="xs-500">25%</P>
            </Button>
          </div>
          <div>
            <Button
              buttonStyles={{ height: 48 }}
              priority="secondary"
              type="outline"
              disabled={
                !availableSumForWithdraw || availableSumForWithdraw === 0
              }
              onclick={() => setInputValue(availableSumForWithdraw * 0.5)}
            >
              <P size="xs-500">50%</P>
            </Button>
          </div>
          <div>
            <Button
              buttonStyles={{ height: 48 }}
              priority="secondary"
              type="outline"
              disabled={
                !availableSumForWithdraw || availableSumForWithdraw === 0
              }
              onclick={() => setInputValue(availableSumForWithdraw * 0.75)}
            >
              <P size="xs-500">75%</P>
            </Button>
          </div>
          <div>
            <Button
              priority="secondary"
              buttonStyles={{ height: 48 }}
              type="outline"
              disabled={
                !availableSumForWithdraw || availableSumForWithdraw === 0
              }
              onclick={() => setInputValue(availableSumForWithdraw)}
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
            onclick={withdrawPayment}
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
  availableSumForWithdraw: PropTypes.any,
  withdrawContractInfo: PropTypes.any,
};
export default Withdraw;
