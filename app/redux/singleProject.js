import axios from 'axios';

const initialState = {
  singleProjectInfo: {},
};

const GET_PROJECT_INFO = 'GET_PROJECT_INFO';
const UNASSIGN_PROJECT = 'UNASSIGN_PROJECTS_ROBOT_ASSOCIATION'

export const getProjectInfo = (project) => ({
  type: GET_PROJECT_INFO,
  project,
});

export const unassignProject = project => ({
  tpye: UNASSIGN_PROJECT,
  project
});

export const fetchSingleProject = (projectId) => async (dispatch) => {
  try {
    const { data: project } = await axios.get(`/api/projects/${projectId}`);
    dispatch(getProjectInfo(project));
  } catch (error) {
    console.log('failed to fetch singleProject info', error);
  }
};





export const fetchProjectUnassignAssocation = (robotId, projectId) => async (dispatch) => {
  try {
    console.log('hitting the start of fetch')
    const {datat: updateProject} = await axios.put(`/api/projects/${projectId}/robots/${robotId}`)
    console.log('hitting the middle of fetch')
    dispatch(unassignProject(updateProject))
    console.log('hitting the end of fetch')
  } catch (error) {
    console.log('failed to fetch project unassign thunk', error)
  }
}



const singleProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT_INFO:
      return { ...state, singleProjectInfo: action.project };
      case UNASSIGN_PROJECT:
        return {...state, singleProjectInfo: Object.assign({}, {singleProjectInfo: action.project})}
    default:
      return state;
  }
};

export default singleProjectReducer;
