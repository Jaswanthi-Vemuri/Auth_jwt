const router = require('express').Router();
const ensureAuthenticated = require('../Middlewares/Auth');
const { getSwappableSlots, requestSwap, swapResponse, getRequests } = require('../Controllers/SwapController');

router.get('/swappable-slots', ensureAuthenticated, getSwappableSlots);
router.post('/swap-request', ensureAuthenticated, requestSwap);
router.post('/swap-response/:requestId', ensureAuthenticated, swapResponse);
router.get('/requests', ensureAuthenticated, getRequests); // List incoming/outgoing
module.exports = router;
