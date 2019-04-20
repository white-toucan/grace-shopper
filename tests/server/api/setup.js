const request = require('supertest');
const db = require('../../../server/db');
const app = require('../../../server');
const User = db.model('user');

const config = {
  user: {
    email: 'cody@email.com',
    password: '123456'
  },
  admin: {
    email: 'admin@email.com',
    password: '!@#$%^',
    isAdmin: true
  }
};

// User must be created before this method can be invoked
class LoggedInUser {
  constructor(user) {
    this.email = user.email;
    this.password = user.password;
    this.isAdmin = user.isAdmin || false;
    this.req = request(app);
    this.cookie;
    this.id;
  }

  async login() {
    try {
      const loggedIn = await this.req
      .post('/auth/login')
      .send({
        email: this.email,
        password: this.password,
        isAdmin: this.isAdmin
      });
    this.cookie = loggedIn.headers['set-cookie'];
    this.id = loggedIn.body.id;
    } catch (err) {
      throw new Error(`Unable to login ${this.user.email}: ${err}`)
    }
  }
}

const authUser = new LoggedInUser(config.user); const authAdmin = new LoggedInUser(config.admin);

before(async () => {
  await db.sync({force: true});

  await Promise.all([
    User.create(config.user),
    User.create(config.admin)
  ]);
});

after(() => db.close());

module.exports = {
  authUser,
  authAdmin
}
