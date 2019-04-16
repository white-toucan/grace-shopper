const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Products = db.model('products')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const banana = 'banana'

    beforeEach(() => {
      return Products.create({
        name: banana
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(banana)
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')


describe('GET /products/:id', () => {

    let oneProduct;

    beforeEach(async () => {

      const creatingProducts = [{
        name: 'Boring product',
        content: 'This product is boring'
      }, {
        title: 'Cool Article',
        content: 'This article is cool'
      }, {
        title: 'Riveting Article',
        content: 'This article is riveting'
      }]
      .map(data => Article.create(data));

      const createdArticles = await Promise.all(creatingArticles);
      coolArticle = createdArticles[1];

    });

