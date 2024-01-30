import styled from "styled-components";
import { getCategories, getMealsByCategory } from "../apis/category";
import { useEffect, useState } from "react";
import { Category, Meal } from "../types/category";

interface CategoryListProps {}

export const CategoryList = function CategoryList({}: CategoryListProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    getCategories().then((_categories: Category[]) => {
      setCategories(_categories);
    });
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      return;
    }

    getAllMealsBySelectedCategory();
  }, [selectedCategory]);

  const getAllMealsBySelectedCategory = async () => {
    if (!selectedCategory) {
      return;
    }

    const _meals = await Promise.all(
      selectedCategory.map((category) => {
        return getMealsByCategory(category);
      })
    );

    setMeals(_meals.flat());
  };

  const handleClickCategory = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = event.target as HTMLDivElement;
    const { category } = target.dataset;

    if (!category) {
      return;
    }

    setSelectedCategory((prev) => {
      if (prev.length === 0) {
        return [category];
      }

      const isAlreadySelected = prev.includes(category);
      if (isAlreadySelected) {
        return prev.filter((item) => item !== category);
      }

      return [...prev, category];
    });
  };

  return (
    <>
      <CategoryListContainer>
        {categories.map((category) => {
          return (
            <CategoryContainer
              selected={selectedCategory.includes(category.strCategory)}
              key={category.idCategory}
              data-category={category.strCategory}
              onClick={handleClickCategory}
            >
              {category.strCategory}
            </CategoryContainer>
          );
        })}
      </CategoryListContainer>

      <InfoContainer>
        <h1>Total Meals</h1>
        <div>{meals.length}</div>
      </InfoContainer>
      <MealListContainer>
        {meals.map((meal) => {
          return (
            <div key={meal.idMeal}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              {meal.strMeal}
            </div>
          );
        })}
      </MealListContainer>
    </>
  );
};

const CategoryListContainer = styled("div")`
  display: flex;
  align-items: center;

  gap: 1rem;

  flex-wrap: wrap;
`;

const CategoryContainer = styled("div")<{
  selected: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid white;
  border-radius: 100px;
  padding: 0.5rem;

  cursor: pointer;

  background-color: ${({ selected }) => (selected ? "white" : "transparent")};
  color: ${({ selected }) => (selected ? "black" : "white")};
`;

const InfoContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;

  flex-wrap: wrap;
`;

const MealListContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;

  flex-wrap: wrap;

  img {
    width: 100px;
    height: 100px;
  }
`;
