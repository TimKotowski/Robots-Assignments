// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
import axios from 'axios';

const initialState = {
  robots: [],
  user: {
    name: '',
    fuelLevel: '',
    imageUrl: ''
  },
};

const GET_ALL_ROBOTS = 'GET_ALL_ROBOTS';
const CREATE_ROBOT_INFO = 'CREATE_ROBOT_INFO';
const UPDATE_ROBOT_FORM = 'UPDATE_ROBOT_FORM';
const DELETE_ROBOT = 'DELETE_ROBOT'
const UPDATE_FORM = 'UPDATE_FORM'

export const getAllRobots = robots => ({
  type: GET_ALL_ROBOTS,
  robots
});

export const updateRobotForm = info => ({
  type: UPDATE_ROBOT_FORM,
  info,
});


export const createRobotInfo = robotInfo => ({
  type: CREATE_ROBOT_INFO,
  robotInfo,
});

export const deleteRobotUser = id => ({
  type: DELETE_ROBOT,
  id
})


export const updateRobotInfo = robot => ({
  type: UPDATE_FORM,
  robot
})


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
    console.log('s', robotInfo)
    const { data: newRobot } = await axios.post('/api/robots', robotInfo);
    console.log('fetched the data')
    dispatch(createRobotInfo(newRobot));
    console.log('data passing into the action creator')
  } catch (error) {
    console.log('error in fetchrobots post', error);
  }
};


export const fetchDeletedRobot = robotId => async(dispatch) => {
  try {
    // dont need a const with data in here becaseu the axios is lareadying deleting it so just dispatch it
     await axios.delete(`/api/robots/${robotId}`)
    dispatch(deleteRobotUser(robotId))
  } catch (error) {
    console.log('error in fetchDelete thunk creator', error)
  }
}

export const fetchUpdatedRobot = (robot, robotId) => async(dispatch) => {
  try {
    console.log('s')
    const {data: updatedRobot} = await axios.put(`/api/robots/${robotId}`, robot)
    console.log('hitit')
    dispatch(updateRobotInfo(updatedRobot))
    console.log('hitit')
  } catch (error) {
    console.log('error in fetch updated thunk creator', error)
  }
}

const robotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROBOTS:
      return { ...state, robots: action.robots };
    case UPDATE_ROBOT_FORM:
      return { ...state, user: {...state.user, [action.info.target.name]: action.info.target.value}};
    case CREATE_ROBOT_INFO:
      return { ...state, robots: [...state.robots, action.robotInfo] };
    case DELETE_ROBOT:
      return {
        ...state,
        robots: state.robots.filter((robot) => robot.id !== action.id),
      };
    case UPDATE_FORM:
      return {
        ...state,
        robots: state.robots.map((robot) => {
          if (robot.id === action.robot.id) return action.robot;
          return robot;
        }),
      };
    default:
      return state;
  }
};


// You have a form, when the page loads and you load an existing robot, you want to
// prefill out this form with the existing robot data.
// User will then make modifications to the form
// User then clicks submit, and you want to take the form data, along with the ID
// of the robot that's being updated, and submit that to my reducer
// that redcuer updating the info for the robot with the given ID

export default robotsReducer;
