import axios from 'axios'

const initialState = {
  singleRobotInfo: {}
}

const GET_ROBOT_INFO = 'GET_ROBOT_INFO'
const UNASSIGN_ROBOTS = 'UNASSIGN_ROBOTS'

export const getRobotInfo = robot => ({
  type: GET_ROBOT_INFO,
  robot
})
  export const unassignRobot = robot => ({
    tpye: UNASSIGN_ROBOTS,
    robot
  })

export const fetchSingleRobot = (robotId) => async(dispatch) => {
  try {
    const {data: robot} = await axios.get(`/api/robots/${robotId}`)
    dispatch(getRobotInfo(robot))
  } catch (error) {
    console.log("failed to fetch singleRobots info", error)
  }
}

export const fetchRobotUnassignAssocation = (robotId, projectId) => async(dispatch) => {
  try {
    console.log('starting point')
    const {data: updateRobot} = await axios.put(`/api/robots/${robotId}/projects/${projectId}`)
    console.log('middle point')
    dispatch(unassignRobot(updateRobot))
    console.log('ending point')
  } catch (error) {
    console.log('failed to fetch updated route in the unassign project from robot thunk', error)
  }
}

const singleRobotReducer = (state = initialState, action) => {
  switch (action.type){
    case GET_ROBOT_INFO:
      return {...state, singleRobotInfo: action.robot}
      case UNASSIGN_ROBOTS:
        return {...state, singleRobotInfo: Object.assign({}, {singleRobotInfo: action.robot}  ) }
    default:
      return state
  }
}

export default singleRobotReducer
