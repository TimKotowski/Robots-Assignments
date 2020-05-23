const router = require('express').Router();
const { Robot, Project } = require('../db');

//api/robots
router.get('/', async (req, res, next) => {
  try {
    const allRobots = await Robot.findAll();
    res.json(allRobots);
  } catch (error) {
    next(error);
  }
});

//api/robots/:robotId
router.get('/:robotId', async (req, res, next) => {
  try {
    const id = req.params.robotId;
    const project = await Robot.findByPk(id, {
      include: [Project],
    });
    if (!project) {
      res.sendStatus(404);
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
});

// api/robots
router.post('/', async (req, res, next) => {
  try {
     const { name, fuelType, fuelLevel, imageUrl } = req.body;
  // console.log('started handler')
  console.log(JSON.stringify(req.body));
  const robot = await Robot.create({
    name,
    imageUrl,
    fuelType,
    fuelLevel,
  });

  res.json(robot);


  } catch (error) {
    console.log('post', error);
    next(error);
  }
});

// api/robots/:robotId
router.put('/:robotId', async (req, res, next) => {
  try {
    console.log(JSON.stringify(req.body))
    const [robotCount, affectedRobot] = await Robot.update(req.body, {
      where: {
        id: req.params.robotId,
      },
      returning: true,
      plaing: true,
    });

    res.json(affectedRobot);
  } catch (error) {
    next(error);
  }
});

// api/robots/robotId
router.delete('/:robotId', async (req, res, next) => {
  try {
    const id = req.params.robotId;
    const deleteRobot = Robot.destroy({
      where: {
        id,
      },
    });
    res.send('Robot was terminated');
  } catch (error) {
    next(error);
  }
});

router.put('/:robotId/projects/:projectId', async (req, res, next) => {
  try {
    const projectId = Number(req.params.projectId)
    const robotId = Number(req.params.robotId)
    console.log(JSON.stringify(projectId))
    const [robotCount, affectedRobot] = await Robot.update(req.body, {
      where: {
        id: req.params.robotId,
      },
      returning: true,
      plaing: true,
    });
    const robot = await Robot.findByPk(robotId)
    await robot.removeProject(projectId)
    res.json(affectedRobot);
  } catch (error) {
    next(error);
  }
});


// route that unassigns
// update route, when i click the assign button it updates and gets rid of the project from the robots both back and front

module.exports = router;

