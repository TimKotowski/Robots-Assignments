import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProject } from '../redux/singleProject';
import EditProjectForm from './EditProjectForm'

export class SingleProject extends Component {
  constructor(){
    super()
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    const projectId = this.props.match.params.projectId;
   await this.props.loadProjectInfo(projectId);
   this.setState({
     isLoading: false
   })
  }

  render() {
    const { project } = this.props;
    const {isLoading} = this.state
    return (
      <div className="container">
        <EditProjectForm />
        {!isLoading &&
        <div className="card">
          <div
            className="card-body"
            style={{ backgroundColor: 'grey' }}>
            <h3 style={{ color: '#0d0d0d' }}>Name: {project.robots[0].name}</h3>
            <h3 style={{ color: '#0d0d0d' }}>fuelLevel: {project.robots[0].fuelLevel}</h3>
            <h3 style={{ color: '#0d0d0d' }}>fuelType: {project.robots[0].fuelType}</h3>
            <button   type="button" className="btn btn-warning">Unassign</button>
          </div>
        </div>
        }
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
            <button   type="button" className="btn btn-success">Completed</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  project: state.projectInfo.singleProjectInfo,
});

const mapDispatch = (dispatch) => ({
  loadProjectInfo: (project) => dispatch(fetchSingleProject(project)),
});

export default connect(mapState, mapDispatch)(SingleProject);
