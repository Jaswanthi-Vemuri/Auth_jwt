const router = require('express').Router();
const ensureAuthenticated = require('../Middlewares/Auth');
const { createEvent, getMyEvents, updateEventStatus } = require('../Controllers/EventController');

router.get('/', ensureAuthenticated, getMyEvents); // GET my events
router.post('/', ensureAuthenticated, createEvent); // POST create event
router.patch('/:id', ensureAuthenticated, updateEventStatus); // PATCH status (SWAPPABLE/BUSY)
module.exports = router;
