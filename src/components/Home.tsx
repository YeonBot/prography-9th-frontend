import styled from "styled-components";
import { CategoryList } from "./CategoryList";
import { useInView } from "react-intersection-observer";
import { getCategories, getMealsByCategory } from "../apis/category";
import { useEffect, useMemo, useState } from "react";
import { Category, Meal } from "../types/category";
import { MealList } from "./MealList";

const MEAL_PER_PAGE = 20;

interface HomeProps {}

export const Home = function Home({}: HomeProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const [page, setPage] = useState<number>(1);

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

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (!inView) {
      return;
    }

    setPage((prev) => prev + 1);
  }, [inView]);

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

  const showedMeals = useMemo(() => {
    return meals.slice(0, Math.min(page * MEAL_PER_PAGE, meals.length));
  }, [meals, page]);

  return (
    <HomeContainer>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        handleClickCategory={handleClickCategory}
      />
      <MealList meals={meals} showedMeals={showedMeals} />
      <div ref={ref}>나를 봤다면, 이벤트 실행!!</div>
    </HomeContainer>
  );
};

const HomeContainer = styled("div")``;
