import React from 'react';
import * as PropTypes from 'prop-types';
import P from '../P';

const NotSupported = ({ onclick }) => {
  const host = window.location.hostname;
  const network =
    host.includes('local') || host.includes('dev') || host.includes('test')
      ? 'Testnet'
      : 'Mainnet';
  return (
    <div className="not-supported">
      <P>
        {' '}
        Ambrosus is not supported on this network. Please &nbsp;
        <span
          className="switch-text"
          role="presentation"
          onClick={() => onclick()}
        >
          switch to {network}
        </span>
      </P>
    </div>
  );
};
NotSupported.propTypes = {
  onclick: PropTypes.func,
};
export default NotSupported;
