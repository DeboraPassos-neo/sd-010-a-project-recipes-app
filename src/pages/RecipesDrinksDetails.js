import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getDrinkByID, getMeals } from '../services/api';
import ingredientsMesure from '../utils/ingredientsMesure';
import RecipeContext from '../context/RecipesContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './recipesPageContainer.css';
import ShareButton from '../components/ShareButton';
import Loading from '../components/Loading';
import './recipesDetailsPage.css';

export default function RecipesDrinksDetails(props) {
  const { match: { params: { id } } } = props;
  const { doneRecipes, favorites, setFavorites,
  } = useContext(RecipeContext);

  const [drink, setDrink] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mealAlternate, setMealAlternate] = useState([]);

  useEffect(() => {
    const getDrink = async () => {
      setLoading(true);
      const result = await getDrinkByID(id);
      const mealResults = await getMeals('name', '');
      setDrink(result);
      const RECOMMENDED_MEALS = 6;
      setMealAlternate(mealResults.meals.slice(0, RECOMMENDED_MEALS));
      setLoading(false);
    };

    getDrink();
  }, []);

  function isFavorite() {
    let favoriteFlag = false;
    favorites.forEach((recipe) => {
      if (recipe.id === id) favoriteFlag = true;
    });
    return favoriteFlag;
  }

  function alreadyDone() {
    let doneFlag = false;
    doneRecipes.forEach((recipe) => {
      if (recipe.id === id) doneFlag = true;
    });
    return doneFlag;
  }

  function inProgress() {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) return inProgressRecipes.cocktails[id] !== undefined;
    return false;
  }

  function favoriteMeal() {
    if (isFavorite()) {
      setFavorites(
        favorites.filter((fav) => fav.id !== drink.idDrink),
      );
      return;
    }
    const newFavorite = {
      id: drink.idDrink,
      type: 'bebida',
      area: '',
      category: drink.strCategory,
      alcoholicOrNot: drink.strAlcoholic,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
    };
    setFavorites([
      ...favorites,
      newFavorite,
    ]);
  }

  function renderProgress() {
    if (alreadyDone()) {
      return (
        <div
          className="wrapper__buttons__realizedRecipe"
        >
          Receita já feita
        </div>);
    }
    return (
      <Link
        to={ `/bebidas/${id}/in-progress` }
        data-testid="start-recipe-btn"
        className="wrapper__buttons__startRecipe"
      >
        { inProgress()
          ? 'Continuar Receita'
          : 'Iniciar Receita'}
      </Link>
    );
  }

  const NUMBER_OF_INGREDIENTS = 15;
  const ingredients = ingredientsMesure(drink, NUMBER_OF_INGREDIENTS);
  console.log(loading);

  return (
    loading ? <Loading /> : (
      <div className="c-recipesDetails">
        <header className="c-header">
          <img
            src={ drink.strDrinkThumb }
            alt=""
            data-testid="recipe-photo"
            className="c-banner"
          />

          <div className="c-info">
            <div>
              <h1
                data-testid="recipe-title"
                className="c-info__title"
              >
                { drink.strDrink }
              </h1>
              <span
                data-testid="recipe-category"
                className="c-info__category"
              >
                { drink.strAlcoholic }
              </span>
            </div>

            <div className="c-wrapper__icons">
              { isFavorite() ? (
                <button
                  type="button"
                  className="c-icons__blackHeartIcon"
                  onClick={ () => favoriteMeal() }
                >
                  <img
                    src={ blackHeartIcon }
                    data-testid="favorite-btn"
                    alt="blackHeartIcon"
                  />
                </button>)
                : (
                  <button
                    type="button"
                    className="c-icons__whiteHeartIcon"
                    onClick={ () => favoriteMeal() }
                  >
                    <img
                      src={ whiteHeartIcon }
                      data-testid="favorite-btn"
                      alt="whiteHeartIcon"
                    />
                  </button>)}
              <ShareButton id={ id } index={ 0 } type="bebidas" />
            </div>
          </div>
        </header>

        <div className="c-ingredients">
          <h2 className="c-ingredients__title">Ingredients</h2>
          {ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </li>
          ))}
        </div>

        <div className="c-instructions">
          <h2 className="c-instructions__title">Instructions</h2>
          <p data-testid="instructions">{ drink.strInstructions}</p>
        </div>

        <div className="c-drinkAlternative__wrapper">
          <div className="c-drinkAlternative__cards">
            {mealAlternate.map((meal, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recomendation-card` }
                className="c-drinkAlternative__card"
              >
                <img
                  src={ meal.strMealThumb }
                  alt="meal"
                  className="c-drinkAlternative__img"
                />
                <div className="c-drinkAlternative__wrapper__title">
                  <span
                    key={ index }
                    data-testid={ `${index}-recomendation-title` }
                  >
                    {meal.strMeal}
                  </span>
                  <span>{ drink.strCategory }</span>
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="c-drinkAlternative__wrapper__title">
          { renderProgress() }
        </div>
      </div>
    )

  );
}

RecipesDrinksDetails.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object]).isRequired,
};