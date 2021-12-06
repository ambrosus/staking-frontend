import React from 'react';
import { ReactSVG } from 'react-svg';

import Paragraph from '../../../../components/Paragraph';
import { CONNECT_TEXT } from '../../../../config';

import walletIcon from '../../../../assets/svg/wallet.svg';
import useLogIn from '../../../../hooks/useLogIn';

export const MetamaskConnect = () => {
  const { logIn } = useLogIn();

  return (
    <div role="presentation" className="connect-btn primary" onClick={logIn}>
      <ReactSVG src={walletIcon} wrapper="span" />
      <Paragraph style={{ fontFamily: ' Neue Machina' }} size="m-500">
        <span
          style={{
            paddingLeft: 5,
            fontFamily: ' Neue Machina',
            whiteSpace: 'nowrap',
          }}
        >
          {CONNECT_TEXT}
        </span>
      </Paragraph>
    </div>
  );
};

export default MetamaskConnect;
