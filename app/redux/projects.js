import axios from 'axios';

const initialState = {
  projects: [],
  userInfo: {
    title: ''
  }
};

const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
const CREATE_PROJECT_INFO = 'CREATE_PROJECT_FORM'
const UPDATE_PROJECT_FORM = 'UPDATE_PROJECT_FORM '

export const getAllProjects = (projects) => ({
  type: GET_ALL_PROJECTS,
  projects,
});

export const updateProjectForm = e => ({
  type: UPDATE_PROJECT_FORM,
  e
})

export const createdProjectInfo = userInfo => ({
  type: CREATE_PROJECT_INFO,
  userInfo
})

export const fetchAllProjects = () => async(dispatch) => {
  try {
    console.log('hitting before fetch')
    const {data: projects} = await axios.get('/api/projects')
    console.log('fetch', projects)
    console.log('hit the fetch of project')
    dispatch(getAllProjects(projects))
  } catch (error) {
    console.log('error in fetchAllProjects', error);
  }
};

export const fetchCreatedProject = projectInfo => async(dispatch) => {
  try {
    console.log('hitting start of fetchcreateproject')
    const {data: newProject} = await axios.post('/api/projects', projectInfo)
    console.log('hitting middle of fetchcreateproject')
    dispatch(createdProjectInfo(newProject))
    console.log('hitting end of fetchcreateproject')
  } catch (error) {
    console.log('you have an error in your Project Post route thunk creator', error)

  }
}

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
    default:
      return state
  }
};

export default projectsReducer;
