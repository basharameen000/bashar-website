import { motion } from 'framer-motion';
import { HeartHandshake, Recycle, Trees, Users } from 'lucide-react';
import { profile } from '../data/content';

const values = [
  {
    icon: Trees,
    title: 'الاستدامة البيئية',
    desc: 'بناء حلول مجتمعية تتجاوز تحديات المناخ وتعزز القدرة التكيفية للمجتمعات المحلية.',
  },
  {
    icon: Users,
    title: 'تمكين الشباب',
    desc: 'إعداد الجيل القادم بأدوات المعرفة والمهارات اللازمة للمشاركة الفعالة في بناء المستقبل.',
  },
  {
    icon: Recycle,
    title: 'الحوكمة المجتمعية',
    desc: 'تعزيز الشفافية والمساءلة في المؤسسات من خلال التدريب والاستشارات المخصصة.',
  },
  {
    icon: HeartHandshake,
    title: 'السلام البيئي',
    desc: 'دعم الحلول التي تربط بين البيئة والأمن والاستقرار في المجتمعات المحلية.',
  },
];

export default function About() {
  return (
    <section id="about" className="bg-white dark:bg-slate-950 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-2 text-sm font-bold tracking-wide text-emerald-600 dark:text-emerald-400">نبذة عني</p>
          <h2 className="mb-4 text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
            رؤية وقيم
          </h2>
          <p className="text-base leading-8 text-slate-600 dark:text-slate-400 md:text-lg">{profile.longBio}</p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 transition-all duration-500"
            >
              <motion.div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                whileHover={{ scale: 1.15, rotate: 5, transition: { duration: 0.3 } }}
              >
                <item.icon className="h-5 w-5" />
              </motion.div>
              <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
