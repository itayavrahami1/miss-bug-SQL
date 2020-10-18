import utilService from './utilService.js'
import storageService from './storageService.js'

const STORAGE_KEY = 'bugs'


const gDefaultBugs = [_createBug('suzuli', 100), _createBug('lamburnini', 43245)]
var gBugs = null
_createBugs();

export default {
    query,
    save,
    remove,
    getById,
    getNextPrevBugs
}



function _createBugs() {
    gBugs = storageService.load(STORAGE_KEY, gDefaultBugs)
    storageService.store(STORAGE_KEY, gBugs)
}

function _createBug(vendor, price) {
    return {
        vendor,
        price,
        id: utilService.makeId(),
        createdAt: Date.now()
    }
}
function save(bugToSave) {
    var savedBug = bugToSave;
    if (bugToSave.id) {
        const bugIdx = _getIdxById(bugToSave.id)
        gBugs[bugIdx] = bugToSave;
        // gBugs.splice(bugIdx, 1, bug)
    } else {
        savedBug = _createBug(bugToSave.vendor, bugToSave.price)
        gBugs.push(savedBug)
    }
    storageService.store(STORAGE_KEY, gBugs)

    var res = (Math.random() > 0.9)? Promise.resolve(savedBug) : Promise.reject('Had Issues')

    return res;
}

function query(filterBy) {
    var bugs = gBugs;
    if (filterBy) {
        var { vendor, maxPrice, minPrice } = filterBy
        maxPrice = maxPrice ||  Infinity
        minPrice = minPrice || 0
        bugs = gBugs.filter(bug => bug.vendor.includes(vendor)
            && (bug.price < maxPrice)
            && bug.price > minPrice)
    }
    return Promise.resolve(bugs);
}
function remove(bugId) {
    const bugIdx = _getIdxById(bugId)
    gBugs.splice(bugIdx, 1)

    storageService.store(STORAGE_KEY, gBugs)
    return Promise.resolve();
}
function getById(bugId) {
    const bug = gBugs.find(bug => bug.id === bugId)
    return Promise.resolve(bug);
}
function _getIdxById(bugId) {
    return gBugs.findIndex(bug => bug.id === bugId)
}

function getNextPrevBugs(bugId) {
    // TODO: do it for real
    return {
        nextId: 'xxxNext',
        prevId: 'xxxPrev',
    }
}
