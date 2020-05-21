import axios from 'axios';

const initialState = {
  projects: [],
  userInfo: {
    title: '',
    deadline: '',
    description: '',
    completed: '',
    priority: '',
  },
};

const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
const CREATE_PROJECT_INFO = 'CREATE_PROJECT_FORM';
const UPDATE_PROJECT_FORM = 'UPDATE_PROJECT_FORM ';
const DELETE_PROJECT_FORM = 'DELETE_PROJECT_FORM';
const SET_UPDATED_FORM = 'SET_UPDATED_FORM';

export const getAllProjects = (projects) => ({
  type: GET_ALL_PROJECTS,
  projects,
});

export const updateProjectForm = (e) => ({
  type: UPDATE_PROJECT_FORM,
  e,
});

export const createdProjectInfo = (userInfo) => ({
  type: CREATE_PROJECT_INFO,
  userInfo,
});

export const deleteProjectForm = (projectId) => ({
  type: DELETE_PROJECT_FORM,
  projectId,
});

export const setUpdatedForm = (project) => ({
  type: SET_UPDATED_FORM,
  project,
});

export const fetchAllProjects = () => async (dispatch) => {
  try {
    const { data: projects } = await axios.get('/api/projects');
    dispatch(getAllProjects(projects));
  } catch (error) {
    console.log('error in fetchAllProjects', error);
  }
};

export const fetchCreatedProject = (projectInfo) => async (dispatch) => {
  try {
    const { data: newProject } = await axios.post('/api/projects', projectInfo);
    dispatch(createdProjectInfo(newProject));
  } catch (error) { console.log('you have an error in your Project Post route thunk creator', error);
  }
};

export const fetchDeletedProject = (projectId) => async (dispatch) => {
  try {
    // dont need a const with data in here becaseu the axios is lareadying deleting it so just dispatch it
    await axios.delete(`/api/projects/${projectId}`, projectId);
    dispatch(deleteProjectForm(projectId));
  } catch (error) {
    console.log('you have an error in your project delete route thunk creator', error);
  }
};
export const fetchUpdatedForm = (project, projectId) => async (dispatch) => {
  try {
    // dont need a const with data in here becaseu the axios is lareadying deleting it so just dispatch it
    const {data: updatedProject } = await axios.put(`/api/projects/${projectId}`, project);
    dispatch(setUpdatedForm(updatedProject));
  } catch (error) {
    console.log('you have an error in your project delete route thunk creator', error);
  }
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const projectsReducer = (state = initialState, action) => {
  switch (action.type){
    case GET_ALL_PROJECTS:
    return {...state, projects: action.projects}
    case UPDATE_PROJECT_FORM:
      return {...state, userInfo: {...state.userInfo, [action.e.target.name]: action.e.target.value  }}
      case CREATE_PROJECT_INFO:
        return {...state, projects: [...state.projects, action.userInfo]}
        case DELETE_PROJECT_FORM:
          return {...state, projects: state.projects.filter((project => project.id !== action.projectId))}
          case SET_UPDATED_FORM:
            return {
              ...state,
              projects: state.projects.map((project) => {
                if (project.id === action.project.id) return action.project
                return project
              })
            }
    default:
      return state
  }
};

export default projectsReducer;
