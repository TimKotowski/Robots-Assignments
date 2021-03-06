import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllRobots, fetchDeletedRobot } from '../redux/robots';
import { NavLink } from 'react-router-dom';
import RobotInputForm from './RobotInputForm';

export class AllRobots extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    await this.props.loadRobots();
  }

  handleDelete(robotId) {
    this.props.deletedRobotFromDB(robotId);
  }

  render() {
    return (
      <div className="container">
        <RobotInputForm />
        {this.props.robots.map((robot) => (
          <div key={robot.id} className="card" style={{ width: '18rem' }}>
            <NavLink to={`/robots/${robot.id}`}>
              <img className="card-img-top" src={`${robot.imageUrl}`} />
            </NavLink>
            <div
              className="card-body"
              style={{ fontWeight: 'bold', backgroundColor: '#8c8c8c' }}
            >
              <h2 className="card-title">{robot.name}</h2>
              <h3 className="card-text" style={{ color: '#0d0d0d' }}>
                Fuel Type: {robot.fuelType}
              </h3>
              <h3 className="card-text" style={{ color: '#0d0d0d' }}>
                Fuel Level: {robot.fuelLevel}
              </h3>
              <button
                onClick={() => this.handleDelete(robot.id)}
                type="button"
                value="Remove text input "
                className="btn btn-danger "
                style={{ width: '2.4rem', height: '2.2rem' }}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => ({
  robots: state.allRobots.robots,
});

const mapDispatch = (dispatch) => ({
  loadRobots: () => dispatch(fetchAllRobots()),
  deletedRobotFromDB: (robotId) => dispatch(fetchDeletedRobot(robotId)),
});

export default connect(mapState, mapDispatch)(AllRobots);
