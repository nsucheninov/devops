import React, { Component } from 'react';
import './app.css';
import subscribeToTimer from './Api';

export default class App extends Component {
  constructor(props) {
    super(props);

    subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));
  }

  state = {
    username: null,
    timestamp: 'no timestamp yet'
  };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    const { timestamp } = this.state;

    return (
      <div id="content">
        <div id="room">test</div>
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <h2>{`This is the timer value: ${timestamp}`}</h2>
      </div>
    );
  }
}
