const ENDPOINT_BASE_URL = 'http://localhost:8080'
const token = localStorage.getItem('authToken') || 'no-token'

function getEvents () {
  return fetch('http://localhost:8080/api/events')
    .then(response => response.json())
}

function createEvent ({ title, date }) {
  return fetch('http://localhost:8080/api/events', {
    method: 'post',
    body: JSON.stringify({
      title,
      date
    }),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
}

function removeEvent (eventId) {
  return fetch('http://localhost:8080/api/events/' + eventId, {
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
}

function login ({ username, password }) {
  return fetch('http://localhost:8080/api/auth/login', {
    method: 'post',
    body: JSON.stringify({
      username,
      password
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())
}

function getReport () {
  return fetch(ENDPOINT_BASE_URL + '/api/reports', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json())
}

function getMe () {
  return fetch(ENDPOINT_BASE_URL + '/api/users/me', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
}

module.exports = {
  login,
  getEvents,
  createEvent,
  removeEvent,
  getReport,
  getMe,
}
