import React from 'react';

interface GlossarioTooltipProps {
  term: string;
  definition: string;
}

const GlossarioTooltip: React.FC<GlossarioTooltipProps> = ({ term, definition }) => (
  <span className="relative group cursor-help text-primary-700 underline decoration-dotted">
    {term}
    <span className="absolute left-1/2 z-10 hidden w-64 -translate-x-1/2 rounded bg-white p-2 text-xs text-gray-800 shadow-lg group-hover:block border border-gray-200">
      {definition}
    </span>
  </span>
);

export default GlossarioTooltip;
