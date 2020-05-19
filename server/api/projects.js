const router = require('express').Router();
const {Project, Robot} = require('../db')

router.get('/', async (req, res, next) => {

  try {
    const allProjects = await Project.findAll()
    res.json(allProjects)
  } catch (error) {
    next(error)
  }
});



router.get('/:projectId', async (req, res, next) => {
  try {
    const id = req.params.projectId
      const project = await Project.findByPk(id, {
        include: [Robot]
      })
      if (!project) {
        res.sendStatus(404);
      }
      res.json(project)
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
      const {name, imageUrl, fuelType, fuelLevel} = req.body
      const createProject = await Project.create({
        name,
        imageUrl,
        fuelType,fuelLevel
      })


      res.json(createProject)
  } catch (error) {
    next(error)
  }
})

router.put('/:projectId', async (req, res, next) => {
  try {
     const [projectCount, affectProject] = await Project.update(req.body, {
       where: {
         id: req.params.projectId
       },
       returning: true,
       plain: true
     })

     res.json(affectProject)
  } catch (error) {
    next(error)
  }
})

router.delete('/:projectId', async (req, res, next) => {
  try {
    const id = req.params.projectId
    const deleteProject = await Project.destroy({
      where: {
        id
      }
    })
    res.send('Thanos has snapped his fingers, deleting your Project')
  } catch (error) {
    next(error)
  }
})

module.exports = router;
