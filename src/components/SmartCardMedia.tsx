import React, { useState, useEffect } from 'react';
import { LucideIcon, Maximize2 } from 'lucide-react';
import MediaFallback from './MediaFallback';

interface SmartCardMediaProps {
  src?: string;
  alt: string;
  title: string;
  category?: string;
  icon?: LucideIcon;
  colorScheme?: 'emerald' | 'indigo' | 'amber' | 'sky';
  subtitle?: string;
  onClick?: () => void;
  className?: string;
}

export const SmartCardMedia: React.FC<SmartCardMediaProps> = ({
  src,
  alt,
  title,
  category,
  icon,
  colorScheme = 'emerald',
  subtitle,
  onClick,
  className = '',
}) => {
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);

  // Generate candidate file paths to handle hidden Windows extension issues (.jpg.jpg, .jpeg, .png, etc.)
  const candidateSrcs = React.useMemo(() => {
    if (!src) return [];
    const base = src.replace(/\.(jpg|jpeg|png|webp)$/i, '');
    return [
      src,
      `${src}.jpg`,
      `${base}.jpg`,
      `${base}.jpeg`,
      `${base}.png`,
      `${base}.JPG`,
      `${base}.PNG`,
      `${base}.JPEG`,
    ];
  }, [src]);

  useEffect(() => {
    setCurrentSrcIndex(0);
    setHasFailedAll(false);
  }, [src]);

  const activeSrc = candidateSrcs[currentSrcIndex];

  const handleError = () => {
    if (currentSrcIndex < candidateSrcs.length - 1) {
      setCurrentSrcIndex((prev) => prev + 1);
    } else {
      setHasFailedAll(true);
    }
  };

  // If no image provided or image failed all extensions, show MediaFallback cover
  if (!src || hasFailedAll || !activeSrc) {
    return (
      <div className={`w-full h-full ${className}`}>
        <MediaFallback
          title={title}
          category={category}
          icon={icon}
          colorScheme={colorScheme}
          subtitle={subtitle}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full cursor-pointer bg-slate-950 flex items-center justify-center group overflow-hidden ${className}`}
      onClick={onClick}
    >
      {/* Blurred background for full ratio fill */}
      <img
        src={activeSrc}
        alt=""
        onError={handleError}
        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110"
      />
      {/* Main Image maintaining natural square / portrait / landscape aspect ratio */}
      <img
        src={activeSrc}
        alt={alt}
        onError={handleError}
        className="relative z-10 max-h-full max-w-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

      {onClick && (
        <button
          className="absolute bottom-3 left-3 z-30 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full backdrop-blur-md border border-slate-700/60 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
          title="تكبير ومعاينة الصورة"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SmartCardMedia;
