import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Sparkles, Download } from 'lucide-react';
import { profile } from '../data/content';
import ThreeDScene from './ThreeDScene';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-20">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <ThreeDScene />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900/95 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/95" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-5 py-16 md:flex-row md:px-8 md:py-24">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center md:text-right"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-emerald-300 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            <span>{profile.title}</span>
          </div>

          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
            {profile.name}
          </h1>

          <p className="mb-4 text-lg font-medium text-emerald-300 md:text-xl">
            {profile.tagline}
          </p>

          <p className="mb-6 max-w-lg text-sm leading-7 text-slate-300 md:text-base">
            {profile.bio}
          </p>

          <div className="mb-8 flex items-center justify-center gap-2 text-sm text-slate-400 md:justify-start">
            <MapPin className="h-4 w-4 text-emerald-400" />
            <span>{profile.location}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              href="#projects"
              className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 hover:shadow-emerald-500/40 hover:scale-105"
            >
              استكشف مشاريعي
            </a>
            <a
              href="#resume"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20 hover:scale-105"
            >
              <Download className="h-4 w-4" />
              تحميل السيرة الذاتية
            </a>
          </div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative w-full max-w-sm flex-shrink-0"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-emerald-500/30 to-emerald-700/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 shadow-2xl">
            <img
              src="/uploads/bashar-profile.jpg"
              alt={profile.name}
              className="aspect-[3/4] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 to-transparent p-5">
              <p className="text-xs text-emerald-300">باحث · مدرب · ناشط بيئي</p>
              <p className="text-base font-bold text-white">نبني الأمل من الجذور</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-3 px-5 pb-16 md:grid-cols-4 md:px-8">
        {profile.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur hover:bg-white/15 hover:border-white/20 transition-all duration-300"
          >
            <div className="text-2xl font-extrabold text-white md:text-3xl">{stat.value}</div>
            <div className="mt-1 text-xs text-slate-300">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-slate-400 transition hover:text-emerald-400"
      >
        <span className="text-[10px] font-medium">المزيد</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
