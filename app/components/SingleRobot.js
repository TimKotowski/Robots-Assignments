import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleRobot } from '../redux/singleRobot';


export class SingleRobots extends Component {
  componentDidMount() {
    const robotId = this.props.match.params.robotId;
    this.props.loadRobotInfo(robotId);
    console.log(this.props.robots);
  }

  render() {
    const { robot } = this.props;
    console.log('single robot', robot);
    return (
      <div className="card" style={{ width: '18rem' }}>

        <div
          key={robot.id}
          className="card-body"
          style={{ backgroundColor: 'grey' }}
        >
          <img
            className="card-img-top "
            src={`https://robohash.org/${robot.imageUrl}`}
            alt="Card image cap"
          />
          <h5 className="card-title">{robot.name}</h5>
          <h4 className="card-text">{robot.fuelType}</h4>
          <h4 className="card-text">{robot.fuelLevel}</h4>
          {/* <h4 className="card-text">{robot.projects.title}</h4> */}
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
