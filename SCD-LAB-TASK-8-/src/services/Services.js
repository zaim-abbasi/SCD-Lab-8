import { Event } from '../models/events';
import { sendNotification } from '../utils';


export const createEvent = async (eventData) => {
    const event = new Event(eventData);
    await event.save();
    return event;
};

export const getEvents = async () => {
    return await Event.find({});
};

export const setReminder = async (eventId, reminderTime) => {
    const event = await Event.findById(eventId);
    if (event) {
        // Schedule notification
        sendNotification(event, reminderTime);
    }
};