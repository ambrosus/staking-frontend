import React from 'react';
import { ReactSVG } from 'react-svg';
import { observer } from 'mobx-react-lite';
import P from '../P';
import { CONNECT_TEXT } from '../../utils/constants';

import walletIcon from '../../assets/svg/wallet.svg';
import useLogIn from '../../hooks/useLogIn';

export const MetamaskConnect = observer(() => {
  const { logIn } = useLogIn();
  return (
    <div role="presentation" className="connect-btn primary" onClick={logIn}>
      <ReactSVG src={walletIcon} wrapper="span" />
      <P style={{ fontFamily: ' Neue Machina' }} size="m-500">
        <span
          style={{
            paddingLeft: 5,
            fontFamily: ' Neue Machina',
            whiteSpace: 'nowrap',
          }}
        >
          {CONNECT_TEXT}
        </span>
      </P>
    </div>
  );
});

export default MetamaskConnect;
