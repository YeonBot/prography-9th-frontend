import styled from "styled-components";
import { useIsElementInView } from "../hooks/useIsElementInView";

interface MealThumbProps {
  src: string;
  alt: string;
}

export const MealThumb = function MealThumb({ src, alt }: MealThumbProps) {
  const { elementRef, isVisible } = useIsElementInView();

  return (
    <MealThumbImage
      ref={elementRef as any}
      src={isVisible ? src : "/images/placeholder.png"}
      alt={alt}
    />
  );
};

const MealThumbImage = styled("img")`
  width: 250px;
  height: 250px;
  object-fit: cover;

  border-radius: 1rem;
`;
