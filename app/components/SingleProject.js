import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProject } from '../redux/singleProject';

export class SingleProject extends Component {


  componentDidMount() {
console.log('nope');
    const projectId = this.props.match.params.projectId;
    console.log('hitting it');
    this.props.loadProjectInfo(projectId);
    console.log('hitting it 2', projectId);
  }

  render() {
    const { project } = this.props
    console.log('sd', project)
    return (
      <div  className="container">
          <div className="card"  >
            <div  className="card">
              <div  key={project.id}   className="card-body" style={{backgroundColor: 'grey'}}  >
                  <h3>{project.title}</h3>
                  <h3>{project.description}</h3>
                  <h3>{project.priority}</h3>
                  <h3>{project.deadline}</h3>
              </div>
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
