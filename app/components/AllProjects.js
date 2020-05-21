import React from 'react';
import { connect } from 'react-redux';
import { fetchAllProjects, fetchDeletedProject } from '../redux/projects';
import { NavLink } from 'react-router-dom';
import  ProjectInputForm  from './ProjectInputForm';

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProjects extends React.Component {
  constructor(){
    super()

    this.handleDelete = this.handleDelete.bind(this)
  }


  componentDidMount() {
    this.props.loadProjects();

  }

handleDelete(robotId){
  this.props.deleteProject(robotId)
}


  render() {
    return (
      <div className="container">
        < ProjectInputForm />
        {this.props.projects.map((project) => (
          <div key={project.id}  className="card"  >
            <div  className="card ">
              <div className="card-body" style={{backgroundColor: 'grey'}}  >
              <NavLink to={`/projects/${project.id}`}>
                  <h3>{project.title}</h3>
                </NavLink>
                  <h3  style={{ color: '#0d0d0d' }}    >Description: {project.description}</h3>
                  <h3 style={{ color: '#0d0d0d' }}   >Priority: {project.priority}</h3>
                  <h3  style={{ color: '#0d0d0d' }}  >Deadline: {project.deadline}</h3>
                  <button onClick={() => this.handleDelete(project.id)}     type="button"   value="Remove text input "className="btn btn-danger " style={{width: '2.4rem', height: '2.2rem' }}>X</button>
              </div>
              {/* {project.id ? <EditProject project={project} key={project.id} /> : <ProjectInputForm key={project.id} project={project} />} */}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => ({
  projects: state.allProjects.projects,
});

const mapDispatch = (dispatch) => ({
  loadProjects: () => dispatch(fetchAllProjects()),
  deleteProject: (info) => dispatch(fetchDeletedProject(info))
});

export default connect(mapState, mapDispatch)(AllProjects);


