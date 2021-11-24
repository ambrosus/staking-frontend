import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

const RenderItems = observer(({ children }) => <>{children}</>);
RenderItems.propTypes = {
  update: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RenderItems;
