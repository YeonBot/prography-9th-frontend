import styled from "styled-components";
import { Meal } from "../types/category";

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
        <div>{meals.length}</div>
      </InfoContainer>
      <MealListContainer>
        {showedMeals.map((meal) => {
          return (
            <MealContainer key={meal.idMeal}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              {meal.strMeal}
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

  img {
    width: 100px;
    height: 100px;
  }
`;

const MealContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
`;
