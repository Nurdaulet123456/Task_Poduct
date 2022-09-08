import "./addProducts.css";

import React, { useContext, useState, memo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DataContext } from "../../context/context";
import Form from "../form/form";
import { useFilter } from "../../hooks/useFilter";

const AddProduct = () => {
  // ! Context that get all data in state
  const {
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
    cityes,
    filters,
    createProduct,
  } = useContext(DataContext);

  const [priceValues, setPriceValues] = useState({
    Almaty: "",
    Aktobe: "",
    Shymkent: "",
    Aktau: "",
  });
  const [uploadImageBig, setUploadImageBig] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [isSubscribed, setIsSubscribed] = useState(false);

  // ! При обновление checkbox будет постоянным значение true
  useEffect(() => {
    setIsSubscribed(true);
  }, []);

  // ! Filters using join method that conver array to string
  const { handleClickIdFilters } = useFilter(
    setElements,
    productElement,
    elements
  );

  // ! Submit save Products
  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: uuidv4(),
      name: productsName,
      subtitle: productsDescr,
      price: {
        productsPrice: productsPrice,
        priceValues: priceValues,
      },
      status: elements,
      path: uploadImageBig
    };

    createProduct(newProduct).unwrap();

    setProductsName("");
    setProductsDescr("");
    setProductsPrice("");

    window.location = "/";
  };

  // ! Render Filters
  const renderFilters = (filters) => {
    return filters.map(({ name, className }) => {
      return (
        <option key={name} value={name} className={className}>
          {name}
        </option>
      );
    });
  };

  // ! Change input by checkbox
  const handleChange = (event) => {
    if (!setIsSubscribed(event.target.checked)) {
      setPriceValues({
        Almaty: productsPrice,
        Aktobe: productsPrice,
        Shymkent: productsPrice,
        Aktau: productsPrice,
      });
    }
  };

  // ! Change cities inputs
  const onChangePriceValues = (e) => {
    setPriceValues({
      ...priceValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <form>
            <Form
              name={productsName}
              setName={setProductsName}
              descr={productsDescr}
              setDescr={setProductsDescr}
              isSubscribed={isSubscribed}
              handleChange={handleChange}
              price={productsPrice}
              productElement={productElement}
              setProductElement={setProductElement}
              handleClickIdFilters={handleClickIdFilters}
              renderFilters={renderFilters}
              filters={filters}
              handleSubmit={handleSubmit}
              setPrice={setProductsPrice}
              cityes={cityes}
              onChangePriceValues={onChangePriceValues}
              setUploadImageBig={setUploadImageBig}
              priceValues={priceValues}
              setPriceValues={setPriceValues}
              uploadImageBig={uploadImageBig}
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default memo(AddProduct);
