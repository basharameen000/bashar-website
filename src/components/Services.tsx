import { motion } from 'framer-motion';
import { GraduationCap, ClipboardCheck, UsersRound, FolderKanban } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { services } from '../data/services';
import MediaFallback from './MediaFallback';

const iconMap: Record<string, LucideIcon> = {
  GraduationCap: GraduationCap,
  ClipboardCheck: ClipboardCheck,
  UsersRound: UsersRound,
  FolderKanban: FolderKanban,
};

const serviceColors: Array<'emerald' | 'indigo' | 'amber' | 'sky'> = ['emerald', 'indigo', 'amber', 'sky'];

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
            ما نقدمه من خدمات متخصصة
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-500 dark:text-slate-400">
            نسخّر خبرتنا الميدانية في بناء القدرات، تقديم الاستشارات البحثية، وتيسير ورش العمل لدعم المؤسسات والمجتمعات.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const IconComponent = getIcon(s.icon);
            const colorScheme = serviceColors[i % serviceColors.length];

            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
                whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
              >
                {/* Media Fallback Header */}
                <div className="relative h-36 w-full overflow-hidden">
                  <MediaFallback
                    title={s.title}
                    category="خدمة معتمدة"
                    icon={IconComponent}
                    colorScheme={colorScheme}
                  />
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">{s.title}</h3>
                    <p className="mb-5 text-sm leading-7 text-slate-500 dark:text-slate-400">{s.desc}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {s.features.map((f) => (
                      <motion.span
                        key={f}
                        className="rounded-full bg-slate-100 dark:bg-slate-800 px-3.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
                        whileHover={{ scale: 1.05, backgroundColor: '#10b981', color: 'white', transition: { duration: 0.2 } }}
                      >
                        {f}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}