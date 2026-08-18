import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CtaBanner() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-900 dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          {/* Decorative icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-5 flex items-center gap-3"
          >
            <motion.div
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-emerald-400"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <BookOpen className="h-5 w-5" />
            </motion.div>
            <motion.div
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-emerald-400"
              whileHover={{ rotate: -10, scale: 1.1 }}
            >
              <Wrench className="h-5 w-5" />
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-4 text-3xl font-extrabold text-white md:text-4xl"
          >
            اكتشف أدوات ومشاركات أكثر
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mb-8 max-w-2xl text-base leading-8 text-slate-300"
          >
            تصفح صفحة أدوات ومشاركات للاطلاع على المنشورات، المقالات، الأدلة، النماذج والموارد.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/resources"
              className="group inline-flex items-center gap-3 rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-emerald-600/30 transition hover:bg-emerald-700 hover:shadow-emerald-600/40"
            >
              <span>الانتقال إلى أدوات ومشاركات</span>
              <motion.span
                className="transition-transform duration-300 group-hover:-translate-x-1"
                initial={{ x: 0 }}
                whileHover={{ x: -4 }}
              >
                <ArrowLeft className="h-5 w-5" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
