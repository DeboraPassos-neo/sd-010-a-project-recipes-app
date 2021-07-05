import React from 'react';
import { Link } from 'react-router-dom';

function Drinks() {
  return (
    <div>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>

      <Link to="">
        <button
          data-testid="explore-surprise"
          >
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
}

export default Drinks;
