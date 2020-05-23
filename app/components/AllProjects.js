import React from 'react';
import { connect } from 'react-redux';
import { fetchAllProjects, fetchDeletedProject } from '../redux/projects';
import { NavLink } from 'react-router-dom';
import  ProjectInputForm  from './ProjectInputForm';


export class AllProjects extends React.Component {
  constructor(){
    super()

    this.handleDelete = this.handleDelete.bind(this)
  }


  async componentDidMount() {
   await  this.props.loadProjects();

  }

handleDelete(robotId){
  this.props.deleteProject(robotId)
}


  render() {
    return (
      <div className="container">
        <ProjectInputForm />
        {this.props.projects.map((project) => (
          <div key={project.id}  className="card"  >
            <div  className="card ">
              <div className="card-body" style={{backgroundColor: 'grey'}}  >
            <NavLink to={`/projects/${project.id}`}>
                  <h3  style={{ color: '#0d0d0d' }} >Title: {project.title}</h3>
                </NavLink>
                  <h3  style={{ color: '#0d0d0d' }}  >Description: {project.description}</h3>
                  <h3 style={{ color: '#0d0d0d' }}   >Priority: {project.priority}</h3>
                  <h3  style={{ color: '#0d0d0d' }}  >Deadline: {project.deadline}</h3>
                  <button onClick={() => this.handleDelete(project.id)}  type="button" value="Remove text input "className="btn btn-danger " style={{width: '2.4rem', height: '2.2rem' }}>X</button>
              </div>
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


