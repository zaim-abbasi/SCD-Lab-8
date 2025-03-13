const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

const scheduleNotification = (event) => {
    // Logic to schedule a notification for the event
    console.log(`Notification scheduled for event: ${event.title} on ${formatDate(event.date)}`);
};

module.exports = {
    formatDate,
    scheduleNotification,
};  