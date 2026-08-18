import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { profile } from '../data/content';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 py-10 text-slate-600 dark:text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 md:flex-row md:px-8">
        {/* Logo / Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 font-bold text-slate-900 dark:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
            <Leaf className="h-4 w-4" />
          </span>
          <span>{profile.name}</span>
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-slate-500 dark:text-slate-400"
        >
          © {currentYear} جميع الحقوق محفوظة
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-4 text-sm"
        >
          <motion.a
            href={profile.socials.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="X / Twitter"
            whileHover={{ scale: 1.1, color: '#10b981' }}
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            X
          </motion.a>
          <motion.a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.1, color: '#10b981' }}
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            LinkedIn
          </motion.a>
          <motion.a
            href={profile.socials.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            whileHover={{ scale: 1.1, color: '#10b981' }}
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Instagram
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
}
