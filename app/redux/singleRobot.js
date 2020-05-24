import axios from 'axios'

const initialState = {
  singleRobotInfo: {}
}

const GET_ROBOT_INFO = 'GET_ROBOT_INFO'
const UNASSIGN_ROBOT = 'UNASSIGN_ROBOT'

export const getRobotInfo = robot => ({
  type: GET_ROBOT_INFO,
  robot
})

export const unassignRobot = robot => ({
    type: UNASSIGN_ROBOT,
    robot
})

export const fetchSingleRobot = (robotId) => async(dispatch) => {
  try {
    const {data: robot} = await axios.get(`/api/robots/${robotId}`)
    dispatch(getRobotInfo(robot))
  } catch (error) {
    console.log('failed to fetch singleRobots info', error)
  }
}

export const fetchRobotUnassignAssocation = (robotId, projectId) => async(dispatch) => {
  try {
    const {data: updatedRobot} = await axios.put(`/api/robots/${robotId}/projects/${projectId}`)
    return dispatch(unassignRobot(updatedRobot))
  } catch (error) {
    console.log('failed to fetch updated route in the unassign project from robot thunk', error)
  }
}

const singleRobotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROBOT_INFO:
      return { ...state, singleRobotInfo: action.robot };
    case UNASSIGN_ROBOT:
      return {
        ...state,
        singleRobotInfo: {
          ...state.singleRobotInfo,
          [action.robot.prop]: action.robot.value,
        },
      };
    default:
      return state;
  }
};

    export default singleRobotReducer;

