import { combineReducers } from 'redux';
import projectsReducer from './projects';
import robotsReducer from './robots';
import singleRobotReducer from './singleRobot'

const appReducer = combineReducers({
  allProjects: projectsReducer,
  allRobots: robotsReducer,
  robotInfo: singleRobotReducer,
});

export default appReducer;
