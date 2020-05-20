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
const DELETE_ROBOT = 'DELETE_ROBOT'

export const getAllRobots = robots => ({
  type: GET_ALL_ROBOTS,
  robots
});
export const updateRobotForm = e => ({
  type: UPDATE_ROBOT_FORM,
  e,
});

export const createRobotInfo = robotInfo => ({
  type: CREATE_ROBOT_INFO,
  robotInfo,
});

export const deleteRobotUser = robot => ({
  type: DELETE_ROBOT,
  robot
})

// fetchRobots for test to
export const fetchAllRobots = () => async (dispatch) => {
  try {
    const { data: robots } = await axios.get('/api/robots');
    dispatch(getAllRobots(robots));
  } catch (error) {
    console.log('error in fetchRobots', error);
  }
};
export const fetchNewRobot = robotInfo => async (dispatch) => {
  try {
    const { data: newRobot } = await axios.post('/api/robots', robotInfo);
    dispatch(createRobotInfo(newRobot));
  } catch (error) {
    console.log('error in fetchrobots post', error);
  }
};


export const fetchDeletedRobot = robotId => async(dispatch) => {
  try {
      const {data: robot} = await axios.delete(`/api/robots/${robotId}`, robotId)
      dispatch(deleteRobotUser(robot))
  } catch (error) {
    console.log('error in fetchDelete thunk creator', error)
  }
}



const robotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROBOTS:
      return { ...state, robots: action.robots };
    case UPDATE_ROBOT_FORM:
      return {...state, user: { ...state.user, [action.e.target.name]: action.e.target.value }}
    case CREATE_ROBOT_INFO:
      return { ...state, robots: [...state.robots, action.robotInfo] };
      case DELETE_ROBOT:
        return {...state, robots: state.robots.filter(robot => robot.id !== action.robot)}
    default:
      return state;
  }
};

export default robotsReducer;
