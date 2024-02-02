import styled from "styled-components";
import { useIsElementInViewport } from "../hooks/useIsElementInViewport";

interface MealThumbProps {
  src: string;
  alt: string;
}

export const MealThumb = function MealThumb({ src, alt }: MealThumbProps) {
  const { elementRef, isVisible } = useIsElementInViewport();

  return (
    <MealThumbImage
      ref={elementRef as any}
      src={isVisible ? src : "/images/placeholder.png"}
      alt={alt}
    />
  );
};

const MealThumbImage = styled("img")`
  width: 200px;
  height: 200px;
`;
