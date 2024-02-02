import styled from "styled-components";
import { Meal } from "../types/category";
import { MealThumb } from "./MealThumb";

interface MealListProps {
  meals: Meal[];
  showedMeals: Meal[];
  mealCountPerRow: number;
}

export const MealList = function MealList({
  meals,
  showedMeals,
  mealCountPerRow,
}: MealListProps) {
  return (
    <MealListContainer mealCountPerRow={mealCountPerRow}>
      {showedMeals.map((meal) => {
        return (
          <MealContainer key={meal.idMeal}>
            <MealThumb src={meal.strMealThumb} alt={meal.strMeal} />
            <MealTitle>{meal.strMeal}</MealTitle>
          </MealContainer>
        );
      })}
    </MealListContainer>
  );
};

const MealListContainer = styled("div")<{
  mealCountPerRow: number;
}>`
  display: grid;
  align-items: center;
  justify-content: center;

  ${({ mealCountPerRow }) => {
    return `grid-template-columns: repeat(${mealCountPerRow}, 1fr);`;
  }}

  gap: 1rem;

  flex-wrap: wrap;
`;

const MealContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  gap: 1rem;
`;

const MealTitle = styled("div")``;
