import { Link } from "react-router-dom";
import { useValidation } from "../../hooks/useValidation";
import { handleChangeImage } from "../../helper/handleChangeImage";
import PriceInput from "../form/inputs/priceInput.js";
import { UploadImage } from "./inputs/uploadImage";

const Form = (props) => {
  const {
    name,
    setName,
    descr,
    setDescr,
    isSubscribed,
    handleChange,
    price,
    productElement,
    setProductElement,
    handleClickIdFilters,
    renderFilters,
    filters,
    handleSubmit,
    setPrice,
    uploadImageBig,
    setUploadImageBig,
    priceValues,
    onChangePriceValues,
    cityes,
  } = props;

  const valid = useValidation(name, setName, descr, setDescr, price, setPrice);
  return (
    <>
      <div className="add__products">
        <div className="add">
          <div className="add__input__product">
            <div>
              <p>Называние товара</p>
              <input
                className="text"
                type="text"
                name="name"
                placeholder="Называние"
                value={name}
                onChange={(e) => valid.nameHandler(e)}
                onBlur={(e) => valid.blurHandler(e)}
              />
              {valid.nameDirty && valid.nameError && (
                <div style={{ color: "red" }}>{valid.nameError}</div>
              )}
            </div>

            <div>
              <p>Описание товара</p>
              <textarea
                className="text"
                type="text"
                name="descr"
                placeholder="Описание"
                rows={"5"}
                value={descr}
                onChange={(e) => valid.descriptionHandler(e)}
                onBlur={(e) => valid.blurHandler(e)}
              ></textarea>
              {valid.descriptionDirty && valid.descriptionError && (
                <div style={{ color: "red" }}>{valid.descriptionError}</div>
              )}
            </div>
          </div>

          <div className="add__input__product">
            <div>
              <p>Цена</p>
              <div className="price">
                <label
                  htmlFor="check"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    id="check"
                    type="checkbox"
                    name="checkbox"
                    onChange={(e) => handleChange(e)}
                    checked={isSubscribed}
                  />
                  Одна цена для всех продкутов
                </label>

                <input
                  className="text"
                  type="text"
                  name="price"
                  placeholder="Цена"
                  value={price}
                  onChange={(e) => valid.priceHandler(e)}
                  onBlur={(e) => valid.blurHandler(e)}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                {valid.priceDirty && valid.priceError && (
                  <div style={{ color: "red" }}>{valid.priceError}</div>
                )}
              </div>
            </div>

            {isSubscribed
              ? null
              : cityes.map((values) => (
                  <div key={values.id}>
                    <PriceInput
                      {...values}
                      value={priceValues[values.name]}
                      onChange={onChangePriceValues}
                    />
                  </div>
                ))}
          </div>

          <div className="add__input__product">
            <div>
              <p>Фильтр</p>
              <select
                name="active"
                style={{ marginTop: "1rem" }}
                value={productElement}
                onChange={(e) => setProductElement(e.target.value)}
                onClick={handleClickIdFilters}
              >
                <option value="">Выберите</option>
                {renderFilters(filters)}
              </select>
            </div>
          </div>
        </div>

        {/* Upload Image */}

        <UploadImage
          handleChangeImage={handleChangeImage}
          setUploadImageBig={setUploadImageBig}
          uploadImageBig={uploadImageBig}
        />
      </div>

      <div className="buttons">
        <button
          disabled={!valid.formValid}
          className="btn"
          type="submit"
          onClick={handleSubmit}
        >
          Сохранить
        </button>
        <Link className="btn btn-white" to={"/"}>
          Отмена
        </Link>
      </div>
    </>
  );
};

export default Form;
