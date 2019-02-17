const { Router } = require('express');
const auth = require('./auth');
const event = require('./event');
const report = require('./report');
const user = require('./user');

const router = Router();

router.use('/auth', auth);
router.use('/events', event);
router.use('/reports', report);
router.use('/users', user);

module.exports = router;
