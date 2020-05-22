import axios from 'axios'

const initialState = {
  singleRobotInfo: {}
}

const GET_ROBOT_INFO = 'GET_ROBOT_INFO'
const  DELETE_ROBOT_INFO = 'DELETE_ROBOT_INFO'


export const getRobotInfo = robot => ({
  type: GET_ROBOT_INFO,
  robot
})

export const deleteRobotsProject = id => ({
  type: DELETE_ROBOT_INFO,
  id
})

export const fetchSingleRobot = (robotId) => async(dispatch) => {
  try {
    const {data: robot} = await axios.get(`/api/robots/${robotId}`)
    dispatch(getRobotInfo(robot))
  } catch (error) {
    console.log("failed to fetch singleRobots info", error)
  }
}

export const fetchDeletedRobot = projectid => async(dispatch) => {
  try {
     await axios.delete(`/api/projects/${projectid}`)
    dispatch(deleteRobotsProject(projectid))
  } catch (error) {
    console.log('error in fetchDelete thunk creator', error)
  }
}

const singleRobotReducer = (state = initialState, action) => {
  switch (action.type){
    case GET_ROBOT_INFO:
      return {...state, singleRobotInfo: action.robot}
      case DELETE_ROBOT_INFO:
      return {...state, singleRobotInfo: Object.keys(state.singleRobotInfo).filter(robot => robot.projects.id === action.id ) }
    default:
      return state
  }

}

export default singleRobotReducer
