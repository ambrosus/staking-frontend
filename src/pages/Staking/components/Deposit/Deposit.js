import { ReactSVG } from 'react-svg';
import React, { useEffect, useState } from 'react';
import { providers, utils } from 'ethers';
import { observer } from 'mobx-react-lite';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import P from '../../../../components/P';
import useModal from '../../../../hooks/useModal';
import Modal from '../../../../components/Modal';
import Withdraw from '../Withdraw';
import DisplayValue from '../../../../components/DisplayValue';
import appStore from '../../../../store/app.store';
import {
  checkValidNumberString,
  FIXEDPOINT,
  formatRounded,
  MINSHOWSTAKE,
  parseFloatToBigNumber,
  THOUSAND,
  ZERO,
} from '../../../../services/staking.wrapper';
import {
  ethereum,
  FIFTY_PERCENT,
  formatThousand,
  notificationMassage,
  ONE_HUNDRED_PERCENT,
  SEVENTY_FIVE_PERCENT,
  TWENTY_FIVE_PERCENT,
} from '../../../../utils/constants';

import avatarIcon from '../../../../assets/svg/avatar.svg';

const Deposit = observer(({ depositInfo }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);
  const [myStake, setMyStake] = useState(ZERO);
  const [balance, setBalance] = useState(ZERO);
  const [totalStake, setTotalStake] = useState(ZERO);
  const [APYOfPool, setAPYOfPool] = useState('');
  const { isShowing: isWithdrawShowForm, toggle: toggleWithdrawForm } =
    useModal();
  let provider;
  const checkoutPayment = async () => {
    if (!checkValidNumberString(inputValue)) {
      return false;
    }

    const overrides = {
      value: parseFloatToBigNumber(inputValue),
      gasPrice: utils.parseUnits('20', 'gwei'),
      gasLimit: 1000000,
    };

    await depositInfo.contract.stake(overrides).then(async (tx) => {
      if (tx) {
        notificationMassage(
          'PENDING',
          `Transaction ${tx.hash.substr(0, 6)}...${tx.hash.slice(60)} pending.`,
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
            appStore.setRefresh();
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

    return true;
  };
  const refreshProc = async () => {
    provider = new providers.Web3Provider(ethereum);
    if (provider !== undefined) {
      provider.listAccounts().then((accounts) => {
        const defaultAccount = accounts[0];
        if (defaultAccount) {
          provider.getBalance(defaultAccount).then((balanceObj) => {
            setBalance(balanceObj);
          });
        }
      });
      const singer = provider.getSigner();
      if (singer && appStore.stakingWrapper !== undefined) {
        const { totalStakeInAMB, myStakeInAMB, poolAPY } =
          await appStore.stakingWrapper.getPoolData(depositInfo.index);
        setMyStake(myStakeInAMB);
        setTotalStake(totalStakeInAMB);
        setAPYOfPool(poolAPY);
      }
    }
  };

  useEffect(() => {
    setInputError(
      !checkValidNumberString(inputValue) ||
        parseFloatToBigNumber(inputValue).lt(THOUSAND),
    );
    refreshProc();
    return () => refreshProc();
  }, [inputValue, appStore.stakingWrapper, appStore.refresh]);

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
            <P size="l-500">
              &nbsp;&nbsp;&nbsp;&nbsp;{' '}
              {depositInfo?.contractName.substring(0, 8)}
            </P>
          </div>
          <div style={{ textTransform: 'uppercase' }}>
            <DisplayValue size="l-400" value={formatRounded(myStake)} />
          </div>
          <div style={{ textTransform: 'uppercase' }}>
            {' '}
            <DisplayValue value={formatRounded(totalStake)} size="l-400" />
          </div>
          <div>
            {' '}
            <P style={{ textTransform: 'uppercase' }} size="l-700">
              {APYOfPool}%
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
          <P size="xxl-500">
            <span style={{ fontWeight: 'normal', fontSize: 20 }}>
              Unstake&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </P>
          <P size="s-400" style={{ fontWeight: 500 }}>
            <span
              style={{
                fontFamily: ' Proxima Nova',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Available for withdraw:{' '}
              {myStake && myStake.gte(MINSHOWSTAKE)
                ? formatThousand(formatRounded(myStake, 2))
                : 0}{' '}
              AMB
            </span>
          </P>
        </div>
        <Withdraw
          withdrawContractInfo={depositInfo}
          stake={myStake}
          hideModal={toggleWithdrawForm}
        />
      </>
    </Modal>
  );
  return (
    <>
      <div className="collapsed-content__header">
        <>
          <span style={{ fontWeight: 'normal', fontSize: 20 }}>
            Deposit AMB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          </span>
          {/* TODO toltip for deposit */}
        </>
        <P size="s-400">
          <span
            style={{
              fontWeight: 600,
              fontFamily: ' Proxima Nova',
              color: '#333333',
            }}
          >
            &nbsp; Available for stake: {formatThousand(formatRounded(balance))}{' '}
            AMB
          </span>
        </P>
        <div style={{ flexBasis: '90%' }} />
      </div>
      <div className="deposit">
        <div className="deposit-heading">
          {' '}
          <span style={{ fontSeight: 'normal', fontSize: 14 }}>Amount</span>
          {inputValue && inputError && (
            <span
              style={{ fontSeight: 'normal', fontSize: 14, color: '#FF6767' }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp; Min amount for stake = 1000 AMB
            </span>
          )}
        </div>
        <div className="deposit-actions">
          <Input
            onchange={setInputValue}
            iconLeft
            error={inputError}
            placeholder="1000 min"
            value={inputValue}
          />
          <div className="deposit-actions__buttons">
            <div>
              <Button
                buttonStyles={{ height: 48 }}
                priority="secondary"
                type="outline"
                disabled={balance.isZero()}
                onclick={() => setInputValue(formatRounded(balance.div(4), 2))}
              >
                <span className="percent-btn">{TWENTY_FIVE_PERCENT}</span>{' '}
              </Button>
            </div>
            <div>
              <Button
                buttonStyles={{ height: 48 }}
                priority="secondary"
                type="outline"
                disabled={balance.isZero()}
                onclick={() => setInputValue(formatRounded(balance.div(2), 2))}
              >
                <span className="percent-btn">{FIFTY_PERCENT}</span>{' '}
              </Button>
            </div>
            <div>
              <Button
                priority="secondary"
                buttonStyles={{ height: 48 }}
                type="outline"
                disabled={balance.isZero()}
                onclick={() =>
                  setInputValue(formatRounded(balance.mul(3).div(4), 2))
                }
              >
                <span className="percent-btn">{SEVENTY_FIVE_PERCENT}</span>{' '}
              </Button>
            </div>
            <div>
              <Button
                priority="secondary"
                buttonStyles={{ height: 48 }}
                type="outline"
                disabled={balance.isZero()}
                onclick={() =>
                  setInputValue(balance.div(FIXEDPOINT).toString())
                }
              >
                <span className="percent-btn">{ONE_HUNDRED_PERCENT}</span>{' '}
              </Button>
            </div>
          </div>
        </div>
        <div className="space" style={{ marginBottom: 5 }} />
        <div className="deposit-stake-btn">
          <Button
            type="green"
            disabled={
              !checkValidNumberString(inputValue) ||
              parseFloatToBigNumber(inputValue).lt(THOUSAND) ||
              parseFloatToBigNumber(inputValue).gt(balance)
            }
            onclick={checkoutPayment}
          >
            <P size="m-500">Stake</P>
          </Button>
        </div>
        <div className="space" style={{ marginBottom: 5 }} />
        <div className="deposit-stake-options">
          <div className="flex" style={{ marginBottom: 5 }}>
            {/* TODO toltip for unstake */}
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
              <span style={{ fontFamily: ' Proxima Nova', fontSize: 14 }}>
                Available for withdraw:{' '}
                {myStake && myStake.gte(MINSHOWSTAKE)
                  ? formatThousand(formatRounded(myStake, 2))
                  : 0}{' '}
                AMB
              </span>
            </P>
          </div>
        </div>
        {withdrawForm}
      </div>
    </>
  );
});
export default React.memo(Deposit);
