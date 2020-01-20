import React, { Fragment, Component } from "react";
// import "./App.css";
import "./main.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Cart from "./components/pages/Cart";
import Product from "./components/products/Product";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Products from "./components/products/Products";
import Search from "./components/products/Search";
import products from "./data/products.json";
import brands from "./data/brands.json";

const NUMBER_ITEMS_PER_PAGE = 6;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: products,
      product: {},
      cartProducts: [],
      wishProducts: [],
      cartValue: 0,
      loading: false,
      indexPage: 0,
      searchProducts: products,
      numberPages: parseInt(products.length / NUMBER_ITEMS_PER_PAGE)
    };
  }

  // Search Products
  searchProduct = searchObj => {
    this.setState({ loading: true });

    let { text, chosenBrand, sort, wished, min_value, max_value } = searchObj;
    const { indexPage, wishProducts } = this.state;

    let searchResult;

    if (text) {
      searchResult = products.filter(pro => {
        return pro.subtitle.toLowerCase().includes(text.toLowerCase());
      });
    } else {
      searchResult = products;
    }

    max_value = isNaN(parseFloat(max_value)) ? 0 : parseFloat(max_value);
    min_value = isNaN(parseFloat(min_value)) ? 0 : parseFloat(min_value);

    if (max_value > 0 || min_value > 0) {
      searchResult = searchResult.filter(searchObj => {
        let actualPrice = searchObj.priceDiscounted
          ? searchObj.price - searchObj.priceDiscounted
          : searchObj.price;

        if (
          min_value > 0 &&
          min_value <= actualPrice &&
          max_value > 0 &&
          max_value >= actualPrice
        ) {
          return searchObj;
        } else if (
          min_value > 0 &&
          min_value <= actualPrice &&
          (max_value == "" || max_value < 0)
        ) {
          return searchObj;
        } else if (
          max_value > 0 &&
          max_value >= actualPrice &&
          (min_value == "" || min_value < 0)
        ) {
          return searchObj;
        } else if (max_value == "" && min_value == "") {
          return searchObj;
        }
      });
    }

    if (chosenBrand > 0) {
      searchResult = searchResult.filter(fil => {
        return fil.brandId == chosenBrand;
      });
    }

    let numberPages = Math.ceil(
      parseFloat(searchResult.length / NUMBER_ITEMS_PER_PAGE)
    );

    if (sort) {
      if (parseInt(sort) === 0) {
        searchResult = searchResult.sort((a, b) => a.price - b.price);
      } else {
        searchResult = searchResult.sort((a, b) => b.price - a.price);
      }
    }

    searchResult.forEach(res => {
      let foundBrand = brands.filter(fil => {
        return res.brandId == fil.id;
      });
      res.brandName = foundBrand[0].name;
    });

    searchResult.forEach(searchObj => {
      let wishIndex = wishProducts.findIndex(wish => wish.id == searchObj.id);
      searchObj.wished = wishIndex > -1;
    });

    this.setState({
      loading: false,
      products: searchResult,
      numberPages: numberPages,
      indexPage: 0
    });
  };

  // Get Product By ID
  getProduct = productID => {
    this.setState({ loading: true });

    let chosenProduct = products.find(prod => prod.id === productID);
    chosenProduct.brandName = brands.find(
      brad => brad.id === chosenProduct.brandId
    ).name;

    this.setState({ loading: false, product: chosenProduct });
  };

  //Get products to show in the new page
  onPageChange = data => {
    let selected = data.selected;
    this.setState({ indexPage: selected });
  };

  // Add Products to Cart
  addToCart = productID => {
    const { cartProducts } = this.state;
    let cartVal = this.state.cartValue;

    let chosenProduct = products.find(prod => prod.id === productID);
    let indexProd = cartProducts.findIndex(prod => prod.id === productID);

    if (indexProd > -1) {
      cartProducts[indexProd].quantity += 1;
      if (cartProducts[indexProd].priceDiscounted) {
        cartVal += parseFloat(
          cartProducts[indexProd].price -
            cartProducts[indexProd].priceDiscounted
        );
      } else {
        cartVal += parseFloat(cartProducts[indexProd].price);
      }
    } else {
      chosenProduct.quantity = 1;
      cartProducts.push(chosenProduct);
      if (chosenProduct.priceDiscounted) {
        cartVal += parseFloat(
          chosenProduct.price - chosenProduct.priceDiscounted
        );
      } else {
        cartVal += parseFloat(chosenProduct.price);
      }
    }

    this.setState({
      loading: false,
      cartProducts: cartProducts,
      cartValue: cartVal
    });
  };

  //Update products in the cart  and total value
  updateCart = cartProducts => {
    let cartVal = 0;

    cartProducts.forEach(prod => {
      if (prod.priceDiscounted) {
        cartVal +=
          prod.quantity * parseFloat(prod.price - prod.priceDiscounted);
      } else {
        cartVal += prod.quantity * parseFloat(prod.price);
      }
    });

    this.setState({
      cartProducts: cartProducts,
      cartValue: cartVal
    });
  };

  //Update products in the wishlist
  updateWishList = product => {
    let { products, wishProducts } = this.state;

    let exists = wishProducts.findIndex(wishProduct => {
      return wishProduct.id == product.id;
    });

    let cardIndex = products.findIndex(prod => {
      return prod.id == product.id;
    });

    if (exists == -1) {
      wishProducts.push(product);
    } else {
      wishProducts.splice(exists, 1);
    }
    products[cardIndex].wished = exists === -1;

    this.setState({
      products: products,
      wishProducts: wishProducts
    });
  };

  //Add product to the wishlist
  showWished = () => {
    let { wishProducts } = this.state;
    let wishArray;

    wishArray = wishProducts.map(wish => {
      wish.wished = true;
      return wish;
    });

    this.setState({
      products: wishArray,
      indexPage: 0,
      numberPages: Math.ceil(
        parseFloat(wishArray.length / NUMBER_ITEMS_PER_PAGE)
      )
    });
  };

  render() {
    let {
      products,
      loading,
      product,
      cartProducts,
      cartValue,
      numberPages,
      wishProducts,
      indexPage
    } = this.state;

    const numberProduct = indexPage * NUMBER_ITEMS_PER_PAGE;

    return (
      <Router>
        <div className="App">
          <Header
            cart_size={cartProducts.length}
            wish_size={wishProducts.length}
            cart_value={cartValue}
            showWished={this.showWished}
          ></Header>
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search searchProduct={this.searchProduct}></Search>
                    <Products
                      loading={loading}
                      addToCart={this.addToCart}
                      onPageChange={this.onPageChange}
                      products={products.slice(
                        numberProduct,
                        numberProduct + NUMBER_ITEMS_PER_PAGE
                      )}
                      updateWishList={this.updateWishList}
                      numberPages={numberPages}
                    ></Products>
                  </Fragment>
                )}
              ></Route>
              <Route
                exact
                path="/cart"
                render={props => (
                  <Cart
                    {...props}
                    cartProducts={cartProducts}
                    cartValue={cartValue}
                    updateCart={this.updateCart}
                  ></Cart>
                )}
              ></Route>
              <Route
                exact
                path="/product/:id"
                render={props => (
                  <Product
                    {...props}
                    getProduct={this.getProduct}
                    addToCart={this.addToCart}
                    product={product}
                    loading={loading}
                  ></Product>
                )}
              ></Route>
            </Switch>
          </div>
          <Footer></Footer>
        </div>
      </Router>
    );
  }
}

export default App;
