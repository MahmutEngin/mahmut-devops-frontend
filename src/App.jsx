import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookReader } from './components/BookReader';

function App() {
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_BACKEND_URL || 'https://mahmut-backend.team-vit-devops.nl';

  const fetchBackendData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/info`);
      setBackendData(response.data);
    } catch (err) {
      setError('Backend servisine erişilemedi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackendData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-slate-800 text-white p-3 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span>🚀 <strong>Frontend v1.0.1</strong></span>
            <span>📅 Güncelleme: {new Date().toLocaleDateString()}</span>
            <a
              href="/rapor.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded text-xs transition-colors font-semibold no-underline"
            >
              📄 Proje Raporunu Oku
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={fetchBackendData}
              className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded text-xs transition-colors"
            >
              API Bağlantısını Test Et
            </button>
            {loading && <span className="text-yellow-400">Yükleniyor...</span>}
            {error && <span className="text-red-400">{error}</span>}
            {backendData && (
              <span className="text-green-400 font-mono">
                API Durum: {backendData.application} ({backendData.version} - {backendData.environment})
              </span>
            )}
          </div>
        </div>
      </div>

      <BookReader />
    </div>
  );
}

export default App;