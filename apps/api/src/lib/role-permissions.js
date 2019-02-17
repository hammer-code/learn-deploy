const ROLE_ADMIN = 'admin'
const ROLE_MODERATOR = 'moderator'
const ROLE_ORGANIZER = 'organizer'

const PERMISSIONS = Object.freeze({
  CREATE_REPORT: 'reports.create',
  VIEW_REPORT: 'reports.view',
  
  CREATE_EVENT: 'event.create',
  VIEW_EVENT: 'event.view',
  UPDATE_EVENT: 'event.update',
  REMOVE_EVENT: 'event.remove',
})

const PERMISSION_MAP = Object.freeze({
  [PERMISSIONS.VIEW_REPORT]: [ROLE_ADMIN, ROLE_MODERATOR],
  [PERMISSIONS.CREATE_REPORT]: [ROLE_ADMIN],
  
  [PERMISSIONS.CREATE_EVENT]: [ROLE_ADMIN],
  [PERMISSIONS.VIEW_EVENT]: [],
  [PERMISSIONS.UPDATE_EVENT]: [ROLE_ADMIN],
  [PERMISSIONS.REMOVE_EVENT]: [ROLE_ADMIN],
})

/**
 * @param {string} permission 
 * @param {object} user 
 * @param {string} user.id
 * @param {string[]} user.roles
 */
function isPermitted (permission, user) {
  const allowedRoles = PERMISSION_MAP[permission]

  if (!allowedRoles) return false
  else if (!allowedRoles.length) return true

  return allowedRoles.some(role => user.roles.includes(role))
}

module.exports = {
  PERMISSIONS,
  isPermitted,
}