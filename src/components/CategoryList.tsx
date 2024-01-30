import styled from "styled-components";
import { getCategories } from "../apis/category";
import { useEffect, useState } from "react";
import { Category } from "../types/category";

interface CategoryListProps {}

export const CategoryList = function CategoryList({}: CategoryListProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((_categories: Category[]) => {
      setCategories(_categories);
    });
  }, []);

  return (
    <CategoryListContainer>
      {categories.map((category) => {
        return (
          <CategoryContainer key={category.idCategory}>
            {category.strCategory}
          </CategoryContainer>
        );
      })}
    </CategoryListContainer>
  );
};

const CategoryListContainer = styled("div")`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap 1rem;
`;

const CategoryContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
