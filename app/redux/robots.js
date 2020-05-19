// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
import axios from 'axios';

const initialState = {
  robots: [],
};

const GET_ALL_ROBOTS = 'GET_ALL_ROBOTS';

export const getAllRobots = (robots) => ({
  type: GET_ALL_ROBOTS,
  robots,
});

// fetchRobots for test to
export const fetchAllRobots = () => async (dispatch) => {
  try {
    const { data: robots } = await axios.get('/api/robots');
    dispatch(getAllRobots(robots));
  } catch (error) {
    console.log('error in fetchMovies', error);
  }
};

const robotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROBOTS:
      // action.robots instead for test case
      return { ...state, robots: action.robots };
    default:
      return state;
  }
};

export default robotsReducer;
