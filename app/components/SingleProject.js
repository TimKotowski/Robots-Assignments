import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProject } from '../redux/singleProject';

export class SingleProject extends Component {


  componentDidMount() {
    const projectId = this.props.match.params.projectId;
    this.props.loadProjectInfo(projectId);
  }

  render() {
    const { project } = this.props
    return (
      <div  className="container">
            <div  className="card">
              <div  key={project.id}   className="card-body" style={{backgroundColor: 'grey'}}  >
              <h3  style={{ color: '#0d0d0d' }}    >Description: {project.description}</h3>
                  <h3 style={{ color: '#0d0d0d' }}   >Priority: {project.priority}</h3>
                  <h3  style={{ color: '#0d0d0d' }}  >Deadline: {project.deadline}</h3>
              </div>
            </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  project: state.projectInfo.singleProjectInfo
});

const mapDispatch = (dispatch) => ({
  loadProjectInfo: (project) => dispatch(fetchSingleProject(project)),
});

export default connect(mapState, mapDispatch)(SingleProject);
