import React from 'react'
import {setSelectedProduct} from '../store/product'

import {connect} from 'react-redux'

export function ProductCard(props) {
  let {product} = props
  return (
    <div className="product" key={product.id}>
      <img
        src={product.imageUrl}
        height="200"
        width="200"
        onClick={() => props.onClickMoveToProduct(product)}
      />
      <h2>{product.name}</h2>
      <h3>{product.price}</h3>
    </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickMoveToProduct: function(product) {
      dispatch(setSelectedProduct(product))
      // TODO: correct the front end route name
      ownProps.history.push(`/products/${product.id}`)
    }
  }
}

export default connect(null, mapDispatchToProps)(ProductCard)
