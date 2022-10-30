import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { SearchHeader } from './Searchbar.styled';
import { SearchForm } from './Searchbar.styled';
import { SearchButton } from './Searchbar.styled';
import { SearchInput } from './Searchbar.styled';
import { BiSearchAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';

const Searchbar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleNameChange = event => {
    const { value } = event.currentTarget;
    setName(value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (name.trim() === '') {
      toast.info('Please enter keyword');
      return;
    }
    onSubmit(name);
  };
  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <BiSearchAlt className="icon">Search</BiSearchAlt>
        </SearchButton>

        <SearchInput
          className="input"
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchHeader>
  );
};



Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export { Searchbar };
