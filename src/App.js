import React, { Component } from 'react';
import eventbrite from 'brite-rest';

console.log(process.env);
const token = process.env.REACT_APP_EB_OAUTH_TOKEN;
const sdk = eventbrite({
  token,
});
const fetchJson = (url, options) =>
  fetch(url, options).then(resp => resp.json());

class App extends Component {
  state = {
    events: [],
  };

  componentDidMount() {
    // sdk.request('/events/search/?q=codeworking')
    fetchJson(
      'https://www.eventbriteapi.com/v3/events/search/?user.id=182250358318',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // credentials: 'same-origin', // works, also nothing works but I think same-origin is default
        // credentials: 'include', // don't work
        /*
          error message:
          Failed to load https://www.eventbriteapi.com/v3/events/search/?user.id=182250358318:
          Response to preflight request doesn't pass access control check: The value of the
          'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when
          the request's credentials mode is 'include'. Origin 'http://localhost:3000' is
          therefore not allowed access.
        */
      }
    ).then(resp => {
      this.setState({
        events: resp.events,
        total: resp.pagination.object_count,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <table>
          <tbody>
            <tr>
              <td>Current State Events Count:</td>
              <td>{this.state.events.length}</td>
            </tr>
            <tr>
              <td>Total Events Count:</td>
              <td>{this.state.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
