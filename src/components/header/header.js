import "./header.css";

import React from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/context";
import { useContext, memo } from "react";

const Header = () => {
  const { products } = useContext(DataContext);
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <h1>
              Товары <span>{products.length}</span>
            </h1>

            <Link className="btn" to={"/add"}>
              Добавить товар
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(Header);
