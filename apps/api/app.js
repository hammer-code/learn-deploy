const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const Event = require('./models/Event');

app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json());

app.get('/api/events', (request, response) => {
  Event.find({})
    .then((events) => {
      response.json({
        events: events,
      });
    });
});

app.post('/api/events', (request, response) => {
  const { title, date } = request.body
  
  Event.create({ 
    title: title, 
    date: date 
  })
    .then((event) => {
      response.json({
        event: event
      });
    });
});

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