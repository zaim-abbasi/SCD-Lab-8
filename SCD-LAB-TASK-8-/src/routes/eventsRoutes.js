import express from 'express';
import { createEvent, getEvents, setReminder } from '../controllers/eventController.js';

const router = express.Router();

// Route for creating a new event
router.post('/events', createEvent);

// Route for retrieving upcoming events
router.get('/events', getEvents);

// Route for setting a reminder for an event
router.post('/events/reminder', setReminder);

export default router;