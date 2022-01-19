import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import Modal from '../../../../components/Modal';
import { formatRounded } from '../../../../services/numbers';
import { formatThousand } from '../../../../utils/helpers';
import check from '../../../../assets/svg/Check.svg';
import cross from '../../../../assets/svg/Cross.svg';
import { useMedia } from 'hooks';

const TransactionModal = ({
  isNotificationModalShow,
  toggleNotificationModalShow,
  transaction,
  withdraw,
}) => {
  const isSmall = useMedia('(max-width: 699px)');
  const { value, hash } = transaction !== null && transaction;
  const amount = value && formatThousand(formatRounded(value));
  const shortHash = hash && `${hash.substr(0, 25)}...`;

  return (
    <Modal
      isShowing={isNotificationModalShow && transaction}
      hide={toggleNotificationModalShow}
      modalStyles={{
        padding: '68px 35px',
        width: isSmall ? '90%' : 518,
        height: '100%',
        maxHeight: 366,
        background: '#2A2A2A',
        boxShadow:
          '0px 6px 10px rgba(37, 37, 37, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.15)',
        display: 'flex',
      }}
    >
      <div
        role="presentation"
        onClick={toggleNotificationModalShow}
        className="cross"
      >
        <ReactSVG src={cross} wrapper="span" />
      </div>
      <div className="transaction-modal">
        <div className="transaction-modal__icon">
          <ReactSVG src={check} wrapper="span" />
        </div>
        <div className="transaction-modal__title">
          Your transaction has been successfully processed
        </div>
        {!withdraw && (
          <div className="transaction-modal__amount">Amount: {amount} AMB</div>
        )}
        <div className="transaction-modal__hash">Txhash {shortHash}</div>
      </div>
    </Modal>
  );
};
TransactionModal.propTypes = {
  isNotificationModalShow: PropTypes.bool.isRequired,
  toggleNotificationModalShow: PropTypes.func.isRequired,
  transaction: PropTypes.object,
  withdraw: PropTypes.bool,
};

export default TransactionModal;
