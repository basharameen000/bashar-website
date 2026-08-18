import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '../data/content';

const navLinks = [
  { href: '/#about', label: 'نبذة' },
  { href: '/#resume', label: 'السيرة' },
  { href: '/#services', label: 'خدماتنا' },
  { href: '/#projects', label: 'المشاريع' },
  { href: '/#contact', label: 'تواصل' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="text-lg">{profile.name.split(' ')[0]}</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {location.pathname === '/' && navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm font-medium text-slate-700 dark:text-slate-300 transition hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              {link.label}
            </a>
          ))}
          {location.pathname !== '/' && (
            <Link
              to="/"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 transition hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              الرئيسية
            </Link>
          )}
          <Link
            to="/resources"
            className={`rounded-full px-5 py-2 text-sm font-semibold shadow-lg transition ${
              location.pathname === '/resources'
                ? 'bg-emerald-700 text-white shadow-emerald-700/25'
                : 'bg-emerald-600 text-white shadow-emerald-600/25 hover:bg-emerald-700'
            }`}
          >
            أدوات ومشاركات
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            aria-label={darkMode ? 'التبديل للوضع الفاتح' : 'التبديل للوضع الداكن'}
            className="rounded-lg p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            onClick={() => setDarkMode((v) => !v)}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            type="button"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="rounded-lg p-2 text-slate-700 dark:text-slate-300 md:hidden hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/60 dark:border-slate-700/60 px-5 py-4 md:hidden"
          >
            <div className="flex flex-col gap-3">
              {location.pathname === '/' && navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="rounded-lg px-3 py-2 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {link.label}
                </a>
              ))}
              {location.pathname !== '/' && (
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  الرئيسية
                </Link>
              )}
              <Link
                to="/resources"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-emerald-600 px-3 py-2 font-medium text-white"
              >
                أدوات ومشاركات
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
