const express = require('express');
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ======================= ROUTES =======================

// GET semua kebun binantag
app.get('/kandang', async (req, res) => {
  try {
    const kandang = await db.kandang.findAll();
    res.status(200).send(kandang);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// POST tambah komik
app.post('/kandang', async (req, res) => {
  const data = req.body;
  try {
    const kandang = await db.kandang.create(data);
    res.status(201).send(kandang);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// PUT update komik
app.put('/kandang/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const kandang = await db.kandang.findByPk(id);
    if (!kandang) {
      return res.status(404).send({ message: 'kandang not found' });
    }

    await kandang.update(data);
    res.send({ message: 'kandang berhasil diupdate', kandang });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// DELETE hapus komik
app.delete('/kandang/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const kandang = await db.kandang.findByPk(id);
    if (!kandang) {
      return res.status(404).send({ message: 'kandang not found' });
    }

    await kandang.destroy();
    res.send({ message: 'kandang deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// ======================= SERVER START =======================
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('❌ Database connection error:', err.message);
  });
