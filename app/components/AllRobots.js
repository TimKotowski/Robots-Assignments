import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllRobots } from '../redux/robots';
import { NavLink } from 'react-router-dom';
import RobotInputForm from './RobotInputForm'
// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllRobots extends Component {
  componentDidMount() {
    this.props.loadRobots();
  }

  render() {
    console.log('robots', this.props.robots);

    return (
      <div className="container">
        <RobotInputForm />
        {this.props.robots.map((robot) => (
          <div key={robot.id} className="card" style={{ width: '18rem' }}>
            <NavLink to={`/robots/${robot.id}`}>
              <img
                className="card-img-top   "
                src={`https://robohash.org/${robot.imageUrl}`}
                />
            </NavLink>
            <div className="card-body" style={{ backgroundColor: 'grey' }}>
              <h5 className="card-title">{robot.name}</h5>
              <h4 className="card-text">{robot.fuelType}</h4>
              <h4 className="card-text">{robot.fuelLevel}</h4>

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
});

export default connect(mapState, mapDispatch)(AllRobots);
