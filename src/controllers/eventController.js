const { Event, User } = require('../models/events');

// Create a new event
const createEvent = (req, res) => {
    try {
        const eventData = req.body;
        const newEvent = Event.create(eventData);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getEvents = (req, res) => {
    try {
        const { sortBy } = req.query;
        let events = Event.find({ date: { $gte: new Date() } });

        if (sortBy === 'date') {
            events = events.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (sortBy === 'category') {
            events = events.sort((a, b) => a.category.localeCompare(b.category));
        } else if (sortBy === 'reminder') {
            events = events.sort((a, b) => a.reminders.length - b.reminders.length);
        }

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Setting a reminder for the upcoming events
const setReminder = (req, res) => {
    try {
        const { eventId, reminderTime } = req.body;
        const event = Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        event.reminders.push(new Date(reminderTime));
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