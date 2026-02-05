import React, { useState } from 'react';
import { ArrowRight, Paperclip, ScanText, FileSpreadsheet, Image as ImageIcon, FileText } from 'lucide-react';

interface MainContentProps {
  onSearch: (query: string) => void;
}

export function MainContent({ onSearch }: MainContentProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  const suggestions = [
    { icon: <FileSpreadsheet size={18} />, text: "Convert image to Excel" },
    { icon: <ScanText size={18} />, text: "Extract text" },
    { icon: <FileText size={18} />, text: "Summarize document" },
    { icon: <ImageIcon size={18} />, text: "Find tables" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-3xl mx-auto px-4 pb-20">
      <div className="w-full text-center mb-10 space-y-4">
        <h1 className="text-4xl md:text-5xl font-['Instrument_Serif'] text-gray-900 dark:text-gray-100 tracking-tight">
          Where images become data
        </h1>
      </div>

      <div className="w-full relative group z-10">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex flex-col w-full bg-white dark:bg-[#202222] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all duration-200">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Upload image or ask anything..."
              className="w-full max-h-[200px] min-h-[60px] py-4 px-4 bg-transparent border-none outline-none resize-none text-lg placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            
            <div className="flex items-center justify-between px-3 pb-3 pt-1">
                <div className="flex items-center gap-2">
                    <button 
                        type="button" 
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50"
                        title="Attach"
                    >
                        <Paperclip size={18} />
                    </button>
                </div>
                <div>
                    <button 
                        type="submit"
                        disabled={!inputValue.trim()}
                        className={`
                        p-2 rounded-full transition-all duration-200
                        ${inputValue.trim() 
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'}
                        `}
                    >
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 w-full">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onSearch(s.text)}
            className="flex items-center gap-3 p-3 text-left bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 rounded-xl transition-all duration-200 group"
          >
            <span className="text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {s.icon}
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {s.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
