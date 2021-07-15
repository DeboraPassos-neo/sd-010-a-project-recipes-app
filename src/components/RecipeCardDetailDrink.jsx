import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShareBtn from './componentsDetails/ShareBtn';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { drinkById } from '../services/apiRequests';
import FoodsRecomends from './componentsDetails/FoodsRecomends';
import './DetailsScreen.css';
import BtnInitiateRecipe from './componentsDetails/BtnInitiateRecipe';

export default function RecipeCardDetailDrink() {
  const [drinkDetails, setDrinkDetails] = useState({});
  const { idDrink } = useParams();
  console.log(drinkDetails);
  useEffect(() => {
    const fetchDrink = async () => {
      const drink = await drinkById(idDrink);
      setDrinkDetails(drink);
    };

    fetchDrink();
  }, [idDrink]);

  const retObj = Object.entries(drinkDetails);
  const listIngredients = retObj.filter((meal) => (
    meal[0].includes('Ingredient') && meal[1]
  ));
  const filterAlcoohol = retObj.filter((meal) => {
    const noAlcool = meal[1] !== ' ' && meal[1] !== null;
    return meal[0].includes('Measure') && noAlcool;
  });

  return (
    <div>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt="imagem da bebida"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ drinkDetails.strDrink }</h1>
      <ShareBtn />
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="favoritar" />
      </button>
      <h2 data-testid="recipe-category">{ drinkDetails.strAlcoholic }</h2>
      <h3>Ingredientes:</h3>
      <ul>
        {listIngredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {filterAlcoohol[index] ? (
              `${ingredient[1]} - ${filterAlcoohol[index][1]}`
            ) : (ingredient[1])}
          </li>
        ))}
      </ul>
      <h4>Instructions: </h4>
      <h2 data-testid="instructions">{ drinkDetails.strInstructions }</h2>
      <FoodsRecomends />
      <BtnInitiateRecipe id={ idDrink } type="bebida" />
    </div>
  );
}