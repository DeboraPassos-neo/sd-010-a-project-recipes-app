import React from 'react';

import DrinkExplore from '../pages/DrinkExplore';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';

const {
  renderEmptyValue,
  headerRenderTests,
  footerRenderTests,
} = getTest('/explorar/bebidas');

const { itDoesntRenderSearchIcon } = headerRenderTests();

describe('DrinkExplore Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', () => {
      const { getByTestId, queryByTestId } = renderWithRouterAndContext(
        <DrinkExplore />,
        renderEmptyValue,
      );

      itDoesntRenderSearchIcon(queryByTestId, getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });
});