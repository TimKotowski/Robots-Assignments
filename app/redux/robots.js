import axios from 'axios';

const initialState = {
  robots: [],
  user: {
    name: '',
    fuelLevel: '',
    imageUrl: '',
  },
};

const GET_ALL_ROBOTS = 'GET_ALL_ROBOTS';
const UPDATE_ROBOT_INPUTS = 'UPDATE_ROBOT_INPUTS';
const CREATE_ROBOT_INFO = 'CREATE_ROBOT_INFO';
const DELETE_ROBOT = 'DELETE_ROBOT';
const UPDATE_FORM = 'UPDATE_FORM';

export const getAllRobots = (robots) => ({
  type: GET_ALL_ROBOTS,
  robots,
});

export const updateRobotInput = (info) => ({
  type: UPDATE_ROBOT_INPUTS,
  info,
});

export const createRobotInfo = (robotInfo) => ({
  type: CREATE_ROBOT_INFO,
  robotInfo,
});

export const deleteRobotUser = (id) => ({
  type: DELETE_ROBOT,
  id,
});

export const updateRobotInfo = (robot) => ({
  type: UPDATE_FORM,
  robot,
});

export const fetchAllRobots = () => async (dispatch) => {
  try {
    const { data: robots } = await axios.get('/api/robots');
    dispatch(getAllRobots(robots));
  } catch (error) {
    console.log('error in fetchRobots', error);
  }
};

export const fetchNewRobot = (robotInfo) => async (dispatch) => {
  try {
    const { data: newRobot } = await axios.post('/api/robots', robotInfo);
    dispatch(createRobotInfo(newRobot));
  } catch (error) {
    console.log('error in fetchrobots post', error);
  }
};

export const fetchDeletedRobot = (robotId) => async (dispatch) => {
  try {
    await axios.delete(`/api/robots/${robotId}`);
    dispatch(deleteRobotUser(robotId));
  } catch (error) {
    console.log('error in fetchDelete thunk creator', error);
  }
};

export const fetchUpdatedRobot = (robot, robotId) => async (dispatch) => {
  try {
    const { data: updatedRobot } = await axios.put(`/api/robots/${robotId}`, robot);
    dispatch(updateRobotInfo(updatedRobot));
  } catch (error) {
    console.log('error in fetch updated thunk creator', error);
  }
};

const robotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROBOTS:
      return { ...state, robots: action.robots };
    case UPDATE_ROBOT_INPUTS:
      return {
        ...state,
        user: {
          ...state.user,
          [action.info.target.name]: action.info.target.value,
        },
      };
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

export default robotsReducer;
