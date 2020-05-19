const router = require('express').Router();
const {Robot, Project} = require('../db')

//api/robots
router.get('/', async (req, res, next) => {

  try {
    const allRobots = await Robot.findAll()
    res.json(allRobots)
  } catch (error) {
    next(error)
  }
});

//api/robots/:robotId
router.get('/:robotId', async (req, res, next) => {
  try {
    const id = req.params.robotId
      const project = await Robot.findByPk(id, {
        include: [Project]
      })
      if (!project) {
        res.sendStatus(404);
      }
      res.json(project)
  } catch (error) {
    next(error)
  }
});


// api/robots
router.post('/', async (req, res, next) => {
  try {
      const {name, imageUrl, fuelType, fuelLevel} = req.body
      // console.log('started handler')
      console.log(JSON.stringify(req.body))
      const createRobot = await Robot.create({
        name,
        imageUrl,
        fuelType,
        fuelLevel
      })

      res.json(createRobot)
  } catch (error) {
    console.log('post', error)
    next(error)
  }
})

// api/robots/:robotId
router.put('/:robotId', async (req, res, next) => {
  try {
    const [robotCount, affectedRobot] = await Robot.update(req.body, {
      where: {
        id: req.params.robotId
      },
      returning: true,
      plaing: true
    })

    res.json(affectedRobot)
  } catch (error) {
    next(error)
  }
})

// api/robots/robotId
router.delete('/:robotId', async (req, res, next) => {
  try {
    const id = req.params.robotId
    const deleteRobot = Robot.destroy({
      where: {
        id
      }
    })
    res.send('Robot was terminated')
  } catch (error) {
    next(error)
  }
})

module.exports = router;


    //   const {title, deadline, completed, decription} = req.body

    //  const createProject = await Project.create({
    //    title,
    //    deadline,
    //    completed,
    //    decription

    //  })

    //  await createRobot.setProject(createProject)

    // TODO:
// estalbish a ocnenciton between two models
// useing setLocation
