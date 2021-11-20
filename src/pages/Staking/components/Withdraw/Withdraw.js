import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { providers, utils } from 'ethers';
import { observer } from 'mobx-react-lite';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import P from '../../../../components/P';
import ButtonGroup from '../../../../components/ButtonGroup';

import {
  checkValidNumberString,
  FIXEDPOINT,
  formatRounded,
  parseFloatToBigNumber,
  ZERO,
} from '../../../../services/staking.wrapper';
import {
  ethereum,
  FIFTY_PERCENT,
  ONE_HUNDRED_PERCENT,
  SEVENTY_FIVE_PERCENT,
  TWENTY_FIVE_PERCENT,
} from '../../../../utils/constants';
import { formatThousand, notificationMassage } from '../../../../utils/helpers';
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
    const [afterWithdraw, setAfterWithdraw] = useState(stake || ZERO);

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
          const value =
            formatRounded(stake, 2) === inputValue ? myStakeInTokens : decimal;
          const overrides = {
            gasPrice: utils.parseUnits('20', 'gwei'),
            gasLimit: 8000000,
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

    const calculateSumAfterWithdraw = () =>
      stake &&
      checkValidNumberString(inputValue) &&
      setAfterWithdraw(stake.sub(parseFloatToBigNumber(inputValue)));
    useEffect(() => {
      calculateSumAfterWithdraw();
      return () => {
        calculateSumAfterWithdraw();
      };
    }, [inputValue, stake]);

    return (
      <div className="deposit">
        <div className="deposit-heading">
          <span style={{ fontSeight: 'normal', fontSize: 14 }}>Amount</span>
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
                  stake && setInputValue(formatRounded(stake.div(4), 2))
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
                disabled={stake && stake.eq(0)}
                onclick={() =>
                  stake && setInputValue(formatRounded(stake.div(2), 2))
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
                disabled={stake && stake.eq(0)}
                onclick={() =>
                  stake && setInputValue(formatRounded(stake.mul(3).div(4), 2))
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
                disabled={stake && stake.eq(0)}
                onclick={() => setInputValue(stake && formatRounded(stake, 2))}
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
              <span style={{ fontFamily: ' Proxima Nova', fontSize: 14 }}>
                Estimated stake after withdraw:{' '}
                {afterWithdraw && afterWithdraw.lt(0)
                  ? 0
                  : formatThousand(formatRounded(afterWithdraw, 2))}{' '}
                AMB
              </span>
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
