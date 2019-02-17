const { Router } = require('express');
const handlers = require('../handlers/auth');

const router = Router();

router.post('/login', handlers.login);

module.exports = router;
