const { Router } = require('express');
const handlers = require('../handlers/event');
const { PERMISSIONS } = require('../lib/role-permissions');
const { authentication, createAuthorizationGuard } = require('../middlewares')

const router = Router();

router.get('/', handlers.index);

router.post(
  '/', 
  authentication,
  createAuthorizationGuard(PERMISSIONS.CREATE_EVENT),
  handlers.create
);

router.get('/:id', handlers.view);

router.patch(
  '/:id', 
  authentication,
  createAuthorizationGuard(PERMISSIONS.UPDATE_EVENT),
  handlers.update
);

router.delete(
  '/:id', 
  authentication,
  createAuthorizationGuard(PERMISSIONS.REMOVE_EVENT),
  handlers.remove
);

module.exports = router;
