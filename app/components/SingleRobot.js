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
    const { robots } = this.props;
    console.log('pejcrt', robots.projects)
    return (
      <div>
        <div className="card-flex-wrapper">
          <div className="card-flex-image"></div>
          <div className="card-flex-content">
            <h1>{robots.name}</h1>
            <h1>{robots.fuelType}</h1>
            <h1>{robots.fuelLevel}</h1>
          {/* <h1>{!robots.projects && 'not prjoect data showing'}</h1> */}
            <img src={`https://robohash.org/${robots.imageUrl}`} />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  robots: state.robotInfo.singleRobotInfo,
});

const mapDispatch = (dispatch) => ({
  loadRobotInfo: (robot) => dispatch(fetchSingleRobot(robot)),
});

export default connect(mapState, mapDispatch)(SingleRobots);

// already an onject dont need ot map just descrttuce
