import { createContext, useState, useDeferredValue, memo } from "react";
import {
  useGetProductsQuery,
  useGetFiltersQuery,
  useEditProductsMutation,
  useGetCitysQuery,
  useCreateProductMutation,
} from "../api/apiSlice";

export const DataContext = createContext(null);

export const Context = memo(({ children }) => {
  // ! RTK Query
  const { data: products = [] } = useGetProductsQuery();
  const { data: filters = [] } = useGetFiltersQuery();
  const { data: cityes = [] } = useGetCitysQuery();
  const [editProducts] = useEditProductsMutation();
  const [createProduct] = useCreateProductMutation();

  // ! State
  const [productsName, setProductsName] = useState("");
  const [productsDescr, setProductsDescr] = useState("");
  const [productsPrice, setProductsPrice] = useState("");
  const [productElement, setProductElement] = useState("");

  const [search, setSearch] = useState("");
  const searchValue = useDeferredValue(search);
  const [elements, setElements] = useState([]);

  return (
    <DataContext.Provider
      value={{
        products,
        elements,
        setElements,
        productsName,
        setProductsName,
        productsDescr,
        setProductsDescr,
        productsPrice,
        setProductsPrice,
        productElement,
        setProductElement,
        searchValue,
        setSearch,
        filters,
        editProducts,
        cityes,
        createProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
});
