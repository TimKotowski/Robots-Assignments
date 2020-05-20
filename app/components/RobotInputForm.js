import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNewRobot, updateRobotForm } from '../redux/robots';

export class RobotInputForm extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.updateRobot(e);
    e.persist();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name } = this.props.userInfo;
    this.props.createRobot({
      name
    });

  }

  render() {
    console.log(this.props.userInfo);
    return (
      <div  className="container" >
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Give Robot a Name!</label>
            <input
              type="text"
              className="form-control"
              value={this.props.userInfo.name}
              onChange={this.handleChange}
              name="name"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({
  userInfo: state.allRobots.user,
});

const mapDispatch = (dispatch) => ({
  updateRobot: (e) => dispatch(updateRobotForm(e)),
  createRobot: (robot) => dispatch(fetchNewRobot(robot)),
});

export default connect(mapState, mapDispatch)(RobotInputForm);
