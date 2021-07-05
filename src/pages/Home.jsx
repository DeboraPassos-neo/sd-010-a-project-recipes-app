import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import SearchBarButton from '../components/SearchBar/SearchBarButton';
import SearchBar from '../components/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import useFetchRecipes from '../effects/useFetchRecipes';
import RecipesContainer from '../styles/home';
import CardList from '../components/CardList/CardList';

function Home(props) {
  const { type } = props;
  const fetchData = useFetchRecipes(type);
  const [recipes, setRecipes] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const handleToggleSearchBar = (ev) => {
    ev.preventDefault();
    setIsActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (fetchData[type]) setRecipes(fetchData[type]);
  }, [fetchData, type]);

  return (
    <>
      <Header>
        { type === 'meals'
          ? (<h2 data-testid="page-title">Comidas</h2>) : (
            <h2 data-testid="page-title">Bebidas</h2>)}
        <SearchBarButton onClick={ handleToggleSearchBar } />
      </Header>
      <div>
        { isActive ? (<SearchBar type={ type } />) : ''}
      </div>
      <RecipesContainer>
        <CardList recipes={ recipes } type={ type } />
      </RecipesContainer>
      <Footer />
    </>
  );
}

Home.propTypes = {
  recipe: PropTypes.string,
}.isRequired;

export default Home;