import React from 'react';
import * as PropTypes from 'prop-types';

const NotSupported = ({ onclick }) => {
  const host = window.location.hostname;
  console.log('host', host);
  const network = host === 'localhost' ? 'Testnet' : 'Mainnet';
  console.log(network);
  return (
    <div className="not-supported">
      Ambrosus is not supported on this network. Please&nbsp;
      <p className="switch-text" role="presentation" onClick={() => onclick()}>
        switch to {network}
      </p>
    </div>
  );
};
NotSupported.propTypes = {
  onclick: PropTypes.func,
};
export default NotSupported;
