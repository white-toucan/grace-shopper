/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProduct} from './single-product'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleProduct', () => {
  let singleProduct

  beforeEach(() => {
    const product = {
      name: 'Floppy Disk',
      price: 5.99,
      details: 'Save up to 1.44MB of data on this portable drive!'
    }
    //sinon stub the getProduct call - check that it was called once
    SingleProduct = shallow(<SingleProduct getProduct={()=>{}} product={product} />)
  })

  it('renders the product name in h3', () => {
    expect(singleProduct.find('h3.product-info-name')).to.be.equal('Floppy Disk')
  })

  it('calls the addToCart function when the `Add to Cart` button is clicked', function() {
    //sinon stub and test
  })
})
