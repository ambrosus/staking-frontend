/*eslint-disable*/
import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';
import React, { useEffect, useState } from 'react';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import P from '../../../../components/P';

import infoIcon from '../../../../assets/svg/info.svg';
import useModal from '../../../../utils/useModal';
import Modal from '../../../../components/Modal/Modal';
import Withdraw from '../Withdraw';
import avatarIcon from '../../../../assets/svg/avatar.svg';
import { ethers } from 'ethers';

const Deposit = ({ availableForDeposit, depositInfo }) => {
  const [inputValue, setInputValue] = useState(null);
  const [contract, setContract] = useState(null);
  const ethereum = window.ethereum;
  const { isShowing: isWithdrawShowForm, toggle: toggleWithdrawForm } =
    useModal();
  const withdrawForm = (
    <Modal isShowing={isWithdrawShowForm} hide={toggleWithdrawForm}>
      <>
        <div className="modal--modal-body__header">
          <div>Pool</div>
          <div>My Stake</div>
          <div>Total staked</div>
          <div>Net APY</div>
        </div>
        <div className="space" style={{ marginBottom: 5 }} />
        <div className="modal--modal-body__header">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <ReactSVG src={avatarIcon} wrapper="span" />
            <P size="l-500">&nbsp;&nbsp;&nbsp;&nbsp;Bravo</P>
          </div>
          <div>
            <P style={{ textTransform: 'uppercase' }} size="l-400">
              664.987 AMB
            </P>
          </div>
          <div>
            {' '}
            <P style={{ textTransform: 'uppercase' }} size="l-400">
              2.2m AMB
            </P>
          </div>
          <div>
            {' '}
            <P style={{ textTransform: 'uppercase' }} size="l-700">
              15.13%
            </P>
          </div>
        </div>
        <div className="space" />
        <div className="line" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <P size="xxl-500">Unstake&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</P>
          <P size="s-400" style={{ fontWeight: 500 }}>
            Available for withdraw: 3.5m AMB
          </P>
        </div>
        <Withdraw hideModal={toggleWithdrawForm} />
      </>
    </Modal>
  );
  useEffect(() => {
    console.log(inputValue);
  });
  const checkoutPayment = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const poolContract = new ethers.Contract(
      '0xc2Bba6D7f38924a7cD8532BF15463340A7551516',
      depositInfo.abi,
      provider,
    );
    if (poolContract) {
      setContract(poolContract);
    }
    if (inputValue && contract) {
      const tx = signer.sendTransaction({
        to: '0x56FacFcA56e1CD4b49c04587eC8D4BC29AD2b3E3',
        value: ethers.utils.parseEther(`${inputValue}`),
      });
      contract
        .stake(tx)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
    return false;
  };

  return (
    <div className="deposit">
      <div className="deposit-heading">
        {' '}
        <P size="s-400">Amount</P>
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
              onclick={() => setInputValue(availableForDeposit * 0.25)}
            >
              <P size="xs-500">25%</P>
            </Button>
          </div>
          <div>
            <Button
              buttonStyles={{ height: 48 }}
              priority="secondary"
              type="outline"
              onclick={() => setInputValue(availableForDeposit * 0.5)}
            >
              <P size="xs-500">50%</P>
            </Button>
          </div>
          <div>
            <Button
              priority="secondary"
              buttonStyles={{ height: 48 }}
              type="outline"
              onclick={() => setInputValue(availableForDeposit * 0.75)}
            >
              <P size="xs-500">75%</P>
            </Button>
          </div>
          <div>
            <Button
              priority="secondary"
              buttonStyles={{ height: 48 }}
              type="outline"
              onclick={() => setInputValue(availableForDeposit)}
            >
              <P size="xs-500">100%</P>
            </Button>
          </div>
        </div>
      </div>
      <div className="space" style={{ marginBottom: 5 }} />
      <div className="deposit-stake-btn">
        <Button type="green" disabled={!inputValue} onclick={checkoutPayment}>
          <P size="m-500">Stake</P>
        </Button>
      </div>
      <div className="space" style={{ marginBottom: 5 }} />
      <div className="deposit-stake-options">
        <div className="flex" style={{ marginBottom: 5 }}>
          <ReactSVG
            style={{ marginTop: 3 }}
            data-tip
            data-for="unstake"
            src={infoIcon}
            wrapper="span"
          />
          <P
            size="s-400"
            style={{ color: '#9198BB' }}
            role="presentation"
            onClick={toggleWithdrawForm}
          >
            &nbsp;{' '}
            <u style={{ cursor: 'pointer', color: '#4A38AE' }}>Unstake</u>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </P>
        </div>
        <div style={{ marginBottom: 5 }}>
          <P size="s-400-gray" style={{ color: '#9198BB', marginLeft: 10 }}>
            Available for withdraw: 788.899 AMB
          </P>

          <ReactTooltip id="unstake" place="top" effect="solid">
            Ну тут какая-то посказка которая сообщает о том о сём. И человек
            себе сразу понимает что к чему.
          </ReactTooltip>
        </div>
      </div>
      {withdrawForm}
    </div>
  );
};
export default Deposit;
