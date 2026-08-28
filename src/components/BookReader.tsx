import React, { useState } from 'react';
import { bookData, Theme, Section } from '../data/bookData';

export const BookReader: React.FC = () => {
  const [activeThemeId, setActiveThemeId] = useState<string>(bookData[0].id);
  const [selectedSection, setSelectedSection] = useState<Section>(bookData[0].sections[0]);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: string }>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const toggleTheme = (themeId: string) => {
    setActiveThemeId(activeThemeId === themeId ? '' : themeId);
  };

  const handleSelectSection = (section: Section) => {
    setSelectedSection(section);
    setUserAnswers({});
    setShowResults(false);
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

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-2">
          TaalCompleet Dijital Asistanı
        </h1>
        <p className="text-gray-600">
          Sol menüden ünitenizi seçin, metni okuyun ve soruları çözün.
        </p>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Sol Menü / Kitap İçeriği */}
        <div className="bg-white p-4 rounded-xl shadow-md h-fit">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4 flex items-center gap-2">
            <span>📚</span> Kitap İçeriği
          </h2>
          <div className="space-y-2">
            {bookData.map((theme: Theme) => (
              <div key={theme.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleTheme(theme.id)}
                  className="w-full text-left p-3 font-semibold bg-gray-50 hover:bg-gray-100 flex justify-between items-center text-sm text-gray-700"
                >
                  <span>{theme.title}</span>
                  <span>{activeThemeId === theme.id ? '▲' : '▼'}</span>
                </button>
                
                {activeThemeId === theme.id && (
                  <div className="bg-white p-2 space-y-1 border-t">
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

        {/* Sağ Taraf / Okuma ve Alıştırmalar */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            
            {/* Başlık ve Dinle Butonu */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedSection.title}</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Metinden dilediğiniz kelimeyi veya cümleyi seçerek okuyabilirsiniz.
                </p>
              </div>
              <button
                onClick={handleSpeech}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
              >
                🔊 Metni Dinle
              </button>
            </div>

            {/* OKUMA PARÇASI */}
            <div className="mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                📖 OKUMA PARÇASI
              </span>
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 text-gray-700 leading-relaxed text-sm md:text-base">
                {selectedSection.readingText}
              </div>
            </div>

            {/* ALIŞTIRMALAR */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  ✏️ BU METİNLE İLGİLİ ALIŞTIRMALAR
                </span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 font-medium">
                  {selectedSection.questions.length} Soru
                </span>
              </div>

              <div className="space-y-6">
                {selectedSection.questions.map((q, idx) => (
                  <div key={q.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="font-semibold text-gray-800 text-sm mb-3">
                      {idx + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
                            className={`p-2.5 rounded-lg border text-xs text-left transition-all ${btnStyle}`}
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
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm"
                >
                  Cevapları Kontrol Et
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
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