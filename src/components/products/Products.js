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
  updateWishList,
  numberPages,
  indexPage
}) => {
  if (loading) {
    return <Spinner></Spinner>;
  } else {
    return (
      <div>
        {/* <div style={productStyle}>
         */}
        <div className="body_products">
          {products.map(prod => (
            <ProductItem
              key={prod.id}
              product={prod}
              addToCart={addToCart}
              updateWishList={updateWishList}
            />
          ))}
        </div>

        {numberPages > 1 && (
          <Fragment>
            <div id="react_pags" className="all-center">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                forcePage={indexPage}
                breakClassName={"break-me"}
                pageCount={numberPages}
                initialPage={0}
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

export default Products;
