import React from 'react';
import { formatNumber } from '../../helpers/formatHelpers';
import css from './header.module.css';

export default function Header({
  onChangeFilter,
  filter,
  countryCount,
  totalPopulation,
}) {
  const handleChangeInput = (event) => {
    const newText = event.target.value;
    onChangeFilter(newText);
  };

  return (
    <div className={css.flexRow}>
      <input
        type="text"
        value={filter}
        onChange={handleChangeInput}
        placeholder="Insira o nome do país"
      />
      <span className={css.countries}>
        Países: <strong>{countryCount}</strong>{' '}
      </span>
      <span className={css.population}>
        População: <strong>{formatNumber(totalPopulation)} </strong>
        habitantes
      </span>
    </div>
  );
}
