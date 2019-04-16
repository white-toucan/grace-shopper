import React, {Component} from 'react'
import {getAllProducts} from '../store/index'
import {connect} from 'react-redux'
import ProductCard from './productCard'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    const {allProductsList} = this.props
    return (
      <div className="allProducts">
        <h1>All Products Container</h1>
        {allProductsList.map(product => (
          <ProductCard product={product} key={product.id} />
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
    getAllProducts: function() {
      dispatch(getAllProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
