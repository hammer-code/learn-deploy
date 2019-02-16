const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { authentication, createAuthorizationGuard } = require('./middlewares')
const auth = require('./authorization')
const jwt = require('jsonwebtoken');

const Event = require('./models/Event');  

app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json());

app.post('/api/auth/login', async (request, response) => {
  const { username, password } = request.body

  const foundUser = await auth.findUserByUsernameAndPassword(username, password)

  if (!foundUser) {
    return response.status(404).json({
      message: 'User not found'
    })
  }

  const token = jwt.sign({ userId: foundUser._id }, 'rahasia');

  return response.json({
    token,
    user: foundUser
  })
});

app.get(
  '/api/reports',
  authentication, 
  createAuthorizationGuard('reports.view'),
  (request, response) => {
    response.json({ message: 'Report data' })
  }
)

app.post(
  '/api/reports', 
  authentication, 
  createAuthorizationGuard('reports.create'),
  (request, response) => {
    response.json({ message: 'Report data was created by ' + request.userId })
  }
)

app.get('/api/events', (request, response) => {
  Event.find({})
    .populate({ path: 'creator', select: 'username roles' })
    .populate({ path: 'participants', select: 'username roles' })
    .exec()
    .then((events) => {
      response.json({
        events: events,
      });
    });
});

app.post(
  '/api/events', 
  authentication,
  (request, response) => {
    const userId = request.userId  
    const { title, date } = request.body
    
    Event.create({ 
      title: title, 
      date: date,
      creator: userId 
    })
      .then((event) => {
        response.json({
          event: event
        });
      });
  }
);

// update
app.put('/api/events/:id', (request, response) => {
  const eventId = request.params.id;
  const { title, date } = request.body;
  const newData = {};
  if (title) {
    newData.title = title;
  }

  if (date) {
    newData.date = date;
  }

  Event.findOneAndUpdate({
   _id: eventId,
  }, newData, {
    new: true
  })
    .then((event) => {
      response.json({
        event: event
      })
    })
})

// delete
app.delete('/api/events/:id', (request, response) => {
  const eventId = request.params.id;
  
  Event.findOneAndRemove({
    _id: eventId
  })
    .then(() => {
      response.json({
        message: `Event with ID ${eventId} been deleted`
      })
    })
})

module.exports = app;