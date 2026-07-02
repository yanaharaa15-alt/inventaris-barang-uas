const express = require('express');
const router = express.Router();
const barangController = require('../controllers/barangController');

// Endpoint Autentikasi Dummy (Syarat No. 8 & Ujian Khusus)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    res.status(200).json({ message: "Login Sukses", role: "admin" });
  } else {
    res.status(401).json({ message: "Username/Password Admin Salah!" });
  }
});

// Endpoint CRUD Data (Syarat REST API No. 8)
router.get('/data', barangController.getAllData);
router.post('/data', barangController.createData);
router.delete('/data/:id', barangController.deleteData);

module.exports = router;