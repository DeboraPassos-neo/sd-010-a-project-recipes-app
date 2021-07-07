const DRINK_CATEGORIES_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const DRINK_AREAS_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list';
const DRINK_INGREDIENTS_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const number = -1;
const DRINK_RANDOM_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

export async function getDrinksCategories() {
  try {
    const response = await fetch(DRINK_CATEGORIES_ENDPOINT);
    const data = await response.json();
    return data.drinks;
  } catch (erro) {
    console.log('Erro on get drink categories');
  }
}

export async function getDrinksAreas() {
  try {
    const response = await fetch(DRINK_AREAS_ENDPOINT);
    const data = await response.json();
    return data.drinks;
  } catch (erro) {
    console.log('Erro on get drink areas');
  }
}

export async function getDrinksIngredients() {
  try {
    const response = await fetch(DRINK_INGREDIENTS_ENDPOINT);
    const data = await response.json();
    return data.drinks;
  } catch (erro) {
    console.log('Erro on get drink ingredients');
  }
}

export function drinkIngredientImg(drinkName) {
  return `https://www.thecocktaildb.com/images/ingredients/${drinkName}-Small.png`;
}

export async function getDrinks(dataQty = number) {
  try {
    const response = await fetch(DRINKS);
    const data = await response.json();
    return data.drinks.slice(0, dataQty);
  } catch (erro) {
    console.log('Erro on get drinks');
  }
}

export async function getRandomDrink() {
  try {
    const response = await fetch(DRINK_RANDOM_ENDPOINT);
    const data = await response.json();
    const [out] = data.drinks;
    return out;
  } catch (erro) {
    console.log('Erro in getting random drink');
  }
}
