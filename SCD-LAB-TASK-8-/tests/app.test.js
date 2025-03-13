const request = require('supertest');
const app = require('../src/app'); // Adjust the path as necessary

describe('Event Planning and Reminder System', () => {
  let eventId;

  it('should create a new event', async () => {
    const response = await request(app)
      .post('/api/events')
      .send({
        title: 'Birthday Party',
        date: '2023-12-25',
        category: 'Celebration',
        reminder: '1 day before'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    eventId = response.body.id; // Store the event ID for later tests
  });

  it('should retrieve all events', async () => {
    const response = await request(app).get('/api/events');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should set a reminder for an event', async () => {
    const response = await request(app)
      .post(`/api/events/${eventId}/reminder`)
      .send({
        reminder: '2 days before'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.reminder).toBe('2 days before');
  });

  it('should authenticate a user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});