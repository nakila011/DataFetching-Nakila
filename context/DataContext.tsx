import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Products } from "../types/types";

interface DataContextType {
  products: Products[];
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>;
}

export const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Products[]>([]);

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); 

  return (
    <DataContext.Provider value={{ products, setProducts }}>
      {children}
    </DataContext.Provider>
  );
};

