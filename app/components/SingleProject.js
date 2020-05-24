import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchSingleProject, fetchProjectUnassignAssocation} from '../redux/singleProject';
import EditProjectForm from './EditProjectForm';

export class SingleProject extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
    };
    this.handleUnassign = this.handleUnassign.bind(this);
  }

  async componentDidMount() {
    const projectId = this.props.match.params.projectId;
    await this.props.loadProjectInfo(projectId);
    this.setState({
      isLoaded: true,
    });
  }

  handleUnassign(robotId) {
    const projectId = this.props.project.id;
    this.props.unassignProejctsRobot(robotId, projectId);
    window.location.reload()
  }

  render() {
    const { project } = this.props;
    const { isLoaded } = this.state;
    return (
      <div className="container">
        <EditProjectForm />
        {isLoaded && project.robots.length ? (
          <div className="card">
            <div className="card-body" style={{ backgroundColor: 'grey' }}>
              <h3 style={{ color: '#0d0d0d' }}>
                Name: {project.robots[0].name}
              </h3>
              <h3 style={{ color: '#0d0d0d' }}>
                fuelLevel: {project.robots[0].fuelLevel}
              </h3>
              <h3 style={{ color: '#0d0d0d' }}>
                fuelType: {project.robots[0].fuelType}
              </h3>
              <button
                onClick={() => this.handleUnassign(project.robots[0].id)   } type="button"
                className="btn btn-warning">
                Unassign
              </button>
            </div>
          </div>
        ) : null}

        <div className="card">
          <div
            key={project.id}
            className="card-body"
            style={{ backgroundColor: 'grey' }}>
            <h3 style={{ color: '#0d0d0d' }}>
              Description: {project.description}
            </h3>
            <h3 style={{ color: '#0d0d0d' }}>Title: {project.title}</h3>
            <h3 style={{ color: '#0d0d0d' }}>Priority: {project.priority}</h3>
            <h3 style={{ color: '#0d0d0d' }}>Deadline: {project.deadline}</h3>
            <h3 style={{ color: '#0d0d0d' }}>Completed: {project.completed}</h3>
            <button    type="button" className="btn btn-success">
              Completed
            </button>
          </div>
        </div>
        {isLoaded && !project.robots.length && (
          <h1>No Robots assocatied with that robot</h1>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  project: state.projectInfo.singleProjectInfo,
});

const mapDispatch = (dispatch) => ({
  loadProjectInfo: (project) => dispatch(fetchSingleProject(project)),
  unassignProejctsRobot: (robotId, projectId) =>
    dispatch(fetchProjectUnassignAssocation(robotId, projectId)),
});

export default connect(mapState, mapDispatch)(SingleProject);
