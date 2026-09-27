import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#333333] py-8 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-3">
          <Image src="/assets/logo.png" alt="FitLog Logo" width={32} height={32} className="object-contain" />
          <span className="text-white font-bold tracking-wider uppercase">FitLog</span>
        </div>
        <p className="text-gray-400 text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
