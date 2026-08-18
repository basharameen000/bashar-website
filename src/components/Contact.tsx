import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { profile } from '../data/content';

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      url: 'https://linkedin.com/in/bashar-ameen',
      color: 'hover:bg-[#0077b5] hover:text-white',
      bg: 'bg-[#0077b5]/10 text-[#0077b5]',
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      url: 'https://facebook.com/bashar.ameen',
      color: 'hover:bg-[#1877F2] hover:text-white',
      bg: 'bg-[#1877F2]/10 text-[#1877F2]',
    },
    {
      name: 'Instagram',
      icon: InstagramIcon,
      url: 'https://instagram.com/bashar.ameen',
      color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:text-white',
      bg: 'bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-orange-500/10 text-pink-600',
    },
  ];

  return (
    <section id="contact" className="bg-white dark:bg-slate-950 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">تواصل</p>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">لنبنِ أثرًا معًا</h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-8 leading-8 text-slate-500 dark:text-slate-400">
              سواء كنت تمثل مؤسسة، جمعية، أو مبادرة شبابية — يسعدني التعاون في المشاريع البيئية والحملات المناخية.
            </p>

            <div className="space-y-3">
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center gap-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 transition hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">البريد الإلكتروني</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">{profile.email}</p>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center gap-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-white">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">الهاتف</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white" dir="ltr">
                    {profile.phone}
                  </p>
                  {profile.phone2 && (
                    <p className="text-sm font-semibold text-slate-800 dark:text-white" dir="ltr">
                      {profile.phone2}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center gap-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700 text-white">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">الموقع</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">{profile.location}</p>
                </div>
              </motion.div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <p className="mb-4 text-sm font-bold text-slate-700 dark:text-slate-300">تابعني على وسائل التواصل</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${social.bg} transition-all duration-300 ${social.color} shadow-sm`}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-6 shadow-sm md:p-8"
          >
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                الاسم
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  required
                  name="name"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none ring-emerald-400 transition focus:ring-2"
                  placeholder="اسمك الكامل"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                البريد
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  required
                  type="email"
                  name="email"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none ring-emerald-400 transition focus:ring-2"
                  placeholder="email@example.com"
                  dir="ltr"
                />
              </label>
            </div>

            <label className="mb-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
              الموضوع
              <motion.input
                whileFocus={{ scale: 1.02 }}
                required
                name="subject"
                className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none ring-emerald-400 transition focus:ring-2"
                placeholder="موضوع الرسالة"
              />
            </label>

            <label className="mb-5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              الرسالة
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                required
                name="message"
                rows={4}
                className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none ring-emerald-400 transition focus:ring-2"
                placeholder="كيف يمكننا التعاون؟"
              />
            </label>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              <Send className="h-4 w-4" />
              إرسال الرسالة
            </motion.button>
            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 px-4 py-3 text-center text-sm font-medium text-emerald-700 dark:text-emerald-300"
              >
                شكرًا لتواصلك! سأرد عليك في أقرب وقت.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
