const BarangModel = require('../models/BarangModel');

// GET /data (Syarat No. 8)
exports.getAllData = (req, res) => {
  try {
    const data = BarangModel.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// POST /data dengan Validasi Form Backend (Syarat No. 8, 10, & 11)
exports.createData = (req, res) => {
  try {
    const { nama, kategori, jumlah } = req.body;

    // Validasi di sisi Backend (Syarat No. 10b)
    if (!nama || !kategori || !jumlah) {
      return res.status(400).json({ message: "Gagal! Semua kolom data wajib diisi di backend." });
    }
    if (parseInt(jumlah) <= 0) {
      return res.status(400).json({ message: "Gagal! Jumlah stok tidak boleh 0 atau minus." });
    }

    const barangBaru = BarangModel.create({ nama, kategori, jumlah });
    res.status(201).json(barangBaru);
  } catch (error) {
    res.status(500).json({ message: "Gagal menyimpan data" });
  }
};

// DELETE /data/:id (Syarat No. 8)
exports.deleteData = (req, res) => {
  const deleted = BarangModel.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Data barang tidak ditemukan" });
  }
  res.status(200).json({ message: "Barang berhasil dihapus" });
};