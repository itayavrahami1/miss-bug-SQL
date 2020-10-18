const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const bugService = require('./services/bug.service')
const app = express()
const port = 3000

// Express App Config
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static('public'))

// REST API for BUGS

// GET LIST
app.get('/api/bug', (req, res) => {
    const filterBy = req.query;
    bugService.query(filterBy)
        .then(bugs => {
            res.json(bugs)
        })
})
// GET SINGLE
app.get('/api/bug/:id', (req, res) => {
    const bugId = req.params.id;
    bugService.getById(bugId)
        .then(bug => {
            res.json(bug)
        })
})
// DELETE
app.delete('/api/bug/:id', (req, res) => {
    const currNickName = req.cookies.nickName;
    const bugId = req.params.id;
    bugService.remove(bugId,currNickName)
        .then(() => {
            res.end('Done!')
        })
})
// CREATE
app.post('/api/bug', (req, res) => {
    const bug = req.body;
    bug['creator'] = {nickname: req.cookies.nickName};
    bugService.save(bug)
        .then(savedBug => {
            res.json(savedBug)
        })
})
// UPDATE
app.put('/api/bug/:id', (req, res) => {
    const bug = req.body;
    bugService.save(bug)
        .then(savedBug => {
            res.json(savedBug)
        })
})

// LOGIN
app.post('/api/bug/setUser', (req, res) => {
    const { nickName } = req.body;
    res.cookie('nickName', nickName)
    return res.end()
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})