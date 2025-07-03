require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const API_TOKEN = process.env.IUCN_TOKEN;

app.get('/', (req, res) => {
  res.send("✅ API IUCN corriendo");
});

app.get('/especie/:nombre', async (req, res) => {
  const nombre = decodeURIComponent(req.params.nombre); // 👈 cambio aquí

  try {
    const url = `https://apiv3.iucnredlist.org/api/v3/species/${encodeURIComponent(nombre)}?token=${API_TOKEN}`;
    const respuesta = await axios.get(url);
    res.json(respuesta.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "No se pudo obtener la información de la especie." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
