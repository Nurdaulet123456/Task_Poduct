import "./header.css";

import React, { memo } from "react";
import { Link } from "react-router-dom";

const AddHeader = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <Link className="btn" to={"/"}>
              Назад
            </Link>
            <h1>Добавить товар</h1>
          </div>
        </div>
      </header>
    </>
  );
};

export default memo(AddHeader);
