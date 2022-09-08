import "../addProducts/addProducts.css";

import React, { useContext, useState, memo } from "react";

import { useParams } from "react-router-dom";
import { filterProduct } from "../../helper/filterProduct";
import { DataContext } from "../../context/context";
import Form from "../form/form";
import { useFilter } from "../../hooks/useFilter";

export const EditProducts = memo(() => {
  // ! Context and Params that get Products and ID product
  const { products, filters, editProducts, cityes } = useContext(DataContext);
  const { id } = useParams();

  // ! Filtered products that is given id product
  const { objectProducts } = filterProduct(products, id);

  //! State all data products object
  const [editName, setEditName] = useState(objectProducts[0]?.name);
  const [editDescr, setEditDescr] = useState(objectProducts[0]?.subtitle);
  const [editPrice, setEditPrice] = useState(
    objectProducts[0]?.price.productsPrice
  );
  const [editValues, setEditValues] = useState({
    Almaty: objectProducts[0]?.price.priceValues.Almaty,
    Aktobe: objectProducts[0]?.price.priceValues.Aktobe,
    Shymkent: objectProducts[0]?.price.priceValues.Shymkent,
    Aktau: objectProducts[0]?.price.priceValues.Aktau,
  });
  const [editPath, setEditPath] = useState(objectProducts[0]?.path);
  const [elements, setElements] = useState([]);
  const [productElement, setProductElement] = useState("");

  const [isSubscribed, setIsSubscribed] = useState(false);

  // ! Filters (convert array to String using join() method)
  const { handleClickIdFilters } = useFilter(
    setElements,
    productElement,
    elements
  );

  // ! Submit edit save Products
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: id,
      name: editName,
      subtitle: editDescr,
      price: {
        productsPrice: editPrice,
        priceValues: editValues,
      },
      status: elements,
      path: editPath,
    };

    editProducts(newProduct).unwrap();

    setEditName("");
    setEditDescr("");
    setEditPrice("");

    console.log(newProduct);

    window.location = `/`;
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

  // ! Change input type by checkbox
  const handleChange = (event) => {
    if (!setIsSubscribed(event.target.checked)) {
      setEditValues({
        Almaty: editPrice,
        Aktobe: editPrice,
        Shymkent: editPrice,
        Aktau: editPrice,
      });
    }
  };

  const onChangePriceValues = (e) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <form>
            <Form
              name={editName}
              setName={setEditName}
              descr={editDescr}
              setDescr={setEditDescr}
              isSubscribed={isSubscribed}
              handleChange={handleChange}
              price={editPrice}
              cityes={cityes}
              productElement={productElement}
              setProductElement={setProductElement}
              handleClickIdFilters={handleClickIdFilters}
              renderFilters={renderFilters}
              filters={filters}
              setUploadImageBig={setEditPath}
              uploadImageBig={editPath}
              handleSubmit={handleSubmit}
              setPrice={setEditPrice}
              onChangePriceValues={onChangePriceValues}
              priceValues={editValues}
              setPriceValues={setEditValues}
            />
          </form>
        </div>
      </section>
    </>
  );
});
