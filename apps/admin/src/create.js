const api = require('./lib/api')

const form = document.querySelector('#create-event-form')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const title = event.target.title.value
  const date = event.target.date.value

  api.createEvent({ title, date })
    .then((data) => {
      window.location.href = '/'
    })
})
