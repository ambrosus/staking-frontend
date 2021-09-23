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
import appStore from '../../../../store/app.store';
import storageService from '../../../../services/storage.service';

const Deposit = ({ depositInfo }) => {
  const [inputValue, setInputValue] = useState('');
  const [availableForWithdraw, setAvailableForWithdraw] = useState(null);
  const [balance, setBalance] = useState(null);
  const [totalStake, setTotalStake] = useState(0);

  const { ethereum } = window;
  const { isShowing: isWithdrawShowForm, toggle: toggleWithdrawForm } =
    useModal();
  const checkoutPayment = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      if (provider) {
        const signer = new ethers.Wallet(
          '9f064b91351730450ac3ff2bfa397c33f24d6248a1476454d50c86ec018c927a',
          provider,
        );
        if (signer) {
          const poolContract = new ethers.Contract(
            '0xc2Bba6D7f38924a7cD8532BF15463340A7551516',
            depositInfo.abi,
            provider,
          );
          const contractWithSigner = poolContract.connect(provider.getSigner());
          const overrides = {
            value: ethers.utils.parseEther(`${inputValue}`),
            gasLimit: 1000000,
          };
          if (contractWithSigner) {
            const tx = await contractWithSigner
              .stake(overrides)
              .then(console.log)
              .catch((e) => console.log(e, 'error'));

            await tx.wait().then(console.log).catch(console.log);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  };
  useEffect(() => {
    if (ethereum && ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      provider.listAccounts().then((accounts) => {
        const defaultAccount = accounts[0];
        if (defaultAccount) {
          provider.getBalance(defaultAccount).then((balanceObj) => {
            const balanceInEth = ethers.utils.formatEther(balanceObj);
            setBalance(balanceInEth);
          });
        }
      });
      if (signer) {
        const poolContract = new ethers.Contract(
          '0xc2Bba6D7f38924a7cD8532BF15463340A7551516',
          depositInfo.abi,
          signer,
        );
        if (poolContract) {
          poolContract?.viewStake().then((e) => {
            setAvailableForWithdraw(ethers.utils.formatEther(e));
          });
        }
        poolContract.getTotalStake().then((total) => {
          if (total) {
            const formatEther = ethers.utils.formatEther(total);
            if (formatEther) {
              setTotalStake(formatEther);
            }
          }
        });
      }
    }
  }, []);
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
              {`{myStake}`} AMB
            </P>
          </div>
          <div>
            {' '}
            <P style={{ textTransform: 'uppercase' }} size="l-400">
              {totalStake} AMB
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
            Available for withdraw: {availableForWithdraw} AMB
          </P>
        </div>
        <Withdraw
          availableSumForWithdraw={availableForWithdraw}
          hideModal={toggleWithdrawForm}
        />
      </>
    </Modal>
  );
  return (
    <>
      <div className="collapsed-content__header">
        <>
          <P size="xxl-500">
            Deposit AMB&nbsp;
            <ReactSVG
              data-tip
              data-for="deposit"
              src={infoIcon}
              wrapper="span"
            />
            &nbsp;&nbsp;&nbsp;
          </P>
          <ReactTooltip id="deposit" place="top" effect="solid">
            Ну тут какая-то поdсказка которая сообщает о том о сём. И человек
            себе сразу понимает что к чему.
          </ReactTooltip>
        </>
        <P size="s-400" style={{ fontWeight: 500 }}>
          &nbsp; Available for stake: {balance} AMB
        </P>
        <div style={{ flexBasis: '90%' }} />
      </div>
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
                onclick={() => setInputValue(balance * 0.25)}
              >
                <P size="xs-500">25%</P>
              </Button>
            </div>
            <div>
              <Button
                buttonStyles={{ height: 48 }}
                priority="secondary"
                type="outline"
                onclick={() => setInputValue(balance * 0.5)}
              >
                <P size="xs-500">50%</P>
              </Button>
            </div>
            <div>
              <Button
                priority="secondary"
                buttonStyles={{ height: 48 }}
                type="outline"
                onclick={() => setInputValue(balance * 0.75)}
              >
                <P size="xs-500">75%</P>
              </Button>
            </div>
            <div>
              <Button
                priority="secondary"
                buttonStyles={{ height: 48 }}
                type="outline"
                onclick={() => setInputValue(balance)}
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
              Available for withdraw: {availableForWithdraw} AMB
            </P>

            <ReactTooltip id="unstake" place="top" effect="solid">
              Ну тут какая-то посказка которая сообщает о том о сём. И человек
              себе сразу понимает что к чему.
            </ReactTooltip>
          </div>
        </div>
        {withdrawForm}
      </div>
    </>
  );
};
export default Deposit;
