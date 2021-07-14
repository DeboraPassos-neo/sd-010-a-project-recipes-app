import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import FoodContext from '../contexts/foods/FoodContext';
import DrinksContext from '../contexts/drinks/DrinksContext';
import { requestMealFirstLetter,
  requestMealIngredient, requestMealName } from '../service/apiRequests';
import { requestDrinkFirstLetter,
  requestDrinkIngredient, requestDrinkName } from '../service/apiRequestsDrinks';

function SearchBar() {
  const { ingredient, setIngredient, setMealsToMap,
    radio, setRadio, meals, setMealsSearch } = useContext(FoodContext);
  const { setDrinksSearch, drinks,
    setDrinksToMap, drinksToMap } = useContext(DrinksContext);

  const handleText = ({ target }) => {
    setIngredient(target.value);
  };

  const handleRadios = ({ target }) => {
    setRadio(target.id);
  };

  const path = window.location.pathname;
  const searchName = 'search-name';
  const searchIngredient = 'search-ingredient';
  const searchFirstLetter = 'search-first-letter';
  async function fetchMealsApiSearch() {
    if (radio === searchIngredient) {
      setMealsSearch(await requestMealIngredient(ingredient));
    }
    if (radio === searchName) {
      setMealsSearch(await requestMealName(ingredient));
    }
    if (radio === searchFirstLetter && ingredient.length <= 1) {
      setMealsSearch(await requestMealFirstLetter(ingredient));
    } else if (radio === searchFirstLetter && ingredient.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  async function fetchDrinksApiSearch() {
    if (radio === searchIngredient) {
      setDrinksSearch(await requestDrinkIngredient(ingredient));
    }
    if (radio === searchName) {
      setDrinksSearch(await requestDrinkName(ingredient));
    }
    if (radio === searchFirstLetter && ingredient.length <= 1) {
      setDrinksSearch(await requestDrinkFirstLetter(ingredient));
    } else if (radio === searchFirstLetter && ingredient.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  useEffect(() => {
    if (window.location.pathname === '/comidas') {
      fetchMealsApiSearch().then(() => {
      });
    }
    if (window.location.pathname === '/bebidas') {
      fetchDrinksApiSearch();
    }
  }, [ingredient]);

  // console.log(meals);
  // console.log(drinks);
  // console.log(radio);
  // console.log(mealsToMap);
  console.log(drinksToMap);
  const history = useHistory();
  function handleClick() {
    if (path === '/comidas' && meals === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setMealsSearch('');
    } else if (path === '/comidas' && meals.length > 1) {
      setMealsToMap(meals);
      setDrinksToMap('');
    } else if (path === '/comidas' && meals.length === 1) {
      history.push(`comidas/${meals[0].idMeal}`);
    }
    if (path === '/bebidas' && drinks === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setDrinksSearch('');
    } else if (path === '/bebidas' && drinks.length > 1) {
      setDrinksToMap(drinks);
      setMealsToMap('');
    } else if (path === '/bebidas' && drinks.length === 1) {
      history.push(`bebidas/${drinks[0].idDrink}`);
    }
  }

  return (
    <Container>
      <label htmlFor="search-input">
        <input
          data-testid="search-input"
          id="search-input"
          type="text"
          onChange={ handleText }
          placeholder="Buscar Receita"
        />
      </label>
      <label htmlFor="search-ingredient">
        <input
          name="search-radio"
          data-testid="ingredient-search-radio"
          id="search-ingredient"
          type="radio"
          value="search-ingredient"
          onChange={ handleRadios }
        />
        Ingrediente
      </label>
      <label htmlFor="search-name">
        <input
          name="search-radio"
          data-testid="name-search-radio"
          id="search-name"
          type="radio"
          value="search-name"
          onChange={ handleRadios }
        />
        Busca pelo nome
      </label>
      <label htmlFor="search-first-letter">
        <input
          name="search-radio"
          data-testid="first-letter-search-radio"
          id="search-first-letter"
          type="radio"
          value="search-first-letter"
          onChange={ handleRadios }
        />
        Busca pela primeira letra
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </Container>

  );
}

export default SearchBar;

const Container = styled.div`

#search-input {
  background: #FFFFFF;
  border: 0.5px solid #FFD04E;
  box-sizing: border-box;
  border-radius: 6px;
}

#search-ingredient, #search-name, #search-first-letter {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  align-items: center;
  text-align: center;
  border: 1px solid black;
  background-color: FFD04E;
}

button {
  background-color: #FFD04E;
  color: black;
  border: none;
  border-radius: 6px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  align-items: center;
color: #000000;
}

`;
