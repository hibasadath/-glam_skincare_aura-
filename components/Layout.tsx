
import React from 'react';
import { Home, ClipboardList, Info, UserCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white shadow-xl relative">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
        <h1 className="text-xl font-serif text-slate-900 tracking-tight">DermAI</h1>
        <div className="flex space-x-2">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
            <span className="text-xs font-bold text-rose-600">JD</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center z-20">
        <button 
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center space-y-1 ${activeTab === 'home' ? 'text-rose-500' : 'text-slate-400'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Home</span>
        </button>
        <button 
          onClick={() => onTabChange('routine')}
          className={`flex flex-col items-center space-y-1 ${activeTab === 'routine' ? 'text-rose-500' : 'text-slate-400'}`}
        >
          <ClipboardList className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Routine</span>
        </button>
        <button 
          onClick={() => onTabChange('info')}
          className={`flex flex-col items-center space-y-1 ${activeTab === 'info' ? 'text-rose-500' : 'text-slate-400'}`}
        >
          <Info className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Learn</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
