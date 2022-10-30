import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { ImageGalley } from './ImageGallary.styled';
import { fetchImages } from 'Api/Api';

const ImageGallery = ({ nameGallery }) => {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (!nameGallery) {
      return;
    }
    setLoading(true);

    fetchImages(nameGallery, page).then(response => {
      if (response.hits.length === 0) {
        toast.error('Nothing as requested, please try another word');
        setImage([]);
        setLoading(false);
        setStatus('pending');
        return;
      }

      setImage([...response.hits]);
      setLoading(false);
      setStatus('resolve');
      setPage(1);
      setTotal(response.total);
      toast.success('Successful search');
    });
  }, [nameGallery]);

  useEffect(() => {
    if (nameGallery === '') {
      return;
    }
    fetchImages(nameGallery, page).then(response => {
      setImage(prevImage => [...prevImage, ...response.hits]);
      setLoading(false);
      setStatus('resolve');
    })}, [page]);

    const loadMore = () => {
      setPage(prevPage => prevPage + 1);
    };

    return (
      <>
        {status === 'rejected' && <p> {error}</p>}
        {loading && <Loader />}
        {status === 'resolve' && (
          <ImageGalley>
            {image.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
            <ToastContainer />
          </ImageGalley>
        )}
        {image.length > 0 && image.length !== total ? (
          <Button onClick={loadMore} />
        ) : (
          <></>
        )}
      </>
    );
}
  
ImageGallery.propTypes = {
  nameGallery: PropTypes.string.isRequired
}

export { ImageGallery };


