import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({
  icon,
  title,
  cart_size,
  cart_value,
  wish_size,
  showWished
}) => {
  Header.defaultProps = {
    cart_size: 0
  };

  Header.propTypes = {
    cart_size: PropTypes.number.isRequired,
    cart_value: PropTypes.number.isRequired
  };

  Header.onClick = e => {
    showWished();
  };

  return (
    <header className="header container">
      <Link to="/">
        <h1 className="page-title">
          <i className="fas fa-shopping-bag"> Shopping Cart</i>
        </h1>
      </Link>
      <ul>
        <aside className="header-bag">
          <Link to="/cart">
            <div className="header-bag__item header-bag__count">
              {cart_value > 0 && (
                <Fragment>
                  <div className="header-bag__price">{cart_value}€</div>{" "}
                </Fragment>
              )}
              <svg
                className="icon"
                width="17px"
                height="18px"
                viewBox="36 8 17 18"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Cart</title>
                <path
                  d="M52.997701,12.8571429 L49.3553365,12.8571429 L49.3553365,8 L39.6423645,8 L39.6423645,12.8571429 L36,12.8571429 L36,25 L52.997701,25 L52.997701,12.8571429 Z M42.0706075,10.4285714 L46.9270935,10.4285714 L46.9270935,12.8571429 L42.0706075,12.8571429 L42.0706075,10.4285714 Z"
                  id="Bag-Icon"
                  stroke="none"
                  fillRule="evenodd"
                ></path>
              </svg>
              <span className="bag__item-counter">{cart_size}</span>
            </div>
          </Link>
          {/* <Link to="/cart"> */}
          <div
            className="header-bag__item header-bag__wishlist-count"
            onClick={e => Header.onClick(e)}
          >
            <svg
              className="icon"
              width="20px"
              height="20px"
              viewBox="0 6 20 20"
              version="1.1"
            >
              <title>Wish List</title>
              <polygon
                id="Wishlist-Icon"
                stroke="none"
                fillRule="evenodd"
                points="12.3598869 13.2675869 20 13.2675869 13.8200565 17.7545318 16.1782804 25.0221187 9.99833694 20.5318477 3.81839348 25.0221187 6.17994346 17.7545318 0 13.2675869 7.63678696 13.2675869 9.99833694 6"
              ></polygon>
            </svg>
            {wish_size > 0 && (
              <Fragment>
                <span className="bag__item-counter">{wish_size}</span>
              </Fragment>
            )}
          </div>
          {/* </Link> */}
        </aside>
      </ul>
    </header>
  );
};

export default Header;
