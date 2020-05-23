import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchUpdatedForm } from '../redux/projects';

export class EditProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    title: this.props.projectInfo.title,
    deadline: this.props.projectInfo.deadline,
    description: this.props.projectInfo.description,
    completed: this.props.projectInfo.completed,
    priority: this.props.projectInfo.priority,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const id = this.props.projectInfo.id
    const {title, deadline, description, completed, priority} = this.state;
    this.props.createProject({ title, deadline, description, completed, priority}, id);
  }

  render() {
    console.log('porps', this.props)
    const {description, deadline, title, completed, priority} = this.state
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Create your Project!</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={this.handleChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Deadline Date</label>
            <input
              type="date"
              className="form-control"
              value={deadline}
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
              value={priority}
              onChange={this.handleChange}
              name="priority"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={this.handleChange}
              name="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="completed">
              Type True for Completed, Otherwise False
            </label>
            <input
              type="text"
              className="form-control"
              value={completed}
              onChange={this.handleChange}
              name="completed"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({
  projectInfo: state.projectInfo.singleProjectInfo
});

const mapDispatch = (dispatch) => ({
  createProject: (project, id) => dispatch(fetchUpdatedForm(project, id)),
});

export default connect(mapState, mapDispatch)(EditProjectForm);
