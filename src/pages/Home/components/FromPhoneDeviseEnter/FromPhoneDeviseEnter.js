import React, { useState } from 'react';

import Modal from '../../../../components/Modal';

export default function FromPhoneDeviseEnter() {
  const [closeModal, setCloseModal] = useState(true);

  return (
    <Modal isShowing={closeModal} hide={() => setCloseModal(false)}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div className="download-block">
          Please try using google chrome with built-in MetaMask extension
        </div>
      </div>
    </Modal>
  );
}
