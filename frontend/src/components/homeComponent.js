import React, { Component } from 'react'
import UserService from '../services/userService';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    }
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      res => {
        this.setState({
          content: res.data
        });
      },
      error => {
        this.setState({
          content:(
            error.res && error.res.data) ||
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