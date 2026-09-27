'use client';

import { useStore } from '@/store/useStore';
import { useHydrated } from '@/store/useStoreHydration';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Check, X, Clock, Flame, Star, Activity, Loader2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MyPlanClient() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'saved' ? 'saved' : 'plan';
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const isHydrated = useHydrated();

  const { planWorkouts, savedWorkouts, removeFromPlan, removeFromSaved, markAsDone } = useStore();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'saved' || tab === 'plan') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(tab);
    }
  }, [searchParams]);
  if (!isHydrated) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-12 h-12 text-[#ccff00] animate-spin mb-4" />
        <h2 className="text-xl font-bold font-oswald uppercase tracking-widest text-white animate-pulse">
          Loading Workouts...
        </h2>
      </div>
    );
  }

  const baseWorkouts = activeTab === 'plan' ? planWorkouts : savedWorkouts;
  const workouts = baseWorkouts.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    w.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalExercises = planWorkouts.length;
  const totalMinutes = planWorkouts.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = planWorkouts.reduce((acc, curr) => acc + curr.calories, 0);

  const handleMarkAsDone = (id: string) => {
    markAsDone(id);
    toast.success('Great job! Workout marked as done.', {
      icon: '🏆',
      style: { borderRadius: '10px', background: '#333', color: '#fff' },
    });
  };

  const handleRemove = (id: string) => {
    if (activeTab === 'plan') {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
    toast.success('Workout removed', {
      icon: '🗑️',
      style: { borderRadius: '10px', background: '#333', color: '#fff' },
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black font-oswald uppercase tracking-wide text-white mb-2">
          My Plan
        </h1>
        <p className="text-gray-400 text-lg">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-[#171717] border border-[#333333] rounded-xl p-6 flex items-center">
          <div className="bg-[#262626] p-3 rounded-lg mr-4">
            <Activity className="w-6 h-6 text-[#ccff00]" />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase">Exercises</p>
            <p className="text-3xl font-black font-oswald text-white">{totalExercises}<span className="text-lg text-gray-500 font-sans ml-1">/ 5</span></p>
          </div>
        </div>
        <div className="bg-[#171717] border border-[#333333] rounded-xl p-6 flex items-center">
          <div className="bg-[#262626] p-3 rounded-lg mr-4">
            <Clock className="w-6 h-6 text-[#ccff00]" />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase">Minutes</p>
            <p className="text-3xl font-black font-oswald text-white">{totalMinutes}</p>
          </div>
        </div>
        <div className="bg-[#171717] border border-[#333333] rounded-xl p-6 flex items-center">
          <div className="bg-[#262626] p-3 rounded-lg mr-4">
            <Flame className="w-6 h-6 text-[#ccff00]" />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-bold uppercase">Calories</p>
            <p className="text-3xl font-black font-oswald text-white">{totalCalories}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#333333] mb-8 pb-4 sm:pb-0 space-y-4 sm:space-y-0 gap-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-4 sm:px-6 py-3 font-bold uppercase tracking-wider text-sm transition-colors border-b-2 sm:translate-y-[2px] ${
              activeTab === 'plan' ? 'border-[#ccff00] text-[#ccff00]' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Today&apos;s Plan ({planWorkouts.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 sm:px-6 py-3 font-bold uppercase tracking-wider text-sm transition-colors border-b-2 sm:translate-y-[2px] ${
              activeTab === 'saved' ? 'border-[#ccff00] text-[#ccff00]' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Saved ({savedWorkouts.length})
          </button>
        </div>
        
        <div className="relative w-full sm:w-64 pb-2 sm:pb-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none sm:pb-2">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search workouts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-[#333333] rounded-md leading-5 bg-[#171717] text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] sm:text-sm transition-colors"
          />
        </div>
      </div>

      {workouts.length === 0 ? (
        <div className="bg-[#171717] border border-[#333333] border-dashed rounded-xl p-12 text-center flex flex-col items-center">
          <h3 className="text-2xl font-black font-oswald text-gray-300 uppercase mb-2">Nothing Here Yet</h3>
          <p className="text-gray-500 mb-6">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="bg-white hover:bg-gray-200 text-black font-bold uppercase px-6 py-3 rounded-md transition-colors">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {workouts.map(workout => (
            <div key={workout.id} className="bg-[#171717] border border-[#333333] rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center transition-all hover:border-gray-500">
              <div className="relative w-full md:w-32 h-32 md:h-24 bg-[#262626] rounded-lg overflow-hidden shrink-0">
                <Image src={workout.imageUrl} alt={workout.name} fill className="object-cover" />
              </div>
              <div className="flex-grow text-center md:text-left w-full">
                <h4 className="text-lg font-bold font-oswald uppercase text-white leading-tight">{workout.name}</h4>
                <p className="text-sm text-gray-400 mb-2">{workout.equipment}</p>
                <div className="flex items-center justify-center md:justify-start space-x-4 text-xs text-gray-300">
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1 text-[#ccff00]" /> {workout.duration} min</span>
                  <span className="flex items-center"><Flame className="w-3 h-3 mr-1 text-[#ccff00]" /> {workout.calories} kcal</span>
                  <span className="flex items-center"><Star className="w-3 h-3 mr-1 text-[#ccff00]" /> {workout.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap md:flex-nowrap gap-2 w-full md:w-auto mt-4 md:mt-0 justify-center">
                <Link href={`/workout/${workout.id}`} className="bg-[#262626] hover:bg-[#333333] text-white px-4 py-2 rounded-md text-sm font-bold uppercase transition-colors shrink-0">
                  View Details
                </Link>
                {activeTab === 'plan' && (
                  <button onClick={() => handleMarkAsDone(workout.id)} className="bg-[#ccff00] hover:bg-[#b3e600] text-black px-4 py-2 rounded-md text-sm font-bold uppercase transition-colors shrink-0 flex items-center">
                    <Check className="w-4 h-4 mr-1" /> Done
                  </button>
                )}
                <button onClick={() => handleRemove(workout.id)} className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md transition-colors shrink-0 flex items-center justify-center">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
