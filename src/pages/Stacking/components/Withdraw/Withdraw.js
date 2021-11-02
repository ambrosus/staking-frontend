import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ethers, utils } from 'ethers';
import { observer } from 'mobx-react-lite';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import P from '../../../../components/P';
import ButtonGroup from '../../../../components/ButtonGroup';
import notificationMassage from '../../../../utils/notificationMassage';
import appStore from '../../../../store/app.store';

import { formatFixed, ZERO } from '../../../../services/staking.wrapper';
import { ethereum } from '../../../../utils/constants';

const Withdraw = observer(
  ({
    withdrawContractInfo = {
      abi: [],
    },
    hideModal,
    availableSumForWithdraw,
  }) => {
    const [inputValue, setInputValue] = useState('0');
    const [afterWithdraw, setAfterWithdraw] = useState(ZERO);
    const withdrawPayment = async () => {
      const provider = new ethers.providers.Web3Provider(ethereum, 'any');
      if (provider) {
        const signer = provider.getSigner();
        if (signer) {
          const poolContract = new ethers.Contract(
            withdrawContractInfo.address,
            withdrawContractInfo.abi,
            signer,
          );
          const decimal = ethers.utils.parseEther(inputValue);
          const contractWithSigner = poolContract.connect(signer);
          const overrides = {
            gasPrice: ethers.utils.parseUnits('20', 'gwei'),
            gasLimit: 1000000,
          };
          if (contractWithSigner) {
            await contractWithSigner
              .unstake(decimal, overrides)
              .then(async (tx) => {
                if (tx) {
                  notificationMassage(
                    'PENDING',
                    `Transaction ${tx.hash.substr(0, 6)}...${tx.hash.slice(
                      60,
                    )} pending.`,
                  );
                  setInputValue('0');
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
                      appStore.setObserverValue(-1);
                      setInputValue('0');
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

    const calculateSumAfterWithdraw = () => {
      if (
        availableSumForWithdraw.gte(
          utils.parseEther(!inputValue ? '0' : inputValue),
        )
      ) {
        setAfterWithdraw(
          availableSumForWithdraw.sub(
            utils.parseEther(!inputValue ? '0' : inputValue),
          ),
        );
      } else {
        setAfterWithdraw(availableSumForWithdraw);
      }
    };
    useEffect(() => {
      calculateSumAfterWithdraw();
      return () => {
        calculateSumAfterWithdraw();
      };
    }, [inputValue, availableSumForWithdraw]);

    return (
      <div className="deposit">
        <div className="deposit-heading">
          <P size="s-400s">Amount</P>
        </div>
        <div className="deposit-actions">
          <Input
            onchange={setInputValue}
            iconLeft
            placeholder="0"
            value={inputValue}
            type="number"
          />
          <div className="deposit-actions__buttons">
            <div>
              <Button
                buttonStyles={{ height: 48 }}
                priority="secondary"
                type="outline"
                disabled={availableSumForWithdraw.eq(0)}
                onclick={() =>
                  setInputValue(formatFixed(availableSumForWithdraw.div(4), 2))
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
                disabled={availableSumForWithdraw.eq(0)}
                onclick={() =>
                  setInputValue(formatFixed(availableSumForWithdraw.div(2), 2))
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
                disabled={availableSumForWithdraw.eq(0)}
                onclick={() =>
                  setInputValue(
                    formatFixed(availableSumForWithdraw.mul(3).div(4), 2),
                  )
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
                disabled={availableSumForWithdraw.eq(0)}
                onclick={() =>
                  setInputValue(formatFixed(availableSumForWithdraw, 2))
                }
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
              disabled={afterWithdraw.lt(0) || Number(inputValue) < 0}
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
              {afterWithdraw.lt(0) ? 0 : utils.formatEther(afterWithdraw)} AMB
            </P>
          </div>
        </div>
      </div>
    );
  },
);
Withdraw.propTypes = {
  hideModal: PropTypes.func,
  availableSumForWithdraw: PropTypes.any,
  withdrawContractInfo: PropTypes.any,
};
export default Withdraw;
