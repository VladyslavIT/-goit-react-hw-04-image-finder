import React from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';
import { ModalOverlay, ModalWiev } from './Modal.styled';
import { useEffect } from 'react';

const modal = document.querySelector('#modal');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = event => {
    if (event.target !== event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalWiev>{children}</ModalWiev>
    </ModalOverlay>,
    modal
  );
};



Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export { Modal };
