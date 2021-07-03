export default async function fetchDrinks(filter) {
  const endpoint = filter ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const { drinks } = await (await fetch(endpoint)).json();
  return drinks;
}

export async function fetchMealSearched(text, option) {
  if (option === 'ingredient') {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text}`;
    const { drinks } = await (await fetch(endpoint)).json();
    return drinks || [];
  }
  if (option === 'name') {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`;
    const { drinks } = await (await fetch(endpoint)).json();
    return drinks || [];
  }
  if (option === 'first-letter') {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text}`;
    const { drinks } = await (await fetch(endpoint)).json();
    return drinks || [];
  }
}
