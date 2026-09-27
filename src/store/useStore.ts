import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Workout {
  id: string;
  name: string;
  category: string;
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
  imageUrl: string;
  description?: string;
  difficulty?: string;
  sets?: number;
  reps?: string;
  instructions?: string[];
}

interface State {
  planWorkouts: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  saveForLater: (workout: Workout) => void;
  removeFromSaved: (id: string) => void;
  markAsDone: (id: string) => void;
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      planWorkouts: [],
      savedWorkouts: [],
      addToPlan: (workout) => {
        const { planWorkouts } = get();
        if (planWorkouts.length >= 5) {
          throw new Error("Plan is full (max 5)");
        }
        if (!planWorkouts.some(w => w.id === workout.id)) {
          set({ planWorkouts: [...planWorkouts, workout] });
        }
      },
      removeFromPlan: (id) =>
        set((state) => ({ planWorkouts: state.planWorkouts.filter(w => w.id !== id) })),
      saveForLater: (workout) =>
        set((state) => {
          if (!state.savedWorkouts.some(w => w.id === workout.id)) {
            return { savedWorkouts: [...state.savedWorkouts, workout] };
          }
          return state;
        }),
      removeFromSaved: (id) =>
        set((state) => ({ savedWorkouts: state.savedWorkouts.filter(w => w.id !== id) })),
      markAsDone: (id) =>
        set((state) => ({ planWorkouts: state.planWorkouts.filter(w => w.id !== id) })),
    }),
    {
      name: 'fitlog-storage',
    }
  )
);
