import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
// import { utils } from 'ethers';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Paragraph from '../../../../components/Paragraph';
import ButtonGroup from '../../../../components/ButtonGroup';
import {
  checkValidNumberString,
  parseFloatToBigNumber,
  formatRounded,
  FIXED_POINT,
  ZERO,
} from '../../../../services/numbers';
import StakingWrapper from '../../../../services/staking.wrapper';
import {
  FIFTY_PERCENT,
  ONE_HUNDRED_PERCENT,
  SEVENTY_FIVE_PERCENT,
  TWENTY_FIVE_PERCENT,
} from '../../../../config';
import { formatThousand, notificationMassage } from '../../../../utils/helpers';
import appStore from '../../../../store/app.store';

const Withdraw = observer(({ withdrawContractInfo, hideModal }) => {
  const [inputValue, setInputValue] = useState(() => '');
  const [afterWithdraw, setAfterWithdraw] = useState(
    () => withdrawContractInfo.myStakeInAMB || ZERO,
  );
  const withdrawPayment = async () => {
    if (!checkValidNumberString(inputValue)) {
      return false;
    }

    const tx = await StakingWrapper.unstake(
      withdrawContractInfo,
      inputValue,
      formatRounded(withdrawContractInfo.myStakeInAMB, 2) === inputValue, // ugly hack - check 100%
    );

    console.log('withdraw', tx);

    let result = false;
    if (tx) {
      setInputValue('');

      const shortHash = `${tx.hash.substr(0, 6)}...${tx.hash.slice(60)}`;
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
      appStore.setRefresh();
      // }
    } else {
      // todo: ?????
    }

    return result;
  };

  const calculateSumAfterWithdraw = useCallback(
    () =>
      withdrawContractInfo.myStakeInAMB &&
      checkValidNumberString(inputValue) &&
      setAfterWithdraw(
        withdrawContractInfo.myStakeInAMB.sub(
          parseFloatToBigNumber(inputValue),
        ),
      ),
    [inputValue],
  );

  useEffect(() => {
    calculateSumAfterWithdraw();
    return () => {
      calculateSumAfterWithdraw();
    };
  }, [inputValue, withdrawContractInfo.myStakeInAMB]);

  return (
    <div className="deposit">
      <div className="deposit-heading">
        <span style={{ fontWeight: 'normal', fontSize: 14 }}>Amount</span>
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
              buttonStyles={{ height: 48 }}
              priority="secondary"
              type="outline"
              disabled={withdrawContractInfo.myStakeInAMB.eq(0)}
              onclick={() =>
                withdrawContractInfo.myStakeInAMB &&
                setInputValue(
                  formatRounded(withdrawContractInfo.myStakeInAMB.div(4), 2),
                )
              }
            >
              <span className="percent-btn">{TWENTY_FIVE_PERCENT}</span>
            </Button>
          </div>
          <div>
            <Button
              buttonStyles={{ height: 48 }}
              priority="secondary"
              type="outline"
              disabled={withdrawContractInfo.myStakeInAMB.eq(0)}
              onclick={() =>
                withdrawContractInfo.myStakeInAMB &&
                setInputValue(
                  formatRounded(withdrawContractInfo.myStakeInAMB.div(2), 2),
                )
              }
            >
              <span className="percent-btn">{FIFTY_PERCENT}</span>
            </Button>
          </div>
          <div>
            <Button
              buttonStyles={{ height: 48 }}
              priority="secondary"
              type="outline"
              disabled={withdrawContractInfo.myStakeInAMB.eq(0)}
              onclick={() =>
                withdrawContractInfo.myStakeInAMB &&
                setInputValue(
                  formatRounded(
                    withdrawContractInfo.myStakeInAMB.mul(3).div(4),
                    2,
                  ),
                )
              }
            >
              <span className="percent-btn">{SEVENTY_FIVE_PERCENT}</span>
            </Button>
          </div>
          <div>
            <Button
              priority="secondary"
              buttonStyles={{ height: 48 }}
              type="outline"
              disabled={withdrawContractInfo.myStakeInAMB.eq(0)}
              onclick={() =>
                setInputValue(
                  withdrawContractInfo.myStakeInAMB &&
                    formatRounded(withdrawContractInfo.myStakeInAMB, 2),
                )
              }
            >
              <span className="percent-btn">{ONE_HUNDRED_PERCENT}</span>
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
            disabled={
              !checkValidNumberString(inputValue) ||
              parseFloatToBigNumber(inputValue).eq(0) ||
              parseFloatToBigNumber(inputValue).gt(
                withdrawContractInfo.myStakeInAMB.add(FIXED_POINT.div(2)),
              )
            }
            onclick={withdrawPayment}
          >
            <Paragraph size="m-500">Withdraw</Paragraph>
          </Button>
        </div>
        <div className="close-btn">
          <Button type="secondary" onclick={hideModal}>
            <Paragraph size="m-500">Close</Paragraph>
          </Button>
        </div>
      </ButtonGroup>
      <div className="space" style={{ marginBottom: 5 }} />
      <div className="deposit-stake-options">
        <div>
          <Paragraph size="s-400" style={{ color: '#9198BB' }}>
            <span style={{ fontFamily: ' Proxima Nova', fontSize: 14 }}>
              Estimated stake after withdraw:{' '}
              {afterWithdraw.lt(0)
                ? 0
                : formatThousand(formatRounded(afterWithdraw, 2))}{' '}
              AMB
            </span>
          </Paragraph>
        </div>
      </div>
    </div>
  );
});

Withdraw.propTypes = {
  hideModal: PropTypes.func,
  withdrawContractInfo: PropTypes.any,
};

export default Withdraw;
