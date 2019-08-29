const request = require('supertest');
const server = require('./server');
const db = require('./database/dbConfig');
const Database = require('./serverHelper');

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
  });
  it('should return a json object', async () => {
    const res = await request(server).get('/');
    expect(res.type).toBe('application/json');
  });
  it('should return {serverUp: true}', async () => {
    const res = await request(server).get('/');
    expect(res.body).toEqual({ serverUp: true });
  });
});

describe('MVP Tests', () => {
  describe('POST /name', () => {
    beforeEach(async () => {
      await db('test').truncate();
    });

    it('should insert 2 names', async () => {
      await Database.insert({ name: 'Braden' });
      await Database.insert({ name: 'Stone' });

      const test = await db('test');
      expect(test).toHaveLength(2);
    });

    it('should return status 201', async () => {
      const test = await request(server).post('/name').send({name:'test'});

      expect(test.status).toBe(201);
    });
  });

  describe('DELETE /name/:id', () => {
    beforeEach(async () => {
      await db('test').truncate();
    });

    it('should insert 2 names and delete one', async () => {
      await Database.insert({ name: 'test' });
      await Database.insert({ name: 'test2' });
      await Database.remove(1);

      const test = await db('test');
      expect(test).toHaveLength(1);
    });

	it('should return status 204', async () => {
		await Database.insert({name: 'test'});
		const test = await request(server).delete('/name/:id').send({name: 'test', id: '1'});

		expect(test.status).toBe(204);
	})
  });
});
