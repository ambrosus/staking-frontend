import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({ isShowing, hide, children, modalStyles }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper" role="presentation" onClick={hide} />
            <div className="modal" style={modalStyles}>
              <div className="modal--modal-body">{children}</div>
            </div>
          </div>
        </>,
        document.body,
      )
    : null;

Modal.propTypes = {
  isShowing: PropTypes.any.isRequired,
  hide: PropTypes.func.isRequired,
  modalStyles: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
