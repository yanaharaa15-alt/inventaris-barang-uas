import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Box, LogOut, Menu, X } from 'lucide-react';

// ==========================================
// 1. KOMPONEN LAYOUT (NAVBAR & SIDEBAR)
// ==========================================
function MainLayout({ children, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'Arial, sans-serif', overflow: 'hidden' }}>
      {/* SIDEBAR */}
      <div style={{
        width: isSidebarOpen ? '240px' : '0px',
        backgroundColor: '#212529',
        color: '#fff',
        transition: 'all 0.3s',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px', fontSize: '18px', fontWeight: 'bold', borderBottom: '1px solid #343a40', textAlign: 'center' }}>
          Gudang Apps
        </div>
        <div style={{ padding: '20px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', backgroundColor: '#343a40', borderRadius: '6px', cursor: 'pointer', marginBottom: '10px' }}>
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: '6px', color: '#adb5bd' }}>
            <Box size={20} /> <span>Kelola Barang</span>
          </div>
        </div>
        <div onClick={onLogout} style={{ padding: '20px', borderTop: '1px solid #343a40', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#dc3545' }}>
          <LogOut size={20} /> <span>Keluar</span>
        </div>
      </div>

      {/* KONTEN UTAMA & NAVBAR */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        {/* NAVBAR */}
        <nav style={{ height: '60px', backgroundColor: '#fff', borderBottom: '1px solid #dee2e6', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between' }}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div style={{ fontWeight: 'bold', color: '#495057' }}>Sistem Inventaris Barang - Dashboard Admin</div>
        </nav>

        {/* AREA ISI HALAMAN */}
        <div style={{ padding: '30px', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. KOMPONEN HALAMAN DASHBOARD (FORM & TABEL)
// ==========================================
function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [namaBarang, setNamaBarang] = useState('');
  const [kategori, setKategori] = useState('Elektronik');
  const [jumlah, setJumlah] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
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

  const handleAddItem = (e) => {
    e.preventDefault();
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
    setNamaBarang('');
    setJumlah('');
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const totalBarang = items.length;
  const totalStok = items.reduce((sum, item) => sum + item.jumlah, 0);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '20px', color: '#6c757d' }}>Memuat Data Stok Gudang...</div>;
  }

  return (
    <div>
      {/* KARTU STATISTIK */}
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
        {/* FORM INPUT */}
        <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '20px' }}>Tambah Barang Baru</h3>
          <form onSubmit={handleAddItem}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Nama Barang</label>
              <input type="text" value={namaBarang} onChange={(e) => setNamaBarang(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }} placeholder="Contoh: Meja Lab" />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Kategori</label>
              <select value={kategori} onChange={(e) => setKategori(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}>
                <option value="Elektronik">Elektronik</option>
                <option value="Furnitur">Furnitur</option>
                <option value="Alat Tulis">Alat Tulis</option>
              </select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Jumlah Stok</label>
              <input type="number" value={jumlah} onChange={(e) => setJumlah(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }} placeholder="0" />
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Simpan Ke Daftar</button>
          </form>
        </div>

        {/* TABEL DATA */}
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

// ==========================================
// 3. APLIKASI UTAMA (SISTEM AUTENTIKASI)
// ==========================================
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuth(true);
    } else {
      alert('Gagal masuk! Gunakan: admin / admin123');
    }
  };

  return (
    <div>
      {isAuth ? (
        <MainLayout onLogout={() => setIsAuth(false)}>
          <Dashboard />
        </MainLayout>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'Arial' }}>
          <div style={{ padding: '30px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '320px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Login Kelompok UAS</h2>
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} required />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} required />
              </div>
              <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>Masuk</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;