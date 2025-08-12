import React, { useState, useMemo, useCallback } from 'react';
import vocab from './vocab.js';

function App() {
  const [text, setText] = useState('');

  // ---------------- encode / decode helpers ----------------
  const encode = useCallback(
    (str) => str.split('').map((ch) => vocab[ch] ?? '0'),
    []
  );

  const decode = useCallback(
    (arr) => {
      const rev = Object.fromEntries(
        Object.entries(vocab).map(([k, v]) => [v, k])
      );
      return arr.map((t) => rev[t] ?? '').join('');
    },
    []
  );

  // ---------------- memoized state ----------------
  const tokens = useMemo(() => (text ? encode(text) : []), [text, encode]);
  const decoded = useMemo(() => decode(tokens), [tokens, decode]);



  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors overflow-y-hidden">
      {/* Header */}
      <header className="w-full py-5 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
          Learnt React & JavaScript from{' '}
          <strong>Hitesh Sir – Pranam Guru ji</strong>

        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl space-y-5">
          {/* Input */}
          <div>
            <label className="block mb-2 font-semibold">Input Text</label>
            <textarea
              rows={4}
              className="w-full p-3 rounded-md border border-slate-700  bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Type something..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="text-sm text-right text-gray-400 mt-1">
              {text.length} characters
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigator.clipboard.writeText(tokens.join(' '))}
              className="bg-indigo-500 text-white rounded-md px-4 py-2 hover:bg-indigo-600 transition "
            >
              Copy Tokens
            </button>
            <button onClick={() => setText('')} className=" px-1 bg-rose-500 rounded-md">
              Clear
            </button>
          </div>

          {/* Encoded Tokens */}
          <div>
            <label className="block mb-2 font-semibold">Encoded Tokens</label>
            <textarea
              rows={4}
              readOnly
              className="w-full p-3 rounded-md border border-slate-700 bg-slate-800"
              value={tokens.join(' ')}
            />
          </div>

          {/* Decoded Preview */}
          <div>
            <label className="block mb-2 font-semibold">Decoded Preview</label>
            <div className="p-3 rounded-md border border-slate-700 bg-slate-800 font-mono break-all">
              {decoded || (
                <span className="text-gray-400">Decode result appears here…</span>
              )}
            </div>
          </div>

          {/* Missing chars warning */}
          {tokens.includes('0') && (
            <div className="flex items-center gap-2 text-yellow-400">
              <span role="img" aria-label="warning">
                ⚠️
              </span>{' '}
              Some characters are missing from the vocabulary and encoded as 0.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


export default App;