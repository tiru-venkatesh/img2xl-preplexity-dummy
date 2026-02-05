import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  Paperclip, 
  Layers, 
  AlignLeft, 
  Copy, 
  Share, 
  Globe,
  Image as ImageIcon,
  FileSpreadsheet,
  FileText,
  FileJson,
  Table,
  Maximize2
} from 'lucide-react';

interface ThreadProps {
  query: string;
  onNewSearch: (query: string) => void;
}

export function Thread({ query, onNewSearch }: ThreadProps) {
  const [inputValue, setInputValue] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onNewSearch(inputValue);
      setInputValue('');
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [query]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f3f3ee] dark:bg-[#191a1a]">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 pb-32 flex flex-col lg:flex-row gap-6">
          
          {/* Main Column */}
          <div className="flex-1 min-w-0 space-y-6">
            
            {/* Header: img2xl small brand text */}
            <div className="flex justify-center mb-4">
                <span className="font-['Instrument_Serif'] text-lg font-bold tracking-tight text-gray-400 dark:text-gray-600">
                    img2xl
                </span>
            </div>

            {/* User Query */}
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-['Instrument_Serif'] text-gray-900 dark:text-gray-100 tracking-tight">
                {query}
              </h1>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 text-sm font-medium border-b border-gray-200 dark:border-gray-800">
                 <div className="pb-2 border-b-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <Layers size={16} />
                    Sources
                 </div>
                 <div className="pb-2 border-b-2 border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-2 transition-colors">
                    <AlignLeft size={16} />
                    Answer
                 </div>
                 <div className="pb-2 border-b-2 border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-2 transition-colors">
                    <Globe size={16} />
                    Related
                 </div>
            </div>

            {/* Sources Section */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 bg-white dark:bg-[#202222] border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-[#2a2c2c] cursor-pointer transition-colors group">
                    <div className="text-xs text-gray-500 mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">img2xl.com › analysis</div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2">
                      Image Analysis Result #{i}
                    </div>
                  </div>
                ))}
                <div className="p-3 flex items-center justify-center bg-gray-100 dark:bg-[#202222]/50 border border-transparent rounded-xl text-xs font-medium text-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#2a2c2c]">
                  View all
                </div>
              </div>
            </div>

            {/* Answer Section */}
            <div className="space-y-6">
              <div className="prose prose-slate dark:prose-invert max-w-none text-gray-800 dark:text-gray-300 leading-relaxed text-[15px]">
                <p>
                  I have analyzed the uploaded image and extracted the tabular data. The image appears to be an invoice or purchase order containing product listings, quantities, and pricing information.
                </p>
                
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mt-6 mb-3">Summary of Extraction</h3>
                <ul className="list-none pl-0 space-y-1">
                  <li><span className="font-semibold text-gray-900 dark:text-gray-100">Document Type:</span> Invoice / Purchase Order</li>
                  <li><span className="font-semibold text-gray-900 dark:text-gray-100">Detected Items:</span> 3 Line Items</li>
                  <li><span className="font-semibold text-gray-900 dark:text-gray-100">Total Value:</span> $4,450.00</li>
                </ul>
                
                {/* OCR Text Block */}
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mt-6 mb-3">OCR Raw Text</h3>
                <div className="p-4 bg-gray-100 dark:bg-[#252727] rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-xs text-gray-600 dark:text-gray-400 overflow-x-auto whitespace-pre">
