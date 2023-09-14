import React, { useState } from 'react';

function App() {
    const [note, setNote] = useState('');

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-3/4 md:w-3/4 lg:w-1/2">
              <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Write your note here..."
                  className="w-full h-72 p-5 text-lg border-none rounded-xl shadow-md focus:shadow-lg outline-none resize-none"
              />
            </div>
        </div>
    );
}

export default App;
