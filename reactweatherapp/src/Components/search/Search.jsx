import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import axios from 'axios';
import './search.css';
import { geoApiOptions, geoApiLink } from '../../Api';

function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (input) =>
    axios
      .get(`${geoApiLink}/cities?namePrefix=${input}`, geoApiOptions)
      .then((response) => response.data)
      .then((res) => ({
        options: res.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.region}, ${city.country}`,
        })),
      }))
      .catch((err) => console.error(err));
  const customStyle = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '25px',
      backgroundColor: 'rgba(255,255,255,0.7)',
      border: state.menuIsOpen
        ? '2px solid pink !important'
        : '0.5px solid pink !important',
      margin: 'auto auto',
      width: state.menuIsOpen ? '100%' : '35%',
      boxShadow: state.isFocused ? '0 0 0 1px pink' : '0 0 0 0',
      marginBottom: state.menuIsOpen ? '100px' : null,
      '@media (min-width: 768px) and (max-width: 1023px)': {
        width: state.menuIsOpen ? '80%' : '50%',
        marginBottom: state.menuIsOpen ? '70px' : null,
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#E9D6EB' : null,
      color: state.isFocused ? '#306C88' : null,
      '@media (min-width: 768px) and (max-width: 1023px)': {
        height: '20px',
        fontSize: '10px',
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      '@media (min-width: 768px) and (max-width: 1023px)': {
        width: '25rem',
        transform: 'translateX(55%)',
      },
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
}

export default Search;
