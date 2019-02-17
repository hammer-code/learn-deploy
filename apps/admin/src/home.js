const React = require('react');
const ReactDOM = require('react-dom');
const { formatDate } = require('./lib/date')
const api = require('./lib/api')

function Event ({ data }) {
  return (
    <div>
      <h2>{data.title}</h2>
      <p>{formatDate(data.date)}</p>
      <p>Created by {data.creator.username}</p>
    </div>
  )
}

class EventList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      events: []
    }
  }

  componentDidMount () {
    api.getEvents()
      .then(data => {
        this.setState({ events: data.events })
      })
  }

  render () {
    return (
      <div className="event-list">
        {this.state.events.map((event) => (
          <Event
            key={event._id}
            data={event}
          />
        ))}
      </div>
    )
  }
}

ReactDOM.render(
  <EventList />,
  document.querySelector('#app')
)
