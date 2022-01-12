import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
/*eslint-disable*/
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import {
  checkValidNumberString,
  parseFloatToBigNumber,
  formatRounded,
  FIXED_POINT,
  ZERO,
  MIN_SHOW_STAKE,
} from '../../../../services/numbers';
import StakingWrapper from '../../../../services/staking.wrapper';
import {
  FIFTY_PERCENT,
  ONE_HUNDRED_PERCENT,
  SEVENTY_FIVE_PERCENT,
  TWENTY_FIVE_PERCENT,
} from '../../../../config';
import {
  debugLog,
  formatThousand,
  notificationMassage,
} from '../../../../utils/helpers';
import appStore from '../../../../store/app.store';
import { useModal } from 'hooks';
import TransactionModal from 'pages/Staking/components/TransactionModal';

const Withdraw = observer(({ withdrawContractInfo }) => {
  const { myStakeInAMB } = withdrawContractInfo;
  const [inputValue, setInputValue] = useState('');
  const { isShowing, toggle } = useModal();
  const [transaction, setTransaction] = useState(null);

  const [afterWithdraw, setAfterWithdraw] = useState(
    () => myStakeInAMB || ZERO,
  );

  const withdrawPayment = async () => {
    if (!checkValidNumberString(inputValue)) {
      return false;
    }

    const tx = await StakingWrapper.unstake(
      withdrawContractInfo,
      inputValue,
      inputValue === myStakeInAMB.div(FIXED_POINT).toString(), // ugly hack - check 100%
    );

    debugLog('withdraw', tx);

    if (!tx) {
      notificationMassage('ERROR', `Failed to create transaction.`);
    }

    setInputValue('');

    const shortHash = `${tx.hash.substr(0, 6)}...${tx.hash.slice(60)}`;
    notificationMassage('PENDING', `Transaction ${shortHash} pending.`);
    try {
      await tx.wait();
      setTransaction(tx);
      toggle();
      // notificationMassage('SUCCESS', `Transaction ${shortHash} success!`);
    } catch (err) {
      notificationMassage('ERROR', `Transaction ${shortHash} failed!`);
      return false;
    }

    appStore.setRefresh();

    return true;
  };

  const calculateSumAfterWithdraw = useCallback(
    () =>
      myStakeInAMB &&
      checkValidNumberString(inputValue) &&
      setAfterWithdraw(myStakeInAMB.sub(parseFloatToBigNumber(inputValue))),
    [inputValue],
  );

  useEffect(() => {
    calculateSumAfterWithdraw();
    return () => {
      calculateSumAfterWithdraw();
    };
  }, [inputValue, myStakeInAMB]);

  return (
    <div className="deposit">
      {transaction && (
        <TransactionModal
          transaction={transaction}
          isNotificationModalShow={isShowing}
          toggleNotificationModalShow={toggle}
          withdraw
        />
      )}
      <p className="available-tokens">
        <span>
          Available for withdraw:{' '}
          {myStakeInAMB && myStakeInAMB.gte(MIN_SHOW_STAKE)
            ? formatThousand(formatRounded(myStakeInAMB, 2))
            : 0}{' '}
          AMB
        </span>
      </p>
      <div className="deposit-heading">
        <span>Amount</span>
      </div>
      <div className="deposit-actions">
        <Input
          onchange={setInputValue}
          iconLeft
          placeholder="0"
          value={inputValue}
        />
        <div className="deposit-actions__buttons">
          <div>
            <Button
              type="black"
              disabled={myStakeInAMB.eq(0)}
              buttonStyles={{
                backgroundColor:
                  myStakeInAMB.div(4).div(FIXED_POINT).toString() ===
                    inputValue && '#1A1A1A',
              }}
              onclick={() =>
                myStakeInAMB &&
                setInputValue(myStakeInAMB.div(4).div(FIXED_POINT).toString())
              }
            >
              <span className="percent-btn">{TWENTY_FIVE_PERCENT}</span>
            </Button>
          </div>
          <div>
            <Button
              type="black"
              disabled={myStakeInAMB.eq(0)}
              buttonStyles={{
                backgroundColor:
                  myStakeInAMB.div(2).div(FIXED_POINT).toString() ===
                    inputValue && '#1A1A1A',
              }}
              onclick={() =>
                myStakeInAMB &&
                setInputValue(myStakeInAMB.div(2).div(FIXED_POINT).toString())
              }
            >
              <span className="percent-btn">{FIFTY_PERCENT}</span>
            </Button>
          </div>
          <div>
            <Button
              type="black"
              disabled={myStakeInAMB.eq(0)}
              buttonStyles={{
                backgroundColor:
                  myStakeInAMB.mul(3).div(4).div(FIXED_POINT).toString() ===
                    inputValue && '#1A1A1A',
              }}
              onclick={() =>
                myStakeInAMB &&
                setInputValue(
                  myStakeInAMB.mul(3).div(4).div(FIXED_POINT).toString(),
                )
              }
            >
              <span className="percent-btn">{SEVENTY_FIVE_PERCENT}</span>
            </Button>
          </div>
          <div>
            <Button
              type="black"
              disabled={myStakeInAMB.eq(0)}
              buttonStyles={{
                backgroundColor:
                  myStakeInAMB &&
                  myStakeInAMB.div(FIXED_POINT).toString() === inputValue &&
                  '#1A1A1A',
              }}
              onclick={() =>
                setInputValue(
                  myStakeInAMB && myStakeInAMB.div(FIXED_POINT).toString(),
                )
              }
            >
              <span className="percent-btn">{ONE_HUNDRED_PERCENT}</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="deposit-stake-options">
        <div>
          <p className="deposit-stake-options__estimated">
            <span>
              Estimated stake after withdraw:{' '}
              {afterWithdraw.lt(0)
                ? 0
                : formatThousand(formatRounded(afterWithdraw, 2))}{' '}
              AMB
            </span>
          </p>
        </div>
        <div className="deposit-stake-btn">
          <Button
            type="action"
            disabled={
              !checkValidNumberString(inputValue) ||
              parseFloatToBigNumber(inputValue).eq(0) ||
              parseFloatToBigNumber(inputValue).gt(
                myStakeInAMB.add(FIXED_POINT.div(2)),
              )
            }
            onclick={withdrawPayment}
          >
            <p className="deposit-stake-btn__text">Withdraw</p>
          </Button>
        </div>
      </div>
    </div>
  );
});

Withdraw.propTypes = {
  withdrawContractInfo: PropTypes.any,
};

export default Withdraw;
