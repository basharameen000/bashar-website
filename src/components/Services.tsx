import { motion } from 'framer-motion';
import { GraduationCap, ClipboardCheck, UsersRound, FolderKanban } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { services } from '../data/services';

const iconMap: Record<string, LucideIcon> = {
  GraduationCap: GraduationCap,
  ClipboardCheck: ClipboardCheck,
  UsersRound: UsersRound,
  FolderKanban: FolderKanban,
};

// Helper to safely get icon
const getIcon = (name: string): LucideIcon => {
  return iconMap[name] || GraduationCap;
};

export default function Services() {
  return (
    <section id="services" className="bg-white dark:bg-slate-950 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">خدماتنا</p>
          <h2 className="mb-4 text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
            ما نقدمه من خدمات
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-500 dark:text-slate-400">
            نخدم خبرتنا في بناء القدرات والتأهيل والاستشارات لدعم المؤسسات والمجتمعات.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const IconComponent = getIcon(s.icon);
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
              >
                <div className="mb-5 flex items-center gap-4">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                    whileHover={{ scale: 1.15, rotate: 5, transition: { duration: 0.3 } }}
                  >
                    <IconComponent className="h-6 w-6" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{s.title}</h3>
                </div>
                <p className="mb-5 text-sm leading-7 text-slate-500 dark:text-slate-400">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.features.map((f) => (
                    <motion.span
                      key={f}
                      className="rounded-full bg-white dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm"
                      whileHover={{ scale: 1.05, backgroundColor: '#10b981', color: 'white', transition: { duration: 0.2 } }}
                    >
                      {f}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}