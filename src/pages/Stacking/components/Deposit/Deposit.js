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

const Deposit = ({ depositInfo }) => {
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
            const tx = await contractWithSigner.stake(overrides);
            if (tx) {
              tx.wait().then((e) => {
                console.log('transaaaaaa ===>', e);
                setInputValue('');
              });
            }
          }
        }
      }
    } catch (e) {
      throw e;
    }
    return false;
  };
  useEffect(() => {
    if (ethereum && ethereum.isMetaMask) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
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
      if (signer) {
        const poolContract = new ethers.Contract(
          depositInfo.address,
          depositInfo.abi,
          signer,
        );
        if (poolContract) {
          setInterval(() => {
            poolContract.viewStake().then((withdrawSum) => {
              if (withdrawSum) {
                poolContract.getTokenPrice().then((tokenPrice) => {
                  setAvailableForWithdraw(
                    parseFloat(ethers.utils.formatEther(withdrawSum)) *
                      parseFloat(ethers.utils.formatEther(tokenPrice)),
                  );
                });
                setMyStake(ethers.utils.formatEther(withdrawSum));
              } else {
                setMyStake(0);
              }
            });
            poolContract.getTotalStake().then((total) => {
              if (total) {
                const formatEther = ethers.utils.formatEther(total);
                if (formatEther) {
                  setTotalStake(formatEther);
                }
              } else {
                setTotalStake(0);
              }
            });
          }, 5000);
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
          &nbsp; Available for stake: {Number(balance).toFixed(2)} AMB
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
};
export default Deposit;
