'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useStore } from '@/store/useStore';
import { useHydrated } from '@/store/useStoreHydration';

export default function Navbar() {
  const pathname = usePathname();
  const planCount = useStore((state) => state.planWorkouts.length);
  const savedCount = useStore((state) => state.savedWorkouts.length);
  const isHydrated = useHydrated();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#333333] bg-[#0a0a0a] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={40}
              height={40}
              className="object-contain cursor-pointer"
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8 font-medium">
          <Link
            href="/"
            className={`${
              pathname === '/' ? 'text-[#ccff00]' : 'text-gray-300 hover:text-white'
            } transition-colors uppercase`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`${
              pathname === '/my-plan' ? 'text-[#ccff00]' : 'text-gray-300 hover:text-white'
            } transition-colors uppercase`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/my-plan?tab=plan" className="flex items-center">
            <div className="flex items-center bg-[#ccff00] text-black px-3 py-1 rounded-full font-bold text-sm">
              <span className="hidden sm:inline mr-2">Plan</span>
              <span>{isHydrated ? planCount : 0}</span>
            </div>
          </Link>
          <Link href="/my-plan?tab=saved" className="flex items-center">
            <div className="flex items-center border border-gray-500 text-gray-300 hover:border-gray-300 px-3 py-1 rounded-full font-bold text-sm transition-colors">
              <span className="hidden sm:inline mr-2">Saved</span>
              <span>{isHydrated ? savedCount : 0}</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
