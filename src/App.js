import React, { useState, useEffect } from 'react';

function App() {
  const [note, setNote] = useState('');

  useEffect(() => {
    // Load the note and timestamp from localStorage when the component mounts
    const savedNote = localStorage.getItem('userNote');
    const savedTimestamp = localStorage.getItem('noteTimestamp');

    // If the note is older than 12 hours, clear it
    const TWELVE_HOURS = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
    if (savedTimestamp && Date.now() - savedTimestamp > TWELVE_HOURS) {
      localStorage.removeItem('userNote');
      localStorage.removeItem('noteTimestamp');
    } else if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  useEffect(() => {
    // Save the note to localStorage whenever it changes
    localStorage.setItem('userNote', note);
    localStorage.setItem('noteTimestamp', Date.now()); // also save the current timestamp
  }, [note]);

  const handleClearNote = () => {
    setNote('');
    localStorage.removeItem('userNote');
    localStorage.removeItem('noteTimestamp');
  };

  const wordCount = note.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-3/4 min-w-[300px] max-w-[900px]">
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Write here..."
          className="w-full h-72 p-5 text-sm sm:text-lg border-none rounded-xl shadow-md focus:shadow-lg outline-none resize-none mb-2"
        />
        <div className="flex justify-between items-center">
          <div className="text-left text-sm text-gray-600">
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </div>
          <button
            onClick={handleClearNote}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Clear
          </button>
        </div>
        <div className="py-4 items-center">
        <p className="text-xs text-center text-gray-600">Autosaved offline to your device. Cleared automatically after 12 hours.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
