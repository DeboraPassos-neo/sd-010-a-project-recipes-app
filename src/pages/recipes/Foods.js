import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';
import RecipesList from '../../components/RecipesList';
import Context from '../../context/Context';
import { getMealsByName } from '../../services/getMeals';
import '../../App.css';

export default function Foods() {
  const { mealsList, setMealsList, isLoading, setLoading } = useContext(Context);
  useEffect(() => {
    const reciveMeals = async () => {
      setLoading(true);
      const data = await getMealsByName();
      setMealsList([...data]);
      setLoading(false);
    };
    reciveMeals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="food-page">
      <Header title="Comidas" show />
      { isLoading ? <h1>Loading...</h1> : <RecipesList data={ mealsList } /> }
      <BottomMenu />
    </div>
  );
}
