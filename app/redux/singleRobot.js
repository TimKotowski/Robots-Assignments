import axios from 'axios'

const initialState = {
  singleRobotInfo: {}
}

const GET_ROBOT_INFO = 'GET_ROBOT_INFO'


export const getRobotInfo = robot => ({
  type: GET_ROBOT_INFO,
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

const singleRobotReducer = (state = initialState, action) => {
  switch (action.type){
    case GET_ROBOT_INFO:
      return {...state, singleRobotInfo: action.robot}
    default:
      return state
  }


}

export default singleRobotReducer
// return [

