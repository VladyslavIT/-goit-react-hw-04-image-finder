import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import { GalleryItem } from './ImageGalleryItem.styled';
import { GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(showModal => !showModal);

  return (
    <GalleryItem onClick={toggleModal} key={id}>
      <GalleryItemImage src={webformatURL} alt={tags} />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export { ImageGalleryItem };
