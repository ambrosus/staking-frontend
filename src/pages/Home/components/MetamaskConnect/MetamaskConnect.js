import React from 'react';
import { observer } from 'mobx-react-lite';

import Paragraph from '../../../../components/Paragraph';
import { CONNECT_TEXT } from '../../../../config';

import useLogIn from '../../../../hooks/useLogIn';

export const MetamaskConnect = observer(() => {
  const { logIn } = useLogIn();

  return (
    <div role="presentation" className="connect-btn btn black" onClick={logIn}>
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
});

export default MetamaskConnect;
