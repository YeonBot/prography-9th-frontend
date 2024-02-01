import styled from "styled-components";
import { CategoryList } from "./CategoryList";
import { useInView } from "react-intersection-observer";
import { getCategories, getMealsByCategory } from "../apis/category";
import { useEffect, useMemo, useState } from "react";
import { Category, Meal } from "../types/category";
import { MealList } from "./MealList";
import { Select, Option } from "./Select";
import { useQueryString } from "../hooks/useQueryString";
import { SortOption } from "../types/sort";
import { useIsMobile } from "../hooks/useIsMobile";

const MEAL_PER_PAGE = 20;

interface HomeProps {}

export const Home = function Home({}: HomeProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  const [page, setPage] = useState<number>(1);

  const [meals, setMeals] = useState<Meal[]>([]);

  const isMobile = useIsMobile();
  const [mealCountPerRow, setMealCountPerRow] = useState<number>(
    isMobile ? 1 : 4
  );
  useEffect(() => {
    setMealCountPerRow(isMobile ? 1 : 4);
  }, [isMobile]);

  const { value: categoryValue, set: setCategoryValue } = useQueryString(
    "category",
    {
      defaultValue: "",
      type: "array",
    }
  );
  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    categoryValue.split(",").filter((item) => item)
  );

  useEffect(() => {
    setCategoryValue(selectedCategory.join(","));
  }, [selectedCategory]);

  const { value: filterValue, set: setFilterValue } = useQueryString("filter", {
    defaultValue: "new",
    type: "string",
  });
  const [sort, setSort] = useState<SortOption>(filterValue as SortOption);

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
    return [...meals]
      .sort((a, b) => {
        if (sort === "new") {
          return b.idMeal - a.idMeal;
        }

        if (sort === "asc") {
          return a.strMeal.localeCompare(b.strMeal);
        }

        if (sort === "desc") {
          return b.strMeal.localeCompare(a.strMeal);
        }

        return 0;
      })
      .slice(0, Math.min(page * MEAL_PER_PAGE, meals.length));
  }, [meals, page, sort]);

  return (
    <HomeContainer>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        handleClickCategory={handleClickCategory}
      />

      <Select
        value={sort}
        onChange={(event) => {
          const target = event.target as HTMLSelectElement;
          const value = target.value;

          setSort(value as "new" | "asc" | "desc");
          setFilterValue(value);
        }}
      >
        <Option value="new">new</Option>
        <Option value="asc">asc</Option>
        <Option value="desc">desc</Option>
      </Select>

      {!isMobile && (
        <Select
          value={mealCountPerRow}
          onChange={(event) => {
            const target = event.target as HTMLSelectElement;
            const value = target.value;

            setMealCountPerRow(Number(value));
          }}
        >
          <Option value="2">2</Option>
          <Option value="4">4</Option>
        </Select>
      )}

      <MealList
        meals={meals}
        showedMeals={showedMeals}
        mealCountPerRow={mealCountPerRow}
      />
      <div ref={ref}>나를 봤다면, 이벤트 실행!!</div>
    </HomeContainer>
  );
};

const HomeContainer = styled("div")``;
