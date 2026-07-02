const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Jalur Rute REST API MVC
const barangRoutes = require('./routes/barangRoutes');
app.use('/api', barangRoutes);

app.listen(PORT, () => {
  console.log(`=== BACKEND SUKSES BERJALAN ===`);
  console.log(`Node.js & Express API aktif di http://localhost:${PORT}`);
});