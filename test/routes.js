'use strict';

const expect = require('expect.js');
const request = require('request');

describe('test routes', () => {
    describe('/', () => {
        
        let body, response;
        
        beforeEach((done) => {
                request.get(`http://localhost:3001`, (error, res, b) => {
                    response = res;
                    body = b;
                    done();
                });
            });
        
        it('returns a 200 and a message', () => {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('Funky soul singers');
        });
    });
});
