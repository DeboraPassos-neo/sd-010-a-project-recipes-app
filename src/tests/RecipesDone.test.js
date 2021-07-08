import React from 'react';
import RecipesDone from '../pages/RecipesDone';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';

const {
  renderEmptyValue,
  headerRenderTests,
  footerRenderTests,
} = getTest('/receitas-feitas');
const { itDoesntRenderSearchIcon } = headerRenderTests();
const { itDoesntRenderFooter } = footerRenderTests();

describe('RecipesDone screen', () => {
  describe('Check Header and Footer components', () => {
    it('doesnt render the Header and Footer on the RecipesDone screen', () => {
      const { queryByTestId, getByTestId } = renderWithRouterAndContext(
        <RecipesDone />,
        renderEmptyValue,
      );
      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      itDoesntRenderFooter(queryByTestId);
    });
  });
});