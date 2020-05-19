import React from 'react';
import { connect } from 'react-redux';
import { fetchAllProjects } from '../redux/projects';
import { NavLink } from 'react-router-dom';

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProjects extends React.Component {
  componentDidMount() {
    this.props.loadProjects();
  }

  render() {
    console.log('projects', this.props.projects);
    return (
      <div className="container">
        {this.props.projects.map((project) => (
          <div key={project.id} className="card"  >
            <div  className="card border-primary mb-3">
              <div className="card-body" style={{backgroundColor: 'grey'}}  >
              <NavLink to={`/projects/${project.id}`}>
                  <h3>{project.title}</h3>
                </NavLink>
                  <h3>{project.description}</h3>
                  <h3>{project.priority}</h3>
                  <h3>{project.deadline}</h3>

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
});

export default connect(mapState, mapDispatch)(AllProjects);


