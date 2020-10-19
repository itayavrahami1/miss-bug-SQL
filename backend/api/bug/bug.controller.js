const bugService = require('./BugService')
const logger = require('../../services/logger.service')

async function getBug(req, res) {
    const bug = await bugService.getById(req.params.id)
    res.send(bug)
}
  
async function getBugs(req, res) {
    console.log('controller',req.query);
    const bugs = await bugService.query(req.query)
    logger.debug(bugs);
    res.send(bugs)
}

async function deleteBug(req, res) {
    await bugService.remove(req.params.id)
    res.end()
}

async function updateBug(req, res) {
    const bug = req.body;
    await bugService.update(bug)
    res.send(bug)
}

module.exports = {
    getBug,
    getBugs,
    deleteBug,
    updateBug
}