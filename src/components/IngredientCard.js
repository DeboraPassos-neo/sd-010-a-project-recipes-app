import React from 'react';
import ProPTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';

function IngredientCard({ index, thumbnail, name }) {
  // const { pathname } = useLocation();

  return (
    <div className="">
      {/* <Link to={ `${pathname}/${id}` }> */}
      <div
        className="cards-div"
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ thumbnail }
          alt={ `${index} recipe` }
          className="card-img"
        />
        <h2
          data-testid={ `${index}-card-name` }
          className="card-h2"
        >
          { name }
        </h2>
      </div>
      {/* </Link> */}
    </div>
  );
}

IngredientCard.propTypes = {
  index: ProPTypes.number,
  thumbnail: propTypes.string,
  name: propTypes.string,
  id: ProPTypes.string,
}.isRequired;

export default IngredientCard;
