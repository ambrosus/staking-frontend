import React from 'react';
import cx from 'classnames';
import Collapse from '@kunukn/react-collapse';
import PropTypes from 'prop-types';
import Down from './Down';

const Block = ({ isOpen, title, onToggle, children, lastElement }) => (
  <div className="block">
    <button
      type="button"
      className="btn toggle faq-btn"
      style={{ border: 'none' }}
      onClick={onToggle}
    >
      <span className="active-toggle-text">{title}</span>
      <Down isOpen={isOpen} />
    </button>
    <div className={cx({ 'bottom-line': isOpen })} />
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
export default React.memo(Block);
