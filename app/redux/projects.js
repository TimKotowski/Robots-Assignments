import axios from 'axios';

const initialState = {
  projects: [],
};

const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';

export const getAllProjects = (projects) => ({
  type: GET_ALL_PROJECTS,
  projects,
});

export const fetchAllProjects = () => async(dispatch) => {
  try {
    console.log('hitting before fetch')
    const {data: projects} = await axios.get('/api/projects')
    console.log('hit the fetch of project')
    dispatch(getAllProjects(projects))


  } catch (error) {
    console.log('error in fetchAllProjects', error);
  }
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const projectsReducer = (state = initialState, action) => {
  switch (action.type){
    case GET_ALL_PROJECTS:
    return {...state, projects: action.projects}
    default:
      return state
  }
};

export default projectsReducer;
