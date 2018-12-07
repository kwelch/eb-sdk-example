import React, { Component } from 'react';
import eventbrite from 'eventbrite';

class App extends Component {
  state = {
    token: process.env.REACT_APP_EB_OAUTH_TOKEN,
    orders: [],
  };

  requestOrders = () => {
    const {token, timeFilter} = this.state;
    if (!token) {
      return;
    }
    const sdk = eventbrite({
      token,
    });
    sdk.request(`/users/me/orders/?time_filter=${timeFilter}`).then(resp => {
      this.setState({
        orders: resp.orders,
        total: resp.pagination.object_count,
      });
    });
  }

  componentDidMount() {
    this.requestOrders();
  }

  handleStateUpdate = (evt) => {
    const {name, value} = evt.target;
    this.setState({[name]: value}, this.requestOrders);
  }

  render() {
    const {timeFilter, token} = this.state;
    return (
      <div className="App">
        <table>
          <tbody>
            <tr>
              <td>Orders in state:</td>
              <td>{this.state.orders.length}</td>
            </tr>
            <tr>
              <td>Total Count:</td>
              <td>{this.state.total}</td>
            </tr>
            <tr>
              <td>Time Filter</td>
              <td>
                <select name="timeFilter" value={timeFilter} onChange={this.handleStateUpdate}>
                  <option value="">---------</option>
                  <option value="all">
                    all
                  </option>
                  <option value="past">past</option>
                  <option value="current_future">current_future</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Token</td>
              <td>
                <input name="token" value={token} onChange={this.handleStateUpdate} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
