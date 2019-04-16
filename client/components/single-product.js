import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../store'

export class SingleProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId);
  }

  render() {
    const { name, price, details } = this.props.state.selectedProduct
    return (
      <div id="product">
        <div className="product-img">
          <img src="" alt=""/>
        </div>
        <div className="product-info">
          <h3 className="product-info-name">{ name }</h3>
          <p>{ price }</p>
          <p className="product-details">{ details }</p>
          <button type="button" onClick={()=>{}}>Add to Cart</button>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  selectedProduct: state.selectedProduct
});

const mapDispatch = dispatch => ({
  getProduct: id => dispatch(getProduct(id))
});

export default connect(mapState, mapDispatch)(SingleProduct)
