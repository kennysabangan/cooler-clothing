import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

// import SHOP_DATA from '../shop-data';

export const CategoriesContext = createContext({
  categoriesMap: {},
})

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      console.log(categoryMap);
      setCategoriesMap(categoryMap);
    }

    getCategoriesMap();
  }, [])

  const categoriesState = { categoriesMap };

  return <CategoriesContext.Provider value={categoriesState}>{children}</CategoriesContext.Provider>
}
