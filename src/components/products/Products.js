import React, { Fragment } from "react";
import ProductItem from "./ProductItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

const Products = ({
  products,
  loading,
  addToCart,
  onPageChange,
  addWishList,
  numberPages
}) => {
  if (loading) {
    return <Spinner></Spinner>;
  } else {
    return (
      <div>
        <div style={productStyle}>
          {products.map(prod => (
            <ProductItem
              key={prod.id}
              product={prod}
              addToCart={addToCart}
              addWishList={addWishList}
            />
          ))}
        </div>

        {numberPages > 0 && (
          <Fragment>
            <div className="all-center">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={numberPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={numberPages}
                onPageChange={onPageChange}
                containerClassName={"react-pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </Fragment>
        )}
      </div>
    );
  }
};

Products.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const productStyle = {
  display: "grid",
  gridTemplateColumns: "repeat( auto-fit, minmax(300px, 1fr))",
  // gridTemplateColumns: "repeat(3, 2fr)",
  height: "73vh",
  overflow: "auto",
  gridGap: "1rem",
  margin: "15px"
};

export default Products;
