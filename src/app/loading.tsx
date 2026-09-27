import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
      <Loader2 className="w-12 h-12 text-[#ccff00] animate-spin mb-4" />
      <h2 className="text-xl font-bold font-oswald uppercase tracking-widest text-white animate-pulse">
        Loading Workouts...
      </h2>
    </div>
  );
}
