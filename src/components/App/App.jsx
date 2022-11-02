import React from 'react';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { fetchImages } from 'Api/Api';

import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Container } from './App.styled';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [total, setTotal] = useState(null);

  const formSubmit = name => {
    setQuery(name);
    setPage(1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    if (page > 1) {
      fetchImages(query, page).then(response => {
        setImage(prevImage => [...prevImage, ...response.hits]);
        setLoading(false);
        setStatus('resolve');
      });
      return;
    }

    setLoading(true);

    fetchImages(query, page).then(response => {
      if (response.hits.length === 0) {
        toast.error('Nothing as requested, please try another word');
        setImage([]);
        setLoading(false);
        setStatus('pending');
        return;
      }

      setImage([...response.hits]);
      setLoading(false);
      setPage(1);
      setStatus('resolve');
      setTotal(response.total);
      toast.success('Successful search');
    });
  }, [query, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={formSubmit} />
      {status === 'rejected' && <p>Oops, try reloading the page</p>}
      {loading && <Loader />}
      {status === 'resolve' && <ImageGallery images={image} />}
      {image.length > 0 && image.length !== total ? (
        <Button onClick={loadMore} />
      ) : (
        <></>
      )}
      <ToastContainer autoClose={2000} />
    </Container>
  );
};

export { App };
