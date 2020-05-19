import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllRobots } from '../redux/robots';
import { NavLink } from 'react-router-dom';
import SingleRobot from './SingleRobot';

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllRobots extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadRobots();
  }
  render() {
    console.log('robots', this.props.robots);
    return (
      <div>
        {this.props.robots.map((robot) => (
          <div key={robot.id} className="card-flex-wrapper">
            <div className="card-flex-image"></div>
            <div className="card-flex-content">
              <h3>{robot.name}</h3>
              <NavLink to={`/robots/${robot.id}`}>
                <img src={`https://robohash.org/${robot.imageUrl}`} />

              </NavLink>
            </div>
               {/* <h1>{!robot.projects && 'not prjoect data showing'  }</h1> */}
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
});

export default connect(mapState, mapDispatch)(AllRobots);
