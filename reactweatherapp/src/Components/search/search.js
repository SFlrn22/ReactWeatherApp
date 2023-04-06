import { useState } from 'react';
import './search.css';
import { AsyncPaginate } from 'react-select-async-paginate';
import axios from 'axios';
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

  return (
    <AsyncPaginate
      placeholder="Enter city name"
      debounceTimeout={1000}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
