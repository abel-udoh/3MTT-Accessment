const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

describe('Authentication Endpoints', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany();
    });

    it('should sign up a new user', async () => {
        const response = await request(app)
            .post('/signup')
            .send({ firstName: 'Abel', lastName: 'Udoh', email: 'abeludoh8@gmail.com', password: 'password' });
        expect(response.status).toBe(201);
    });

    it('should sign in a user', async () => {
        const password = await bcrypt.hash('password', 10);
        await User.create({ firstName: 'Abel', lastName: 'Udoh', email: 'abeludoh8@gmail.com', password });
        const response = await request(app)
            .post('/signin')
            .send({ email: 'abeludoh8@gmail.com', password: 'password' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should not sign in an invalid user', async () => {
        const response = await request(app)
            .post('/signin')
            .send({ email: 'abeludoh8@gmail.com', password: 'invalidpassword' });
        expect(response.status).toBe(401);
    });
});
