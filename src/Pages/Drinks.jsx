import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import context from '../store/Context';
import Footer from '../components/Footer';

function Drinks() {
  const {
    drinks,
    catDrinks,
    setCategoryD,
    categoryD,
    drinksAndCategory,
  } = useContext(context);
  const [myMeals, setMyMeals] = useState(drinks);
  const stopCart = 11;
  const stopCat = 4;
  const handleClick = (categoryName) => {
    setCategoryD(categoryName);
    if (categoryName === categoryD) {
      setCategoryD('');
      return setMyMeals(drinks);
    }
  };

  useEffect(() => {
    console.log(drinksAndCategory);
    if (drinksAndCategory.length === 0) {
      return setMyMeals(drinks);
    }
    setMyMeals(drinksAndCategory);
  }, [drinksAndCategory, drinks, setMyMeals]);

  return (
    <>
      <Header title="Bebidas" />
      <button
        type="button"
        onClick={ () => setMyMeals(drinks) }
        data-testid="All-category-filter"
      >
        All
      </button>
      {
        catDrinks.filter((_, index) => index <= stopCat)
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
        myMeals.filter((_, index) => index <= stopCart)
          .map((drink, index) => (
            <Link to={ `/bebidas/${drink.idDrink}` } key={ drink.idDrink }>
              <div
                className="card"
                key={ drink.idDrink }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ drink.strDrinkThumb }
                  alt="Receita pronta"
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
              </div>
            </Link>
          ))
      }
      <Footer />
    </>
  );
}

export default Drinks;
