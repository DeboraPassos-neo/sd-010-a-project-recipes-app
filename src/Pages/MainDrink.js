import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchDrinks from '../helpers/fetchInitialDrinks';
import {
  requestRecipies, requestInitialDrinks, actionDrinksCategory,
} from '../redux/actions';
import fetchDrinkCategories from '../helpers/fetchDrinkCategories';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCards from '../components/RecipeCards';
import FilterButtons from '../components/CategoryButtons';

function MainDrink() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.searchReducer.isLoading);
  const loading = <h1>Loading...</h1>;

  useEffect(() => {
    const getDrinks = async () => {
      dispatch(requestRecipies());
      const { drinks } = await fetchDrinks();
      dispatch(requestInitialDrinks(drinks));
    };
    const fetchDrinksCategory = async () => {
      const { drinks } = await fetchDrinkCategories();
      dispatch(actionDrinksCategory(drinks));
    };

    fetchDrinksCategory();
    getDrinks();
  }, [dispatch]);
  return (
    <>
      <Header props={ { search: true, title: 'Bebidas' } } />
      { isLoading ? '' : <FilterButtons props="Drinks" /> }
      { isLoading ? loading : <RecipeCards /> }
      <Footer />
    </>
  );
}

export default MainDrink;
