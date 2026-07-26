import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-0.5 md:gap-2 px-2 py-1 md:px-5 md:py-3 text-[11px] md:text-base font-medium rounded-full bg-white md:bg-white/5 border border-gray-300 md:border-white/10 text-gray-900 md:text-white shadow-sm md:shadow-none hover:bg-gray-100 md:hover:bg-cyan-500/20 md:hover:border-cyan-400 transition-all"
    >
      <ArrowLeft className="w-3 h-3 md:w-[18px] md:h-[18px]" />
      <span>Back Home</span>
    </Link>
  );
}