import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Calculator, Images, Map, Megaphone, Sprout } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { creations, tools } from '../data/content';

const toolIconMap: Record<string, LucideIcon> = {
  Calculator,
  Map,
  Sprout,
  Megaphone,
  BarChart3,
  Images,
};

const getIcon = (name: string): LucideIcon => {
  return toolIconMap[name] || Calculator;
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 pb-20 pt-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-emerald-100 backdrop-blur transition hover:bg-white/20"
            >
              <ArrowRight className="h-4 w-4" />
              <span>العودة إلى السيرة الذاتية</span>
            </Link>
            <h1 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
              أدوات ومشاركات
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-emerald-100/80">
              منشورات، مقالات، أدلة، نماذج وموارد متنوعة لدعم العمل البيئي والمجتمعي في اليمن.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Creations Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">إبداعاتي</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-500 dark:text-slate-400">
              مجموعة من الفنون الرقمية، البودكاست، والمنشورات التوعوية التي أنتجتها.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {creations.map((creation, i) => (
              <motion.div
                key={creation.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition-all duration-500 hover:shadow-lg"
              >
                <div className="mb-4 overflow-hidden rounded-xl">
                  <img
                    src={creation.image}
                    alt={creation.title}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{creation.title}</h3>
                <p className={`mb-2 text-sm font-medium ${creation.type === 'فن تفاعلي' ? 'text-sky-600 dark:text-sky-400' : creation.type === 'محتوى صوتي' ? 'text-purple-600 dark:text-purple-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {creation.type}
                </p>
                <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">{creation.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="bg-slate-50 dark:bg-slate-800 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">أدواتي ومواردي</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-500 dark:text-slate-400">
              مجموعة أدوات عملية وموارد مفيدة تدعم العمل البيئي والاجتماعي.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, i) => {
              const IconComponent = getIcon(tool.icon);
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-md transition-transform group-hover:scale-110">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{tool.name}</h3>
                  <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">{tool.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA back to home */}
      <section className="py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 hover:shadow-emerald-600/40"
          >
            <ArrowRight className="h-4 w-4" />
            العودة إلى السيرة الذاتية
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
