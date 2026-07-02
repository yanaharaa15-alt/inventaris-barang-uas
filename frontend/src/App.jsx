import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Data Dummy Inventaris
  const [items, setItems] = useState([
    { id: 1, nama: 'Laptop ASUS ROG', kategori: 'Elektronik', jumlah: 5 },
    { id: 2, nama: 'Kursi Kerja Ergonomis', kategori: 'Furnitur', jumlah: 12 },
    { id: 3, nama: 'Proyektor Epson', kategori: 'Elektronik', jumlah: 3 },
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Username atau Password salah! (Gunakan: admin / admin123)');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  // 1. TAMPILAN HALAMAN LOGIN
  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ padding: '30px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '320px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>Login Inventaris</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} 
                placeholder="Hint: admin"
                required 
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} 
                placeholder="Hint: admin123"
                required 
              />
            </div>
            <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. TAMPILAN HALAMAN DASHBOARD UTAMA
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#343a40', padding: '10px 30px', color: '#fff' }}>
        <h2>Sistem Inventaris Barang - UAS</h2>
        <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
          Keluar
        </button>
      </nav>

      {/* Konten Utama */}
      <div style={{ padding: '40px 30px' }}>
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Daftar Stok Barang Gudang</h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#e9ecef', textAlign: 'left' }}>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>ID</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Nama Barang</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Kategori</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Jumlah Stok</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>{item.id}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold' }}>{item.nama}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}><span style={{ backgroundColor: '#e2e3e5', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>{item.kategori}</span></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', color: item.jumlah < 5 ? 'red' : 'green', fontWeight: 'bold' }}>{item.jumlah} Unit</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;