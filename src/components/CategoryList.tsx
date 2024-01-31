import styled from "styled-components";
import { Category } from "../types/category";

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string[];
  handleClickCategory: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const CategoryList = function CategoryList({
  categories,
  selectedCategory,
  handleClickCategory,
}: CategoryListProps) {
  return (
    <CategoryListContainer>
      {categories.map((category) => {
        return (
          <CategoryContainer
            selected={selectedCategory.includes(category.strCategory)}
            key={category.idCategory}
            data-category={category.strCategory}
            onClick={handleClickCategory}
          >
            {category.strCategory}
          </CategoryContainer>
        );
      })}
    </CategoryListContainer>
  );
};

const CategoryListContainer = styled("div")`
  display: flex;
  align-items: center;

  gap: 1rem;

  flex-wrap: wrap;
`;

const CategoryContainer = styled("div")<{
  selected: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid white;
  border-radius: 100px;
  padding: 0.5rem;

  cursor: pointer;

  background-color: ${({ selected }) => (selected ? "white" : "transparent")};
  color: ${({ selected }) => (selected ? "black" : "white")};
`;
