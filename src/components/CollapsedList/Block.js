import React from 'react';
import Collapse from '@kunukn/react-collapse';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Down from './Down';

const Block = ({ isOpen, title, onToggle, children, lastElement }) => (
  <div className="block">
    <button type="button" className="btn toggle" onClick={onToggle}>
      <span
        className={cx({ 'active-toggle-text': isOpen })}
        style={{ color: 'white' }}
      >
        {title}
      </span>
      <Down isOpen={isOpen} />
    </button>
    <Collapse isOpen={isOpen}>{children}</Collapse>
    <div className={cx({ 'bottom-line': !lastElement })} />
  </div>
);

Block.propTypes = {
  isOpen: PropTypes.bool,
  lastElement: PropTypes.bool,
  onToggle: PropTypes.func,
  title: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default Block;
