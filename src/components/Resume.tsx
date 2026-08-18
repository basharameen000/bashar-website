import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { education, experience, skills } from '../data/content';

export default function Resume() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((i) => (i + 1) % experience.length);
  const prev = () => setActiveIndex((i) => (i - 1 + experience.length) % experience.length);

  return (
    <section id="resume" className="relative overflow-hidden bg-white dark:bg-slate-950 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-emerald-100/40 dark:bg-emerald-900/20 blur-3xl" />
        <div className="absolute -left-40 bottom-20 h-96 w-96 rounded-full bg-rose-100/30 dark:bg-rose-900/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">السيرة الذاتية</p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">المسيرة والخبرات</h2>
          </div>
          <button
            onClick={() => alert('سيتم إضافة رابط تحميل السيرة الذاتية قريبًا')}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 hover:shadow-emerald-700/40"
          >
            <Download className="h-4 w-4" />
            تحميل السيرة الذاتية
          </button>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white dark:bg-emerald-500">
              <Briefcase className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">الخبرات المهنية</h3>
            <span className="mr-auto text-sm text-slate-400 dark:text-slate-500">
              {activeIndex + 1} / {experience.length}
            </span>
          </div>

          <div className="relative" style={{ perspective: '1200px' }}>
            {/* Timeline Track */}
            <div className="relative mx-auto mb-8 flex max-w-3xl items-center justify-between">
              <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-emerald-100 dark:bg-emerald-900/30" />
              <div
                className="absolute right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${(activeIndex / (experience.length - 1)) * 100}%` }}
              />
              {experience.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 transition-all duration-500 ${
                    i === activeIndex
                      ? 'border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-110 dark:border-emerald-400 dark:bg-emerald-500'
                      : i < activeIndex
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : 'border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-emerald-300 dark:text-slate-500 hover:border-emerald-300 dark:hover:border-slate-600'
                  }`}
                >
                  <span className="text-xs font-bold">{experience.length - i}</span>
                </motion.button>
              ))}
            </div>

            {/* Cards Stack */}
            <div className="relative mx-auto max-w-3xl" style={{ perspective: '1200px' }}>
              {experience.map((item, i) => {
                const offset = i - activeIndex;
                const isActive = i === activeIndex;
                const isPrev = offset < 0;

                return (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{
                      rotateY: isActive ? 0 : isPrev ? -35 : 35,
                      x: isActive ? 0 : isPrev ? -120 : 120,
                      z: isActive ? 0 : isPrev ? -100 : -100,
                      scale: isActive ? 1 : 0.85,
                      opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 120, damping: 18 }}
                    className={`${isActive ? 'relative z-20' : 'absolute inset-0 z-10'} rounded-3xl border bg-white dark:bg-slate-800 p-7 shadow-lg`}
                    style={{
                      transformStyle: 'preserve-3d',
                      borderColor: isActive ? '#10b981' : '#d1fae5 dark:#314155',
                      boxShadow: isActive
                        ? '0 25px 50px -12px rgba(16, 185, 129, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.1)'
                        : '0 10px 30px -10px rgba(0,0,0,0.1)',
                    }}
                  >
                    <motion.div
                      layoutId="experienceBadge"
                      className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-4 py-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Briefcase className="h-4 w-4" />
                      {item.period}
                    </motion.div>
                    <motion.h4
                      className="mb-2 text-xl font-bold text-slate-900 dark:text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {item.role}
                    </motion.h4>
                    <motion.p
                      className="mb-4 text-base font-semibold text-emerald-600 dark:text-emerald-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {item.org}
                    </motion.p>
                    <motion.p
                      className="text-sm leading-7 text-slate-500 dark:text-slate-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {item.desc}
                    </motion.p>
                    {isActive && (
                      <motion.div
                        layoutId="activeBar"
                        className="absolute bottom-0 left-0 right-0 h-1.5 rounded-b-3xl bg-gradient-to-r from-emerald-500 to-teal-400"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-emerald-600 dark:text-slate-300 shadow-sm transition hover:border-emerald-400 hover:text-emerald-800 hover:shadow-md"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
              <div className="flex gap-2">
                {experience.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    whileHover={{ scale: 1.2 }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'w-8 bg-emerald-500' : 'w-2.5 bg-emerald-200 dark:bg-slate-600 hover:bg-emerald-300'
                    }`}
                  />
                ))}
              </div>
              <motion.button
                onClick={next}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-emerald-600 dark:text-slate-300 shadow-sm transition hover:border-emerald-400 hover:text-emerald-800 hover:shadow-md"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Education + Skills */}
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-emerald-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-white dark:bg-rose-600">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">التعليم والشهادات</h3>
            </div>
            <div className="space-y-4">
              {education.map((item) => (
                <motion.div
                  key={item.degree}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl bg-rose-50/70 dark:bg-rose-900/20 p-4"
                >
                  <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">{item.period}</p>
                  <h4 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{item.degree}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.school}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-emerald-100 dark:border-slate-700 bg-gradient-to-br from-emerald-700 to-emerald-900 p-6 text-white"
          >
            <div className="mb-5 flex items-center gap-3">
              <Award className="h-6 w-6 text-emerald-200" />
              <h3 className="text-lg font-bold">المهارات الأساسية</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm backdrop-blur transition"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
