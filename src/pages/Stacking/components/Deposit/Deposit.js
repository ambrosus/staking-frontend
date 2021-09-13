import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';
import React, { useState } from 'react';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import P from '../../../../components/P';

import infoIcon from '../../../../assets/svg/info.svg';
import useModal from '../../../../utils/useModal';
import Modal from '../../../../components/Modal/Modal';
import Withdraw from '../Withdraw';
import avatarIcon from '../../../../assets/svg/avatar.svg';

const Deposit = () => {
  const [inputValue, setInputValue] = useState();
  const { isShowing: isWithdrawShowForm, toggle: toggleWithdrawForm } =
    useModal();
  const withdrawForm = (
    <Modal
      isShowing={isWithdrawShowForm}
      hide={toggleWithdrawForm}
      title="Login"
    >
      <>
        <div className="modal--modal-body__header">
          <div>Pool</div>
          <div>My Stake</div>
          <div>Total staked</div>
          <div>Net APY</div>
        </div>
        <div className="space" />
        <div className="space" />
        <div className="modal--modal-body__header">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <ReactSVG src={avatarIcon} wrapper="span" />
            <P
              style={{
                textTransform: 'uppercase',
                color: '#BFC9E0',
              }}
              size="l-500"
            >
              &nbsp;&nbsp;&nbsp;&nbsp;Bravo
            </P>
          </div>
          <div>
            <P style={{ textTransform: 'uppercase' }} size="l-400">
              664.987 AMB
            </P>
          </div>
          <div>
            {' '}
            <P style={{ textTransform: 'uppercase' }} size="l-400">
              2.2m AMB
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
            Available for withdraw: 3.5m AMB
          </P>
        </div>
        <Withdraw hideModal={toggleWithdrawForm} />
      </>
    </Modal>
  );
  return (
    <div className="deposit">
      <div className="deposit-heading">Amount</div>
      <div className="deposit-actions">
        <Input
          onchange={setInputValue}
          iconLeft
          placeholder="0.000"
          value={inputValue}
          type="number"
        />
        <div>
          <Button
            buttonStyles={{ height: 48 }}
            priority="secondary"
            type="outline"
            disabled={!inputValue}
            onclick={() => alert(`25% ${inputValue}`)}
          >
            <P size="xs-500">25%</P>
          </Button>
        </div>
        <div>
          <Button
            buttonStyles={{ height: 48 }}
            priority="secondary"
            type="outline"
            disabled={!inputValue}
            onclick={() => alert(`50% ${inputValue}`)}
          >
            <P size="xs-500">50%</P>
          </Button>
        </div>
        <div>
          <Button
            priority="secondary"
            buttonStyles={{ height: 48 }}
            type="outline"
            disabled={!inputValue}
            onclick={() => alert(`75% ${inputValue}`)}
          >
            <P size="xs-500">75%</P>
          </Button>
        </div>
        <div>
          <Button
            priority="secondary"
            buttonStyles={{ height: 48 }}
            type="outline"
            disabled={!inputValue}
            onclick={() => alert(`100% ${inputValue}`)}
          >
            <P size="xs-500">100%</P>
          </Button>
        </div>
      </div>
      <div className="space" />
      <div className="space" />
      <div className="deposit-stake-btn">
        <Button
          type="green"
          disabled={!inputValue}
          onclick={() => alert(`Stake ${inputValue}`)}
        >
          <P size="m-500">Stake</P>
        </Button>
      </div>
      <div className="space" />
      <div className="space" />
      <div className="deposit-stake-options">
        <div>
          <div>
            <ReactSVG
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
              &nbsp;&nbsp; <u style={{ cursor: 'pointer' }}>Unstake</u>
            </P>
          </div>

          <P size="s-400-gray" style={{ color: '#9198BB' }}>
            &nbsp;&nbsp;&nbsp; Available for withdraw: 788.899 AMB
          </P>

          <ReactTooltip id="unstake" place="top" effect="solid">
            Ну тут какая-то посказка которая сообщает о том о сём. И человек
            себе сразу понимает что к чему.
          </ReactTooltip>
        </div>
      </div>
      {withdrawForm}
    </div>
  );
};
export default Deposit;
