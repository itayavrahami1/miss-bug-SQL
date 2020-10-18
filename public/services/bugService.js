// import utilService from './utilService.js'
// import storageService from './storageService.js'
const baseUrl = '/api/bug';

// const STORAGE_KEY = 'bugs'
var gBugs = []

export default {
    query,
    save,
    remove,
    getById,
    getNextPrevBugs,
    setUser
}

function save(bugToSave) {
    if (bugToSave._id) {
        // UPDATE
        return axios.put(`${baseUrl}/${bugToSave._id}`, bugToSave)
        .then(res => res.data)
        .then(savedBug => {
            const bugIdx = _getIdxById(savedBug._id)
            gBugs[bugIdx] = savedBug;
            return savedBug
        })
    } else {
        // CREATE
        return axios.post(baseUrl, bugToSave)
            .then(res => res.data)
            .then(savedBug => {
                gBugs.unshift(savedBug)
                return savedBug
            })
    }
}

function query(filterBy) {

    return axios.get(baseUrl, {params: filterBy})
        .then(res => res.data)
        .then(bugs => {
            gBugs = bugs;
            // This is very useful for DEBUGING from the console!
            window.theBugs = bugs;
            return bugs;
        })
}
function remove(bugId) {
    return axios.delete(`${baseUrl}/${bugId}`)
        .then(() => {
            const bugIdx = _getIdxById(bugId)
            gBugs.splice(bugIdx, 1)
        })
}
function getById(bugId) {
    return axios.get(`${baseUrl}/${bugId}`)
        .then(res => res.data)
}
function _getIdxById(bugId) {
    return gBugs.findIndex(bug => bug._id === bugId)
}

function getNextPrevBugs(bugId) {
    // TODO: do it for real
    return {
        nextId: 'xxxNext',
        prevId: 'xxxPrev',
    }
}

function setUser(nickName){
    return axios.post(`${baseUrl}/setUser` , {nickName})
        .then(() => {})
}
