import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import SearchbarContext from '../contexts/SearchbarContext';

function SearchBar() {
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [letter, setLetter] = useState('');
  const { mealOrDrink, setRecipes, setIdMeal, setIdDrink } = useContext(SearchbarContext);

  const history = useHistory();


  const handleChange = (type, word) => {
    setRequest(type);
    setLetter(word);
  };

  const recipeDescription = (results) => {
    const data = results;
    let drinkId;
    let mealId;

    if (data.meals === null || data.drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (mealOrDrink === 'cocktail' && data.drinks.length === 1) {
      drinkId = data.drinks[0].idDrink;
      setIdDrink(drinkId);
      history.push(`/bebidas/${drinkId}`);
    } else if (mealOrDrink === 'meal' && data.meals.length === 1) {
      mealId = data.meals[0].idMeal;
      setIdMeal(mealId);
      history.push(`/comidas/${mealId}`);
    } else {
      return data;
      // Implementar req-17 aqui;
    }
  };

  const getData = async () => {
    if (letter === 'f' && name.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const endpoint = `https://www.the${mealOrDrink}db.com/api/json/v1/1/${request}.php?${letter}=${name}`;
    await fetch(endpoint).then((data) => data.json())
      .then((results) => {
        setRecipes(results);
        recipeDescription(results);
      });
  };

  return (
    <div>
      <label htmlFor="search-input">
        <input
          type="text"
          data-testid="search-input"
          onChange={ (e) => setName(e.target.value) }
        />
      </label>

      <label htmlFor="filterType">
        Ingrediente
        <input
          type="radio"
          name="filterType"
          onChange={ () => handleChange('filter', 'i') }
          data-testid="ingredient-search-radio"
        />
      </label>

      <label htmlFor="filterType">
        Nome
        <input
          type="radio"
          name="filterType"
          onChange={ () => handleChange('search', 's') }
          data-testid="name-search-radio"
        />
      </label>

      <label htmlFor="filterType">
        Primeira letra
        <input
          type="radio"
          name="filterType"
          onChange={ () => handleChange('search', 'f') }
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        onClick={ () => getData() }
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
