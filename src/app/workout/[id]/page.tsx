import Image from 'next/image';
import { notFound } from 'next/navigation';
import WorkoutDetailsClient from './WorkoutDetailsClient';
import { Workout } from '@/store/useStore';

async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      cache: 'force-cache'
    });
    if (!res.ok) {
      return null;
    }
    const item = await res.json();
    return {
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
    };
  } catch (error) {
    return null;
  }
}

export default async function WorkoutDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const workout = await getWorkout(resolvedParams.id);

  if (!workout) {
    notFound();
  }

  const instructions = workout.instructions || [
    "Assume the correct starting position.",
    "Perform the movement with control.",
    "Breathe properly throughout the exercise.",
    "Return to the starting position and repeat."
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative w-full aspect-square lg:aspect-auto lg:h-[700px] bg-[#171717] rounded-2xl border border-[#333333] overflow-hidden shadow-2xl">
          <Image
            src={workout.imageUrl}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-black font-oswald uppercase tracking-wide text-white mb-4">
              {workout.name}
            </h1>
            <p className="text-xl text-gray-400 italic mb-6">
              {workout.description || "A solid compound movement for building strength and mass."}
            </p>
            <div className="flex gap-3">
              <span className="px-3 py-1 bg-[#333333] text-gray-200 text-sm font-bold uppercase tracking-wider rounded">
                {workout.category}
              </span>
            </div>
          </div>

          <div className="bg-[#171717] rounded-xl border border-[#333333] overflow-hidden mb-8">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-[#333333]">
                <tr>
                  <th className="px-4 py-3 text-gray-400 font-medium">EQUIPMENT</th>
                  <td className="px-4 py-3 text-white font-semibold">{workout.equipment}</td>
                </tr>
                <tr>
                  <th className="px-4 py-3 text-gray-400 font-medium">DIFFICULTY</th>
                  <td className="px-4 py-3 text-white font-semibold">{workout.difficulty || 'Intermediate'}</td>
                </tr>
                <tr>
                  <th className="px-4 py-3 text-gray-400 font-medium">SETS</th>
                  <td className="px-4 py-3 text-white font-semibold">{workout.sets || 4}</td>
                </tr>
                <tr>
                  <th className="px-4 py-3 text-gray-400 font-medium">REPS</th>
                  <td className="px-4 py-3 text-white font-semibold">{workout.reps || '8-12'}</td>
                </tr>
                <tr>
                  <th className="px-4 py-3 text-gray-400 font-medium">DURATION</th>
                  <td className="px-4 py-3 text-white font-semibold">{workout.duration} min</td>
                </tr>
                <tr>
                  <th className="px-4 py-3 text-gray-400 font-medium">CALORIES</th>
                  <td className="px-4 py-3 text-white font-semibold">{workout.calories} kcal</td>
                </tr>
                <tr>
                  <th className="px-4 py-3 text-gray-400 font-medium">RATING</th>
                  <td className="px-4 py-3 text-[#ccff00] font-semibold">{workout.rating} / 5.0</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-6 flex-grow">
            <h2 className="text-2xl font-bold font-oswald uppercase tracking-wider text-white mb-6">Instructions</h2>
            <ol className="space-y-4">
              {instructions.map((step, index) => (
                <li key={index} className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#333333] text-[#ccff00] font-bold mr-4">
                    {index + 1}
                  </span>
                  <p className="text-gray-300 pt-1 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <WorkoutDetailsClient workout={workout} />
        </div>
      </div>
    </div>
  );
}
