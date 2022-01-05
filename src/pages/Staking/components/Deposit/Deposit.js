import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useWeb3React } from '@web3-react/core';
import * as PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import appStore from '../../../../store/app.store';
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
import {
  debugLog,
  formatThousand,
  notificationMassage,
} from '../../../../utils/helpers';
import {
  FIFTY_PERCENT,
  ONE_HUNDRED_PERCENT,
  SEVENTY_FIVE_PERCENT,
  STAKING_PAGE,
  TWENTY_FIVE_PERCENT,
} from '../../../../config';
import { useMobileDetect } from '../../../../hooks';

const Deposit = observer(({ depositInfo }) => {
  const { account, library } = useWeb3React();
  const { pathname } = useLocation();
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);
  const [balance, setBalance] = useState(ZERO);
  const { myStakeInAMB, active: isPoolActive } = depositInfo;
  const { isDesktop } = useMobileDetect();

  const checkoutPayment = async () => {
    if (!checkValidNumberString(inputValue)) {
      return false;
    }

    const tx = await StakingWrapper.stake(depositInfo, inputValue);
    debugLog('stake', tx);

    if (!tx) {
      notificationMassage('ERROR', `Failed to create transaction.`);
    }

    setInputValue('');

    const shortHash = `${tx.hash.substr(0, 6)}...${tx.hash.slice(60)}`;
    notificationMassage('PENDING', `Transaction ${shortHash} pending.`);
    try {
      await tx.wait();
      notificationMassage('SUCCESS', `Transaction ${shortHash} success!`);
    } catch (err) {
      notificationMassage('ERROR', `Transaction ${shortHash} failed!`);
      return false;
    }

    appStore.setRefresh();

    return true;
  };

  const refreshProc = async () => {
    if (library && account) {
      library.getBalance(account).then((balanceObj) => {
        setBalance(balanceObj);
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
    setInputError(validateInput());
    refreshProc();
  }, [inputValue, account, depositInfo]);

  return (
    <div className="deposit">
      {!isDesktop && pathname === STAKING_PAGE && (
        <p className="available-tokens">
          <span>
            You staked: {myStakeInAMB && formatRounded(myStakeInAMB, 2)} AMB
          </span>
        </p>
      )}
      <p className="available-tokens">
        <span>
          Available for stake: {formatThousand(formatRounded(balance, 2))} AMB
        </span>
      </p>

      <div className="deposit-heading">
        {' '}
        <span>Amount</span>
        {inputValue && inputError && (
          <span
            style={{ fontWeight: 'normal', fontSize: 12, color: '#FF6767' }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Min amount for stake = 1000 AMB
          </span>
        )}
      </div>
      <div className="deposit-actions">
        <Input
          onchange={setInputValue}
          iconLeft
          error={inputError}
          placeholder="1 000 min"
          value={inputValue}
        />
        <div className="deposit-actions__buttons">
          <div>
            <Button
              type="black"
              buttonStyles={{
                backgroundColor:
                  balance.div(4).div(FIXED_POINT).toString() === inputValue &&
                  '#1A1A1A',
              }}
              disabled={balance.isZero()}
              onclick={() =>
                setInputValue(() => balance.div(4).div(FIXED_POINT).toString())
              }
            >
              <span className="percent-btn">{TWENTY_FIVE_PERCENT}</span>{' '}
            </Button>
          </div>
          <div>
            <Button
              type="black"
              disabled={balance.isZero()}
              buttonStyles={{
                backgroundColor:
                  balance.div(2).div(FIXED_POINT).toString() === inputValue &&
                  '#1A1A1A',
              }}
              onclick={() =>
                setInputValue(() => balance.div(2).div(FIXED_POINT).toString())
              }
            >
              <span className="percent-btn">{FIFTY_PERCENT}</span>{' '}
            </Button>
          </div>
          <div>
            <Button
              type="black"
              disabled={balance.isZero()}
              buttonStyles={{
                backgroundColor:
                  balance.mul(3).div(4).div(FIXED_POINT).toString() ===
                    inputValue && '#1A1A1A',
              }}
              onclick={() =>
                setInputValue(() =>
                  balance.mul(3).div(4).div(FIXED_POINT).toString(),
                )
              }
            >
              <span className="percent-btn">{SEVENTY_FIVE_PERCENT}</span>{' '}
            </Button>
          </div>
          <div>
            <Button
              type="black"
              disabled={balance.isZero()}
              buttonStyles={{
                backgroundColor:
                  balance.div(FIXED_POINT).toString() === inputValue &&
                  '#1A1A1A',
              }}
              onclick={() => setInputValue(balance.div(FIXED_POINT).toString())}
            >
              <span className="percent-btn">{ONE_HUNDRED_PERCENT}</span>{' '}
            </Button>
          </div>
        </div>
      </div>
      <div className="deposit-stake-options">
        <div>
          <p className="deposit-stake-options__estimated">
            <span>
              Available for withdraw:{' '}
              {myStakeInAMB && myStakeInAMB.gte(MIN_SHOW_STAKE)
                ? formatThousand(formatRounded(myStakeInAMB, 2))
                : 0}{' '}
              AMB
            </span>
          </p>
        </div>
        <div className="deposit-stake-btn">
          <Button
            type="action"
            disabled={
              !isPoolActive ||
              !checkValidNumberString(inputValue) ||
              parseFloatToBigNumber(inputValue).lt(THOUSAND) ||
              parseFloatToBigNumber(inputValue).gt(balance)
            }
            onclick={checkoutPayment}
          >
            <p className="deposit-stake-btn__text">
              {!isPoolActive ? 'Pool is offline' : ' Stake'}
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
});

Deposit.propTypes = {
  depositInfo: PropTypes.any,
};
export default Deposit;
