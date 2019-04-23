const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if(req.user && req.user.isAdmin) {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
      res.json(users)
      
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
	try {
		const id = +req.params.id;
		const user = await User.findByPk(id);
		if (!user) {
			res.sendStatus(404);
		} else {
			res.json(user);
		}
	} catch (error) {
		next(error);
	}
});




