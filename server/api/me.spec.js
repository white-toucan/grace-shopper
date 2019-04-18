const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('Me routes', () => {
  let authUser = request(app);
  let cookie;

	before(async () => {
    await db.sync({force: true});
    const user = {
      email: "cody@email.com",
      password: "12345"
    };

    await User.create(user);

    let loggedIn = await authUser
      .post('/auth/login')
      .send(user)

    cookie = loggedIn.headers['set-cookie'];
  });

  describe('GET /me/cart', () => {
    it('should return a cart for a logged in user', async () => {
      let myCart = await authUser
        .get('/api/me/cart')
        .set('cookie', cookie)
        .expect(200)
      console.log(myCart)
      expect(myCart.body.id).to.be.a('number');
    });

    it('should return 404 for unauthenticated users', () => {
      return authUser
        .get('/api/me/cart')
        .expect(404)
    })
  });
});
