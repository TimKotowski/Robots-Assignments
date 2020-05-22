const { green, red } = require('chalk');
const { db, Project, Robot } = require('./server/db');
const project_seed = require('./project_seed')
const robot_seed = require('./robot_seed');
const projects_robots_like = require('./projects_robots_like')

const seed = async () => {

  try {
    await db.sync({ force: true });
    await Project.bulkCreate(project_seed)
    await Robot.bulkCreate(robot_seed)
    const robot = await Robot.findByPk(1)
    const project = await Project.findByPk(1)
    const _robot = await Robot.findByPk(2)
    const _project = await Project.findByPk(2)
    await  robot.addProject(project)
    await  _robot.addProject(_project)

    // const __robot = await Robot.findByPk(1)
    // await __robot.removeProject(1)
    // console.log("all done")

    // const __project = await Project.findByPk(1)
    // await __project.removeRobot(1)
    // console.log("all done")

    // const ___robot = await Robot.findByPk(2)
    // await ___robot.removeProject(2)
    // console.log("all done")

  } catch (err) {
    console.log(red(err));
  }


};


module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
