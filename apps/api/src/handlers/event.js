const Event = require('../models/Event');

function index (request, response) {
  Event.find({})
    .populate({ path: 'creator', select: 'username roles' })
    .populate({ path: 'participants', select: 'username roles' })
    .exec()
    .then((events) => {
      response.json({
        events: events,
      });
    });
}

function create (request, response) {
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

function view (request, response) {
  const eventId = request.params.id
  Event.findById(eventId)
    .populate({ path: 'creator', select: 'username roles' })
    .populate({ path: 'participants', select: 'username roles' })
    .exec()
    .then((event) => {
      if (!event) {
        return response.status(404).json({
          message: `Event with ID ${eventId} was not found`
        })
      }
      response.json({
        event: event,
      });
    });
}

function update (request, response) {
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
}

function remove (request, response) {
  const eventId = request.params.id;
  
  Event.findOneAndRemove({
    _id: eventId
  })
    .then(() => {
      response.json({
        message: `Event with ID ${eventId} been deleted`
      })
    })
}

module.exports = {
  index,
  create,
  view,
  update,
  remove,
}