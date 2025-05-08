const request = require('supertest');
const app = require('../index');

// Mock nodemailer
jest.mock('nodemailer');
const nodemailer = require('nodemailer');
const sendMailMock = jest.fn();
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

describe('POST /send-notification', () => {
  it('should send a notification email', async () => {
    sendMailMock.mockResolvedValueOnce(true);

    const response = await request(app)
      .post('/send-notification')
      .send({
        to: 'test@example.com',
        subject: 'Test',
        message: 'This is a test message.'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(sendMailMock).toHaveBeenCalled();
  });

  it('should return 500 on error', async () => {
    sendMailMock.mockRejectedValueOnce(new Error('Failed'));

    const response = await request(app)
      .post('/send-notification')
      .send({
        to: 'fail@example.com',
        subject: 'Fail',
        message: 'Should fail'
      });

    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
  });
});
