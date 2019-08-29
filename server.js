const express = require('express');
const Database = require('./serverHelper');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ serverUp: true });
});

server.post('/name', async (req, res) => {
  const body = req.body;
  const name = await Database.insert(body);

  try {
    res.status(201).json(name);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.delete('/name/:id', async (req, res) => {
  const { id } = req.params;
  const name = await Database.remove(id);

  try {
    res.status(204).json({ message: 'name removed' });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = server;
