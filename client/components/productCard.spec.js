/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {ProductCard} from './productCard'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('ProductCard', () => {
  let productCard

  beforeEach(() => {
    productCard = shallow(
      <ProductCard
        product={{
          id: 1,
          imageUrl: 'http://www.test.com/url.jpg',
          name: 'Test Item',
          price: 23.99
        }}
      />
    )
  })

  it('renders the product name in an h2 tag', () => {
    expect(productCard.find('h2').text()).to.be.equal('Test Item')
  })
})
