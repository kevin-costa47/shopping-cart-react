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

class App extends Component {
  state = {
    products: [],
    fullSearch: [],
    product: {},
    cartProducts: [],
    wishProducts: [],
    cartValue: 0,
    loading: false,
    indexPage: 0,
    numberPages: 0
  };

  async componentDidMount() {
    this.setState({ loading: true });

    this.setState({ loading: false, products: products });
    this.searchProduct({});
  }

  // Search Products
  searchProduct = async searchObj => {
    this.setState({ loading: true });

    const { text, chosenBrand, sort } = searchObj;
    const { indexPage } = this.state;

    var searchResult;
    if (text) {
      searchResult = products.filter(pro => {
        return pro.subtitle.toLowerCase().includes(text.toLowerCase());
      });
    } else {
      searchResult = products;
    }

    if (chosenBrand > 0) {
      searchResult = searchResult.filter(fil => {
        return fil.brandId == chosenBrand;
      });
    }

    let numberPages = parseInt(searchResult.length / 6);

    if (sort) {
      if (parseInt(sort) === 0) {
        searchResult = searchResult.sort((a, b) => a.price - b.price);
      } else {
        searchResult = searchResult.sort((a, b) => b.price - a.price);
      }
    }

    let fullSearch = searchResult;

    searchResult.forEach(res => {
      let foundBrand = brands.filter(fil => {
        return res.brandId == fil.id;
      });
      res.brandName = foundBrand[0].name;
    });

    searchResult = searchResult.slice(indexPage, indexPage + 6);

    this.setState({
      loading: false,
      products: searchResult,
      numberPages: numberPages,
      fullSearch: fullSearch
    });
  };

  // Get Product By ID
  getProduct = async producID => {
    this.setState({ loading: true });

    var chosenProduct = products.find(prod => prod.id === producID);
    chosenProduct.brandName = brands.find(
      brad => brad.id === chosenProduct.brandId
    ).name;

    this.setState({ loading: false, product: chosenProduct });
  };

  onPageChange = async data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * 6);
    var { fullSearch } = this.state;

    let newProducts = fullSearch.slice(offset, offset + 6);

    this.setState({ indexPage: offset, products: newProducts }, () => {});
  };

  // Add Products to Cart
  addToCart = async producID => {
    const { cartProducts, wishProducts } = this.state;
    var cartVal = this.state.cartValue;

    var chosenProduct = products.find(prod => prod.id === producID);
    let indexProd = cartProducts.findIndex(prod => prod.id === producID);
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

  updateCart = async cartProducts => {
    var cartVal = 0;

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

  addWishList = async obj => {
    var whishArray = this.state.wishProducts;

    let exists = whishArray.findIndex(wObj => {
      return wObj.id == obj.id;
    });
    if (exists == -1) {
      whishArray.push(obj);
    } else {
      whishArray.splice(exists, 1);
    }

    this.setState({
      wishProducts: whishArray
    });
  };

  render() {
    var {
      products,
      loading,
      product,
      cartProducts,
      cartValue,
      numberPages,
      wishProducts
    } = this.state;

    return (
      <Router>
        <div className="App">
          <Header
            cart_size={cartProducts.length}
            wish_size={wishProducts.length}
            cart_value={cartValue}
          ></Header>
          {/* <Alert alert={alert}></Alert> */}
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
                      products={products}
                      addWishList={this.addWishList}
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
