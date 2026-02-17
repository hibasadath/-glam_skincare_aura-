
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RoutineTracker from './components/RoutineTracker';
import SkinTypeSelector from './components/SkinTypeSelector';
import { UserProfile, SkinType, RoutineStep } from './types';
import { SKIN_TYPE_DETAILS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('derm_profile');
    return saved ? JSON.parse(saved) : {
      skinType: null,
      concerns: [],
      lastAnalysisDate: null,
      amRoutine: [],
      pmRoutine: []
    };
  });

  useEffect(() => {
    localStorage.setItem('derm_profile', JSON.stringify(profile));
  }, [profile]);

  const generateRoutine = (type: SkinType): { am: RoutineStep[], pm: RoutineStep[] } => {
    // Base AM Routine
    const am: RoutineStep[] = [
      { id: 'am1', name: 'Gentle Cleanser', category: 'Cleanser', description: 'Remove overnight oils and prep skin.', isCompleted: false },
    ];

    // Base PM Routine
    const pm: RoutineStep[] = [
      { id: 'pm1', name: 'Deep Oil Cleanser', category: 'Cleanser', description: 'Break down sunscreen and makeup.', isCompleted: false },
    ];

    const details = SKIN_TYPE_DETAILS[type];
    
    // Custom steps based on type and ingredients
    details.ingredients.forEach((ing, i) => {
      const step: RoutineStep = {
        id: `spec${i}`,
        name: ing.name,
        category: 'Treatment',
        description: ing.benefit,
        isCompleted: false
      };
      
      const freq = ing.frequency.toLowerCase();
      if (freq.includes('morning') || freq.includes('daily')) {
        am.push({ ...step, id: `am-${step.id}` });
      }
      if (freq.includes('nightly') || freq.includes('daily') || freq.includes('weekly')) {
        pm.push({ ...step, id: `pm-${step.id}` });
      }
    });

    // Add finishing steps
    am.push({ id: 'am-moist', name: 'Hydrating Day Cream', category: 'Moisturizer', description: 'Seal in moisture.', isCompleted: false });
    am.push({ id: 'am-spf', name: 'SPF 50 Protection', category: 'Protection', description: 'Essential protection from UV rays.', isCompleted: false });
    
    pm.push({ id: 'pm-moist', name: 'Barrier Repair Night Cream', category: 'Moisturizer', description: 'Overnight recovery and nutrition.', isCompleted: false });

    return { am, pm };
  };

  const handleTypeSelect = (type: SkinType) => {
    const routines = generateRoutine(type);
    setProfile({
      skinType: type,
      concerns: [], // Removed as we no longer scan for visual markers
      lastAnalysisDate: new Date().toLocaleDateString(),
      amRoutine: routines.am,
      pmRoutine: routines.pm
    });
    setActiveTab('home');
  };

  const toggleRoutineStep = (id: string, timeOfDay: 'am' | 'pm') => {
    setProfile(prev => {
      const routineKey = timeOfDay === 'am' ? 'amRoutine' : 'pmRoutine';
      const newRoutine = prev[routineKey].map(step => 
        step.id === id ? { ...step, isCompleted: !step.isCompleted } : step
      );
      return { ...prev, [routineKey]: newRoutine };
    });
  };

  const resetProfile = () => {
    setProfile({
      skinType: null,
      concerns: [],
      lastAnalysisDate: null,
      amRoutine: [],
      pmRoutine: []
    });
  };

  const renderContent = () => {
    if (!profile.skinType && activeTab !== 'info') {
      return <SkinTypeSelector onSelect={handleTypeSelect} />;
    }

    switch (activeTab) {
      case 'home':
        return (
          <Dashboard 
            profile={profile} 
            onNavigateToScan={() => resetProfile()} // Reusing this to trigger a reset/re-select
            onNavigateToRoutine={() => setActiveTab('routine')}
          />
        );
      case 'routine':
        return (
          <RoutineTracker 
            amSteps={profile.amRoutine} 
            pmSteps={profile.pmRoutine} 
            onToggleStep={toggleRoutineStep}
          />
        );
      case 'info':
        return (
          <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-serif text-slate-900 mb-6">Skin Education</h2>
            <div className="space-y-4">
              {Object.entries(SKIN_TYPE_DETAILS).map(([type, detail]) => (
                <div key={type} className={`p-6 rounded-[2rem] border border-black/5 ${detail.color}`}>
                  <div className="flex items-center space-x-3 mb-2">
                    {detail.icon}
                    <h4 className="font-bold text-lg">{type}</h4>
                  </div>
                  <p className="text-sm opacity-80 leading-relaxed">{detail.description}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={resetProfile}
              className="w-full mt-8 py-4 text-rose-500 font-bold border-2 border-rose-100 rounded-2xl hover:bg-rose-50 transition-colors"
            >
              Update My Skin Profile
            </button>
          </div>
        );
      default:
        return <Dashboard profile={profile} onNavigateToScan={resetProfile} onNavigateToRoutine={() => setActiveTab('routine')} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
