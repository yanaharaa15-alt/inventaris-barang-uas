// Implementasi JavaScript OOP & Simpulan Relasi Data (Syarat No. 4 & 9)
class BarangDatabase {
  constructor() {
    // Simulasi Tabel Database Berelasi (User Admin memiliki hak akses penuh)
    this.items = [
      { id: 1, nama: 'Laptop ASUS ROG', kategori: 'Elektronik', jumlah: 5, userId: 'admin' },
      { id: 2, nama: 'Kursi Kerja Ergonomis', kategori: 'Furnitur', jumlah: 12, userId: 'admin' },
      { id: 3, nama: 'Proyektor Epson', kategori: 'Elektronik', jumlah: 3, userId: 'admin' },
    ];
  }

  // Read (C)RUD
  getAll() {
    return this.items;
  }

  // Create C(R)UD
  create(data) {
    const newItem = {
      id: this.items.length > 0 ? this.items[this.items.length - 1].id + 1 : 1,
      nama: data.nama,
      kategori: data.kategori,
      jumlah: parseInt(data.jumlah),
      userId: 'admin' // Relasi data ke user admin
    };
    this.items.push(newItem);
    return newItem;
  }

  // Delete CRU(D)
  delete(id) {
    const index = this.items.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
      return this.items.splice(index, 1)[0];
    }
    return null;
  }
}

module.exports = new BarangDatabase();