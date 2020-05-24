import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchSingleRobot, fetchRobotUnassignAssocation} from '../redux/singleRobot';
import EditRobotForm from './EditRobotForm';

export class SingleRobots extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
    };
    this.handleUnassign = this.handleUnassign.bind(this);
  }
  async componentDidMount() {
    const robotId = this.props.match.params.robotId;
    await this.props.loadRobotInfo(robotId);
    this.setState({
      isLoaded: true,
    });
  }


  handleUnassign(projectId) {
    const robotId = this.props.robot.id;
   this.props.unassignRobotsProject(projectId, robotId);
    window.location.reload()
  }

  render() {
    const { robot } = this.props;
    const { isLoaded } = this.state;


    return (
      <div className="container">
        <EditRobotForm />
        {isLoaded && robot.projects.length ? (
          <div
            className="card"
            style={{
              backgroundColor: 'grey',
              color: '#0d0d0d',
              width: '18rem',
            }}>
            <div className="card-body">
              <h4>{robot.projects[0].title}</h4>
              <h4>{robot.projects[0].priority}</h4>
              <h4>{robot.projects[0].descripton}</h4>
              <h4>{robot.projects[0].completed}</h4>
              <h4>{robot.projects[0].deadline}</h4>
              <button
                onClick={() => {
                  this.handleUnassign(robot.projects[0].id);
                }}
                type="button"
                className="btn btn-warning">
                Unassign
              </button>
            </div>
          </div>
        ) : null}
        <div
          className="card"
          style={{ backgroundColor: 'grey', color: '#0d0d0d', width: '18rem' }}>
          <div key={robot.id} className="card-body">
            <div>
              <img
                className="card-img-top"
                style={{ fontWeight: 'bold' }}
                src={`${robot.imageUrl}`}
                alt="Card image cap"
              />
              <h4>{robot.name}</h4>
              <h4>{robot.fuelLevel}</h4>
              <h4>{robot.fuelType}</h4>
            </div>
          </div>
          {isLoaded && !robot.projects.length && (
            <h1>No Projects Associated with this Robot</h1>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  robot: state.robotInfo.singleRobotInfo,
});

const mapDispatch = (dispatch) => ({
  loadRobotInfo: (robot) => dispatch(fetchSingleRobot(robot)),
  unassignRobotsProject: (projectId, robotId) => dispatch(fetchRobotUnassignAssocation(projectId, robotId)),
});

export default connect(mapState, mapDispatch)(SingleRobots);
