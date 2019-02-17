const { Router } = require('express');
const handlers = require('../handlers/user');
const { authentication } = require('../middlewares')

const router = Router();

router.get(
  '/me',
  authentication,
  handlers.view
);

module.exports = router;
