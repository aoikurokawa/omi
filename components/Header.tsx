import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111] border-b border-gray-800">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-white text-xl font-bold hover:text-gray-300 transition-colors"
        >
          OMI Stake
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/docs"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Docs
          </Link>
        </div>
      </nav>
    </header>
  );
}
