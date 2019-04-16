import React from 'react'
import {setSelectedProduct} from '../store/product'
// TODO:create redux func above

import {connect} from 'react-redux'

function ProductCard(props) {
  let {product} = props
  return (
    // TODO:insure the product model looks like the below assumption
    <div className="product" key={product.id}>
      <img
        src={product.imageUrl}
        height="200"
        width="200"
        onClick={() => props.onClickMoveToProduct(product)}
      />
      <h2>{product.name}</h2>
      <h2>{product.price}</h2>
    </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickMoveToProduct: function(product) {
      dispatch(setSelectedProduct(product))
      // TODO: correct the front end route name
      ownProps.history.push(`/product/${product.id}`)
    }
  }
}

export default connect(null, mapDispatchToProps)(ProductCard)
