const router = require('express').Router();
const {Robot, Project} = require('../db')

router.get('/', async (req, res, next) => {

  try {
    const allRobots = await Robot.findAll()
    res.json(allRobots)
  } catch (error) {
    next(error)
  }
});

router.get('/:robotId', async (req, res, next) => {
  try {
    const id = req.params.robotId
      const robot = await Robot.findByPk(id, {
        include: [Project]
      })
      res.json(robot)
  } catch (error) {
    next(error)
  }
});


router.post('/', async (req, res, next) => {
  try {
      const {name, imageUrl, fuelType, fuelLevel} = req.body
      const createRobot = await Robot.create({
        name,
        imageUrl,
        fuelType,
        fuelLevel
      })

      res.json(createRobot)
  } catch (error) {
    next(error)
  }
})


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
