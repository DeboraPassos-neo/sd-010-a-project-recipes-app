import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import fetchMeals from '../services/fetchMeals';

function Provider({ children }) {
  const initialMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const initialDrinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [meals, setMeals] = useState(['', '']);
  const [drinks, setDrinks] = useState(['', '']);
  const [mealsUrl, setMealsUrl] = useState(initialMealsUrl);
  const [drinksUrl, setDrinksUrl] = useState(initialDrinksUrl);
  const [userPage, setUserPage] = useState('');
  const [noResultsFound, setNoResultsFound] = useState(false);

  const initialRandomDrinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const [randomDrinks, setRandomDrinks] = useState(['']);
  const [randomDrinksUrl, setRandomDrinksUrl] = useState(initialRandomDrinksUrl);
  const initialRandomMealsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const [randomMeals, setRandomMeals] = useState(['']);
  const [randomMealsUrl, setRandomMealsUrl] = useState(initialRandomMealsUrl);
  const initialMealsIngredientUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const [mealsIngredient, setMealsIngredient] = useState(['', '']);
  const [mealsIngredientUrl, setMealsIngredientUrl] = useState(initialMealsIngredientUrl);
  const iniDrinksIngredientUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const [drinksIngredient, setDrinksIngredient] = useState(['', '']);
  const [drinksIngredientUrl, setDrinksIngredientUrl] = useState(iniDrinksIngredientUrl);
  const initialMealsOriginUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const [mealsOrigin, setMealsOrigin] = useState(['', '']);
  const [mealsOriginUrl, setMealsOriginUrl] = useState(initialMealsOriginUrl);

  useEffect(() => {
    const getMeals = async () => {
      const quantity = 12;
      const mealsResponse = await fetchMeals(mealsUrl);
      if (!mealsResponse.meals) {
        setNoResultsFound(true);
        return;
      }
      const twelveMeals = mealsResponse.meals.filter((_meal, index) => index < quantity);
      setMeals(twelveMeals);
    };
    getMeals();
  }, [mealsUrl]);

  useEffect(() => {
    const getDrinks = async () => {
      const quantity = 12;
      const drinksResponse = await fetchMeals(drinksUrl);
      if (!drinksResponse.drinks) {
        setNoResultsFound(true);
        return;
      }
      const twelveDrinks = drinksResponse.drinks.filter((_drink, index) => (
        index < quantity));

      setDrinks(twelveDrinks);
    };

    getDrinks();
  }, [drinksUrl]);

  useEffect(() => {
    const getRandomDrink = async () => {
      const randomDrinksResponse = await fetchMeals(initialRandomDrinksUrl);
      if (!randomDrinksResponse.drinks) {
        setNoResultsFound(true);
        return;
      }
      const randomDrink = randomDrinksResponse;

      setRandomDrinks(randomDrink);
    };

    getRandomDrink();
  }, [randomDrinksUrl]);

  useEffect(() => {
    const getRandomMeal = async () => {
      const randomMealsResponse = await fetchMeals(initialRandomMealsUrl);
      if (!randomMealsResponse.drinks) {
        setNoResultsFound(true);
        return;
      }
      const randomMeal = randomMealsResponse;

      setRandomMeals(randomMeal);
    };

    getRandomMeal();
  }, [randomMealsUrl]);

  useEffect(() => {
    const getMealsIngredient = async () => {
      const quantity = 12;
      const mealsIngResp = await fetchMeals(initialMealsIngredientUrl);
      if (!mealsIngResp.meals) {
        setNoResultsFound(true);
        return;
      }
      const twelveMealsIng = mealsIngResp.meals.filter((_meal, i) => i < quantity);
      setMealsIngredient(twelveMealsIng);
    };
    getMealsIngredient();
  }, [mealsIngredientUrl]);

  useEffect(() => {
    const getDrinksIngredient = async () => {
      const quantity = 12;
      const drinksIngResp = await fetchMeals(iniDrinksIngredientUrl);
      if (!drinksIngResp.drinks) {
        setNoResultsFound(true);
        return;
      }
      const twelveDrinksIng = drinksIngResp.drinks.filter((_meal, i) => i < quantity);
      setDrinksIngredient(twelveDrinksIng);
    };
    getDrinksIngredient();
  }, [drinksIngredientUrl]);

  useEffect(() => {
    const getMealsOrigin = async () => {
      const all = {
        strArea: 'All',
      };
      const mealsOriginResp = await fetchMeals(initialMealsOriginUrl);
      if (!mealsOriginResp.meals) {
        setNoResultsFound(true);
        return;
      }
      const CmealsOrigin = [all, ...mealsOriginResp.meals];
      setMealsOrigin(CmealsOrigin);
    };
    getMealsOrigin();
  }, [mealsOriginUrl]);

  return (
    <MyContext.Provider
      value={
        {
          meals,
          setMealsUrl,
          drinks,
          setDrinksUrl,
          userPage,
          setUserPage,
          noResultsFound,
          setNoResultsFound,
          randomMeals,
          setRandomMealsUrl,
          randomDrinks,
          setRandomDrinksUrl,
          mealsIngredient,
          setMealsIngredientUrl,
          drinksIngredient,
          setDrinksIngredientUrl,
          mealsOrigin,
          setMealsOriginUrl }
      }
    >
      { children }
    </MyContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;