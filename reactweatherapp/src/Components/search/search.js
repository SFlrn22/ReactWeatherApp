import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import axios from 'axios';
import './search.css';
import { geoApiOptions, geoApi_link } from '../../api';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (input) => {
    return axios
      .get(`${geoApi_link}/cities?namePrefix=${input}`, geoApiOptions)
      .then((response) => response.data)
      .then((res) => {
        return {
          options: res.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.region}, ${city.country}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };
  const customStyle = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '25px',
      backgroundColor: 'rgba(255,255,255,0.7)',
      border: state.menuIsOpen ? '2px solid pink !important' : null,
      margin: 'auto auto',
      width: state.menuIsOpen ? '100%' : '35%',
      boxShadow: state.isFocused ? '0 0 0 1px pink' : '0 0 0 0',
      marginBottom: state.menuIsOpen ? '100px' : null,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#E9D6EB' : null,
      color: state.isFocused ? '#306C88' : null,
    }),
  };
  return (
    <AsyncPaginate
      placeholder="Enter city name"
      debounceTimeout={1000}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      styles={customStyle}
    />
  );
};

export default Search;
