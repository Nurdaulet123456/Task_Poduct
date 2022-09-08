import { useCallback } from "react";

export const useFilter = (setElements, productElement, elements) => {
  const handleClickIdFilters = useCallback(() => {
    const p = [productElement].join("");
    setElements(p);
  }, [productElement]);

  return {
    handleClickIdFilters,
  };
};
