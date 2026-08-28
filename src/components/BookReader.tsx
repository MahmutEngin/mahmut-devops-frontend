import React, { useState } from 'react';
import { bookData, Theme, Section } from '../data/bookData';

export const BookReader: React.FC = () => {
  const [activeThemeId, setActiveThemeId] = useState<string>(bookData[0].id);
  const [selectedSection, setSelectedSection] = useState<Section>(bookData[0].sections[0]);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: string }>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Seçilen metin ve Türkçe çeviri durumu
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

  // Metin Seçimi Algılama ve Çeviri Çağrısı
  const handleTextSelection = async () => {
    const selection = window.getSelection()?.toString().trim();
    if (selection && selection.length > 0) {
      setSelectedText(selection);
      setIsTranslating(true);
      setTranslation(null);

      try {
        // Free Google Translate API Endpoint
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
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6 font-sans">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-1">
          TaalCompleet Dijital Asistanı
        </h1>
        <p className="text-gray-600 text-sm">
          Sol menüden ünitenizi seçin, metni okuyun ve soruları çözün.
        </p>
      </div>

      {/* Main Container - Genişlik Tam Sayfa */}
      <div className="w-full max-w-[98%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Sol Menü / Kitap İçeriği (1 Sütun) */}
        <div className="md:col-span-1 bg-white p-4 rounded-xl shadow-sm h-fit border border-gray-200">
          <h2 className="text-base font-bold text-gray-800 border-b pb-3 mb-3 flex items-center gap-2">
            <span>📚</span> Kitap İçeriği
          </h2>
          <div className="space-y-2">
            {bookData.map((theme: Theme) => (
              <div key={theme.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleTheme(theme.id)}
                  className="w-full text-left p-3 font-semibold bg-gray-50 hover:bg-gray-100 flex justify-between items-center text-xs text-gray-700"
                >
                  <span>{theme.title}</span>
                  <span>{activeThemeId === theme.id ? '▲' : '▼'}</span>
                </button>
                
                {activeThemeId === theme.id && (
                  <div className="bg-white p-2 space-y-1 border-t border-gray-200">
                    {theme.sections.map((sec: Section) => (
                      <button
                        key={sec.id}
                        onClick={() => handleSelectSection(sec)}
                        className={`w-full text-left p-2 text-xs rounded transition-colors ${
                          selectedSection.id === sec.id
                            ? 'bg-blue-600 text-white font-medium'
                            : 'text-gray-600 hover:bg-blue-50'
                        }`}
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

        {/* Sağ Taraf / Okuma ve Alıştırmalar (3 Sütun - Sayfayı Dolduran Yapı) */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            
            {/* Başlık ve Dinle Butonu */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{selectedSection.title}</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Metinden dilediğiniz kelimeyi veya cümleyi seçerek Türkçe çevirisini görebilirsiniz.
                </p>
              </div>
              <button
                onClick={handleSpeech}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
              >
                🔊 Metni Dinle
              </button>
            </div>

            {/* OKUMA PARÇASI & ÇEVİRİ ALANI */}
            <div className="mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                📖 OKUMA PARÇASI
              </span>
              
              {/* Metin Seçimi Olayı Eklendi */}
              <div 
                onMouseUp={handleTextSelection}
                className="bg-blue-50/60 p-5 rounded-xl border border-blue-100 text-gray-800 leading-relaxed text-base cursor-text select-text"
              >
                {selectedSection.readingText}
              </div>

              {/* Seçilen Kelime / Cümle Türkçe Çeviri Paneli */}
              {selectedText && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-amber-800 uppercase">
                      🇳🇱 Seçilen Metin: <span className="italic font-normal text-gray-900">"{selectedText}"</span>
                    </span>
                    <button 
                      onClick={() => { setSelectedText(''); setTranslation(null); }}
                      className="text-xs text-gray-400 hover:text-gray-600 font-bold"
                    >
                      ✕ Kapat
                    </button>
                  </div>
                  <div className="text-sm font-semibold text-emerald-800 mt-2">
                    🇹🇷 Türkçe Anlamı: {' '}
                    {isTranslating ? (
                      <span className="text-amber-600 animate-pulse font-normal">Çevriliyor...</span>
                    ) : (
                      <span className="text-gray-900 font-medium">{translation}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ALIŞTIRMALAR */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  ✏️ BU METİNLE İLGİLİ ALIŞTIRMALAR
                </span>
                <span className="text-xs bg-gray-100 px-2.5 py-1 rounded text-gray-500 font-medium">
                  {selectedSection.questions.length} Soru
                </span>
              </div>

              <div className="space-y-4">
                {selectedSection.questions.map((q, idx) => (
                  <div key={q.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="font-semibold text-gray-800 text-sm mb-3">
                      {idx + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {q.options.map(opt => {
                        const isSelected = userAnswers[q.id] === opt;
                        const isCorrect = q.correctAnswer === opt;
                        let btnStyle = "border-gray-200 bg-white text-gray-700 hover:bg-gray-50";

                        if (showResults) {
                          if (isCorrect) btnStyle = "bg-green-600 text-white border-green-600 font-semibold";
                          else if (isSelected) btnStyle = "bg-red-500 text-white border-red-500";
                        } else if (isSelected) {
                          btnStyle = "bg-blue-600 text-white border-blue-600 font-semibold";
                        }

                        return (
                          <button
                            key={opt}
                            onClick={() => handleOptionSelect(q.id, opt)}
                            className={`p-3 rounded-lg border text-xs text-left transition-all ${btnStyle}`}
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
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowResults(true)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold text-sm transition-colors shadow-sm"
                >
                  Cevapları Kontrol Et
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-3 rounded-lg font-semibold text-sm transition-colors"
                >
                  Sıfırla
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};