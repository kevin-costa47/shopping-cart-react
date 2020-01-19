import React, { Component, Fragment } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class Product extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  static propTypes = {
    loading: PropTypes.bool,
    product: PropTypes.object.isRequired,
    getProduct: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired
  };

  render() {
    const {
      id,
      subtitle,
      price,
      image,
      brandName,
      priceDiscounted
    } = this.props.product;

    const { loading } = this.props.product;

    if (loading) {
      return <Spinner></Spinner>;
    }
    return (
      <Fragment>
        <Link to="/" className="product__add-to-cart button button--primary">
          <i
            className="far fa-arrow-alt-circle-left"
            style={{
              marginRight: "5px",
              marginTop: "20px",
              marginBottom: "5px"
            }}
          >
            {" "}
            Back
          </i>
        </Link>
        <div style={{ height: "82vh", overflow: "auto" }}>
          <div className="card grid-3" style={{ backgroundColor: "white" }}>
            <div className="all-center">
              <img
                src={"../" + image}
                // className="round-img"
                alt=""
                style={{ width: "150px" }}
              ></img>

              <h1 className="product__title">{brandName}</h1>
              <h2 className="product__subtitle">{subtitle}</h2>
            </div>
            <div>
              <h2>Product Details :</h2>
              {price && !priceDiscounted && (
                <Fragment>
                  <strong>Price:</strong>
                  {price}€
                </Fragment>
              )}
              {price && priceDiscounted && (
                <Fragment>
                  <strong>Price:</strong>
                  {price - priceDiscounted}€
                </Fragment>
              )}
              <ul>
                <li>
                  {brandName && (
                    <Fragment>
                      <strong>Brand:</strong>
                      {brandName}
                    </Fragment>
                  )}
                </li>
                <li>
                  {priceDiscounted && (
                    <Fragment>
                      <strong>Original Price:</strong>
                      {price}€
                    </Fragment>
                  )}
                </li>
                <li>
                  {priceDiscounted && (
                    <Fragment>
                      <strong>Price Discounted:</strong>
                      {priceDiscounted}€
                    </Fragment>
                  )}
                </li>
                <li>
                  {priceDiscounted && (
                    <Fragment>
                      <strong>You save:</strong>
                      {parseInt(100 - (priceDiscounted / price) * 100)}%
                    </Fragment>
                  )}
                </li>
              </ul>
            </div>
            <div className="all-center">
              <i
                className="product__add-to-cart button button--primary"
                onClick={e => this.props.addToCart(id)}
              >
                <i className="fas fa-cart-plus" style={{ width: "85%" }}>
                  {" "}
                  Add to Cart
                </i>
              </i>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Product;
