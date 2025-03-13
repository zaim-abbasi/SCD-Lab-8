let events = [];
let users = [];

class Event {
  constructor({ title, description, date, category, userId, reminders = [] }) {
    this.id = events.length + 1;
    this.title = title;
    this.description = description;
    this.date = date;
    this.category = category;
    this.userId = userId;
    this.reminders = reminders;
  }

  static create(eventData) {
    const event = new Event(eventData);
    events.push(event);
    return event;
  }

  static findById(eventId) {
    return events.find(event => event.id === eventId);
  }

  static find(query) {
    return events.filter(event => {
      return Object.keys(query).every(key => event[key] === query[key]);
    });
  }
}

class User {
  constructor({ username, password, email }) {
    this.id = users.length + 1;
    this.username = username;
    this.password = password;
    this.email = email;
    this.events = [];
  }

  static create(userData) {
    const user = new User(userData);
    users.push(user);
    return user;
  }

  static findById(userId) {
    return users.find(user => user.id === userId);
  }

  static find(query) {
    return users.filter(user => {
      return Object.keys(query).every(key => user[key] === query[key]);
    });
  }
}

export { Event, User };