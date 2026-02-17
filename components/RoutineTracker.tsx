
import React, { useState } from 'react';
// Added Sparkles to the imports from lucide-react
import { Sun, Moon, CheckCircle2, Circle, ChevronDown, Info, Sparkles } from 'lucide-react';
import { RoutineStep } from '../types';

interface RoutineTrackerProps {
  amSteps: RoutineStep[];
  pmSteps: RoutineStep[];
  onToggleStep: (id: string, timeOfDay: 'am' | 'pm') => void;
}

const RoutineTracker: React.FC<RoutineTrackerProps> = ({ amSteps, pmSteps, onToggleStep }) => {
  const [activeTab, setActiveTab] = useState<'am' | 'pm'>('am');

  const steps = activeTab === 'am' ? amSteps : pmSteps;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-serif text-slate-900">Daily Ritual</h2>
        <p className="text-slate-500 text-sm mt-1">Consistency is the key to healthy skin.</p>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
        <button 
          onClick={() => setActiveTab('am')}
          className={`flex-1 flex items-center justify-center py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'am' ? 'bg-white shadow-sm text-amber-500' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Sun className="w-4 h-4 mr-2" /> AM
        </button>
        <button 
          onClick={() => setActiveTab('pm')}
          className={`flex-1 flex items-center justify-center py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'pm' ? 'bg-white shadow-sm text-indigo-500' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Moon className="w-4 h-4 mr-2" /> PM
        </button>
      </div>

      {/* Step List */}
      <div className="space-y-4">
        {steps.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <p>Complete your analysis to unlock your custom routine.</p>
          </div>
        ) : (
          steps.map((step) => (
            <div 
              key={step.id}
              className={`group border rounded-3xl p-4 transition-all ${step.isCompleted ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-100 hover:border-slate-200'}`}
            >
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => onToggleStep(step.id, activeTab)}
                  className={`flex-shrink-0 transition-colors ${step.isCompleted ? 'text-emerald-500' : 'text-slate-200 group-hover:text-slate-300'}`}
                >
                  {step.isCompleted ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${step.isCompleted ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {step.category}
                    </span>
                    <Info className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                  <h4 className={`text-sm font-bold truncate ${step.isCompleted ? 'text-emerald-900 line-through opacity-50' : 'text-slate-800'}`}>
                    {step.name}
                  </h4>
                  <p className={`text-[11px] mt-1 line-clamp-1 ${step.isCompleted ? 'text-emerald-700/60' : 'text-slate-500'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Motivation Card */}
      <div className="mt-12 bg-indigo-50 p-6 rounded-3xl flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h5 className="font-bold text-indigo-900 text-sm">7-Day Streak Goal</h5>
          <p className="text-[11px] text-indigo-700 mt-1">You're 3 days away from unlocking a specialized expert consultation tip!</p>
        </div>
      </div>
    </div>
  );
};

export default RoutineTracker;
