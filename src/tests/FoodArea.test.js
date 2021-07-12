import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './helper/renders/renderWithRouterAndContext';
import getTest from './helper/mocks/getTestInfo';

const {
  headerRenderTests,
  footerRenderTests,
  redirectToExploreTypeScreen,
} = getTest();

const { getByTestId } = screen;

const redirectToFoodExploreAreaScreen = () => {
  redirectToExploreTypeScreen(getByTestId, userEvent, 'food');
  const exploreByAreaButton = getByTestId('explore-by-area');
  userEvent.click(exploreByAreaButton);
};

describe('FoodArea Screen', () => {
  describe('Check Header and Footer components', () => {
    it('does Header and Footer tests', async () => {
      await renderWithRouterAndContext();

      redirectToFoodExploreAreaScreen();

      headerRenderTests().itRenderAllIcons(getByTestId);
      footerRenderTests().itRenderAllIcons(getByTestId);
    });
  });

  describe('Check all elements on FoodArea Screen', () => {
    it('checks the dropdown area', async () => {
      await renderWithRouterAndContext();

      redirectToFoodExploreAreaScreen();

      const dropdownByArea = getByTestId('explore-by-area-dropdown');
      userEvent.selectOptions(dropdownByArea, ['All']);

      const allOption = getByTestId('All-option');
      expect(allOption.selected).toBe(true);
    });
  });
});
