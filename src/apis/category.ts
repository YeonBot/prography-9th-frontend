import axios from "axios";
import { Category } from "../types/category";

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
