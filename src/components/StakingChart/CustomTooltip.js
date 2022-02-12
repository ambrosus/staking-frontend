import React from 'react';
import * as PropTypes from 'prop-types';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          border: '0px',
          background: '#262626',
          boxShadow:
            '0px 3.48864px 5.81439px rgba(37, 37, 37, 0.25), 0px 2.32576px 2.32576px rgba(0, 0, 0, 0.15)',
        }}
        className="custom-tooltip"
      >
        <p
          className="label"
          style={{
            fontSize: 11,
            fontFamily: 'Halvar Breitschrift',
            color: '#fff',
            padding: 8,
          }}
        >{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.any,
};
export default CustomTooltip;
