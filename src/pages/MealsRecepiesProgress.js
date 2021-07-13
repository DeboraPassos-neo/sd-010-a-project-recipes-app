import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Share from '../images/shareIcon.svg';
import MealIngredientsMeasure from '../compenents/MealIngredientsMeasure';
import RecipesContext from '../contexts/RecipesContext';

const copy = require('clipboard-copy');

function MealsRecepiesProgress() {
  const [detailsRecepie, setDetailsRecepie] = useState();
  const { allChecked } = useContext(RecipesContext);
  const history = useHistory();
  const recepiID = history.location.pathname.split('/')[2];

  // ao montar a pagina, faz api que traz infos via ID.
  useEffect(() => {
    console.log('entrou no didMount de mealsRecepieProgress');
    const getRecepi = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recepiID}`;
      const { meals } = await fetch(endpoint).then((data) => data.json()); /* .then((response) => response)) */
      console.log(meals);
      setDetailsRecepie(meals[0]);
    };
    getRecepi();
  }, []);

  function copyLink() {
    const linkToCopy = `/comidas/${recepiID}`;
    copy(linkToCopy);
    global.alert('Link copiado!');
  }

  if (detailsRecepie === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt="meals recepi"
        src={ detailsRecepie.strMealThumb }
        width="50px"
      />
      <h2 data-testid="recipe-title">{ detailsRecepie.strMeal }</h2>
      <button type="button" data-testid="share-btn" onClick={ copyLink }>
        <img alt="compartilhar" width="50px" src={ Share } />
      </button>
      { /* <Componente fav/desfav> */ }
      <p data-testid="recipe-category">{ detailsRecepie.strCategory }</p>
      <p>Ingredients</p>
      <MealIngredientsMeasure
        detailsRecepie={ detailsRecepie }
      />
      <p>Instruções</p>
      <p data-testid="instructions">{ detailsRecepie.strInstructions }</p>

      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ allChecked }
        >
          Finalizar receita
        </button>
      </Link>
    </div>
  );
}

export default MealsRecepiesProgress;