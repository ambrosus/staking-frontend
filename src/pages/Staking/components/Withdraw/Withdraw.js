import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { providers, utils } from 'ethers';
import { observer } from 'mobx-react-lite';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import P from '../../../../components/P';
import ButtonGroup from '../../../../components/ButtonGroup';
import notificationMassage from '../../../../utils/notificationMassage';

import {
  checkValidNumberString,
  FIXEDPOINT,
  formatRounded,
  parseFloatToBigNumber,
  ZERO,
} from '../../../../services/staking.wrapper';
import { ethereum } from '../../../../utils/constants';
import appStore from '../../../../store/app.store';

const Withdraw = observer(
  ({
    withdrawContractInfo = {
      abi: [],
    },
    hideModal,
    stake,
  }) => {
    const [inputValue, setInputValue] = useState('');
    const [afterWithdraw, setAfterWithdraw] = useState(ZERO);
    const [oneHundredPercent, setOneHundredPercent] = useState(false);

    const withdrawPayment = async () => {
      if (!checkValidNumberString(inputValue)) {
        return false;
      }

      const provider = new providers.Web3Provider(ethereum, 'any');
      if (provider) {
        const signer = provider.getSigner();
        if (signer && appStore.stakingWrapper !== undefined) {
          const { tokenPriceAMB, myStakeInTokens } =
            await appStore.stakingWrapper.getPoolData(
              withdrawContractInfo.index,
            );

          const decimal = parseFloatToBigNumber(inputValue)
            .mul(FIXEDPOINT)
            .div(tokenPriceAMB);
          const value = oneHundredPercent ? myStakeInTokens : decimal;
          const overrides = {
            gasPrice: utils.parseUnits('20', 'gwei'),
            gasLimit: 1000000,
          };
          await withdrawContractInfo.contract
            .unstake(value, overrides)
            .then(async (tx) => {
              if (tx) {
                notificationMassage(
                  'PENDING',
                  `Transaction ${tx.hash.substr(0, 6)}...${tx.hash.slice(
                    60,
                  )} pending.`,
                );
                setInputValue('');
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
                  .catch((e) => {
                    if (e) {
                      notificationMassage(
                        'ERROR',
                        `Transaction ${tx.hash.substr(0, 6)}...${tx.hash.slice(
                          60,
                        )} failed!`,
                      );
                      setInputValue('');
                    }
                  });
              }
            });
        }
      }
      return true;
    };

    const calculateSumAfterWithdraw = () => {
      if (oneHundredPercent) {
        setOneHundredPercent(false);
      }
      return (
        stake &&
        checkValidNumberString(inputValue) &&
        setAfterWithdraw(stake.sub(parseFloatToBigNumber(inputValue)))
      );
    };
    useEffect(() => {
      calculateSumAfterWithdraw();
      return () => {
        calculateSumAfterWithdraw();
      };
    }, [inputValue, stake, oneHundredPercent]);

    return (
      <div className="deposit">
        <div className="deposit-heading">
          <P size="s-400">Amount</P>
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
                disabled={stake && stake.eq(0)}
                onclick={() =>
                  stake && setInputValue(formatRounded(stake.div(4), 0))
                }
              >
                <P size="xs-500">25%</P>
              </Button>
            </div>
            <div>
              <Button
                buttonStyles={{ height: 48 }}
                priority="secondary"
                type="outline"
                disabled={stake && stake.eq(0)}
                onclick={() =>
                  stake && setInputValue(formatRounded(stake.div(2), 0))
                }
              >
                <P size="xs-500">50%</P>
              </Button>
            </div>
            <div>
              <Button
                buttonStyles={{ height: 48 }}
                priority="secondary"
                type="outline"
                disabled={stake && stake.eq(0)}
                onclick={() =>
                  stake && setInputValue(formatRounded(stake.mul(3).div(4), 0))
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
                disabled={stake && stake.eq(0)}
                onclick={() => {
                  if (stake) {
                    setInputValue(formatRounded(stake, 0));
                  }
                  setOneHundredPercent(true);
                  return false;
                }}
              >
                <P size="xs-500">100%</P>
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
                  stake.add(FIXEDPOINT.div(2)),
                )
              }
              onclick={() => withdrawPayment()}
            >
              <P size="m-500">Withdraw</P>
            </Button>
          </div>
          <div className="close-btn">
            <Button type="secondary" onclick={hideModal}>
              <P size="m-500">Close</P>
            </Button>
          </div>
        </ButtonGroup>
        <div className="space" style={{ marginBottom: 5 }} />
        <div className="deposit-stake-options">
          <div>
            <P size="s-400" style={{ color: '#9198BB' }}>
              Estimated stake after withdraw:{' '}
              {afterWithdraw && afterWithdraw.lt(0)
                ? 0
                : formatRounded(afterWithdraw, 2)}{' '}
              AMB
            </P>
          </div>
        </div>
      </div>
    );
  },
);
Withdraw.propTypes = {
  hideModal: PropTypes.func,
  stake: PropTypes.any,
  withdrawContractInfo: PropTypes.any,
};
export default React.memo(Withdraw);
