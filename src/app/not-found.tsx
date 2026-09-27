import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-9xl font-black font-oswald text-[#333333] mb-4">404</h1>
      <h2 className="text-3xl font-bold uppercase tracking-wider text-white mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-400 max-w-md mb-8">
        The lift you&apos;re looking for doesn&apos;t exist. Maybe you typed the URL wrong, or maybe we reracked those plates.
      </p>
      <Link 
        href="/"
        className="inline-flex items-center justify-center bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold uppercase tracking-wider px-6 py-3 rounded-md transition-colors"
      >
        <Home className="w-5 h-5 mr-2" />
        Back to Library
      </Link>
    </div>
  );
}
