const { Router } = require('express');
const handlers = require('../handlers/report');
const { PERMISSIONS } = require('../lib/role-permissions');
const { authentication, createAuthorizationGuard } = require('../middlewares')

const router = Router();

router.get(
  '/', 
  authentication,
  createAuthorizationGuard(PERMISSIONS.VIEW_REPORT),
  handlers.view
);
router.post(
  '/', 
  authentication,
  createAuthorizationGuard(PERMISSIONS.CREATE_REPORT),
  handlers.create
);

module.exports = router;
