import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchCreatedProject, updateProjectForm} from '../redux/projects'

export  class ProjectInputForm extends Component {
  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.props.updateProject(e)
    e.persist();
  }

  handleSubmit(e){
    e.preventDefault();
    const {title} = this.props.project
    this.props.createdProject({
      title
    })
  }


render() {

  return (
    <div  className="container" >
      <form onSubmit={this.handleSubmit}  >
        <div className="form-group">
          <label htmlFor="title">Create your Project!</label>
          <input
            type="text"
            className="form-control"
            value={this.props.project.title}
            onChange={this.handleChange}
            name="title"
            />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Proposed Deadline</label>
          <input
            type="text"
            className="form-control"
            value={this.props.project.deadline}
            onChange={this.handleChange}
            name="deadline"
            />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Project Urgency</label>
          <input
            type="number"
            className="form-control"
            min={1}
            max={10}
            value={this.props.project.priority}
            onChange={this.handleChange}
            name="priority"
            />
        </div>
        <div className="form-group">
          <label htmlFor="description">Project Description</label>
          <input
            type="text"
            className="form-control"
            value={this.props.project.description}
            onChange={this.handleChange}
            name="description"
            />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    )
  }
}

const mapState = state => ({

  project: state.allProjects.userInfo
})

const mapDispatch = dispatch => ({
  updateProject: (e) => dispatch(updateProjectForm(e)),
  createdProject: (info) => dispatch(fetchCreatedProject(info))
})

export default connect(mapState, mapDispatch)(ProjectInputForm)
