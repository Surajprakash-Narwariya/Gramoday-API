const request = require('supertest');
const assert = require('assert');
const app = require('./app');

// testing the post request
describe('POST /reports', function () {
    it('response with success and reportId', (done) => {
        request(app)
            .post('/reports')
            .send({
                // userId: 'User-1',
                marketId: 'mkt3920',
                marketName: 'shivaji vatika indore',
                marketType: 'Mandi',
                commodityId: 'pt-3232',
                commodityName: 'Rice',
                priceUnit: 'Quintal',
                conversionFactor: '100',
                price: 5550,
            })
            .expect('Content-Type', /json/)
            .expect(
                200,
                { status: 'success', reportId: '629cc208411e548b6385ec6b' },
                done
            );
    });
});

// testing the get request
describe('GET /reports/629cc208411e548b6385ec6b', function () {
    it('response with status code 200', (done) => {
        request(app)
            .get('/reports/629cc208411e548b6385ec6b')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
});
