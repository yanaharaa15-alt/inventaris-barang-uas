const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware wajib agar server bisa membaca data JSON dari frontend
app.use(cors());
app.use(express.json());

// Endpoint Tes Dasar (GET /data singkat untuk tes awal)
app.get('/api/data', (req, res) => {
    res.json({ message: "Server backend inventaris berhasil berjalan!" });
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server berjalan lancar di http://localhost:${PORT}`);
});