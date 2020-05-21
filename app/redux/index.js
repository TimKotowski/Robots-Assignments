import { combineReducers } from 'redux';
import projectsReducer from './projects';
import robotsReducer from './robots';
import singleRobotReducer from './singleRobot';
import singleProjectReducer from './singleProject';

const appReducer = combineReducers({
  allProjects: projectsReducer,
  allRobots: robotsReducer,
  robotInfo: singleRobotReducer,
  projectInfo: singleProjectReducer,
});

export default appReducer;
