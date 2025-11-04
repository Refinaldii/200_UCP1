const express = require('express');
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// GET semua kebun binantag
app.get('/kandang', async (req, res) => {
  try {
    const kandang = await db.kandang.findAll();
    res.status(200).send(kandang);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});