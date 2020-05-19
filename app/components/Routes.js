import React from 'react';
import {Route, Switch} from 'react-router-dom';

// components List
import AllRobots from './AllRobots';
import Homepage from './Homepage';
import AllProjects from './AllProjects'
import SingleRobots from './SingleRobot';
import SingleProject  from './SingleProject';
import RobotInputForm from './RobotInputForm';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/robots" component={AllRobots} />
      <Route path="/robots/:robotId" component={SingleRobots} />
      <Route exact path="/projects" component={AllProjects} />
      <Route  path="/projects/:projectId" component={SingleProject} />
      <Route exact path="/" component={RobotInputForm} />
      <Route>
        <div>
    <h1>Page no found sorry!</h1>
        </div>
      </Route>
    </Switch>
  );
};

export default Routes;
