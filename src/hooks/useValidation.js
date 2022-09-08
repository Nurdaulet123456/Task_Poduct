import { useEffect, useState } from "react";

export const useValidation = (
  name,
  setName,
  descr,
  setDescr,
  price,
  setPrice
) => {
  const [nameDirty, setNameDirty] = useState(false);
  const [descriptionDirty, setDescriptionDirty] = useState(false);
  const [priceDirty, setPriceDirty] = useState(false);
  const [nameError, setNameError] = useState("Название не быть пустым");
  const [descriptionError, setDescriptionError] = useState(
    "Описание не быть пустым"
  );
  const [priceError, setPriceError] = useState("Цена не быть пустым");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (nameError || descriptionError || priceError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, descriptionError, priceError]);

  const nameHandler = (e) => {
    setName(e.target.value);
    if (name.length === 0) {
      setNameError("Пишите название");
    } else {
      setNameError("");
    }
  };

  const descriptionHandler = (e) => {
    setDescr(e.target.value);

    if (descr.length <= 20) {
      setDescriptionError("Описание должно быть минимум 30 слов");
    } else {
      setDescriptionError("");
    }
  };

  const priceHandler = (e) => {
    setPrice(e.target.value);

    if (price <= 1000) {
      setPriceError("Цена должен быть больше");
    } else {
      setPriceError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "descr":
        setDescriptionDirty(true);
        break;
      case "price":
        setPriceDirty(true);
        break;

      default:
        break;
    }
  };

  return {
    nameDirty,
    descriptionDirty,
    priceDirty,
    nameError,
    descriptionError,
    priceError,
    formValid,
    nameHandler,
    descriptionHandler,
    priceHandler,
    blurHandler,
  };
};
