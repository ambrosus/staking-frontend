import React from 'react';
import * as PropTypes from 'prop-types';
import Paragraph from '../Paragraph';
import { network } from 'config';

const NotSupported = ({ children, onclick = () => {} }) => {
  const net = !network ? 'Testnet' : 'Mainnet';
  return (
    <div className="not-supported">
      {children ? (
        <Paragraph>{children}</Paragraph>
      ) : (
        <Paragraph>
          {' '}
          Ambrosus is not supported on this network. Please &nbsp;
          <span
            className="switch-text"
            role="presentation"
            onClick={() => onclick()}
          >
            switch to {net}
          </span>
        </Paragraph>
      )}
    </div>
  );
};
NotSupported.propTypes = {
  onclick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default NotSupported;
