
import React from 'react';
import { Droplets, Sparkles, Sun, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SkinType } from '../types';
import { SKIN_TYPE_DETAILS } from '../constants';

interface SkinTypeSelectorProps {
  onSelect: (type: SkinType) => void;
}

const SkinTypeSelector: React.FC<SkinTypeSelectorProps> = ({ onSelect }) => {
  const types = [
    { type: SkinType.OILY, icon: <Droplets className="w-6 h-6" />, label: 'Oily', desc: 'Shiny, visible pores' },
    { type: SkinType.DRY, icon: <Sparkles className="w-6 h-6" />, label: 'Dry', desc: 'Tight, flaky, or dull' },
    { type: SkinType.COMBINATION, icon: <Sun className="w-6 h-6" />, label: 'Combo', desc: 'Oily T-zone, dry cheeks' },
    { type: SkinType.NORMAL, icon: <ShieldCheck className="w-6 h-6" />, label: 'Normal', desc: 'Balanced, comfortable' },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif text-slate-900">Choose Your Skin Type</h2>
        <p className="text-slate-500 text-sm">Select the profile that best describes your skin today.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {types.map((item) => (
          <button
            key={item.type}
            onClick={() => onSelect(item.type)}
            className="flex flex-col items-center text-center p-6 bg-white border border-slate-100 rounded-[2rem] hover:border-rose-300 hover:shadow-lg hover:shadow-rose-500/5 transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${SKIN_TYPE_DETAILS[item.type].color} bg-opacity-20`}>
              {item.icon}
            </div>
            <h3 className="font-bold text-slate-900 mb-1">{item.label}</h3>
            <p className="text-[10px] text-slate-400 leading-tight uppercase tracking-tight">{item.desc}</p>
          </button>
        ))}
      </div>

      <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mt-4">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-rose-100 rounded-full shrink-0">
            <CheckCircle2 className="w-4 h-4 text-rose-500" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Professional Advice</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Not sure? Try washing your face and waiting 30 minutes without products. If it feels tight, you're likely Dry. If shiny, you're Oily.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinTypeSelector;
