
import React from 'react';
import { Calendar, Droplets, Sparkles, ChevronRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { UserProfile, SkinType } from '../types';
import { SKIN_TYPE_DETAILS } from '../constants';

interface DashboardProps {
  profile: UserProfile;
  onNavigateToScan: () => void;
  onNavigateToRoutine: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, onNavigateToScan, onNavigateToRoutine }) => {
  const { skinType, lastAnalysisDate } = profile;
  const details = skinType ? SKIN_TYPE_DETAILS[skinType] : null;

  const amProgress = profile.amRoutine.length > 0 
    ? Math.round((profile.amRoutine.filter(s => s.isCompleted).length / profile.amRoutine.length) * 100) 
    : 0;

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Welcome */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-serif text-slate-900">Your Skin Profile</h2>
          <button 
            onClick={onNavigateToScan}
            className="text-[10px] font-bold text-slate-400 flex items-center uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-3 h-3 mr-1.5" />
            Change Type
          </button>
        </div>

        {skinType && (
          <div className={`p-8 rounded-[2rem] ${details?.color} border border-black/5 shadow-lg shadow-black/5 relative overflow-hidden`}>
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Selected Profile</span>
                  <h3 className="text-3xl font-bold mt-1">{skinType}</h3>
                </div>
                <div className="p-4 bg-white/50 backdrop-blur-md rounded-2xl">
                  {details?.icon}
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed font-medium opacity-90">{details?.description}</p>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
          </div>
        )}
      </section>

      {/* Recommended Active Ingredients */}
      {skinType && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif text-slate-900">Key Recommendations</h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AM / PM actives</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {details?.ingredients.map((ing, idx) => (
              <div key={idx} className="bg-white border border-slate-100 p-5 rounded-[1.5rem] flex items-center space-x-4 shadow-sm hover:border-rose-100 transition-all cursor-default group">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-400 transition-colors">
                  <Droplets className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800 text-sm">{ing.name}</h4>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{ing.frequency}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{ing.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Routine Tracker Quick Access */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif text-slate-900">Today's Protocol</h3>
          <button onClick={onNavigateToRoutine} className="text-xs text-rose-500 font-bold flex items-center bg-rose-50 px-3 py-1.5 rounded-full">
            View All <ChevronRight className="w-3 h-3 ml-1" />
          </button>
        </div>
        <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Morning Ritual</p>
                <h4 className="text-2xl font-bold">{amProgress === 100 ? 'Protocol Complete' : 'Active Duty'}</h4>
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-rose-500/20 flex items-center justify-center bg-slate-800">
                <span className="text-xs font-bold text-rose-500">{amProgress}%</span>
              </div>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mb-6">
              <div 
                className="bg-rose-500 h-full rounded-full transition-all duration-1000" 
                style={{ width: `${amProgress}%` }}
              />
            </div>
            <div className="flex items-center text-xs font-medium text-slate-400">
              <CheckCircle2 className="w-4 h-4 mr-2 text-rose-500" />
              Progress based on AM routine completion
            </div>
          </div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 blur-[80px] -mr-20 -mt-20 rounded-full" />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
