import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';
import React, { useEffect, useState } from 'react';
import { ethers, providers, utils } from 'ethers';
import { observer } from 'mobx-react-lite';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import P from '../../../../components/P';
import {
  StakingWrapper,
  ZERO,
  formatFixed,
  MINSHOWSTAKE,
  THOUSAND,
} from '../../../../services/staking.wrapper';
import { ethereum, round } from '../../../../utils/constants';

// import infoIcon from '../../../../assets/svg/info.svg';
import useModal from '../../../../utils/useModal';
import Modal from '../../../../components/Modal';
import Withdraw from '../Withdraw';
import avatarIcon from '../../../../assets/svg/avatar.svg';
import notificationMassage from '../../../../utils/notificationMassage';
import DisplayValue from '../../../../components/DisplayValue';

const Deposit = observer(({ depositInfo }) => {
  const [inputValue, setInputValue] = useState('');
  const [errorStakeSum, setErrorStakeSum] = useState(false);
  const [myStake, setMyStake] = useState(ZERO);
  const [balance, setBalance] = useState(ZERO);
  const [totalStake, setTotalStake] = useState(ZERO);
  const [tokenPrice, setTokenPrice] = useState(ZERO);
  const [APYOfPool, setAPYOfPool] = useState('');
  const { isShowing: isWithdrawShowForm, toggle: toggleWithdrawForm } =
    useModal();
  const checkoutPayment = async () => {
    const provider = new providers.Web3Provider(ethereum, 'any');
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
          value: utils.parseEther(inputValue), //
          gasPrice: utils.parseUnits('20', 'gwei'),
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
                })
                .catch(() => {
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

    return false;
  };
  useEffect(() => {
    let interv;
    let provider;

    if (ethereum && ethereum.isMetaMask) {
      provider = new providers.Web3Provider(ethereum);
      const refreshProc = async () => {
        provider.listAccounts().then((accounts) => {
          const defaultAccount = accounts[0];
          if (defaultAccount) {
            provider.getBalance(defaultAccount).then((balanceObj) => {
              setBalance(balanceObj);
            });
          }
        });
        const singer = provider.getSigner();
        if (singer) {
          const stakingWrapper = new StakingWrapper(singer);
          const { totalStakeInAMB, myStakeInAMB, tokenPriceAMB, poolAPY } =
            await stakingWrapper.getPoolData(depositInfo.index);
          setTokenPrice(tokenPriceAMB);
          setMyStake(myStakeInAMB);
          setTotalStake(totalStakeInAMB);
          setAPYOfPool(poolAPY);
        }
      };
      refreshProc();
      interv = setInterval(refreshProc, 4000);
    }

    return () => clearInterval(interv);
  }, []);

  useEffect(() => {
    setErrorStakeSum(
      inputValue &&
        tokenPrice &&
        utils.parseEther(`${inputValue}`).gte(THOUSAND),
    );
  }, [inputValue]);
  const withdrawForm = (
    <Modal isShowing={isWithdrawShowForm} hide={toggleWithdrawForm}>
      <>
        <div className="modal--modal-body__header">
          <div>Pool</div>
          <div>My Stake</div>
          <div>Total pool stake</div>
          <div>APY</div>
        </div>
        <div className="space" style={{ marginBottom: 5 }} />
        <div className="modal--modal-body__header">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <ReactSVG src={avatarIcon} wrapper="span" />
            <P size="l-500">&nbsp;&nbsp;&nbsp;&nbsp;Bravo</P>
          </div>
          <div>
            <P style={{ textTransform: 'uppercase' }} size="l-400">
              <DisplayValue value={myStake} />
            </P>
          </div>
          <div>
            {' '}
            <P style={{ textTransform: 'uppercase' }} size="l-400">
              <DisplayValue value={totalStake} />
            </P>
          </div>
          <div>
            {' '}
            <P style={{ textTransform: 'uppercase' }} size="l-700">
              {APYOfPool && APYOfPool}%
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
            Available for withdraw:{' '}
            {myStake && myStake.gte(MINSHOWSTAKE)
              ? round(formatFixed(myStake, 2))
              : 0}{' '}
            AMB
          </P>
        </div>
        <Withdraw
          withdrawContractInfo={depositInfo}
          availableSumForWithdraw={myStake}
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
            {/* <ReactSVG */}
            {/*   style={{ paddingTop: 3 }} */}
            {/*  data-tip */}
            {/*  data-for="deposit" */}
            {/*  src={infoIcon} */}
            {/*  wrapper="span" */}
            {/* /> */}
            &nbsp;&nbsp;&nbsp;
          </P>
          <ReactTooltip id="deposit" place="top" effect="solid">
            Ну тут какая-то поdсказка которая сообщает о том о сём. И человек
            себе сразу понимает что к чему.
          </ReactTooltip>
        </>
        <P size="s-400" style={{ fontWeight: 500 }}>
          &nbsp; Available for stake:{' '}
          {balance.gte(utils.parseEther(!inputValue ? '0' : inputValue))
            ? Number(utils.formatEther(balance)).toFixed(2)
            : utils.formatEther(0)}{' '}
          AMB
        </P>
        <div style={{ flexBasis: '90%' }} />
      </div>
      <div className="deposit">
        <div className="deposit-heading">
          {' '}
          <P size="s-400">Amount</P>
          {inputValue && tokenPrice && !errorStakeSum && (
            <P style={{ color: '#FF6767' }} size="s-400">
              &nbsp;&nbsp;&nbsp;Min amount for stake = 1000 AMB
            </P>
          )}
        </div>
        <div className="deposit-actions">
          <Input
            onchange={setInputValue}
            iconLeft
            error={!errorStakeSum}
            placeholder="1000 min"
            value={inputValue}
            type="number"
          />
          <div className="deposit-actions__buttons">
            <div>
              <Button
                buttonStyles={{ height: 48 }}
                priority="secondary"
                type="outline"
                disabled={balance.isZero()}
                onclick={() => setInputValue(formatFixed(balance.div(4), 0))}
              >
                <P size="xs-500">25%</P>
              </Button>
            </div>
            <div>
              <Button
                buttonStyles={{ height: 48 }}
                priority="secondary"
                type="outline"
                disabled={balance.isZero()}
                onclick={() => setInputValue(formatFixed(balance.div(2), 0))}
              >
                <P size="xs-500">50%</P>
              </Button>
            </div>
            <div>
              <Button
                priority="secondary"
                buttonStyles={{ height: 48 }}
                type="outline"
                disabled={balance.isZero()}
                onclick={() =>
                  setInputValue(formatFixed(balance.mul(3).div(4), 0))
                }
              >
                <P size="xs-500">75%</P>
              </Button>
            </div>
            <div>
              <Button
                priority="secondary"
                buttonStyles={{ height: 48 }}
                type="outline"
                disabled={balance.isZero()}
                onclick={() => setInputValue(formatFixed(balance, 0))}
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
              !inputValue ||
              Number(inputValue) < 1000 ||
              balance.lte(utils.parseEther(!inputValue ? '0' : inputValue))
            }
            onclick={checkoutPayment}
          >
            <P size="m-500">Stake</P>
          </Button>
        </div>
        <div className="space" style={{ marginBottom: 5 }} />
        <div className="deposit-stake-options">
          <div className="flex" style={{ marginBottom: 5 }}>
            {/* <ReactSVG */}
            {/*  style={{ marginTop: 3 }} */}
            {/*  data-tip */}
            {/*  data-for="unstake" */}
            {/*  src={infoIcon} */}
            {/*  wrapper="span" */}
            {/* /> */}
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
              Available for withdraw:{' '}
              {myStake && myStake.gte(MINSHOWSTAKE)
                ? formatFixed(myStake, 2)
                : 0}{' '}
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
