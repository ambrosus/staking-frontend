import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({ isShowing, hide, children }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper" role="presentation" onClick={hide} />
            <div className="modal">
              <div className="modal--modal-body">{children}</div>
            </div>
          </div>
        </>,
        document.body,
      )
    : null;

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default Modal;
