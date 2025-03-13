const Event = require('../models/event'); 
const User = require('../models/user'); 

// Create a new event
const createEvent = async (req, res) => {
    try {
        const eventData = req.body;
        const newEvent = await Event.create(eventData);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ...existing code...

const getEvents = async (req, res) => {
    try {
        const { sortBy } = req.query;
        const sortOptions = {};
        if (sortBy === 'date') {
            sortOptions.date = 1;
        } else if (sortBy === 'category') {
            sortOptions.category = 1;
        } else if (sortBy === 'reminder') {
            sortOptions.reminders = 1;
        }
        const events = await Event.find({ date: { $gte: new Date() } }).sort(sortOptions);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
    
// ...existing code...

// Setting a reminder for the upcoming events
const setReminder = async (req, res) => {
    try {
        const { eventId, reminderTime } = req.body;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Reminder set successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createEvent,
    getEvents,
    setReminder,
};