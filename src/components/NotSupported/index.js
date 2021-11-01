import React from 'react';
import * as PropTypes from 'prop-types';

const NotSupported = ({ onclick }) => (
  <div className="not-supported">
    Ambrosus is not supported on this network. Please&nbsp;
    <p className="switch-text" role="presentation" onClick={() => onclick()}>
      switch to Mainnet
    </p>
  </div>
);
NotSupported.propTypes = {
  onclick: PropTypes.func,
};
export default NotSupported;
