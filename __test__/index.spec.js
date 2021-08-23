 //Import the js file to test
import { recDATA } from '../src/client/js/app'
import "babel-polyfill";
import "core-js";
const app = require('../src/server/index'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

describe('Test the status paths', () => {
    test('The GET / route should give status code 200', async () => {
        const response = await request.get('/');
        expect(response.statusCode).toBe(200);
    });

    test('The GET /status route should give status code 200', async () => {
        const response = await request.get('/allkeys');
        expect(response.statusCode).toBe(200);
    });

});
