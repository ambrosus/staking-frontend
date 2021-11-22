import React, { useState } from 'react';

import Modal from '../../../../components/Modal';
import mmLogoIcon from '../../../../assets/svg/download-extension.png';

export default function InstallMetamaskAlert() {
  const [closeModal, setCloseModal] = useState(true);

  return (
    <Modal isShowing={closeModal} hide={() => setCloseModal(false)}>
      <div className="download-metamask">
        <img
          alt="MetaMast extension"
          className="download-block__img"
          src={mmLogoIcon}
        />
        <div className="download-block">
          <a
            id="downloadButtonPage"
            data-download-link-for="browser"
            rel="noreferer, noopener"
            href="https://metamask.io/download.html"
            target="_blank"
            className="blue-button-solid large-button w-button"
          >
            Install MetaMask
          </a>
        </div>
      </div>
    </Modal>
  );
}
