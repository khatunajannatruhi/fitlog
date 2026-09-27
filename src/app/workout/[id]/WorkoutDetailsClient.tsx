'use client';

import { Workout, useStore } from '@/store/useStore';
import { Bookmark, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useHydrated } from '@/store/useStoreHydration';

interface Props {
  workout: Workout;
}

export default function WorkoutDetailsClient({ workout }: Props) {
  const { addToPlan, saveForLater, planWorkouts, savedWorkouts } = useStore();
  const isHydrated = useHydrated();

  const handleAddToPlan = () => {
    try {
      addToPlan(workout);
      toast.success('Added to today\\'s plan', {
        icon: '💪',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error: any) {
      toast.error(error.message, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const handleSaveForLater = () => {
    saveForLater(workout);
    toast.success('Saved for later', {
      icon: '🔖',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const isInPlan = isHydrated && planWorkouts.some(w => w.id === workout.id);
  const isSaved = isHydrated && savedWorkouts.some(w => w.id === workout.id);
  const isPlanFull = isHydrated && planWorkouts.length >= 5;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-[#333333]">
      <button
        onClick={handleAddToPlan}
        disabled={isInPlan || (isPlanFull && !isInPlan)}
        className="flex-1 flex items-center justify-center bg-[#ccff00] hover:bg-[#b3e600] disabled:bg-[#5a661a] disabled:text-gray-400 disabled:cursor-not-allowed text-black font-bold uppercase tracking-wider px-6 py-4 rounded-md transition-colors"
      >
        <Plus className="w-5 h-5 mr-2" />
        {isInPlan ? 'In Today\\'s Plan' : 'Add to Today\\'s Plan'}
      </button>
      
      <button
        onClick={handleSaveForLater}
        disabled={isSaved}
        className="flex-1 flex items-center justify-center bg-transparent border-2 border-gray-600 hover:border-gray-400 disabled:border-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white font-bold uppercase tracking-wider px-6 py-4 rounded-md transition-colors"
      >
        <Bookmark className="w-5 h-5 mr-2" />
        {isSaved ? 'Saved' : 'Save for Later'}
      </button>
    </div>
  );
}
