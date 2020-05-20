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
const UPDATE_ROBOT_INFORMATION = 'UPDATE_ROBOT_INFORMATION'

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

export const deleteRobotUser = id => ({
  type: DELETE_ROBOT,
  id
})

export const updateRobotInformation = (id) => ({
  type: UPDATE_ROBOT_INFORMATION,
  id,
})
// fetchRobots for test to
export const fetchAllRobots = () => async (dispatch) => {
  try {
    console.log('geting all')
    const { data: robots } = await axios.get('/api/robots');
    console.log(' all')
    dispatch(getAllRobots(robots));
    console.log('getiall')
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
    console.log("hitting")
    // dont need a const with data in here becaseu the axios is lareadying deleting it so just dispatch it
     await axios.delete(`/api/robots/${robotId}`, robotId)
    console.log("sd")
    dispatch(deleteRobotUser(robotId))
    console.log("d")
  } catch (error) {
    console.log('error in fetchDelete thunk creator', error)
  }
}

export const feathUpdatedRobot = robotId => async(dispatch) => {
  try {
    console.log('hitting the start of update thunk')

    const {data: robot} = await axios.put(`api/robots/${robotId}`, robotId)
    console.log('hitting the middle of update thunk')
    dispatch(updateRobotInformation(robot))
    console.log('hitting the end of update thunk, it worked!')
  } catch (error) {
    console.log('error in fetch updated thunk creator', error)
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
        // console.log(action)
        // console.log(JSON.stringify({...state, robots: state.robots.filter(robot => robot.id !== action.robot)})
        return {...state, robots: state.robots.filter(robot => robot.id !== action.id)}
        // case UPDATE_ROBOT_INFORMATION:
        // // return  state.robots.filter((robot) => robot.id  === action.id ? [...robot, action.id] : null)
        case UPDATE_ROBOT_INFORMATION:
              return {...state, robots: state.robots.map(( robot) => {
                if(robot.id === action.id){
                  return [...robot, action.id]
                } else {
                  return robot
                }
              })}

    default:
      return state;
  }
};

export default robotsReducer;


/*
filter
map
form all stake a handlick
*/
