import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleRobot, fetchDeletedRobot} from '../redux/singleRobot';
import EditRobotForm from './EditRobotForm';

export class SingleRobots extends Component {
  constructor(){
    super()
    this.state = {
    isLoading: true,

  }
  this.handleUnassign = this.handleUnassign.bind(this)
}
  async componentDidMount() {
  const robotId = this.props.match.params.robotId;
    await this.props.loadRobotInfo(robotId)
    this.setState({
      isLoading: false
    })
  }

  handleUnassign(id){
    this.props.deleteProject(id)
  }

  render() {
    const { robot } = this.props;
    const {isLoading} = this.state
    return (
      <div className="container">
        <EditRobotForm />
        <div className="card" style={{ width: '18rem' }}>
          {!isLoading &&
          <div
            key={robot.id}
            className="card-body"
            style={{ backgroundColor: '#8c8c8c' }}>
             <h5 className="card-title" style={{ color: '#0d0d0d' }}>
             Title:  {robot.projects[0].title}
            </h5>
            <h5 className="card-title" style={{ color: '#0d0d0d' }}>
             Completion Status: {robot.projects[0].completed}
            </h5>
            <h4 className="card-text" style={{ color: '#0d0d0d' }}>
               Project Deadline: {robot.projects[0].deadline}
            </h4>
            <h4 className="card-text" style={{ color: '#0d0d0d' }}>
           Project Priority: {robot.projects[0].priority}
            </h4>
          <button onClick={() => {this.handleUnassign(robot.projects[0].id)}} type="button" className="btn btn-warning">Unassign</button>
          </div>
           }

        </div>




        <div className="card" style={{ width: '18rem' }}>
          <div
            key={robot.id}
            className="card-body"
            style={{ backgroundColor: '#8c8c8c' }}>
            <img
              className="card-img-top"
              style={{ fontWeight: 'bold' }}
              src={`${robot.imageUrl}`}
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
      </div>
    );
  }
}

const mapState = (state) => ({
  robot: state.robotInfo.singleRobotInfo,

});

const mapDispatch = (dispatch) => ({
  loadRobotInfo: (robot) => dispatch(fetchSingleRobot(robot)),
  deleteProject: (id) => dispatch(fetchDeletedRobot(id)),
});

export default connect(mapState, mapDispatch)(SingleRobots);
