import React, { Component, Fragment } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class Cart extends Component {
  //Update Quantity of product in the Cart
  updateQuantity = (e, obj) => {
    obj.quantity = e.target.value;
    if (obj.quantity > 0) {
      this.props.updateCart(this.props.cartProducts);
    } else {
      this.props.updateCart(
        this.props.cartProducts.filter(prod => prod.id != obj.id)
      );
    }
  };

  //Remove a certain product from the cart
  removeProduct = id => {
    this.props.updateCart(
      this.props.cartProducts.filter(prod => prod.id != id)
    );
  };

  render() {
    let { cartProducts, cartValue } = this.props;

    return (
      <Fragment>
        <div className="body_cart">
          {cartProducts.map(prod => (
            <div
              className="card grid-4"
              key={prod.id}
              style={{ backgroundColor: "white" }}
            >
              <div className="all-center">
                <img
                  src={"../" + prod.image}
                  className="round-img"
                  alt=""
                  style={{ width: "150px" }}
                ></img>

                <h1 className="product__title">{prod.brandName}</h1>
                <h2 className="product__subtitle">{prod.subtitle}</h2>
              </div>
              <div>
                <h2>Product Details :</h2>
                <ul>
                  <li>
                    {prod.brandName && (
                      <Fragment>
                        <strong>Brand:</strong>
                        {prod.brandName}
                      </Fragment>
                    )}
                  </li>
                  <li>
                    {prod.priceDiscounted && (
                      <Fragment>
                        <strong>Original Price:</strong>
                        {prod.price}€
                      </Fragment>
                    )}
                  </li>
                  <li>
                    {prod.priceDiscounted && (
                      <Fragment>
                        <strong>Price Discounted:</strong>
                        {prod.priceDiscounted}€
                      </Fragment>
                    )}
                  </li>
                  <li>
                    {prod.priceDiscounted && (
                      <Fragment>
                        <strong>You save:</strong>
                        {parseInt(
                          100 - (prod.priceDiscounted / prod.price) * 100
                        )}
                        %
                      </Fragment>
                    )}
                  </li>
                </ul>
              </div>
              <div className="all-center">
                <p>Quantity</p>
                <input
                  type="quantity"
                  className="all-center"
                  style={{ width: "50%" }}
                  onChange={e => this.updateQuantity(e, prod)}
                  defaultValue={prod.quantity}
                ></input>
                <p>x</p>
                {prod.price && !prod.priceDiscounted && (
                  <Fragment>{prod.price}€</Fragment>
                )}
                {prod.price && prod.priceDiscounted && (
                  <Fragment>{prod.price - prod.priceDiscounted}€</Fragment>
                )}
              </div>
              <div className="all-center">
                <button
                  className="button button--primary"
                  onClick={e => this.removeProduct(prod.id)}
                  style={{ marginTop: "20px" }}
                >
                  <i
                    className="fas fa-times"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Remove
                </button>{" "}
              </div>
            </div>
          ))}
        </div>
        <div style={gridStyle} className="card">
          <div>Total Price:</div>
          <div className="all-center">{cartValue}€</div>
        </div>
      </Fragment>
    );
  }
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "80% repeat(auto-fill, 20%)",
  gridGap: "1rem",
  backgroundColor: "white"
};

export default Cart;
