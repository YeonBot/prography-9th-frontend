import styled from "styled-components";
import { Category } from "../types/meal";
import { useIsMobile } from "../hooks/useIsMobile";

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
  const isMobile = useIsMobile();

  return (
    <CategoryListContainer isMobile={isMobile}>
      {categories.map((category) => {
        return (
          <CategoryContainer
            key={category.idCategory}
            data-category={category.strCategory}
            selected={selectedCategory.includes(category.strCategory)}
            isMobile={isMobile}
            onClick={handleClickCategory}
          >
            {category.strCategory}
          </CategoryContainer>
        );
      })}
    </CategoryListContainer>
  );
};

const CategoryListContainer = styled("div")<{
  isMobile?: boolean;
}>`
  display: flex;
  align-items: center;

  gap: ${({ isMobile }) => (isMobile ? "0.5rem" : "1rem")};

  flex-wrap: wrap;
`;

const CategoryContainer = styled("div")<{
  selected: boolean;
  isMobile?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100px;

  ${({ isMobile }) => {
    return isMobile
      ? `
    padding: 8px 12px;
    font-size: 0.8rem;
    `
      : `
    padding: 10px 14px;
    font-size: 1.2rem;
    `;
  }}

  cursor: pointer;
  &:hover {
    background-color: ${({ selected }) => (selected ? "#ff87a2" : "#333336")};
  }

  background-color: ${({ selected }) => (selected ? "#fa2454" : "#1c1c1e")};
  border: 0.1px solid #e2e2e2;
  color: #e2e2e2;
`;