ITEM DESCRIPTION | QTY | UNIT PRICE | TOTAL
Server Rack | 2 | $1,200.00 | $2,400.00
Network Switch | 5 | $350.00 | $1,750.00
Cat6 Cable | 20 | $15.00 | $300.00
                </div>

                {/* Data Table Preview */}
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mt-6 mb-3">Table Preview</h3>
                <div className="bg-white dark:bg-[#202222] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left border-collapse">
                          <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                              <tr>
                                  <th className="px-4 py-3 font-medium">Item</th>
                                  <th className="px-4 py-3 font-medium">Qty</th>
                                  <th className="px-4 py-3 font-medium">Unit Price</th>
                                  <th className="px-4 py-3 font-medium">Total</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                                  <td className="px-4 py-3">Server Rack</td>
                                  <td className="px-4 py-3">2</td>
                                  <td className="px-4 py-3">$1,200.00</td>
                                  <td className="px-4 py-3">$2,400.00</td>
                              </tr>
                              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                                  <td className="px-4 py-3">Network Switch</td>
                                  <td className="px-4 py-3">5</td>
                                  <td className="px-4 py-3">$350.00</td>
                                  <td className="px-4 py-3">$1,750.00</td>
                              </tr>
                              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                                  <td className="px-4 py-3">Cat6 Cable</td>
                                  <td className="px-4 py-3">20</td>
                                  <td className="px-4 py-3">$15.00</td>
                                  <td className="px-4 py-3">$300.00</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800 flex gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-[#2a2c2c] hover:bg-gray-200 dark:hover:bg-[#333535] rounded-md transition-colors">
                          <Copy size={14} /> Copy
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-[#2a2c2c] hover:bg-gray-200 dark:hover:bg-[#333535] rounded-md transition-colors">
                          <Share size={14} /> Share
                      </button>
                  </div>
                </div>
              </div>
            </div>
            
             {/* Related */}
             <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                      <Globe size={18} className="text-gray-500" />
                      Related
                  </h3>
                  <div className="space-y-2">
                      {["How to verify OCR accuracy?", "Exporting tables to Quickbooks", "Automating invoice processing"].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#202222] cursor-pointer group">
                               <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{item}</span>
                               <div className="text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"><ArrowRight size={16} /></div>
                          </div>
                      ))}
                  </div>
             </div>
          </div>

          {/* Right Side Panel */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
            {/* File Card */}
            <div className="bg-white dark:bg-[#202222] rounded-xl border border-gray-200 dark:border-gray-700 p-1 overflow-hidden">
              <div className="relative aspect-[3/4] bg-gray-100 dark:bg-[#2a2c2c] rounded-lg overflow-hidden flex items-center justify-center group">
                  <ImageIcon size={48} className="text-gray-300 dark:text-gray-600" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <button className="opacity-0 group-hover:opacity-100 bg-white dark:bg-black/80 text-gray-900 dark:text-white p-2 rounded-full shadow-lg transition-opacity">
                          <Maximize2 size={16} />
                      </button>
                  </div>
              </div>
              <div className="p-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Invoice_scan_001.png</h4>
                  <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                      <span>Page 1 of 1</span>
                      <span>2.4 MB</span>
                  </div>
              </div>
            </div>

            {/* Detected Entities */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Detected Entities</h3>
              <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 bg-white dark:bg-[#202222] rounded-lg border border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Table Data</span>
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">98%</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white dark:bg-[#202222] rounded-lg border border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Header Info</span>
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">95%</span>
                  </div>
                   <div className="flex items-center justify-between p-2.5 bg-white dark:bg-[#202222] rounded-lg border border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Signatures</span>
                      <span className="text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">Low</span>
                  </div>
              </div>
            </div>

            {/* Export Buttons */}
             <div className="space-y-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Export As</h3>
              <div className="grid grid-cols-2 gap-2">
                  <ExportButton icon={<FileSpreadsheet size={16} />} label="Excel" />
                  <ExportButton icon={<FileSpreadsheet size={16} />} label="CSV" />
                  <ExportButton icon={<FileJson size={16} />} label="JSON" />
                  <ExportButton icon={<FileText size={16} />} label="PDF" />
              </div>
            </div>

          </div>

        </div>
        <div ref={bottomRef} />
      </div>

      {/* Sticky Bottom Input Bar */}
      <div className="flex-shrink-0 w-full bg-[#f3f3ee] dark:bg-[#191a1a] p-4 pt-2 border-t border-transparent z-20">
        <div className="max-w-3xl mx-auto">
             <form onSubmit={handleSubmit} className="relative">
                <div className="relative flex flex-col w-full bg-white dark:bg-[#202222] border border-gray-200 dark:border-gray-700 rounded-3xl shadow-sm hover:border-gray-300 dark:hover:border-gray-600 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all duration-200">
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask a follow-up..."
                        className="w-full bg-transparent border-none outline-none text-base p-3 px-5 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 h-12"
                    />
                    
                    <button 
                        type="submit"
                        disabled={!inputValue.trim()}
                        className={`
                            absolute right-2 top-1/2 -translate-y-1/2
                            p-1.5 rounded-full transition-all duration-200
                            ${inputValue.trim() 
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'}
                        `}
                    >
                        <ArrowRight size={18} />
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}

function ExportButton({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <button className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-[#202222] border border-gray-200 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 hover:border-emerald-200 dark:hover:border-emerald-800 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-lg transition-all shadow-sm">
            {icon}
            <span>{label}</span>
        </button>
    )
}
