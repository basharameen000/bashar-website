import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';

interface MediaFallbackProps {
  title: string;
  category?: string;
  icon?: LucideIcon;
  colorScheme?: 'emerald' | 'indigo' | 'amber' | 'sky' | 'teal';
  subtitle?: string;
  className?: string;
}

const themeStyles = {
  emerald: {
    gradient: 'from-emerald-950 via-teal-900 to-emerald-800',
    accentGradient: 'from-emerald-500/20 to-teal-400/20',
    iconBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    patternColor: 'text-emerald-400/10',
  },
  indigo: {
    gradient: 'from-slate-950 via-indigo-950 to-slate-900',
    accentGradient: 'from-indigo-500/20 to-violet-400/20',
    iconBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    patternColor: 'text-indigo-400/10',
  },
  amber: {
    gradient: 'from-amber-950 via-orange-950 to-amber-900',
    accentGradient: 'from-amber-500/20 to-orange-400/20',
    iconBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    patternColor: 'text-amber-400/10',
  },
  sky: {
    gradient: 'from-slate-950 via-sky-950 to-cyan-900',
    accentGradient: 'from-sky-500/20 to-cyan-400/20',
    iconBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    patternColor: 'text-sky-400/10',
  },
  teal: {
    gradient: 'from-teal-950 via-emerald-950 to-cyan-900',
    accentGradient: 'from-teal-500/20 to-emerald-400/20',
    iconBg: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    badge: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
    patternColor: 'text-teal-400/10',
  },
};

export const MediaFallback: React.FC<MediaFallbackProps> = ({
  title,
  category,
  icon: Icon = Sparkles,
  colorScheme = 'emerald',
  subtitle,
  className = '',
}) => {
  const theme = themeStyles[colorScheme] || themeStyles.emerald;

  return (
    <div
      className={`relative overflow-hidden w-full h-full min-h-[180px] bg-gradient-to-br ${theme.gradient} p-6 flex flex-col justify-between select-none ${className}`}
    >
      {/* Dynamic Background Patterns */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className={`absolute -right-10 -top-10 w-48 h-48 rounded-full bg-gradient-to-br ${theme.accentGradient} blur-2xl`} />
        <div className={`absolute -left-10 -bottom-10 w-56 h-56 rounded-full bg-gradient-to-tl ${theme.accentGradient} blur-2xl`} />
        
        {/* Geometric Grid Pattern */}
        <svg
          className={`absolute inset-0 w-full h-full ${theme.patternColor}`}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
        >
          <defs>
            <pattern id={`grid-${title.length}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${title.length})`} />
        </svg>
      </div>

      {/* Top Header info */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        {category && (
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${theme.badge}`}>
            <Sparkles className="w-3 h-3" />
            {category}
          </span>
        )}
        <div className={`p-2.5 rounded-xl border backdrop-blur-md ${theme.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Center/Bottom Content */}
      <div className="relative z-10 mt-auto pt-4">
        <h4 className="text-white font-bold text-lg md:text-xl line-clamp-2 leading-tight drop-shadow-sm">
          {title}
        </h4>
        {subtitle && (
          <p className="text-white/70 text-xs md:text-sm mt-1 line-clamp-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default MediaFallback;
