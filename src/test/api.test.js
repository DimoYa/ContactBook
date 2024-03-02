const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const bodyParser = require('body-parser');
const server = require('../controllers/api-controller');
const data = require("../data/app-data");

const expect = chai.expect;

chai.use(chaiHttp);

describe('Contacts API', () => {
    let app;

    before(() => {
        app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        data.seedSampleData();
        server.setup(app, data);
    });


    it('Should POST a contact', (done) => {
        const newContact = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            comments: 'This is a test comment.'
        };

        chai.request(app)
            .post('/api/contacts')
            .send(newContact)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('msg', 'Contact added.');
                done();
            });
    });

    it('Should DELETE a contact', (done) => {
        const existingContactId = 2;
        chai.request(app)
            .delete(`/api/contacts/${existingContactId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should GET all contacts', (done) => {
        chai.request(app)
            .get('/api/contacts')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                done();
            });
    });

    it('Should GET a single contact', (done) => {
        const contactId = 1;
        chai.request(app)
            .get(`/api/contacts/${contactId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id', contactId);
                done();
            });
    });

    it('Should GET contacts by keyword', (done) => {
        const keyword = 'Steve';

        chai.request(app)
            .get(`/api/contacts/search/${keyword}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});