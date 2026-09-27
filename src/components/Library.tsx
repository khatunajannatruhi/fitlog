'use client';
import { useState } from 'react';
import WorkoutCard from './WorkoutCard';
import { Workout } from '@/store/useStore';
import { ChevronDown } from 'lucide-react';

interface Props {
  initialWorkouts: Workout[];
}

type SortOption = 'Duration' | 'Calories' | 'Rating';

export default function Library({ initialWorkouts }: Props) {
  const [sortOption, setSortOption] = useState<SortOption>('Duration');
  const [isOpen, setIsOpen] = useState(false);

  const sortedWorkouts = [...initialWorkouts].sort((a, b) => {
    if (sortOption === 'Duration') {
      return b.duration - a.duration;
    } else if (sortOption === 'Calories') {
      return b.calories - a.calories;
    } else if (sortOption === 'Rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <section id="library" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl font-bold font-oswald uppercase tracking-wide mb-2 text-white">The Library</h2>
          <p className="text-gray-400 text-lg">Twelve lifts covering every major muscle group.</p>
        </div>
        
        {/* Sort Dropdown - Challenge C1 */}
        <div className="mt-6 md:mt-0 relative z-20">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Sort By:</span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#171717] border border-[#333333] hover:border-gray-500 text-white px-4 py-2 rounded-md flex items-center justify-between min-w-[140px] transition-colors"
            >
              <span>{sortOption}</span>
              <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
            </button>
          </div>
          
          {isOpen && (
            <div className="absolute right-0 mt-2 w-[140px] bg-[#171717] border border-[#333333] rounded-md shadow-lg overflow-hidden">
              {(['Duration', 'Calories', 'Rating'] as SortOption[]).map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortOption(option);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[#262626] transition-colors ${
                    sortOption === option ? 'text-[#ccff00]' : 'text-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}
