import Hero from '@/components/Hero';
import Library from '@/components/Library';
import { Workout } from '@/store/useStore';

async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
    cache: 'force-cache'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch workouts');
  }

  const data = await res.json();
  return data.map((item: any) => ({
    id: item.id.toString(),
    name: item.name,
    category: item.muscleGroups ? item.muscleGroups[0] : 'General',
    equipment: item.equipment,
    duration: item.duration,
    calories: item.caloriesBurned,
    rating: item.rating,
    imageUrl: item.image,
    description: item.description,
    difficulty: item.difficulty,
    sets: item.sets,
    reps: item.reps,
    instructions: item.instructions
  }));
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
