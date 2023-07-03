import React, { createContext, useState, useMemo } from 'react';
import { ICategory } from '../types/Prompt.types';

export interface ICategorysContext {
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
}

export const CategoriesContext = createContext<ICategorysContext>({
  categories: [],
  setCategories: () => {},
});

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const categoriesContextValue = useMemo(
    () => ({ categories, setCategories }),
    [categories, setCategories],
  );

  return (
    <CategoriesContext.Provider value={categoriesContextValue}>
      {children}
    </CategoriesContext.Provider>
  );
}
