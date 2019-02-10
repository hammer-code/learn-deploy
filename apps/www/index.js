const React = require('react');
const ReactDOM = require('react-dom');

function App () {
  return (
    <div>
      <h1>Hello World</h1>
      <div>
        <p>dsfsdfsd</p>
        <div>sdfsdfsdff</div>
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
)
