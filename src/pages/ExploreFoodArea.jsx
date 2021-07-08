import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import Cards from '../components/Cards';

import FoodContext from '../contexts/foods/FoodContext';

function ExploreFoodArea() {
  const maxElements = 12;

  const [areas, setareas] = useState([]);

  const { mealsRecipes } = useContext(FoodContext);

  useEffect(() => {
    const getAreas = async () => {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await res.json();
      setareas(data.meals);
    };
    getAreas();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <SelectArea data-testid="explore-by-area-dropdown">
          <option value="">Selecione uma opção</option>
          {
            areas.length && areas.map(({ strArea }, i) => (
              <option
                data-testid={ `${strArea}-option` }
                value={ strArea }
                key={ i }
              >
                { strArea }
              </option>
            ))
          }
        </SelectArea>
        <ContainerCards>
          {
            mealsRecipes.filter((_, index) => index < maxElements)
              .map((recipe, index) => (
                <Cards
                  id={ recipe.idMeal }
                  key={ index }
                  index={ index }
                  name={ recipe.strMeal }
                  thumbnail={ recipe.strMealThumb }
                  type="meal"
                />
              ))
          }
        </ContainerCards>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header-wrapper {
    display: flex;
    align-items: center;

    h1 {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }
  }

`;

const Content = styled.div`
  width: 90%;
  display: flex;
  margin-top: 15px;
  flex-direction: column;
`;

const SelectArea = styled.select`
  width: 60%;
  align-self: flex-end;
`;

const ContainerCards = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px 0;

  .cards-div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img, h2 {
    margin: 0;
  }
`;

export default ExploreFoodArea;
