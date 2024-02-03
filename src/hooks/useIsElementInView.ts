import { useRef, useState, useEffect } from "react";

export const useIsElementInView = () => {
  const elementRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback);
    elementRef.current && observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef]);

  return { elementRef, isVisible };
};
