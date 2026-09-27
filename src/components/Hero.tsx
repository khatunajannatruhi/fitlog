import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#333333]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 flex flex-col items-start space-y-6">
            <div className="inline-block bg-[#1a1a1a] border border-[#333333] px-3 py-1 rounded-full">
              <span className="text-[#ccff00] text-sm font-bold tracking-widest uppercase">
                Workout Library
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-oswald uppercase leading-[1.1] tracking-tight text-white">
              Train with intent.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-green-400">
                Log every set.
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              FitLog is a dark, no-nonsense gym companion. Pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <Link 
              href="#library" 
              className="inline-flex items-center justify-center bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold uppercase tracking-wider px-8 py-4 rounded-md transition-all group mt-4"
            >
              Browse Workouts
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="order-1 lg:order-2 relative aspect-square lg:aspect-auto lg:h-[500px] w-full max-w-md mx-auto lg:max-w-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ccff00]/20 to-transparent rounded-2xl blur-3xl -z-10 transform rotate-6"></div>
            <Image
              src="/assets/banner.png"
              alt="Gym Athlete"
              fill
              className="object-cover rounded-2xl border border-[#333333] shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
