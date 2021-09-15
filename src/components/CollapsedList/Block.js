import React from 'react';
import Collapse from '@kunukn/react-collapse';
import PropTypes from 'prop-types';
import Down from './Down';

export default function Block({ isOpen, title, onToggle, children }) {
  return (
    <div className="block">
      <button type="button" className="btn toggle" onClick={onToggle}>
        <span>{title}</span>
        <Down isOpen={isOpen} />
      </button>
      <Collapse layoutEffect isOpen={isOpen}>
        {children}
      </Collapse>
      <div className="bottom-line" />
    </div>
  );
}
Block.propTypes = {
  isOpen: PropTypes.bool,
  onToggle: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.element,
};
