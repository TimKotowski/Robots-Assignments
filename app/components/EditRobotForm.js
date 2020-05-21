import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUpdatedRobot, updateRobotForm, updateRobotInfo } from '../redux/robots';

export class EditRobotForm extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const {id, name, fuelLevel} = this.props.robotInfo
    this.props.updateRobot(id, name, fuelLevel)
    e.persist()
  }

  handleSubmit(e) {
    e.preventDefault();
    const {name, fuelLevel} = this.props.robotInfo.id
    this.props.createRobot({
      name,
      fuelLevel

    });

  }

  render() {
    console.log(this.props.robotInfo);

    return (
      <div  className="container" >
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Give Robot a Name!</label>
            <input
              type="text"
              className="form-control"
              value={this.props.robotInfo.name}
              onChange={this.handleChange}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fuelLevel">Change Fuel Level</label>
            <input
              type="number"
              className="form-control"
              value={this.props.robotInfo.fuelLevel}
              onChange={this.handleChange}
              name="fuelLevel"
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
  robotInfo: state.robotInfo.singleRobotInfo,
  // userInfo: state.allRobots.user,
});

const mapDispatch = (dispatch) => ({
  updateRobot: (info) => dispatch(updateRobotForm(info)),
  createRobot: (robot) => dispatch(fetchUpdatedRobot(robot)),
});

export default connect(mapState, mapDispatch)(EditRobotForm);



