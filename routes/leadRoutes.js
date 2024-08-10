// const express = require('express');
// const router = express.Router();
// const { createLead, updateLead, deleteLead } = require('../controllers/leadController');
// const authenticateToken = require('../middleware/authMiddleware');

// router.post('/create', authenticateToken, createLead);
// router.put('/update', authenticateToken, updateLead);
// router.delete('/delete', authenticateToken, deleteLead);

// module.exports = router;

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const {
    createLead,
    updateLead,
    deleteLead,
    getAllLeads
} = require('../controllers/leadController');

router.post('/', authenticate, createLead);
router.put('/', authenticate, updateLead);
router.delete('/', authenticate, deleteLead);
router.get('/', authenticate, getAllLeads);

module.exports = router;

