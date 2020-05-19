// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
import axios from 'axios';

const initialState = {
  robots: [],
  user: {
    name: ''
  },
};

const GET_ALL_ROBOTS = 'GET_ALL_ROBOTS';
const CREATE_ROBOT_INFO = 'CREATE_ROBOT_INFO';
const UPDATE_ROBOT_FORM = 'UPDATE_ROBOT_FORM';

export const getAllRobots = (robots) => ({
  type: GET_ALL_ROBOTS,
  robots
});
export const updateRobotForm = (e) => ({
  type: UPDATE_ROBOT_FORM,
  e,
});

export const createRobotInfo = (robotInfo) => ({
  type: CREATE_ROBOT_INFO,
  robotInfo,
});

// fetchRobots for test to
export const fetchAllRobots = () => async (dispatch) => {
  try {
    const { data: robots } = await axios.get('/api/robots');
    console.log()
    dispatch(getAllRobots(robots));
  } catch (error) {
    console.log('error in fetchRobots', error);
  }
};
export const fetchNewRobot = (robotInfo) => async (dispatch) => {
  try {
    console.log('hitting all robots fetch');
    const { data: newRobot } = await axios.post('/api/robots', robotInfo);
    console.log('hitting');
    dispatch(createRobotInfo(newRobot));
  } catch (error) {
    console.log('error in fetchrobots post', error);
  }
};

const robotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROBOTS:
      // console.log('GET_ALL_ROBOTS state is: ' + JSON.stringify({ ...state, robots: action.robots }))
      return { ...state, robots: action.robots };
    case UPDATE_ROBOT_FORM:
      return {...state, user: { ...state.user, [action.e.target.name]: action.e.target.value }}
    case CREATE_ROBOT_INFO:
      // let newState = { ...state, robots: [...state.robots, action.robotInfo] }
      // console.log('current robots in state: ' + JSON.stringify(state.robots))
      // console.log('newState robots is: ' + JSON.stringify(newState.robots))
      return { ...state, robots: [...state.robots, action.robotInfo] };
    default:
      return state;
  }
};

export default robotsReducer;
