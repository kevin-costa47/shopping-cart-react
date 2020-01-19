import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const productItem = ({
  product: { price, subtitle, image, id, priceDiscounted, brandName, wished },
  addToCart,
  updateWishList
}) => {
  productItem.propTypes = {
    product: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired
  };

  return (
    <div className="card text-center" style={{ backgroundColor: "white" }}>
      <button
        className={
          wished == true
            ? "button button--round button--wishlist wishPressed"
            : "button button--round button--wishlist"
        }
        onClick={e =>
          updateWishList({
            price,
            subtitle,
            image,
            id,
            priceDiscounted,
            brandName
          })
        }
        style={{ float: "right", width: "35px", height: "35px" }}
      >
        <svg
          className={wished == true ? "icon wishIcon" : "icon"}
          width="20px"
          height="20px"
          viewBox="0 6 20 20"
          version="1.1"
        >
          <title>Wishlist Icon</title>
          <polygon
            id="Wishlist-Icon"
            stroke="none"
            fillRule="evenodd"
            points="12.3598869 13.2675869 20 13.2675869 13.8200565 17.7545318 16.1782804 25.0221187 9.99833694 20.5318477 3.81839348 25.0221187 6.17994346 17.7545318 0 13.2675869 7.63678696 13.2675869 9.99833694 6"
          ></polygon>
        </svg>
      </button>
      <img
        src={image}
        alt=""
        className="product__image-wrapper"
        // style={{ width: "60px" }}
      ></img>
      <h1 className="product__title">{brandName}</h1>
      <h2 className="product__subtitle">{subtitle}</h2>
      <h3>Price:</h3>
      <h3 style={{ marginBottom: "20px" }}>
        {priceDiscounted && (
          <Fragment>
            <strong></strong>
            {price - priceDiscounted}€
            <strike style={{ color: "red" }}> {price}€</strike>
            <i className="fas fa-tag" style={{ color: "red" }}></i>
            <strong style={{ color: "red" }}>
              ({parseInt(100 - ((price - priceDiscounted) / price) * 100)}%)
            </strong>
          </Fragment>
        )}
        {!priceDiscounted && <strong> {price}€</strong>}
      </h3>
      <Link
        to={`/product/${id}`}
        className="product__add-to-cart button button--primary "
        style={{ marginTop: "15px" }}
      >
        <i className="fas fa-info-circle"> View More</i>
      </Link>
      <button
        className="product__add-to-cart button button--primary"
        onClick={e => addToCart(id)}
        style={{ marginTop: "20px" }}
      >
        <i className="fas fa-cart-plus" style={{ width: "85%" }}>
          {" "}
          Add to Cart
        </i>
      </button>
    </div>
  );
};

export default productItem;
