import React, { useState } from 'react';
import { bookData, Theme, Section } from '../data/bookData';

export const BookReader: React.FC = () => {
  const [activeThemeId, setActiveThemeId] = useState<string>(bookData[0].id);
  const [selectedSection, setSelectedSection] = useState<Section>(bookData[0].sections[0]);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: string }>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Metin seçimi ve Çeviri State'leri
  const [selectedText, setSelectedText] = useState<string>('');
  const [translation, setTranslation] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const toggleTheme = (themeId: string) => {
    setActiveThemeId(activeThemeId === themeId ? '' : themeId);
  };

  const handleSelectSection = (section: Section) => {
    setSelectedSection(section);
    setUserAnswers({});
    setShowResults(false);
    setSelectedText('');
    setTranslation(null);
  };

  const handleOptionSelect = (questionId: number, option: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(selectedSection.readingText);
      utterance.lang = 'nl-NL';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Tarayıcınız metin okuma özelliğini desteklemiyor.');
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  // Fare ile metin seçildiğinde tetiklenen çeviri fonksiyonu
  const handleTextSelection = async () => {
    const selection = window.getSelection()?.toString().trim();
    if (selection && selection.length > 0) {
      setSelectedText(selection);
      setIsTranslating(true);
      setTranslation(null);

      try {
        const response = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=nl&tl=tr&dt=t&q=${encodeURIComponent(selection)}`
        );
        const data = await response.json();
        if (data && data[0]) {
          const translatedStr = data[0].map((item: any) => item[0]).join('');
          setTranslation(translatedStr);
        } else {
          setTranslation('Çeviri alınamadı.');
        }
      } catch (err) {
        setTranslation('Çeviri servisine bağlanılamadı.');
      } finally {
        setIsTranslating(false);
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '24px', width: '100%', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#2563eb', fontSize: '28px', fontWeight: 'bold', margin: '0 0 6px 0' }}>
          TaalCompleet Dijital Asistanı
        </h1>
        <p style={{ color: '#4b5563', fontSize: '14px', margin: 0 }}>
          Sol menüden ünitenizi seçin, metni okuyun ve soruları çözün.
        </p>
      </div>

      {/* Main Container - Tam Sayfa Yerleşim */}
      <div style={{ width: '100%', display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {/* Sol Menü / Kitap İçeriği */}
        <div style={{ flex: '1 1 280px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', marginTop: 0 }}>
            📚 Kitap İçeriği
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {bookData.map((theme: Theme) => (
              <div key={theme.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                <button
                  onClick={() => toggleTheme(theme.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 12px',
                    fontWeight: '600',
                    backgroundColor: '#f9fafb',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '13px',
                    color: '#374151'
                  }}
                >
                  <span>{theme.title}</span>
                  <span>{activeThemeId === theme.id ? '▲' : '▼'}</span>
                </button>
                
                {activeThemeId === theme.id && (
                  <div style={{ backgroundColor: '#ffffff', padding: '6px', borderTop: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {theme.sections.map((sec: Section) => (
                      <button
                        key={sec.id}
                        onClick={() => handleSelectSection(sec)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '8px 10px',
                          fontSize: '12px',
                          borderRadius: '6px',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: selectedSection.id === sec.id ? '#2563eb' : 'transparent',
                          color: selectedSection.id === sec.id ? '#ffffff' : '#4b5563',
                          fontWeight: selectedSection.id === sec.id ? '600' : 'normal'
                        }}
                      >
                        {sec.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sağ Taraf / Okuma Parçası ve Alıştırmalar */}
        <div style={{ flex: '3 1 600px', backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          
          {/* Başlık ve Dinle Butonu */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>{selectedSection.title}</h2>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: '4px 0 0 0' }}>
                Metinden dilediğiniz kelimeyi veya cümleyi fare ile seçerek Türkçe çevirisini görebilirsiniz.
              </p>
            </div>
            <button
              onClick={handleSpeech}
              style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🔊 Metni Dinle
            </button>
          </div>

          {/* OKUMA PARÇASI VE METİN SEÇİMİ ALANI */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#9ca3af', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
              📖 OKUMA PARÇASI
            </span>
            <div 
              onMouseUp={handleTextSelection}
              style={{ 
                backgroundColor: '#eff6ff', 
                padding: '18px', 
                borderRadius: '8px', 
                border: '1px solid #dbeafe', 
                color: '#1e3a8a', 
                lineHeight: '1.7', 
                fontSize: '15px',
                cursor: 'text'
              }}
            >
              {selectedSection.readingText}
            </div>

            {/* SEÇİLEN KELİME / CÜMLE TÜRKÇE ÇEVİRİ PANELİ */}
            {selectedText && (
              <div style={{ marginTop: '14px', padding: '14px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#92400e' }}>
                    🇳🇱 Seçilen Metin: <span style={{ fontStyle: 'italic', color: '#111827' }}>"{selectedText}"</span>
                  </span>
                  <button 
                    onClick={() => { setSelectedText(''); setTranslation(null); }}
                    style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
                  >
                    ✕
                  </button>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#065f46' }}>
                  🇹🇷 Türkçe Anlamı:{' '}
                  {isTranslating ? (
                    <span style={{ color: '#d97706', fontWeight: 'normal' }}>Çevriliyor...</span>
                  ) : (
                    <span style={{ color: '#111827', fontWeight: '600' }}>{translation}</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ALIŞTIRMALAR */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#9ca3af', letterSpacing: '0.5px' }}>
                ✏️ BU METİNLE İLGİLİ ALIŞTIRMALAR
              </span>
              <span style={{ fontSize: '11px', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '4px', color: '#6b7280' }}>
                {selectedSection.questions.length} Soru
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedSection.questions.map((q, idx) => (
                <div key={q.id} style={{ backgroundColor: '#f9fafb', padding: '14px', borderRadius: '8px', border: '1px solid #f3f4f6' }}>
                  <p style={{ fontWeight: '600', color: '#1f2937', fontSize: '13px', margin: '0 0 10px 0' }}>
                    {idx + 1}. {q.question}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {q.options.map(opt => {
                      const isSelected = userAnswers[q.id] === opt;
                      const isCorrect = q.correctAnswer === opt;
                      
                      let bg = '#ffffff';
                      let color = '#374151';
                      let borderColor = '#d1d5db';

                      if (showResults) {
                        if (isCorrect) {
                          bg = '#059669';
                          color = '#ffffff';
                          borderColor = '#059669';
                        } else if (isSelected) {
                          bg = '#ef4444';
                          color = '#ffffff';
                          borderColor = '#ef4444';
                        }
                      } else if (isSelected) {
                        bg = '#2563eb';
                        color = '#ffffff';
                        borderColor = '#2563eb';
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleOptionSelect(q.id, opt)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: `1px solid ${borderColor}`,
                            backgroundColor: bg,
                            color: color,
                            fontSize: '12px',
                            cursor: 'pointer',
                            flex: '1 1 120px',
                            textAlign: 'left'
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Aksiyon Butonları */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={() => setShowResults(true)}
                style={{
                  flex: 1,
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Cevapları Kontrol Et
              </button>
              <button
                onClick={handleReset}
                style={{
                  backgroundColor: '#e5e7eb',
                  color: '#374151',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Sıfırla
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};