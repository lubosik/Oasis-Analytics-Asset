import { type ReactNode } from "react";

interface CalloutStripProps {
  children: ReactNode;
  className?: string;
}

/**
 * Visible callout strip for key context - replaces hidden info icons.
 * Uses subtle yellow highlight style as requested.
 */
export function CalloutStrip({ children, className = "" }: CalloutStripProps) {
  return (
    <div
      className={`bg-yellow-50 border-l-4 border-yellow-400 px-3 sm:px-4 py-2 sm:py-2.5 rounded-r-md ${className}`}
    >
      <p className="text-xs sm:text-sm md:text-base text-gray-800 leading-relaxed">
        {children}
      </p>
    </div>
  );
}

