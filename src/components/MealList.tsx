import styled from "styled-components";
import { Meal } from "../types/category";
import { MealThumb } from "./MealThumb";

interface MealListProps {
  meals: Meal[];
  showedMeals: Meal[];
}

export const MealList = function MealList({
  meals,
  showedMeals,
}: MealListProps) {
  return (
    <>
      <InfoContainer>
        <h1>Total Meals</h1>
        <div>
          {showedMeals.length} / {meals.length}
        </div>
      </InfoContainer>
      <MealListContainer>
        {showedMeals.map((meal) => {
          return (
            <MealContainer key={meal.idMeal}>
              <MealThumb src={meal.strMealThumb} alt={meal.strMeal} />
              <MealTitle>{meal.strMeal}</MealTitle>
            </MealContainer>
          );
        })}
      </MealListContainer>
    </>
  );
};

const InfoContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;

  flex-wrap: wrap;
`;

const MealListContainer = styled("div")`
  display: grid;
  align-items: center;
  justify-content: center;

  grid-template-columns: repeat(4, 1fr);

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
