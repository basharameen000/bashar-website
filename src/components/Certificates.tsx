import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Leaf, GraduationCap, Calendar, MapPin, Building2 } from 'lucide-react';
import { totCertificates, climateCertificates, otherCourses } from '../data/certificates';

const tabs = [
  { key: 'tot', label: 'شهائد تدريب المدربين', icon: GraduationCap, data: totCertificates, color: 'indigo' },
  { key: 'climate', label: 'شهائد وتدريبات مناخية', icon: Leaf, data: climateCertificates, color: 'emerald' },
  { key: 'other', label: 'دورات تدريبية أخرى', icon: Award, data: otherCourses, color: 'amber' },
];

const colorMap: Record<string, { bar: string; badge: string; badgeText: string; light: string; darkBar: string; darkBadge: string; darkBadgeText: string; darkLight: string }> = {
  indigo: {
    bar: 'bg-indigo-500',
    badge: 'bg-indigo-100',
    badgeText: 'text-indigo-800',
    light: 'bg-indigo-50',
    darkBar: 'dark:bg-indigo-500',
    darkBadge: 'dark:bg-indigo-900/30',
    darkBadgeText: 'dark:text-indigo-300',
    darkLight: 'dark:bg-indigo-900/20',
  },
  emerald: {
    bar: 'bg-emerald-500',
    badge: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    light: 'bg-emerald-50',
    darkBar: 'dark:bg-emerald-500',
    darkBadge: 'dark:bg-emerald-900/30',
    darkBadgeText: 'dark:text-emerald-300',
    darkLight: 'dark:bg-emerald-900/20',
  },
  amber: {
    bar: 'bg-amber-500',
    badge: 'bg-amber-100',
    badgeText: 'text-amber-800',
    light: 'bg-amber-50',
    darkBar: 'dark:bg-amber-500',
    darkBadge: 'dark:bg-amber-900/30',
    darkBadgeText: 'dark:text-amber-300',
    darkLight: 'dark:bg-amber-900/20',
  },
};

export default function Certificates() {
  const [activeTab, setActiveTab] = useState('tot');
  const active = tabs.find((t) => t.key === activeTab)!;
  const cs = colorMap[active.color];

  return (
    <section id="certificates" className="relative overflow-hidden bg-white dark:bg-slate-950 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-indigo-50 dark:bg-indigo-900/20 blur-3xl" />
        <div className="absolute -left-32 bottom-20 h-72 w-72 rounded-full bg-emerald-50 dark:bg-emerald-900/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className={`mb-3 inline-flex items-center gap-2 rounded-full ${cs.light} ${cs.darkLight} px-4 py-1.5 text-sm font-bold ${cs.badgeText} ${cs.darkBadgeText}`}>
            <Award className="h-4 w-4" />
            <span>الشهائد والدورات</span>
          </div>
          <h2 className="mb-4 text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
            مسار التعليم و<span className="gradient-text">التأهيل</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-500 dark:text-slate-400">
            مجموعة من الشهائد والدورات التدريبية في مجالات الحوكمة والمناخ وإدارة المشاريع.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            const tcs = colorMap[tab.color];
            return (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                whileHover={{ scale: isActive ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? `${tcs.light} ${tcs.darkLight} ${tcs.badgeText} ${tcs.darkBadgeText} shadow-md ring-1 ${tcs.bar.replace('bg-', 'ring-')}`
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm ring-1 ring-slate-100 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                <span
                  className={`ml-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white dark:bg-slate-800' + ' ' + tcs.badgeText + ' ' + tcs.darkBadgeText : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tab.data.length}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="certTab"
                    className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full ${tcs.bar}`}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {active.data.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm transition-all duration-500 hover:shadow-xl"
              >
                {/* Accent border on hover */}
                <div className={`absolute left-0 top-0 h-full w-1 ${cs.bar} opacity-0 transition-opacity group-hover:opacity-100`} />
                <div className="mb-3 flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-lg ${cs.badge} ${cs.badgeText} ${cs.darkBadge} ${cs.darkBadgeText} px-2.5 py-1 text-xs font-bold`}>
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </span>
                </div>
                <h3 className="mb-3 text-sm font-bold leading-7 text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500 dark:text-emerald-400" />
                    <span>{item.org}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500 dark:text-emerald-400" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
