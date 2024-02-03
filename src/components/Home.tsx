import styled from "styled-components";
import { CategoryList } from "./CategoryList";
import { useInView } from "react-intersection-observer";
import { getCategories, getMealsByCategory } from "../apis/meal";
import { useEffect, useMemo, useState } from "react";
import { Category, Meal } from "../types/meal";
import { MealList } from "./MealList";
import { Select, Option } from "./Select";
import { useQueryString } from "../hooks/useQueryString";
import { useIsMobile } from "../hooks/useIsMobile";
import { SortOption, sortOptions } from "../constants.ts/sort";
import { layoutOption } from "../constants.ts/layout";

const MEAL_PER_PAGE = 20;
const MOBILE_DEFAULT_LAYOUT = 1;
const WEB_DEFAULT_LAYOUT = 4;

export const Home = function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);

  const [page, setPage] = useState<number>(0);

  const isMobile = useIsMobile();
  const initMealCountRerRow = isMobile
    ? MOBILE_DEFAULT_LAYOUT
    : WEB_DEFAULT_LAYOUT;
  const [mealCountPerRow, setMealCountPerRow] =
    useState<number>(initMealCountRerRow);
  useEffect(() => {
    setMealCountPerRow(initMealCountRerRow);
  }, [isMobile]);

  const { value: categoryValue = "", set: setCategoryValue } =
    useQueryString("category");
  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    categoryValue?.split(",").filter((item) => item) || []
  );

  useEffect(() => {
    setCategoryValue(selectedCategory.join(","));
  }, [selectedCategory]);

  const { value: filterValue, set: setFilterValue } = useQueryString("filter");

  const [sort, setSort] = useState<SortOption>(
    (filterValue || "new") as SortOption
  );

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

  const showedMeals = useMemo(() => {
    return meals
      .map((meal) => {
        return {
          ...meal,
          strMeal: meal.strMeal.trim(),
        };
      })
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

  const handleChangeSort = (event: React.ChangeEvent) => {
    const target = event.target as HTMLSelectElement;
    const value = target.value;

    setSort(value as SortOption);
    setPage(1);
    setFilterValue(value);
  };

  const handleChangeLayout = (event: React.ChangeEvent) => {
    const target = event.target as HTMLSelectElement;
    const value = target.value;

    setMealCountPerRow(Number(value));
  };

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
          <Select value={sort} onChange={handleChangeSort}>
            {sortOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>

          {!isMobile && (
            <Select value={mealCountPerRow} onChange={handleChangeLayout}>
              {layoutOption.map((layout) => (
                <Option key={layout.value} value={layout.value}>
                  {layout.label}
                </Option>
              ))}
            </Select>
          )}
        </SelectContainer>
      </InfoAndSortContainer>

      <MealList showedMeals={showedMeals} mealCountPerRow={mealCountPerRow} />
      <ObserveContainer ref={ref}></ObserveContainer>
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

const ObserveContainer = styled("div")`
  width: 100%;
  height: 1px;
  margin-top: 1rem;
  background-color: transparent;
`;
