import React, { useState } from 'react';
import { LayoutDashboard, Box, LogOut, Menu, X } from 'lucide-react';

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
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{ padding: '20px', fontSize: '18px', fontWeight: 'bold', borderBottom: '1px solid #343a40', textAlign: 'center' }}>
          Gudang Apps
        </div>
        <div style={{ padding: '20px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', backgroundColor: '#343a40', borderRadius: '6px', cursor: 'pointer', marginBottom: '10px' }}>
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: '6px', cursor: 'pointer', color: '#adb5bd' }}>
            <Box size={20} /> <span>Kelola Barang</span>
          </div>
        </div>
        <div onClick={onLogout} style={{ padding: '20px', borderTop: '1px solid #343a40', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#dc3545' }}>
          <LogOut size={20} /> <span>Kelola Keluar</span>
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

export default MainLayout;