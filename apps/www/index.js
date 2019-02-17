const React = require('react');
const ReactDOM = require('react-dom');

function getEvents () {
  return fetch('http://localhost:8080/api/events')
    .then(response => response.json())
}

function Event ({ data }) {
  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.date}</p>
      <p>Created by {data.creator.username}</p>
    </div>
  )
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      events: []
    }
  }

  componentDidMount () {
    getEvents()
      .then(data => {
        this.setState({ events: data.events })
      })
  }

  render () {
    return (
      <div>
        <h1>www.meatup.com</h1>
        <div>
          {this.state.events.map((event) => (
            <Event key={event._id} data={event} />
          ))}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
)
