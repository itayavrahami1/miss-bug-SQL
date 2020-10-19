
const bugService = require('../backend/api/bug/BugService');
// const bugService = require('./BugService');

(async () =>{
    const bugs = await bugService.query();
    console.log('Bugs:', bugs);
})()

