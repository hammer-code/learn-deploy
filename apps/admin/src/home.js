const React = require('react');
const ReactDOM = require('react-dom');
const { formatDate } = require('./lib/date')
const api = require('./lib/api')

function Event ({ data, onRemove = () => {} }) {
  return (
    <div>
      <h2>{data.title}</h2>
      <p>{formatDate(data.date)}</p>
      <p>Created by {data.creator.username}</p>
      <button onClick={() => onRemove(data._id)}>Remove</button>
    </div>
  )
}

class EventList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      events: []
    }

    this.handleRemoveEvent = this.handleRemoveEvent.bind(this)
  }

  componentDidMount () {
    api.getEvents()
      .then(data => {
        this.setState({ events: data.events })
      })
  }

  handleRemoveEvent (eventId) {
    api.removeEvent(eventId)
      .then(() => {
        this.setState((prevState) => ({
          events: prevState.events
            .filter(event => event._id !== eventId)
        }))
      })
  }

  render () {
    return (
      <div className="event-list">
        {this.state.events.map((event) => (
          <Event
            key={event._id}
            data={event}
            onRemove={this.handleRemoveEvent}
          />
        ))}
      </div>
    )
  }
}

class User extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: { _id: null, username: '-___-' }
    }
  }

  componentDidMount () {
    api.getMe()
      .then((data) => {
        this.setState({
          user: data.user
        })
      })
  }

  render () {
    const { user } = this.state

    return (
      <div>
        {user._id ? (
          <div>Logged in as: @{user.username}</div>
        ) : (
          <div>Please login first</div>
        )}
      </div>
    )
  }
}

function App () {
  return (
    <>
      <User />
      <EventList />
    </>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
)
