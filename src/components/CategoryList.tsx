import styled from "styled-components";
import { getCategories, getMealsByCategory } from "../apis/category";
import { useEffect, useState } from "react";
import { Category, Meal } from "../types/category";

interface CategoryListProps {}

export const CategoryList = function CategoryList({}: CategoryListProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    getCategories().then((_categories: Category[]) => {
      setCategories(_categories);
    });
  }, []);

  const handleClickCategory = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = event.target as HTMLDivElement;
    const { category } = target.dataset;

    if (!category) {
      return;
    }

    const _meals = await getMealsByCategory(category);

    setMeals(_meals);
  };

  return (
    <CategoryListContainer>
      {categories.map((category) => {
        return (
          <CategoryContainer
            key={category.idCategory}
            data-category={category.strCategory}
            onClick={handleClickCategory}
          >
            {category.strCategory}
          </CategoryContainer>
        );
      })}
      {meals.map((meal) => {
        return (
          <div key={meal.idMeal}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            {meal.strMeal}
          </div>
        );
      })}
    </CategoryListContainer>
  );
};

const CategoryListContainer = styled("div")`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap 1rem;
`;

const CategoryContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
