import React, { Component } from 'react';
import './App.css';

var fs = require('fs');

var data = `
[
  "Kazakhstan is a huge country... what goes on there?",
  "This weather is making me craaazy",
  "My neighbor sort of howls at night"
]
` 

function getTitles() {
      return JSON.parse(data.toString());
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { items: getTitles() };
  }  

  render() {

    return (
      <div className="App">
        <h1>Latest Posts</h1>
        <ul>
        {this.state.items.map(item => (
          <li>{item}</li>
        ))}
        </ul>
        </div>
    );
  }
}

export default App;
