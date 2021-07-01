import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import context from '../store/Context';
import Footer from '../components/Footer';

function Foods() {
  const {
    foods,
    catFoods,
    setCategoryF,
    categoryF,
    foodsAndCategory,
  } = useContext(context);
  const [myMeals, setMyMeals] = useState([]);
  const stopCard = 11;
  const stopCat = 4;
  const handleClick = (categoryName) => {
    setCategoryF(categoryName);
    if (categoryName === categoryF) {
      setCategoryF('');
      return setMyMeals(foods);
    }
  };

  useEffect(() => {
    if (foodsAndCategory === null) {
      return setMyMeals(foods);
    }
    setMyMeals(foodsAndCategory);
  }, [foodsAndCategory, foods, setMyMeals]);

  return (
    <>
      <Header title="Comidas" />
      <button
        type="button"
        onClick={ () => setMyMeals(foods) }
        data-testid="All-category-filter"
      >
        All
      </button>
      {
        catFoods.filter((_, index) => index <= stopCat)
          .map(({ strCategory }) => (
            <button
              type="button"
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => handleClick(strCategory) }
            >
              {strCategory}
            </button>
          ))
      }
      {
        myMeals.filter((_, index) => index <= stopCard)
          .map((food, index) => (
            <Link to={ `/comidas/${food.idMeal}` } key={ food.idMeal }>
              <div key={ food.idMeal } data-testid={ `${index}-recipe-card` }>
                <img
                  src={ food.strMealThumb }
                  alt="Receita pronta"
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
              </div>
            </Link>
          ))
      }
      <Footer />
    </>
  );
}

export default Foods;
