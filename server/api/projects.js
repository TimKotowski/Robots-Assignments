const router = require('express').Router();
const { Project, Robot } = require('../db');

// api/projects
router.get('/', async (req, res, next) => {
  try {
    const allProjects = await Project.findAll();
    res.json(allProjects);
  } catch (error) {
    next(error);
  }
});

// api/projects/:projectId
router.get('/:projectId', async (req, res, next) => {
  try {
    const id = req.params.projectId;
    const project = await Project.findByPk(id, {
      include: [Robot],
    });
    if (!project) {
      res.sendStatus(404);
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
});

// api/projects
router.post('/', async (req, res, next) => {
  try {



// const { title, deadline, priority, description, completed } = req.body;
//     const createProject = await Project.create({
//       title,
//       deadline,
//       priority,
//       description,
//       completed,
//     });

//     res.json(createProject);
const {title, deadline, priority, completed, description} = req.body
console.log(JSON.stringify(req.body))
const project = await Project.create({
  where: {
    title,
    deadline,
    priority,
    completed,
    description

  }
})
const currentProject = await Robot.findByPk(req.body.robotId);
await currentProject.addProject(project[0]);
res.json(project[0]);
// console.log(Object.keys(current.__proto__));

    // const {name, fuelType, fuelLevel, imageUrl} = req.body
    //   const [robot, created] = await Robot.findOrCreate({
    //     where: {
    //       name,
    //       imageUrl,
    //       fuelType,
    //       fuelLevel
    //     }
    //   })

      // await project.addRobots(robot)

      // res.json(project)
  } catch (error) {
    next(error);
  }
});

// api.projects/:projectId
router.put('/:projectId', async (req, res, next) => {
  try {
    const [projectCount, affectProject] = await Project.update(req.body, {
      where: {
        id: req.params.projectId,
      },
      returning: true,
      plain: true,
    });

    res.json(affectProject);
  } catch (error) {
    next(error);
  }
});

// api/projects/:projectId
router.delete('/:projectId', async (req, res, next) => {
  try {
    const id = req.params.projectId;
    const deleteProject = await Project.destroy({
      where: {
        id,
      },
    });
    res.send('Thanos has snapped his fingers, deleting your Project');
  } catch (error) {
    next(error);
  }
});

module.exports = router;


// const { title, deadline, priority, description, completed } = req.body;
//     const createProject = await Project.create({
//       title,
//       deadline,
//       priority,
//       description,
//       completed,
//     });

//     res.json(createProject);
