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
    //  const { name, fuelType, fuelLevel, imageUrl } = req.body;
  // // console.log('started handler')
  // console.log(JSON.stringify(req.body));
  // const robot = await Robot.create({
  //   name,
  //   imageUrl,
  //   fuelType,
  //   fuelLevel,
  // });

  // res.json(robot);

  console.log(JSON.stringify(req.body))
    const {name, fuelType, fuelLevel, imageUrl} = req.body
    const robot = await Robot.findOrCreate({
      where: {
        name,
        fuelLevel,
        imageUrl,
        fuelType
      }
    })

    const currentRobot = await Robot.findByPk(req.body.projectId);
    await currentRobot.setRobots(robot[0]);
    res.json(robot[0]);

    // if (!fuelType){
    //   res.send({fuelType: 'electric'})
    // }
    // const {title, deadline, priority, completed, description} = req.body
    // const [project, created] = await Project.findOrCreate({
    //   where: {
    //     title,
    //     deadline,
    //     priority,
    //     completed,
    //     description
    //   }
    // })

    // await robot.addProjects(project)


    // res.json(robot)

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

module.exports = router;


//   const {title, deadline, completed, decription} = req.body

//  const createProject = await Project.create({
  //    title,
  //    deadline,
  //    completed,
  //    decription

  //  })

  //  await createRobot.setProject(createProject)


  // estalbish a ocnenciton between two models
  // useing setLocation

  // TODO: KEEP THIS REVIEW LATER
  // const {name, fuelType, fuelLevel, imageUrl} = req.body
  // // console.log('started handler')
  // console.log(JSON.stringify(req.body))
  // const [robot, createdAt] = await Robot.findOrCreate({
  //   where: {
  //     name,
  //     imageUrl,
  //     fuelType,
  //     fuelLevel

  //   }
  // })

  // const {title, deadline, priority, completed, description} = req.body
  // const [project, created] = await Project.findOrCreate({
  //   where: {
  //     title,
  //     deadline,
  //     priority,
  //     completed,
  //     description

  //   }
  // })

  // await robot.setProjects(project)

  // res.json(robot)


  // // robot is being assigned a project

  // const { name, fuelType, fuelLevel, imageUrl } = req.body;
  // // console.log('started handler')
  // console.log(JSON.stringify(req.body));
  // const robot = await Robot.create({
  //   name,
  //   imageUrl,
  //   fuelType,
  //   fuelLevel,
  // });

  // res.json(robot);
