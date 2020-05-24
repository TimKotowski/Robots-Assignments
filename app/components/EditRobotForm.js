import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchUpdatedRobot, updateRobotForm } from '../redux/robots';

export class EditRobotForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.robotInfo.name,
      fuelLevel: this.props.robotInfo.fuelLevel,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  handleSubmit(e) {
    e.preventDefault();
    const id = this.props.robotInfo.id
    const { name, fuelLevel } = this.state;
    this.props.createRobot({name, fuelLevel}, id);
    window.location.reload()
  }


  render() {
   const {name, fuelLevel} = this.state
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Give Robot a Name!</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={this.handleChange}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fuelLevel">Change Fuel Level</label>
            <input
              type="number"
              className="form-control"
              value={fuelLevel}
              onChange={this.handleChange}
              name="fuelLevel"
            />
          </div>
          <button type="submit" value="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({
  robotInfo: state.robotInfo.singleRobotInfo,

});

const mapDispatch = (dispatch) => ({
  updateRobot: (info) => dispatch(updateRobotForm(info)),
  createRobot: (robot, id) => dispatch(fetchUpdatedRobot(robot, id)),
});

export default connect(mapState, mapDispatch)(EditRobotForm);
