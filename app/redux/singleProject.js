import axios from 'axios';

const initialState = {
  singleProjectInfo: {},
};

const GET_PROJECT_INFO = 'GET_PROJECT_INFO';
const UNASSIGN_PROJECT = 'UNASSIGN_PROJECT'

export const getProjectInfo = (project) => ({
  type: GET_PROJECT_INFO,
  project,
});

export const unassignProject = project => ({
  type: UNASSIGN_PROJECT,
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
    const {data: updateProject} = await axios.put(`/api/projects/${projectId}/robots/${robotId}`)
    dispatch(unassignProject(updateProject))
  } catch (error) {
    console.log('failed to fetch project unassign thunk', error)
  }
}

const singleProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT_INFO:
      return { ...state, singleProjectInfo: action.project };
    case UNASSIGN_PROJECT:
      return {
        ...state,
        singleProjectInfo: {
          ...state.singleProjectInfo,
          [action.project.prop]: action.project.value,
        },
      };
    default:
      return state;
  }
};

export default singleProjectReducer;
