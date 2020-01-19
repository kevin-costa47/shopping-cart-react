import React, { Component } from "react";
import PropTypes from "prop-types";
import brands from "../../data/brands.json";

export class Search extends Component {
  state = {
    text: "",
    chosenBrand: 0,
    sort: 0,
    wished: 0
  };

  static propTypes = {
    searchProduct: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.props.searchProduct(this.state);
    });
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <div className="product-controls search_style">
          <div>
            <label className="product-controls__label">Search:</label>
            <input
              type="text"
              name="text"
              placeholder="Enter Product Name..."
              onChange={this.onChange}
              className="product-controls__select"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            ></input>
          </div>
          <div>
            <label className="product-controls__label">Name:</label>

            <select
              value={this.state.chosenBrand}
              name="chosenBrand"
              onChange={this.onChange}
              className="product-controls__select"
              placeholder="Seach Brands..."
            >
              <option value={0}>All Brands</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="product-controls__label">Sort:</label>

            <select
              name="sort"
              onChange={this.onChange}
              className="product-controls__select"
              placeholder="Sort Products..."
            >
              <option key={0} value={0}>
                Ascending
              </option>
              <option key={1} value={1}>
                Descending
              </option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
