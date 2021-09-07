import { ReactSVG } from 'react-svg';
import ReactTooltip from 'react-tooltip';
import React, { useState } from 'react';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import P from '../../../../components/P';
import Checkbox from '../../../../components/Checkbox';

import infoIcon from '../../../../assets/svg/info.svg';

const Deposit = () => {
  const [value, setCheckbox] = useState(true);

  return (
    <div className="deposit">
      <div className="deposit--heading">Amount</div>
      <div className="deposit--actions">
        <Input iconLeft="user" placeholder="0.000" type="number" />
        <div>
          <Button
            priority="secondary"
            type="outline"
            onclick={() => alert('25%')}
          >
            <P size="xs-500">25%</P>
          </Button>
        </div>
        <div>
          <Button
            priority="secondary"
            type="outline"
            onclick={() => alert('50%')}
          >
            <P size="xs-500">50%</P>
          </Button>
        </div>
        <div>
          <Button
            priority="secondary"
            type="outline"
            onclick={() => alert('75%')}
          >
            <P size="xs-500">75%</P>
          </Button>
        </div>
        <div>
          <Button
            priority="secondary"
            type="outline"
            onclick={() => alert('100%')}
          >
            <P size="xs-500">100%</P>
          </Button>
        </div>
      </div>
      <div className="space" />
      <div className="space" />
      <div className="deposit--stake-btn">
        <Button disabled priority="secondary" onclick={() => alert('Stake')}>
          <P size="m-500">Stake</P>
        </Button>
      </div>
      <div className="space" />
      <div className="space" />
      <div className="deposit--stake-options">
        <div>
          <Checkbox
            label="Stake my reward automatically"
            value={value}
            name="StakeRewardAutomatically"
            checked={value}
            onChange={() => setCheckbox(!value)}
          />
        </div>
        <div>
          <P size="s-400" style={{ color: '#9198BB' }}>
            <u>Unstake</u> &nbsp;
          </P>
          <ReactSVG data-tip data-for="unstake" src={infoIcon} wrapper="span" />
          <ReactTooltip id="unstake" place="top" effect="solid">
            Ну тут какая-то посказка которая сообщает о том о сём. И человек
            себе сразу понимает что к чему.
          </ReactTooltip>
        </div>
      </div>
    </div>
  );
};
export default Deposit;
