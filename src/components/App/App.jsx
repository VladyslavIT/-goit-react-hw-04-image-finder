import React from 'react';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Container } from './App.styled';




const App = () => {
  
  const [findName, setFindName] = useState('');

  const formSubmit = name => {
    setFindName(name);
   
  }

  return (
       <Container>
        <Searchbar onSubmit={formSubmit} />
        <ImageGallery nameGallery={findName} />
        <ToastContainer autoClose={2000} />
      </Container>
  )
}



export { App };


