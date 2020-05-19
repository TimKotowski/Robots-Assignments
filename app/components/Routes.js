import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';
import AllRobots from './AllRobots';
import Homepage from './Homepage';
import AllProjects from './AllProjects'
import SingleRobots from './SingleRobot';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/robots" component={AllRobots} />
      <Route path="/robots/:robotId" component={SingleRobots} />
      <Route exact path="/projects" component={AllProjects} />
      <Route exact path="/" component={Homepage} />
      <Route>
        <div>
    <h1>Page no found sorry!</h1>
        </div>
      </Route>
    </Switch>
  );
};

export default Routes;
