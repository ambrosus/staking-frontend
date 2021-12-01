import { ReactSVG } from 'react-svg';
import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useWeb3React } from '@web3-react/core';
import * as PropTypes from 'prop-types';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Paragraph from '../../../../components/Paragraph';
import useModal from '../../../../hooks/useModal';
import Modal from '../../../../components/Modal';
import Withdraw from '../Withdraw';
import DisplayValue from '../../../../components/DisplayValue';
// import appStore from '../../../../store/app.store';
import {
  checkValidNumberString,
  parseFloatToBigNumber,
  formatRounded,
  FIXED_POINT,
  MIN_SHOW_STAKE,
  THOUSAND,
  ZERO,
} from '../../../../services/numbers';
import StakingWrapper from '../../../../services/staking.wrapper';
import { formatThousand, notificationMassage } from '../../../../utils/helpers';
import {
  FIFTY_PERCENT,
  ONE_HUNDRED_PERCENT,
  SEVENTY_FIVE_PERCENT,
  TWENTY_FIVE_PERCENT,
} from '../../../../config';
import avatarIcon from '../../../../assets/svg/avatar.svg';

const Deposit = observer(({ depositInfo }) => {
  const { account, library } = useWeb3React();
  const [inputValue, setInputValue] = useState(() => '');
  const [inputError, setInputError] = useState(() => false);
  const [balance, setBalance] = useState(() => ZERO);
  const {
    myStakeInAMB: myStakeInAmber,
    active: isPoolActive,
    contractName: poolName,
    totalStakeInAMB: totalStakeInAmber,
    poolAPY: poolAPYPercent,
  } = depositInfo;
  const { isShowing: isWithdrawShowForm, toggle: toggleWithdrawForm } =
    useModal();

  const checkoutPayment = async () => {
    if (!checkValidNumberString(inputValue)) {
      return false;
    }
    console.log(depositInfo);
    const tx = await StakingWrapper.stake(depositInfo, inputValue);

    console.log('stake', tx);

    let result = false;
    setInputValue(() => tx && '');

    const shortHash = tx && `${tx.hash.substr(0, 6)}...${tx.hash.slice(60)}`;
    notificationMassage('PENDING', `Transaction ${shortHash} pending.`);
    try {
      await tx.wait();
      notificationMassage('SUCCESS', `Transaction ${shortHash} success!`);
      result = true;
    } catch (err) {
      notificationMassage('ERROR', `Transaction ${shortHash} failed!`);
    }

    // if (result) {
    // await appStore.updatePoolData();
    // appStore.setRefresh();
    // }

    return result;
  };

  const refreshProc = async () => {
    if (library && account) {
      library.getBalance(account).then((balanceObj) => {
        setBalance(() => balanceObj);
      });
    }
  };
  const validateInput = useCallback(
    () =>
      !checkValidNumberString(inputValue) ||
      parseFloatToBigNumber(inputValue).lt(THOUSAND),
    [inputValue],
  );

  useEffect(() => {
    setInputError(() => validateInput());
    refreshProc();
  }, [inputValue, account, depositInfo]);

  return (
    <>
      <div className="collapsed-content__header">
        <>
          <span style={{ fontWeight: 'normal', fontSize: 20 }}>
            Deposit AMB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          </span>
          {/* TODO toltip for deposit */}
        </>
        <Paragraph size="s-400">
          <span
            style={{
              fontWeight: 600,
              fontSize: 14,
              fontFamily: ' Proxima Nova',
              color: '#333333',
            }}
          >
            &nbsp; Available for stake:{' '}
            {formatThousand(formatRounded(balance, 2))} AMB
          </span>
        </Paragraph>
        <div style={{ flexBasis: '90%' }} />
      </div>
      <div className="deposit">
        <div className="deposit-heading">
          {' '}
          <span style={{ fontWeight: 'normal', fontSize: 14 }}>Amount</span>
          {inputValue && inputError && (
            <span
              style={{ fontWeight: 'normal', fontSize: 12, color: '#FF6767' }}
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
                onclick={() =>
                  setInputValue(() => formatRounded(balance.div(4), 2))
                }
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
                onclick={() =>
                  setInputValue(() => formatRounded(balance.div(2), 2))
                }
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
                  setInputValue(() => formatRounded(balance.mul(3).div(4), 2))
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
                  setInputValue(() => balance.div(FIXED_POINT).toString())
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
              !isPoolActive ||
              !checkValidNumberString(inputValue) ||
              parseFloatToBigNumber(inputValue).lt(THOUSAND) ||
              parseFloatToBigNumber(inputValue).gt(balance)
            }
            onclick={checkoutPayment}
          >
            <Paragraph size="m-500">
              {!isPoolActive ? 'Pool is offline' : ' Stake'}
            </Paragraph>
          </Button>
        </div>
        <div className="space" style={{ marginBottom: 5 }} />
        <div className="deposit-stake-options">
          <div className="flex" style={{ marginBottom: 5 }}>
            {/* TODO toltip for unstake */}
            <Paragraph
              size="s-400"
              style={{ color: '#9198BB' }}
              role="presentation"
              onClick={toggleWithdrawForm}
            >
              &nbsp;{' '}
              <u style={{ cursor: 'pointer', color: '#4A38AE' }}>Unstake</u>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </Paragraph>
          </div>
          <div style={{ marginBottom: 5 }}>
            <Paragraph
              size="s-400-gray"
              style={{ color: '#9198BB', marginLeft: 10 }}
            >
              <span style={{ fontFamily: ' Proxima Nova', fontSize: 14 }}>
                Available for withdraw:{' '}
                {myStakeInAmber && myStakeInAmber.gte(MIN_SHOW_STAKE)
                  ? formatThousand(formatRounded(myStakeInAmber, 2))
                  : 0}{' '}
                AMB
              </span>
            </Paragraph>
          </div>
        </div>
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
                <Paragraph size="l-500">
                  &nbsp;&nbsp;&nbsp;&nbsp; {poolName.substring(0, 8)}
                </Paragraph>
              </div>
              <div style={{ textTransform: 'uppercase' }}>
                <DisplayValue
                  size="l-400"
                  value={myStakeInAmber && formatRounded(myStakeInAmber, 2)}
                />
              </div>
              <div style={{ textTransform: 'uppercase' }}>
                {' '}
                <DisplayValue
                  value={
                    totalStakeInAmber && formatRounded(totalStakeInAmber, 2)
                  }
                  size="l-400"
                />
              </div>
              <div>
                {' '}
                <Paragraph style={{ textTransform: 'uppercase' }} size="l-700">
                  {isPoolActive === false && totalStakeInAmber.gte(FIXED_POINT)
                    ? 'Offline'
                    : `${poolAPYPercent}%`}
                </Paragraph>
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
              <Paragraph size="xxl-500">
                <span style={{ fontWeight: 'normal', fontSize: 20 }}>
                  Unstake&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </Paragraph>
              <Paragraph size="s-400" style={{ fontWeight: 500, fontSize: 12 }}>
                <span
                  style={{
                    fontFamily: ' Proxima Nova',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Available for withdraw:{' '}
                  {myStakeInAmber && myStakeInAmber.gte(MIN_SHOW_STAKE)
                    ? formatThousand(formatRounded(myStakeInAmber, 2))
                    : 0}{' '}
                  AMB
                </span>
              </Paragraph>
            </div>
            <Withdraw
              withdrawContractInfo={depositInfo}
              hideModal={toggleWithdrawForm}
            />
          </>
        </Modal>
      </div>
    </>
  );
});

Deposit.propTypes = {
  depositInfo: PropTypes.any,
};
export default Deposit;
