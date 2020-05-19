import React from 'react';
import { connect } from 'react-redux';
import { fetchAllProjects } from '../redux/projects';

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProjects extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadProjects();
  }
  render() {
    console.log('projects', this.props.projects);
    return (
      <div>
        {this.props.projects.map((project) => (
          <div key={project.id}>
            <ul>
              <h3>{project.title}</h3>
              <h3>{project.priority}</h3>
              <h3>{project.completed}</h3>
              <h3>{project.description}</h3>
              <h3> {project.deadline} </h3>
            </ul>
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
