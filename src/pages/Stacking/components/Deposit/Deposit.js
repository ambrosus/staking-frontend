/*eslint-disable*/
import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { observer } from 'mobx-react-lite';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import P from '../../../../components/P';

import infoIcon from '../../../../assets/svg/info.svg';
import useModal from '../../../../utils/useModal';
import Modal from '../../../../components/Modal/Modal';
import Withdraw from '../Withdraw';
import avatarIcon from '../../../../assets/svg/avatar.svg';
import notificationMassage from '../../../../utils/notificationMassage';
import appStore from '../../../../store/app.store';
import { randomInteger } from '../../../../utils/constants';

import {StakingWrapper} from '../../../../services/staking.wrapper';

const Deposit = observer(({ depositInfo }) => {
  const [inputValue, setInputValue] = useState('');
  const [availableForWithdraw, setAvailableForWithdraw] = useState(0);
  const [myStake, setMyStake] = useState(0);
  const [balance, setBalance] = useState(0);
  const [totalStake, setTotalStake] = useState(0);

  const { ethereum } = window;
  const { isShowing: isWithdrawShowForm, toggle: toggleWithdrawForm } =
    useModal();

  const checkoutPayment = async () => {
    /* eslint-disable-next-line */
    try {
      const provider = new ethers.providers.Web3Provider(ethereum, 'any');
      if (provider) {
        const signer = provider.getSigner();
        if (signer) {
          const poolContract = new ethers.Contract(
            depositInfo.address,
            depositInfo.abi,
            signer,
          );
          const contractWithSigner = poolContract.connect(signer);
          const overrides = {
            value: ethers.utils.parseEther(`${inputValue}`), // todo
            gasPrice: ethers.utils.parseUnits('20', 'gwei'),
            gasLimit: 1000000,
          };
          if (contractWithSigner) {
            await contractWithSigner.stake(overrides).then(async (tx) => {
              if (tx) {
                notificationMassage(
                  'PENDING',
                  `Transaction ${tx.hash.substr(0, 6)}...${tx.hash.slice(
                    60,
                  )} pending.`,
                );
                await tx
                  .wait()
                  .then((result) => {
                    notificationMassage(
                      'SUCCESS',
                      `Transaction ${result.transactionHash.substr(
                        0,
                        6,
                      )}...${result.transactionHash.slice(60)} success!`,
                    );
                    setInputValue('');
                    appStore.setObserverValue(-2);
                  })
                  .catch((error) => {
                    notificationMassage(
                      'ERROR',
                      `Transaction ${tx.hash.substr(0, 6)}...${tx.hash.slice(
                        60,
                      )} failed!`,
                    );
                    setInputValue('');
                  });
              }
            });
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };
  useEffect(async() => {
    if (ethereum && ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      if (provider) {
        setInterval(() => {
          provider.listAccounts().then((accounts) => {
            const defaultAccount = accounts[0];
            if (defaultAccount) {
              provider.getBalance(defaultAccount).then((balanceObj) => {
                const balanceInEth = ethers.utils.formatEther(balanceObj);
                if (balanceInEth) {
                  setBalance(balanceInEth);
                } else {
                  setBalance('-');
                }
              });
            }
          });
        }, 5000);
        const singer = provider.getSigner();
        if (singer) {
          const stakingWrapper = new StakingWrapper(singer, depositInfo);
          const [totalStakeInAMB, tokenPriceAMB, myStakeInAMB, myStakeInTokens] = await stakingWrapper.getUserData();
          setMyStake(myStakeInAMB);
          setTotalStake(totalStakeInAMB);
        }
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
              {Number(myStake).toFixed(2)} AMB
            </P>
          </div>
          <div>
            {' '}
            <P style={{ textTransform: 'uppercase' }} size="l-400">
              {Number(totalStake).toFixed(2)} AMB
            </P>
          </div>
          <div>
            {' '}
            <P style={{ textTransform: 'uppercase' }} size="l-700">
              {appStore.randomInteger}%
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
            Available for withdraw: {Number(availableForWithdraw).toFixed(2)}{' '}
            AMB
          </P>
        </div>
        <Withdraw
          withdrawContractInfo={depositInfo}
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
              style={{ paddingTop: 3 }}
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
          &nbsp; Available for stake:{' '}
          {Number(balance).toFixed(2) - Number(inputValue) > 0
            ? Number(balance).toFixed(2) - Number(inputValue)
            : 0}{' '}
          AMB
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
            placeholder="0.00"
            value={inputValue}
            type="number"
          />
          <div className="deposit-actions__buttons">
            <div>
              <Button
                buttonStyles={{ height: 48 }}
                priority="secondary"
                type="outline"
                disabled={!balance}
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
                disabled={!balance}
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
                disabled={!balance}
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
                disabled={!balance}
                onclick={() => setInputValue(balance)}
              >
                <P size="xs-500">100%</P>
              </Button>
            </div>
          </div>
        </div>
        <div className="space" style={{ marginBottom: 5 }} />
        <div className="deposit-stake-btn">
          <Button
            type="green"
            disabled={
              inputValue < 1000 ||
              !inputValue ||
              inputValue <= 0 ||
              Number(inputValue) > Number(balance)
            }
            onclick={checkoutPayment}
          >
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
              Available for withdraw: {Number(availableForWithdraw).toFixed(2)}{' '}
              AMB
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
});
export default Deposit;
