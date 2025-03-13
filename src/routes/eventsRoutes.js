const express = require('express');
const { createEvent, getEvents, setReminder } = require('../controllers/eventController');

const router = express.Router();

// Define a simple route for testing
router.get('/', (req, res) => {
    res.send('Welcome to the Event Planning and Reminder System API');
});

// Route for creating a new event
router.post('/events', createEvent);

// Route for retrieving upcoming events
router.get('/events', getEvents);

// Route for setting a reminder for an event
router.post('/events/reminder', setReminder);

module.exports = router;