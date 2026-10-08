import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  Tag,
  Bookmark,
  BookmarkCheck,
  Share2,
  Download,
  Volume2,
  Play,
  Pause,
  X,
  Sparkles,
  ArrowRight,
  Check,
  Headphones,
  FileText,
  Radio,
} from 'lucide-react';
import { blogPosts, blogCategories, BlogPost } from '../data/blog';
import SmartCardMedia from '../components/SmartCardMedia';

// Helper to render bold and clean text formatting with links
const renderFormattedText = (text: string) => {
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g;
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 underline font-semibold transition inline-flex items-center gap-1"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
};

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('saved_blog_bookmarks');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Active Reader Modal State
  const [activeReadingPost, setActiveReadingPost] = useState<BlogPost | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [mediaViewMode, setMediaViewMode] = useState<'art' | 'chart' | 'split'>('art');

  // Floating Audio Player State
  const [activeAudioPost, setActiveAudioPost] = useState<BlogPost | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const readerModalRef = useRef<HTMLDivElement>(null);

  // Sync bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('saved_blog_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  // Filter posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesBookmarks = !showBookmarksOnly || bookmarks.includes(post.id);
      return matchesCategory && matchesSearch && matchesBookmarks;
    });
  }, [searchQuery, selectedCategory, showBookmarksOnly, bookmarks]);

  // Featured post
  const featuredPost = useMemo(() => {
    return blogPosts.find((p) => p.featured) || blogPosts[0];
  }, []);

  // Handle scroll progress in reader modal
  const handleReaderScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollTotal = target.scrollHeight - target.clientHeight;
    if (scrollTotal > 0) {
      setReadingProgress((target.scrollTop / scrollTotal) * 100);
    }
  };

  const copyCurrentArticleUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-32 transition-colors duration-300">
      {/* Background Ambient Lights */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-20 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-3xl" />
        <div className="absolute top-96 left-1/4 h-96 w-96 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs md:text-sm font-bold text-emerald-700 dark:text-emerald-300 backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            <span>مَنْبَعْ — الفكر المناخي والحوكمة</span>
          </div>
          <h1 className="mb-4 text-3xl font-extrabold text-slate-900 dark:text-white md:text-5xl tracking-tight">
            أوراق الفكر و<span className="gradient-text">الرؤى الميدانية</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
            منصة تحليلية شاملة لنشر أوراق السياسات، دراسات السلام البيئي، أفكار الحوكمة، وتسجيلات البودكاست المعرفية.
          </p>
        </motion.div>

        {/* Featured Article Showcase (If available & not searching) */}
        {!searchQuery && selectedCategory === 'all' && !showBookmarksOnly && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-14 overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-900 shadow-xl"
          >
            <div className="grid md:grid-cols-12 items-stretch">
              <div className="md:col-span-6 lg:col-span-7 p-7 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${
                      featuredPost.category === 'الثقافة والمناخ'
                        ? 'text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60'
                        : 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60'
                    }`}>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      {featuredPost.category === 'الثقافة والمناخ' ? 'عمل تركيبي متحفي رائد' : 'مقال مميز'}
                    </span>
                    {featuredPost.interactiveUrl && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Copernicus CDS: متصل وموثق
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.publishedAt}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readingTime}
                    </span>
                  </div>

                  <h2
                    onClick={() => setActiveReadingPost(featuredPost)}
                    className="cursor-pointer text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-snug hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mb-4"
                  >
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed line-clamp-3 mb-6">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setActiveReadingPost(featuredPost)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm shadow-md transition-all ${
                        featuredPost.category === 'الثقافة والمناخ'
                          ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                          : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      استعراض العمل والبرهان
                    </button>
                    {featuredPost.interactiveUrl && (
                      <a
                        href={featuredPost.interactiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-bold text-sm transition"
                      >
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        المحاكي التفاعلي الحي
                      </a>
                    )}
                    {featuredPost.audioUrl && (
                      <button
                        onClick={() => {
                          setActiveAudioPost(featuredPost);
                          setIsPlayingAudio(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm transition"
                      >
                        <Headphones className="w-4 h-4 text-emerald-500" />
                        استمع ({featuredPost.audioDuration})
                      </button>
                    )}
                  </div>

                  <button
                    onClick={(e) => toggleBookmark(featuredPost.id, e)}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition"
                    title={bookmarks.includes(featuredPost.id) ? 'إلغاء الحفظ' : 'حفظ المقال'}
                  >
                    {bookmarks.includes(featuredPost.id) ? (
                      <BookmarkCheck className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="md:col-span-6 lg:col-span-5 relative min-h-[260px] md:min-h-full">
                <SmartCardMedia
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  title={featuredPost.title}
                  category={featuredPost.category}
                  colorScheme={featuredPost.category === 'الثقافة والمناخ' ? 'amber' : 'emerald'}
                  onClick={() => setActiveReadingPost(featuredPost)}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Search Bar & Bookmarks Toggle */}
        <div className="mb-8 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في المقالات، أوراق السياسات، الكلمات الدلالية..."
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-3.5 pr-12 pl-12 text-sm text-slate-900 dark:text-white placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowBookmarksOnly((prev) => !prev)}
            className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl border text-sm font-bold transition-all w-full md:w-auto justify-center ${
              showBookmarksOnly
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${showBookmarksOnly ? 'text-emerald-600' : ''}`} />
            <span>المحفوظات</span>
            <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 px-1.5 text-xs">
              {bookmarks.length}
            </span>
          </button>
        </div>

        {/* Categories Matrix Tabs */}
        <div className="mb-10 flex flex-wrap gap-2.5 justify-start md:justify-center">
          {blogCategories.map((cat) => {
            const isActive = selectedCategory === cat.key && !showBookmarksOnly;
            const count =
              cat.key === 'all'
                ? blogPosts.length
                : blogPosts.filter((p) => p.category === cat.key).length;

            return (
              <button
                key={cat.key}
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setShowBookmarksOnly(false);
                }}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 scale-105'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[10px] ${
                    isActive
                      ? 'bg-white text-emerald-800 font-extrabold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  {/* Card Media Header with Smart Square/Portrait Rendering */}
                  <div className="relative h-52 w-full overflow-hidden border-b border-slate-100 dark:border-slate-800 bg-slate-950">
                    <SmartCardMedia
                      src={post.image}
                      alt={post.title}
                      title={post.title}
                      category={post.category}
                      colorScheme={post.category === 'الثقافة والمناخ' ? 'amber' : 'emerald'}
                      onClick={() => setActiveReadingPost(post)}
                    />
                    <button
                      onClick={(e) => toggleBookmark(post.id, e)}
                      className="absolute top-3 left-3 z-30 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-slate-700/50 shadow-md transition"
                      title={bookmarks.includes(post.id) ? 'إلغاء الحفظ' : 'حفظ المقال'}
                    >
                      {bookmarks.includes(post.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <span className={`font-bold ${
                        post.category === 'الثقافة والمناخ'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime}
                      </span>
                    </div>

                    <h3
                      onClick={() => setActiveReadingPost(post)}
                      className="cursor-pointer text-lg font-bold text-slate-900 dark:text-white leading-snug hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors line-clamp-2 mb-3"
                    >
                      {post.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-auto flex items-center justify-between">
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {post.publishedAt}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {post.interactiveUrl && (
                      <a
                        href={post.interactiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/60 transition"
                        title="فتح المحاكي التفاعلي الحي"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>محاكي تفاعلي</span>
                      </a>
                    )}
                    {post.audioUrl && (
                      <button
                        onClick={() => {
                          setActiveAudioPost(post);
                          setIsPlayingAudio(true);
                        }}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="استمع للمقال"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setActiveReadingPost(post)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <span>استعراض</span>
                      <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-slate-400 mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
              لم يتم العثور على أوراق أو مقالات مطابقة
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              جرّب تغيير كلمات البحث أو تصفح كافة التصنيفات الأخرى.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setShowBookmarksOnly(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Zen Mode Reader Modal */}
      <AnimatePresence>
        {activeReadingPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-xl">
            {/* Backdrop click */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setActiveReadingPost(null)}
            />

            {/* Reading Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-3xl max-h-[92vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Top Reading Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-150"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>

              {/* Reader Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md">
                    {activeReadingPost.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {activeReadingPost.readingTime}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(activeReadingPost.id)}
                    className="p-2 text-slate-400 hover:text-emerald-500 rounded-full transition"
                    title={bookmarks.includes(activeReadingPost.id) ? 'إلغاء الحفظ' : 'حفظ المقال'}
                  >
                    {bookmarks.includes(activeReadingPost.id) ? (
                      <BookmarkCheck className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={copyCurrentArticleUrl}
                    className="p-2 text-slate-400 hover:text-emerald-500 rounded-full transition relative"
                    title="نسخ رابط المقال"
                  >
                    {copiedLink ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setActiveReadingPost(null)}
                    className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Article Text */}
              <div
                ref={readerModalRef}
                onScroll={handleReaderScroll}
                className="overflow-y-auto px-6 md:px-12 py-8 flex-1 space-y-6"
              >
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {activeReadingPost.title}
                </h1>

                <div className="flex items-center gap-3 py-3 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  <span>بقلم: <strong>{activeReadingPost.author.name}</strong></span>
                  <span>•</span>
                  <span>{activeReadingPost.author.role}</span>
                  <span>•</span>
                  <span>{activeReadingPost.publishedAt}</span>
                </div>

                {/* Media Presentation: Artwork vs Dry Scientific Chart Comparison */}
                {activeReadingPost.comparisonImage ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2 p-2 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-2 flex items-center gap-1.5">
                        <span>⚖️</span>
                        <span>مقارنة التحول البصري والجمالي:</span>
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => setMediaViewMode('art')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            mediaViewMode === 'art'
                              ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                          }`}
                        >
                          🎨 العمل الفني التركيبي
                        </button>
                        <button
                          onClick={() => setMediaViewMode('chart')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            mediaViewMode === 'chart'
                              ? 'bg-sky-500 text-slate-950 shadow-md font-extrabold'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                          }`}
                        >
                          📊 المخطط العلمي الأصلي
                        </button>
                        <button
                          onClick={() => setMediaViewMode('split')}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            mediaViewMode === 'split'
                              ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                          }`}
                        >
                          ⚖️ جنباً إلى جنب
                        </button>
                      </div>
                    </div>

                    {mediaViewMode === 'art' && (
                      <div className="rounded-2xl overflow-hidden max-h-[440px] w-full border border-slate-200 dark:border-slate-800 shadow-lg relative bg-slate-950 flex items-center justify-center">
                        <img
                          src={activeReadingPost.image}
                          alt={activeReadingPost.title}
                          className="w-full h-full object-contain max-h-[440px] mx-auto"
                        />
                        <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-400">
                          ✦ اللوحة التركيبية: 47 طبقة نسيجية مستلهمة من البازلت والقضاض واللازورد
                        </div>
                      </div>
                    )}

                    {mediaViewMode === 'chart' && (
                      <div className="rounded-2xl overflow-hidden max-h-[440px] w-full border border-slate-200 dark:border-slate-800 shadow-lg relative bg-slate-950 p-3 flex flex-col items-center justify-center">
                        <img
                          src={activeReadingPost.comparisonImage.src}
                          alt={activeReadingPost.comparisonImage.caption}
                          className="w-full h-full object-contain max-h-[400px] mx-auto rounded-xl"
                        />
                        <div className="mt-2 text-center text-xs font-bold text-sky-400 bg-sky-950/80 px-4 py-1.5 rounded-full border border-sky-500/30">
                          📊 المخطط البياني العلمي الأصلي: التحليل الهيدرولوجي الخام (سجلات Copernicus ERA5-Land للأمطار)
                        </div>
                      </div>
                    )}

                    {mediaViewMode === 'split' && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="rounded-2xl overflow-hidden border border-sky-500/30 bg-slate-950 p-2.5 relative shadow-md flex flex-col">
                          <img
                            src={activeReadingPost.comparisonImage.src}
                            alt="المخطط العلمي"
                            className="w-full h-64 object-contain mx-auto rounded-xl bg-slate-900/60"
                          />
                          <div className="mt-2 text-center text-xs font-bold text-sky-400 bg-sky-950/60 py-1.5 rounded-lg border border-sky-500/20">
                            1. المخطط العلمي الجاف (الأرقام والمنحنيات)
                          </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-950 p-2.5 relative shadow-md flex flex-col">
                          <img
                            src={activeReadingPost.image}
                            alt="العمل الفني"
                            className="w-full h-64 object-cover mx-auto rounded-xl"
                          />
                          <div className="mt-2 text-center text-xs font-bold text-amber-400 bg-amber-950/60 py-1.5 rounded-lg border border-amber-500/20">
                            2. العمل الفني التركيبي (التجسيد النسيجي والتراثي)
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-2xl overflow-hidden max-h-96 w-full border border-slate-200 dark:border-slate-800 shadow-md">
                    <img
                      src={activeReadingPost.image}
                      alt={activeReadingPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Interactive Engine Launcher Banner */}
                {activeReadingPost.interactiveUrl && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/5 to-sky-500/15 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-3 text-right">
                      <div className="p-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/25 shrink-0">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                            {activeReadingPost.id === 'post-taiz-urban-hydro-twin-3d'
                              ? 'التوأم الرقمي الهيدرولوجي التفاعلي (Taiz 3D Hydro-Twin)'
                              : 'محرك كوبرنيكوس التوليدي الحي (Copernicus Live Engine)'}
                          </h4>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            {activeReadingPost.id === 'post-taiz-urban-hydro-twin-3d' ? '3D WebGIS حي ومباشر' : 'API متصل ومصادق'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          {activeReadingPost.id === 'post-taiz-urban-hydro-twin-3d'
                            ? 'استعرض 20,891 مجرى سيلي و424 مبنى مهدداً مع التبديل السلس لخرائط جوجل'
                            : 'شاهد كامل بيانات الـ 47 عاماً لحظياً عبر بوابة الأقمار الصناعية وتحكم في الأنماط الجيولوجية'}
                        </p>
                      </div>
                    </div>
                    <a
                      href={activeReadingPost.interactiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs md:text-sm shadow-md transition shrink-0"
                    >
                      <span>
                        {activeReadingPost.id === 'post-taiz-urban-hydro-twin-3d'
                          ? 'تشغيل التوأم الرقمي 3D'
                          : 'تشغيل المرصد التفاعلي'}
                      </span>
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </a>
                  </div>
                )}

                {/* Rich Content Render */}
                <div className="text-slate-700 dark:text-slate-300 leading-8 space-y-4 text-base md:text-lg font-normal">
                  {activeReadingPost.content.split('\n\n').map((paragraph, i) => {
                    const trimmed = paragraph.trim();

                    if (trimmed === '---') {
                      return <hr key={i} className="my-6 border-slate-200 dark:border-slate-800" />;
                    }

                    if (trimmed.startsWith('### ')) {
                      return (
                        <h3 key={i} className="text-xl font-bold text-slate-900 dark:text-white pt-4 pb-1">
                          {renderFormattedText(trimmed.replace('### ', ''))}
                        </h3>
                      );
                    }

                    if (trimmed.startsWith('> ')) {
                      return (
                        <blockquote
                          key={i}
                          className="border-r-4 border-amber-500 bg-amber-50/60 dark:bg-amber-950/20 pr-4 py-3 my-4 italic text-amber-900 dark:text-amber-200 rounded-l-xl"
                        >
                          {renderFormattedText(trimmed.replace('> ', ''))}
                        </blockquote>
                      );
                    }

                    // Markdown Table Rendering
                    if (trimmed.includes('|') && trimmed.includes('---')) {
                      const lines = trimmed.split('\n').filter((l) => l.trim().startsWith('|'));
                      if (lines.length >= 2) {
                        const headers = lines[0].split('|').map((c) => c.trim()).filter(Boolean);
                        const rows = lines.slice(2).map((r) => r.split('|').map((c) => c.trim()).filter(Boolean));
                        return (
                          <div key={i} className="my-6 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/60 shadow-sm">
                            <table className="w-full text-right text-xs md:text-sm">
                              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                  {headers.map((h, hIdx) => (
                                    <th key={hIdx} className="px-4 py-3.5 border-l border-slate-200 dark:border-slate-700 last:border-l-0">
                                      {renderFormattedText(h)}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {rows.map((row, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="px-4 py-3.5 border-l border-slate-100 dark:border-slate-800 last:border-l-0 leading-relaxed">
                                        {renderFormattedText(cell)}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                    }

                    if (trimmed.startsWith('- ') || trimmed.startsWith('1. ') || trimmed.startsWith('* ')) {
                      return (
                        <div key={i} className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl space-y-2 border border-slate-100 dark:border-slate-800">
                          {trimmed.split('\n').map((li, j) => (
                            <p key={j} className="text-sm md:text-base leading-relaxed">
                              {renderFormattedText(li)}
                            </p>
                          ))}
                        </div>
                      );
                    }

                    return <p key={i}>{renderFormattedText(trimmed)}</p>;
                  })}
                </div>

                {/* Tags */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                  {activeReadingPost.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reader Footer Actions */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  مشاركة أو استعراض المواد والمحاكيات
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {activeReadingPost.interactiveUrl && (
                    <a
                      href={activeReadingPost.interactiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition shadow"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      المحاكي التفاعلي
                    </a>
                  )}
                  {activeReadingPost.pdfUrl && (
                    <a
                      href={activeReadingPost.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {activeReadingPost.pdfUrl.endsWith('.md') ? 'وثيقة البرهان (Markdown)' : 'تحميل PDF'}
                    </a>
                  )}
                  {activeReadingPost.audioUrl && (
                    <button
                      onClick={() => {
                        setActiveAudioPost(activeReadingPost);
                        setIsPlayingAudio(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition shadow"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      استمع
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Floating Audio Player */}
      <AnimatePresence>
        {activeAudioPost && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-xl z-40 bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl p-4 text-white backdrop-blur-xl"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                      تسجيل صوتي
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {activeAudioPost.audioDuration || '05:00'}
                    </span>
                  </div>
                  <h4 className="text-xs md:text-sm font-bold truncate line-clamp-1">
                    {activeAudioPost.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-full text-white shadow-lg transition"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
                </button>
                <button
                  onClick={() => {
                    setActiveAudioPost(null);
                    setIsPlayingAudio(false);
                  }}
                  className="p-2 text-slate-400 hover:text-white rounded-full transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
