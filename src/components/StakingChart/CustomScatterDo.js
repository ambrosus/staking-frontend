import React from 'react';
import * as PropTypes from 'prop-types';

const CustomScatterDo = ({ cx, cy }) => (
  <circle
    cx={cx}
    cy={cy}
    r={1}
    height="10px"
    stroke="#15D378"
    style={{
      background: '#15D378',
      boxShadow:
        ' 0px 3.48864px 5.81439px rgba(37, 37, 37, 0.25), 0px 2.32576px 2.32576px rgba(0, 0, 0, 0.15)',
    }}
    strokeWidth={6}
    fill="#15D378"
  />
);
CustomScatterDo.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
};
export default CustomScatterDo;
