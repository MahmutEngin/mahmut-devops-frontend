import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const fetchBackendData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/info`);
      setBackendData(response.data);
    } catch (err) {
      setError('Backend uygulamasına erişilemedi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackendData();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>DevOps Projesi Frontend</h1>
      <h1>DevOps Projesi Frontend - CI/CD Test v2</h1>
      <p><strong>Uygulama Versiyonu:</strong> 1.0.0</p>
      <p><strong>Son Güncelleme:</strong> {new Date().toLocaleDateString()}</p>
      
      <hr style={{ margin: '2rem 0' }} />

      <h2>Backend Bağlantı Testi</h2>
      <button onClick={fetchBackendData} style={{ padding: '10px 15px', cursor: 'pointer' }}>
        Backend'den Veri Çek
      </button>

      {loading && <p>Yükleniyor...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {backendData && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f4f4f4', borderRadius: '5px' }}>
          <h3>Backend'den Gelen Cevap:</h3>
          <pre>{JSON.stringify(backendData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;