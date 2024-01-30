import axios from "axios";
import { Category, Meal } from "../types/category";

export const getCategories = async () => {
  try {
    const res = await axios.get<{
      categories: Category[];
    }>("https://www.themealdb.com/api/json/v1/1/categories.php");
    return res.data.categories;
  } catch (error) {
    console.warn(error);
    return [];
  }
};

export const getMealsByCategory = async (strCategory: string) => {
  try {
    const res = await axios.get<{
      meals: Meal[];
    }>(` https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`);
    return res.data.meals;
  } catch (error) {
    console.warn(error);
    return [];
  }
};
