import React from 'react';
import * as PropTypes from 'prop-types';
import Paragraph from '../Paragraph';

const NotSupported = ({ onclick }) => {
  const host = window.location.hostname;
  const network =
    host.includes('local') || host.includes('dev') || host.includes('test')
      ? 'Testnet'
      : 'Mainnet';

  return (
    <div className="not-supported">
      <Paragraph>
        {' '}
        Ambrosus is not supported on this network. Please &nbsp;
        <span
            className="switch-text"
            role="presentation"
            onClick={() => onclick()}
        >
          switch to {network}
        </span>
      </Paragraph>
    </div>
  );
};
NotSupported.propTypes = {
  onclick: PropTypes.func,
};
export default NotSupported;
