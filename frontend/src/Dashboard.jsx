import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State Form untuk Tambah Data (Validation & Event Handling)
  const [namaBarang, setNamaBarang] = useState('');
  const [kategori, setKategori] = useState('Elektronik');
  const [jumlah, setJumlah] = useState('');

  // JavaScript Asynchronous (Fetch Dummy Simulation dengan Loading State)
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulasi nunggu fetch API backend selama 1 detik
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setItems([
          { id: 1, nama: 'Laptop ASUS ROG', kategori: 'Elektronik', jumlah: 5 },
          { id: 2, nama: 'Kursi Kerja Ergonomis', kategori: 'Furnitur', jumlah: 12 },
          { id: 3, nama: 'Proyektor Epson', kategori: 'Elektronik', jumlah: 3 },
        ]);
      } catch (error) {
        alert("Gagal memuat data barang!");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Event Handling & Validation untuk Form Tambah Barang
  const handleAddItem = (e) => {
    e.preventDefault();
    
    // Frontend Validation
    if (!namaBarang.trim() || !jumlah) {
      alert('Semua data form wajib diisi!');
      return;
    }
    if (parseInt(jumlah) <= 0) {
      alert('Jumlah stok harus lebih besar dari 0!');
      return;
    }

    const newItem = {
      id: items.length + 1,
      nama: namaBarang,
      kategori: kategori,
      jumlah: parseInt(jumlah)
    };

    setItems([...items, newItem]);
    
    // Reset Form
    setNamaBarang('');
    setJumlah('');
  };

  // Function Delete Data (CRUD - Delete)
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // Perhitungan Statistik Ringkas (Array Reduce/Length)
  const totalBarang = items.length;
  const totalStok = items.reduce((sum, item) => sum + item.jumlah, 0);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '20px', color: '#6c757d' }}>Memuat Data Stok Gudang...</div>;
  }

  return (
    <div>
      {/* 4. KARTU STATISTIK RINGKAS */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '5px solid #007bff' }}>
          <div style={{ fontSize: '14px', color: '#6c757d', fontWeight: 'bold' }}>TOTAL JENIS BARANG</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '5px' }}>{totalBarang} Item</div>
        </div>
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '5px solid #28a745' }}>
          <div style={{ fontSize: '14px', color: '#6c757d', fontWeight: 'bold' }}>TOTAL STOK KESELURUHAN</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '5px' }}>{totalStok} Unit</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* FORM INPUT BARANG */}
        <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '20px' }}>Tambah Barang Baru</h3>
          <form onSubmit={handleAddItem}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#495057' }}>Nama Barang</label>
              <input type="text" value={namaBarang} onChange={(e) => setNamaBarang(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }} placeholder="Contoh: Meja Lab" />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#495057' }}>Kategori</label>
              <select value={kategori} onChange={(e) => setKategori(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}>
                <option value="Elektronik">Elektronik</option>
                <option value="Furnitur">Furnitur</option>
                <option value="Alat Tulis">Alat Tulis</option>
              </select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#495057' }}>Jumlah Stok</label>
              <input type="number" value={jumlah} onChange={(e) => setJumlah(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }} placeholder="0" />
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Simpan Ke Daftar</button>
          </form>
        </div>

        {/* TABEL DATA BARANG */}
        <div style={{ flex: '2', minWidth: '500px', backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '20px' }}>Daftar Inventaris Stok</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f3f5', textAlign: 'left' }}>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>ID</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Nama</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Kategori</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Stok</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>{item.id}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold' }}>{item.nama}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}><span style={{ backgroundColor: '#e9ecef', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>{item.kategori}</span></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold', color: '#28a745' }}>{item.jumlah} Unit</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;