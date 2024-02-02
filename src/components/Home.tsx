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

  const [page, setPage] = useState<number>(0);

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
      setCategories(
        [..._categories].sort((a, b) => {
          return Number(a.idCategory) - Number(b.idCategory);
        })
      );
    });
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      return;
    }

    getAllMealsBySelectedCategory();
  }, [selectedCategory, categories]);

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

    const filteredCategory = selectedCategory.filter((category) => {
      return categories.some((item) => item.strCategory === category);
    });

    const _meals = await Promise.all(
      filteredCategory.map((category) => {
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

      <InfoAndSortContainer>
        <InfoContainer>
          {!isMobile && <h1>Total Meals</h1>}
          <div>
            {showedMeals.length} / {meals.length}
          </div>
        </InfoContainer>
        <SelectContainer>
          <Select
            value={sort}
            onChange={(event) => {
              const target = event.target as HTMLSelectElement;
              const value = target.value;

              setSort(value as SortOption);
              setFilterValue(value);
            }}
          >
            <Option value="new">최신순</Option>
            <Option value="asc">오름차순</Option>
            <Option value="desc">내림차순</Option>
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
              <Option value="2">2개씩 보기</Option>
              <Option value="4">4개씩 보기</Option>
            </Select>
          )}
        </SelectContainer>
      </InfoAndSortContainer>

      <MealList
        meals={meals}
        showedMeals={showedMeals}
        mealCountPerRow={mealCountPerRow}
      />
      <div ref={ref}>나를 봤다면, 이벤트 실행!!</div>
    </HomeContainer>
  );
};

const HomeContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 1rem;
`;

const InfoAndSortContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  gap: 1rem;
`;

const SelectContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;
`;

const InfoContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 400;
  font-size: 1.2rem;
  line-height: 24px;
  letter-spacing: 0;

  gap: 1rem;

  flex-wrap: wrap;
`;
