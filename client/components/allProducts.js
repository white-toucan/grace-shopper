import React, {Component} from 'react'
// need to import the thunk creator for get all products
// import { getAllProducts } from '../store/index';
import {connect} from 'react-redux'
import ProductCard from './productCard'

class AllProducts extends Component {
  constructor(props) {
    super(props)
    //bind all methods here
  }

  componentDidMount() {
    // add a dispatch to props action here to get all products
    //EG - this.props.getAllProducts();
  }

  //not sure how we want to pass the data down to the product cards? or if we
  //maybe don't even need product cards component at all? (i mapped through as a start below)
  // also not sure what the product model looks like , so adjust below product info
  render() {
    const {allProductsList} = this.props
    return (
      <div className="allProducts">
        <h1>All Products Container</h1>
        {allProductsList.map(product => (
          <div className="product" key={product.id}>
            <img
              src={product.imageUrl}
              height="200"
              width="200"
              onClick={() => this.onClickMoveToProduct(product.id)}
            />
            <h2>{product.name}</h2>
            <h2>{product.price}</h2>
          </div>
        ))}
      </div>
    )
  }
}

//need to create the state/reducer for product
const mapStateToProps = state => {
  return {
    allProductsList: state.product.allProductsList
  }
}

//need to create the thunk and action for this
const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: function(id) {
      dispatch(getAllProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
