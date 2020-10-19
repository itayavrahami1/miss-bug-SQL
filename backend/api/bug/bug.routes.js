const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getBug, getBugs, deleteBug, updateBug} = require('./bug.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBugs)
router.get('/:id', getBug)
// router.put('/:id',  requireAuth, updateBug)
// router.delete('/:id',  requireAuth, requireAdmin, deleteBug)

module.exports = router