const api = require('./lib/api')

const form = document.querySelector('#login-form')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const username = event.target.username.value
  const password = event.target.password.value

  api.login({ username, password })
    .then((data) => {
      localStorage.setItem('authToken', data.token)
    })
})

document.querySelector('#get-report')
  .addEventListener('click', () => {
    api.getReport()
  })
