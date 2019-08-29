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

module.exports = server;
