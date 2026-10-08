import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Download, ExternalLink, Sparkles } from 'lucide-react';

interface MediaLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category?: string;
  description?: string;
  images: string[];
  pdfUrl?: string;
  projectUrl?: string;
}

export const MediaLightbox: React.FC<MediaLightboxProps> = ({
  isOpen,
  onClose,
  title,
  category,
  description,
  images = [],
  pdfUrl,
  projectUrl,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const currentImage = images[currentIndex] || images[0];

  const handleNext = () => {
    if (images.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (images.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/85 backdrop-blur-xl">
        {/* Overlay backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
            <div>
              {category && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 mb-1">
                  <Sparkles className="w-3 h-3" />
                  {category}
                </span>
              )}
              <h3 className="text-lg font-bold text-white line-clamp-1">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-full transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Media Viewport */}
          <div className="relative flex-1 min-h-[300px] md:min-h-[420px] bg-black/60 flex items-center justify-center p-4">
            {currentImage ? (
              <img
                src={currentImage}
                alt={title}
                className="max-h-[60vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
              />
            ) : (
              <div className="text-center p-8 text-slate-400">
                <p>لا تتوفر معاينة صور أصلية حالياً لهذا المورد</p>
              </div>
            )}

            {/* Navigation Arrows for Gallery */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute right-4 p-3 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full border border-slate-700/50 shadow-lg transition-transform active:scale-95"
                  aria-label="الصورة السابقة"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute left-4 p-3 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full border border-slate-700/50 shadow-lg transition-transform active:scale-95"
                  aria-label="الصورة التالية"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Thumbnails indicator */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-700/50 rounded-full">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentIndex ? 'bg-emerald-400 w-6' : 'bg-slate-600 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer description & Actions */}
          <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1">
              {description && <p className="text-slate-300 text-sm leading-relaxed">{description}</p>}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-emerald-600/25"
                >
                  <Download className="w-4 h-4" />
                  تحميل الوثيقة / الشهادة
                </a>
              )}
              {projectUrl && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm rounded-xl border border-slate-700 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  رابط المشروع
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MediaLightbox;
