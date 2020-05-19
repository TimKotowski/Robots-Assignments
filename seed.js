const { green, red } = require('chalk');
const { db, Project, Robot } = require('./server/db');
const project_seed = require('./project_seed')
const robot_seed = require('./robot_seed')

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Project.bulkCreate(project_seed)
    await Robot.bulkCreate(robot_seed)

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
