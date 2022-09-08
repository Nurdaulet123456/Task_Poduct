import "./products.css";

import { DataContext } from "../../context/context";
import { useContext, useCallback, useState, useEffect, memo } from "react";
import { useDeleteProductsMutation } from "../../api/apiSlice";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Products = () => {
  const { products, searchValue, setSearch } = useContext(DataContext);
  const [deleteProducts] = useDeleteProductsMutation();

  // ! Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  // !

  // ! Delete Product
  const onDelete = useCallback((id) => {
    deleteProducts(id);
  }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          <input
            className="search"
            type="text"
            name="text"
            placeholder="Поиск товара"
            value={searchValue}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="products">
            <div className="products__table">
              <div className="title">Называние</div>
              <div className="status">Статусы</div>
              <div className="price">Цена</div>
            </div>

            {currentItems
              ?.filter((i) =>
                i.name?.toLowerCase().includes(searchValue.toLowerCase())
              )
              ?.map((item) => {
                return (
                  <div className="products__table" key={item.id}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={item.path}
                        alt=""
                        width={"60px"}
                        height={"60px"}
                      />
                    </div>
                    <Link
                      className="title"
                      style={{ fontWeight: "bold", fontSize: "1.8rem" }}
                      to={`/edit/${item.id}`}
                    >
                      {item.name}
                    </Link>
                    <div
                      className={`status ${
                        item.status === "active" ? "active" : "not"
                      }`}
                    >
                      {item.status}
                    </div>
                    <div className="price">{item.price.productsPrice}</div>
                    <button className="btn" onClick={() => onDelete(item.id)}>
                      Delete
                    </button>
                  </div>
                );
              })}
          </div>

          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="act"
          />
        </div>
      </section>
    </>
  );
};

export default memo(Products);
