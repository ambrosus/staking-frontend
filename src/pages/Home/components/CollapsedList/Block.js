import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Down from './Down';

const loadCollapse = () => import('@kunukn/react-collapse');
const Collapse = React.lazy(loadCollapse);

const Block = ({ isOpen, title, onToggle, children, lastElement }) => (
  <div className="block" onMouseEnter={loadCollapse} onFocus={loadCollapse}>
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
    <React.Suspense fallback={<div />}>
      {isOpen ? <Collapse isOpen={isOpen}>{children}</Collapse> : null}
    </React.Suspense>
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
