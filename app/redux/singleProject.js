import axios from 'axios';

const initialState = {
  singleProjectInfo: {},
};

const GET_PROJECT_INFO = 'GET_PROJECT_INFO';
const UNASSIGN_PROJECT = 'UNASSIGN_PROJECT'
const COMPLETED_PROJECT = 'COMPLETED_PROJECT'

export const getProjectInfo = (project) => ({
  type: GET_PROJECT_INFO,
  project,
});

export const unassignProject = project => ({
  type: UNASSIGN_PROJECT,
  project
});

export const completedProject = project => ({
  type: COMPLETED_PROJECT,
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

export const fetchCompletedProjct = (completed) => async(dispatch) => {
  try {
    console.log('htitng start')
     const {data: updatedComplete} = axios.post(`/api/projects/completed`, completed)
    console.log('htitng middle')
    dispatch(completedProject(updatedComplete))
    console.log('htitng end')
  } catch (error) {
    console.log('error in updatd complete fetch', error)
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
    case COMPLETED_PROJECT:
      return {
        ...state,
        singleProjectInfo: {
          ...state.singleProjectInfo,
          [action.project.prop]: action.project.value
        },
      };
    default:
      return state;
  }
};

export default singleProjectReducer;
