import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Building2,
  BarChart3,
  FolderKanban,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  MapPin,
  Building,
  Layers,
} from 'lucide-react';
import { groupedTrainings } from '../data/content';

const tabMeta = [
  { key: 'البيئة والمناخ', label: 'البيئة والمناخ', icon: Leaf, color: 'emerald' },
  { key: 'الحوكمة والقيادة', label: 'الحوكمة والقيادة', icon: Building2, color: 'indigo' },
  { key: 'المهارات والتمكين', label: 'المهارات والتمكين', icon: BarChart3, color: 'amber' },
  { key: 'المشاريع المجتمعية', label: 'المشاريع المجتمعية', icon: FolderKanban, color: 'sky' },
];

const colorMap: Record<string, { active: string; bg: string; text: string; border: string; shadow: string; light: string; bar: string; darkBg: string; darkText: string; darkBorder: string; darkLight: string }> = {
  emerald: {
    active: 'border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-110',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    shadow: 'shadow-emerald-500/25',
    light: 'bg-emerald-100',
    bar: 'from-emerald-500 to-teal-400',
    darkBg: 'dark:bg-emerald-900/20',
    darkText: 'dark:text-emerald-300',
    darkBorder: 'dark:border-emerald-700',
    darkLight: 'dark:bg-emerald-900/30',
  },
  indigo: {
    active: 'border-indigo-500 bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    shadow: 'shadow-indigo-500/25',
    light: 'bg-indigo-100',
    bar: 'from-indigo-500 to-violet-400',
    darkBg: 'dark:bg-indigo-900/20',
    darkText: 'dark:text-indigo-300',
    darkBorder: 'dark:border-indigo-700',
    darkLight: 'dark:bg-indigo-900/30',
  },
  amber: {
    active: 'border-amber-500 bg-amber-600 text-white shadow-lg shadow-amber-500/30 scale-110',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    shadow: 'shadow-amber-500/25',
    light: 'bg-amber-100',
    bar: 'from-amber-500 to-orange-400',
    darkBg: 'dark:bg-amber-900/20',
    darkText: 'dark:text-amber-300',
    darkBorder: 'dark:border-amber-700',
    darkLight: 'dark:bg-amber-900/30',
  },
  sky: {
    active: 'border-sky-500 bg-sky-600 text-white shadow-lg shadow-sky-500/30 scale-110',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
    shadow: 'shadow-sky-500/25',
    light: 'bg-sky-100',
    bar: 'from-sky-500 to-cyan-400',
    darkBg: 'dark:bg-sky-900/20',
    darkText: 'dark:text-sky-300',
    darkBorder: 'dark:border-sky-700',
    darkLight: 'dark:bg-sky-900/30',
  },
};

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentTab = tabMeta[activeTab];
  const currentColor = colorMap[currentTab.color];
  const currentColorKey = currentTab.color;

  const items = useMemo(() => {
    return groupedTrainings.filter((t) => t.group === currentTab.key);
  }, [currentTab.key]);

  // Reset index when tab changes
  const handleTabChange = (i: number) => {
    setActiveTab(i);
    setActiveIndex(0);
  };

  const next = () => setActiveIndex((i) => (i + 1) % items.length);
  const prev = () => setActiveIndex((i) => (i - 1 + items.length) % items.length);

  // Determine color prefix for dynamic classes based on active category
  const colorPrefix = useMemo(() => {
    switch (currentColorKey) {
      case 'emerald': return 'emerald';
      case 'indigo': return 'indigo';
      case 'amber': return 'amber';
      case 'sky': return 'sky';
      default: return 'emerald';
    }
  }, [currentColorKey]);

  return (
    <section id="projects" className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 py-20 md:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute -right-40 top-20 h-96 w-96 rounded-full ${currentColor.bg}/40 ${currentColor.darkBg} blur-3xl`} />
        <div className={`absolute -left-40 bottom-20 h-96 w-96 rounded-full ${colorPrefix === 'emerald' ? 'bg-sky-100/30 dark:bg-sky-900/20' : colorPrefix === 'indigo' ? 'bg-pink-100/30 dark:bg-pink-900/20' : colorPrefix === 'amber' ? 'bg-rose-100/30 dark:bg-rose-900/20' : 'bg-emerald-100/30 dark:bg-emerald-900/20'} blur-3xl`} />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className={`mb-3 inline-flex items-center gap-2 rounded-full ${currentColor.bg} ${currentColor.darkBg} px-4 py-1.5 text-sm font-bold ${currentColor.text} ${currentColor.darkText}`}>
            <Layers className="h-4 w-4" />
            <span>المشاريع والتدريبات</span>
          </div>
          <h2 className="mb-4 text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">رحلة العمل الميداني</h2>
          <p className="max-w-2xl text-base leading-8 text-slate-500 dark:text-slate-400">
            أدناه التدريبات والورش المنفذة مصنفة حسب المجال، بأكثر من 24 تدريبًا في خمس محافظات يمنية.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex flex-wrap gap-3">
            {tabMeta.map((tab, i) => {
              const Icon = tab.icon;
              const isActive = i === activeTab;
              const cs = colorMap[tab.color];
              return (
                <motion.button
                  key={tab.key}
                  onClick={() => handleTabChange(i)}
                  whileHover={{ scale: isActive ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? `${cs.active}`
                      : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  <span
                    className={`ml-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {groupedTrainings.filter((t) => t.group === tab.key).length}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="certTab"
                      className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full ${cs.bar}`}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* 3D Timeline + Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {/* Timeline dots */}
            <div className="relative mx-auto mb-8 flex max-w-3xl items-center justify-between">
              <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div
                className={`absolute right-0 top-1/2 h-1 -translate-y-1/2 rounded-full transition-all duration-700 bg-${colorPrefix}-500`}
                style={{
                  width: items.length > 1 ? `${(activeIndex / (items.length - 1)) * 100}%` : '100%',
                }}
              />
              {items.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 transition-all duration-500 ${
                    i === activeIndex
                      ? currentColor.active
                      : i < activeIndex
                        ? `${currentColor.light} ${currentColor.darkLight} ${currentColor.text} ${currentColor.darkText} ${currentColor.border} ${currentColor.darkBorder}`
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <span className="text-xs font-bold">{items.length - i}</span>
                </motion.button>
              ))}
            </div>

            {/* 3D Cards Stack */}
            <div className="relative mx-auto max-w-3xl" style={{ perspective: '1200px' }}>
              {items.map((item, i) => {
                const offset = i - activeIndex;
                const isActive = i === activeIndex;
                const isPrev = offset < 0;

                return (
                  <motion.div
                    key={item.id}
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
                      borderColor: isActive ? '#10b981' : '#e2e8f0',
                      boxShadow: isActive
                        ? `0 25px 50px -12px ${currentColor.shadow.replace('shadow-', '').replace('/25', '40')}, 0 0 0 1px rgba(0,0,0,0.05)`
                        : '0 10px 30px -10px rgba(0,0,0,0.1)',
                    }}
                  >
                    {/* Date Badge */}
                <div className={`mb-4 inline-flex items-center gap-2 rounded-full ${currentColor.bg} ${currentColor.darkBg} px-4 py-1.5 text-sm font-bold ${currentColor.text} ${currentColor.darkText}`}>
                  <Calendar className="h-4 w-4" />
                  {item.date}
                </div>
                    <h4 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className={`mb-4 text-base font-semibold ${currentColor.text} ${currentColor.darkText}`}>{item.category}</p>

                    {/* Info Grid */}
                    <div className="mb-4 grid grid-cols-2 gap-3">
                      {item.participants && (
                        <div className="flex items-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-700 p-3">
                          <Users className="h-4 w-4 text-slate-400 dark:text-slate-300" />
                          <div>
                            <div className="text-xs text-slate-400 dark:text-slate-400">المشاركين</div>
                            <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.participants}</div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-700 p-3">
                        <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-300" />
                        <div>
                          <div className="text-xs text-slate-400 dark:text-slate-400">المجموعات</div>
                          <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.groups}</div>
                        </div>
                      </div>
                    </div>

                    {/* Audience */}
                    <div className="mb-3 rounded-xl bg-slate-50 dark:bg-slate-700 p-3">
                      <div className="mb-1 text-xs font-bold text-slate-600 dark:text-slate-300">الجهة المستهدفة</div>
                      <div className="text-sm text-slate-500 dark:text-slate-300">{item.audience}</div>
                    </div>

                    {/* Partners */}
                    <div className="flex items-start gap-2 rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-700 p-3">
                      <Building className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 dark:text-slate-300" />
                      <div>
                        <div className="mb-0.5 text-xs font-bold text-slate-600 dark:text-slate-300">الشركاء</div>
                        <div className="text-sm leading-5 text-slate-500 dark:text-slate-300">{item.partners}</div>
                      </div>
                    </div>

                    {/* Active indicator bar */}
                    {isActive && (
                      <motion.div
                        layoutId="projectActiveBar"
                        className={`absolute bottom-0 left-0 right-0 h-1.5 rounded-b-3xl bg-gradient-to-r ${currentColor.bar}`}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm transition hover:border-slate-300 hover:text-slate-800 hover:shadow-md"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    whileHover={{ scale: 1.2 }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? `w-8 bg-${colorPrefix}-500` : 'w-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
              <motion.button
                onClick={next}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm transition hover:border-slate-300 hover:text-slate-800 hover:shadow-md"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}