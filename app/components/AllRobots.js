import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllRobots, fetchDeletedRobot} from '../redux/robots';
import { NavLink } from 'react-router-dom';
import RobotInputForm from './RobotInputForm'
// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllRobots extends Component {
  constructor(){
    super()
    // this.deleteRobot = this.deleteRobot.bind(this)
  }

  componentDidMount() {
    this.props.loadRobots();

  }

  // handleDelete(){
  //   const {imageUrl, fuelType, fuelLevel, name } = this.props.robots
  //   this.props.deletedRobotFromDB({
  //     imageUrl, fuelLevel, fuelType
  //   })

  // }

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
            <div className="card-body" style={{  fontWeight: 'bold', backgroundColor: '#8c8c8c' }}>
              <h2 className="card-title">{robot.name}</h2>
              <h3 className="card-text"  style={{ color: '#0d0d0d' }}  >Fuel Type: {robot.fuelType}</h3>
              <h3 className="card-text"   style={{ color: '#0d0d0d' }}  >Fuel Level: {robot.fuelLevel}</h3>
            <button onClick={() => this.props.deletedRobotFromDB(robot.id)}   type="button"  value="Remove text input "className="btn btn-danger " style={{width: '2.4rem', height: '2.2rem' }}>X</button>
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
  deletedRobotFromDB: (robotId) => dispatch(fetchDeletedRobot(robotId))
});

export default connect(mapState, mapDispatch)(AllRobots);
