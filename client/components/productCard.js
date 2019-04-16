import React, {Component} from 'react'
// import { getProductCard } from '../store/index';
import {connect} from 'react-redux'

//Doesn't seem like we really need this component??
// stateless in future?? If we need it

class ProductCard extends Component {
  constructor(props) {
    super(props)
    //bind methods here
  }

  componentDidMount() {
    // do we need a class/to load the data on component did mount here?
    // the data could be fetched and loaded by the parent component
    // and sent down to child as props
  }

  //adjust the below once we are clear on what the product model looks like and
  // what we want to display
  render() {
    return (
      <div className="ProductCard">
        <h1>ProductCard!</h1>
        {/* <h1>{this.props.product.name}</h1> */}
      </div>
    )
  }
}

// I don't think this component needs to know about the state  if its parent is passing
// it all the info, it just needs to

const mapDispatchToProps = dispatch => {
  return {
    getProductCard: function(id) {
      // dispatch() change the selectedproduct in the state
    }
  }
}

export default connect(null, mapDispatchToProps)(ProductCard)
