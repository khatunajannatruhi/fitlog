import Image from 'next/image';
import Link from 'next/link';
import { Clock, Flame, Star } from 'lucide-react';
import { Workout } from '@/store/useStore';

interface Props {
  workout: Workout;
}

export default function WorkoutCard({ workout }: Props) {
  return (
    <Link href={`/workout/${workout.id}`}>
      <div className="bg-[#171717] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#ccff00] transition-all cursor-pointer group flex flex-col h-full border border-[#333333]">
        <div className="relative w-full aspect-video bg-[#262626]">
          <Image
            src={workout.imageUrl}
            alt={workout.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider bg-[#333333] text-gray-300 px-2 py-1 rounded">
              {workout.category}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-1 uppercase leading-tight font-oswald text-white group-hover:text-[#ccff00] transition-colors">
            {workout.name}
          </h3>
          <p className="text-gray-400 text-sm mb-4 flex-grow">
            {workout.equipment}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-300 border-t border-[#333333] pt-4 mt-auto">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-[#ccff00]" />
              <span>{workout.duration} min</span>
            </div>
            <div className="flex items-center">
              <Flame className="w-4 h-4 mr-1 text-[#ccff00]" />
              <span>{workout.calories} kcal</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-[#ccff00]" />
              <span>{workout.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
