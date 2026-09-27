import Hero from '@/components/Hero';
import Library from '@/components/Library';
import { Workout } from '@/store/useStore';

async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
    // Next.js 15 uses caching by default or no-store depending on route, we can cache it.
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch workouts');
  }

  return res.json();
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Library initialWorkouts={workouts} />
    </div>
  );
}
