import axios from 'axios';

const initialState = {
  singleProjectInfo: {},
};

const GET_PROJECT_INFO = 'GET_PROJECT_INFO';

export const getProjectInfo = (project) => ({
  type: GET_PROJECT_INFO,
  project,
});

export const fetchSingleProject = (projectId) => async (dispatch) => {
  try {
    const { data: project } = await axios.get(`/api/projects/${projectId}`);
    dispatch(getProjectInfo(project));
  } catch (error) {
    console.log('failed to fetch singleProject info', error);
  }
};

const singleProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT_INFO:
      return { ...state, singleProjectInfo: action.project };
    default:
      return state;
  }
};

export default singleProjectReducer;
