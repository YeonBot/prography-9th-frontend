import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const useInfinityScrollPage = () => {
  const [page, setPage] = useState<number>(0);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (!inView) {
      return;
    }

    setPage((prev) => prev + 1);
  }, [inView]);

  return {
    ref,
    page,
    setPage,
  };
};
