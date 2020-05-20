import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleRobot } from '../redux/singleRobot';


export class SingleRobots extends Component {
  componentDidMount() {
    const robotId = this.props.match.params.robotId;
    this.props.loadRobotInfo(robotId);
  }

  render() {
    const { robot } = this.props;
    return (
      <div className="card" style={{ width: '18rem' }}>
        <div
          key={robot.id}
          className="card-body"
          style={{ backgroundColor: '#8c8c8c' }}
        >
          <img
            className="card-img-top    "
            style={{ fontWeight: 'bold' }}
            src={`https://robohash.org/${robot.imageUrl}`}
            alt="Card image cap"
          />
          <h5 className="card-title" style={{ fontWeight: 'bold' }}>
            {robot.name}
          </h5>
          <h4 className="card-text" style={{ color: '#0d0d0d' }}>
            Fueld Type: {robot.fuelType}
          </h4>
          <h4 className="card-text" style={{ color: '#0d0d0d' }}>
          Fuel Level: {robot.fuelLevel}
          </h4>
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
});

export default connect(mapState, mapDispatch)(SingleRobots);

// already an onject dont need ot map just descrttuce
