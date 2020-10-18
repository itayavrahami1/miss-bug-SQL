
const fs = require('fs')
const bugs = require('../data/bug.json')


function query(filterBy) {
    var bugsToReturn = bugs;

    if (filterBy) {
        const title = filterBy.title || '';
        const severity = filterBy.severity || '';
        bugsToReturn = bugs.filter(bug => bug.title.toLowerCase().includes(title.toLowerCase()))
    }
    console.log(bugsToReturn);
    return Promise.resolve(bugsToReturn);
}

function getById(id) {
    const bug = bugs.find(bug => bug._id === id)
    return Promise.resolve(bug);
}
function remove(id, nickName) {
    console.log(nickName);
    const idx = bugs.findIndex(bug => bug._id === id)
    if (bugs[idx].creator.nickname !== nickName) return
    bugs.splice(idx, 1);
    _saveBugsToFile()
    return Promise.resolve();
}

function save(bug) {
    if (bug._id) {
        const idx = bugs.findIndex(currBug => currBug._id === bug._id)
        bug.updatedAt = Date.now();
        bugs[idx] = { ...bugs[idx], ...bug }
    } else {
        bug.createdAt = Date.now();
        bug._id = _makeId();
        bugs.unshift(bug);
    }
    _saveBugsToFile();
    return Promise.resolve(bug);
}


// CRUDL: Create, Read, Update, Delete, List
module.exports = {
    query,
    getById,
    save,
    remove
}

function _makeId(length = 5) {
    var txtId = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txtId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txtId;
}

function _saveBugsToFile() {
    fs.writeFileSync('data/bug.json', JSON.stringify(bugs, null, 2));
}
