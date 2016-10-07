'use strict';

const expect = require('expect.js');
const request = require('request');

describe('test routes', () => {
    describe('get /', () => {
        
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
    
    describe('post /artist', () => {
        
        let body, response;
        
        beforeEach((done) => {
            
            const options = {
                method: 'POST',
                uri: 'http://localhost:3001/artist',
                body: { name: 'Marvin Gaye', id: 'marvingaye' }
            }
            
            request(options, (error, res, b) => {
                response = res;
                body = b;
                done();
            });
        });
        
        it('returns a 200 and a message', () => {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('Created a soul singer named Marvin Gaye');
        });
    });
    
    describe('get /artist/marvingaye', () => {
        
        let body, response;
        
        beforeEach((done) => {
            
            beforeEach((done) => {
                request.get(`http://localhost:3001/artist/marvingaye`, (error, res, b) => {
                    response = res;
                    body = b;
                    done();
                });
            });
        
        it('returns a 200 and an artist page', () => {
            expect(response.statusCode).to.equal(200);
            expect(body).to.equal('Marvin Gaye');
        });
    });
});
