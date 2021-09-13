const express = require('express')
const router = express.Router()
const { getPrivateRoute } = require('../controllers/private')
const { protect } = require('../middleware/auth')
// pasas por el middleware protect luego el controller puede ser usado
router.route('/').get(protect, getPrivateRoute)

module.exports = router
