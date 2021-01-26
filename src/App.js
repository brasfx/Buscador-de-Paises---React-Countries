import React, { useState, useEffect } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/headers/Header';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState(0);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      const json = await res.json();
      const allCountries = json.map(
        ({ numericCode, flag, name, population }) => {
          return {
            id: numericCode,
            flag,
            name,
            filterName: name.toLowerCase(),
            population,
          };
        }
      );
      const filteredPopulation = calculateTotalPopulationFrom(allCountries);
      console.log(filteredPopulation);
      setAllCountries(allCountries);
      setFilteredCountries(Object.assign([], allCountries));
      setFilteredPopulation(filteredPopulation);
    };

    getCountries();
  }, []);

  const calculateTotalPopulationFrom = (countries) => {
    const filteredPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);
    return filteredPopulation;
  };
  const handleChangeFilter = (newText) => {
    setFilter(newText);
    const filterLowerCase = newText.toLowerCase();
    const filteredCountries = allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });
    const filteredPopulation = calculateTotalPopulationFrom(filteredCountries);
    console.log(filteredPopulation);
    setFilteredCountries(filteredCountries);
    setFilteredPopulation(filteredPopulation);
    console.log(newText);
  };

  return (
    <div className="container">
      <h1>React Countries</h1>
      <Header
        filter={filter}
        countryCount={filteredCountries.length}
        totalPopulation={filteredPopulation}
        onChangeFilter={handleChangeFilter}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}
