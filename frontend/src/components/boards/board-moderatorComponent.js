import React, { Component } from 'react';
import UserService from '../../services/userService';

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.setState = {
      content: ""
    }
  }

  componentDidMount() {
    UserService.getModeratorBoard().then(
      res => {
        this.setState( {
          content: res.data
        });
      },
      error => {
        this.setState({
          content:
            (error.res &&
              error.res.data &&
              error.res.data.message) ||
            error.message ||
            error.toString()
        })
      }
    )
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    )
  }
}