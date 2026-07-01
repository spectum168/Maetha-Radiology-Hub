import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Copy,
  Check,
  ExternalLink,
  Bell,
  HelpCircle,
  GraduationCap,
  Bookmark,
  Moon,
  Sun,
  X,
  ChevronRight,
  ClipboardCheck,
  CalendarDays,
  Monitor,
  Baby,
  FolderHeart,
  BookOpen,
  BarChart3,
  Star,
  Info,
  PhoneCall,
  Shield,
  ShieldAlert,
  Heart,
  CheckCircle,
  AlertTriangle,
  Users,
  Wrench,
  Activity,
  Sparkles,
  Trash2,
  Hospital
} from 'lucide-react';

import { SYSTEM_LINKS, CATEGORY_LABELS } from './data';
import { SystemLink, CategoryType } from './types';

// Map string icon names to Lucide icons
const IconMap: { [key: string]: React.ComponentType<any> } = {
  ClipboardCheck,
  CalendarDays,
  Monitor,
  Baby,
  FolderHeart,
  GraduationCap,
  BookOpen,
  BarChart3,
  Sparkles,
  Trash2,
  Hospital,
  ShieldAlert,
};

export default function App() {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  
  // Favorites/Bookmarking state (persisted via localStorage)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('maetha_radiology_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dark mode state (persisted via localStorage)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('maetha_radiology_dark_mode');
      if (saved) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Copied link toast feedback state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal states
  const [activeModal, setActiveModal] = useState<'notifications' | 'help' | 'emergency' | 'directory' | 'support' | 'privacy' | null>(null);
  
  // Quick Mock States for Interactive Hospital Logs
  const [qcStatusToday, setQcStatusToday] = useState<{ daily: boolean; quarterly: boolean }>({
    daily: false,
    quarterly: false
  });

  // Persist Favorites
  useEffect(() => {
    localStorage.setItem('maetha_radiology_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Handle Dark Mode toggling
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('maetha_radiology_dark_mode', String(darkMode));
  }, [darkMode]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (id: string, url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Filter links based on search query & selected category
  const filteredLinks = SYSTEM_LINKS.filter(link => {
    const matchesCategory = selectedCategory === 'all' || link.category === selectedCategory;
    const matchesSearch = 
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (link.englishTitle && link.englishTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.badge?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get links grouped by category for 'all' view
  const categories: Exclude<CategoryType, 'all'>[] = ['qc', 'docs', 'training', 'safety', 'smart-hospital'];

  return (
    <div className="min-h-screen bg-background text-on-background font-body transition-colors duration-300">
      
      {/* Top Header */}
      <header className="bg-white dark:bg-[#0c1929] border-b border-outline-variant/60 sticky top-0 w-full z-40 backdrop-blur-md bg-opacity-95 dark:bg-opacity-95 shadow-sm transition-colors duration-300">
        <div className="flex justify-between items-center px-6 w-full max-w-7xl mx-auto h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary relative overflow-hidden">
              <Activity className="w-6 h-6 animate-pulse" />
              <div className="absolute inset-0 bg-secondary/5 animate-ping rounded-lg"></div>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg md:text-xl tracking-tight text-on-background dark:text-white flex items-center gap-2">
                Maetha Radiology Hub
                <span className="hidden sm:inline-block text-[10px] bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded font-mono font-normal">
                  OFFICIAL
                </span>
              </h1>
              <p className="text-[11px] text-on-surface-variant dark:text-gray-400 font-sans hidden md:block">
                หน่วยงานรังสีเทคนิค โรงพยาบาลแม่ทา
              </p>
            </div>
          </div>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            <button 
              onClick={() => { setSelectedCategory('all'); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
              className={`text-sm font-medium pb-1 transition-all ${selectedCategory === 'all' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant dark:text-gray-300 hover:text-secondary'}`}
            >
              Directory
            </button>
            <button 
              onClick={() => setSelectedCategory('qc')}
              className={`text-sm font-medium pb-1 transition-all ${selectedCategory === 'qc' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant dark:text-gray-300 hover:text-secondary'}`}
            >
              Forms & QC
            </button>
            <button 
              onClick={() => setSelectedCategory('safety')}
              className={`text-sm font-medium pb-1 transition-all ${selectedCategory === 'safety' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant dark:text-gray-300 hover:text-secondary'}`}
            >
              Safety
            </button>
            <button 
              onClick={() => setSelectedCategory('smart-hospital')}
              className={`text-sm font-medium pb-1 transition-all ${selectedCategory === 'smart-hospital' ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant dark:text-gray-300 hover:text-secondary'}`}
            >
              Smart Hospital
            </button>
          </nav>

          {/* Quick Controls */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant dark:text-gray-300"
              title="สลับโหมดสี"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Notification Bell */}
            <button 
              onClick={() => setActiveModal('notifications')}
              className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant dark:text-gray-300 relative"
              title="การแจ้งเตือน"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>

            {/* Help Icon */}
            <button 
              onClick={() => setActiveModal('help')}
              className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant dark:text-gray-300"
              title="คู่มือการใช้งาน"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="py-8 px-4 md:px-6 max-w-7xl mx-auto space-y-8">
        
        {/* Banner Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-container-low to-surface-container dark:from-[#11253e] dark:to-[#091524] border border-outline-variant/50 p-6 md:p-8 text-center transition-all">
          <div className="absolute top-0 left-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl -translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl translate-x-16 translate-y-16"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
              <Shield className="w-3.5 h-3.5" /> Clinical Precision & Patient Safety
            </div>
            
            <h2 className="font-display font-extrabold text-2xl md:text-4xl text-on-surface dark:text-white tracking-tight">
              ศูนย์รวมลิงก์ระบบงานรังสีเทคนิค
            </h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              โรงพยาบาลแม่ทา - เข้าถึงระบบตรวจสอบคุณภาพ เอกสารทางการแพทย์ ความปลอดภัยทางรังสี และการเรียนรู้ประเมินทักษะของบุคลากรได้อย่างรวดเร็ว แม่นยำ และปลอดภัยสูงสุด
            </p>

            {/* Live Search Bar */}
            <div className="pt-2 max-w-xl mx-auto">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="ค้นหาระบบงาน ฟอร์ม เอกสาร หรือรายงาน... (เช่น QC, ความปลอดภัย, ยินยอม)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-[#08121f] text-on-surface dark:text-white pl-12 pr-10 py-3 rounded-xl border border-outline-variant hover:border-secondary focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all text-sm md:text-base shadow-sm"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 p-1.5 text-gray-400 hover:text-on-surface dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Shortcuts / Bookmarks section (Shows when user bookmarks systems) */}
        {favorites.length > 0 && (
          <section className="bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/20 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-base md:text-lg text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                ทางลัดส่วนตัวของฉัน ({favorites.length})
                <span className="text-xs font-normal text-on-surface-variant dark:text-gray-400">
                  (ระบบที่คุณใช้งานบ่อยที่สุด)
                </span>
              </h3>
              <button 
                onClick={() => setFavorites([])}
                className="text-xs text-rose-500 hover:underline"
              >
                ล้างทั้งหมด
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SYSTEM_LINKS.filter(l => favorites.includes(l.id)).map(link => {
                const IconComponent = IconMap[link.iconName] || ClipboardCheck;
                return (
                  <motion.div
                    key={`fav-${link.id}`}
                    layoutId={`fav-${link.id}`}
                    className="bg-white dark:bg-[#0c1827] border border-amber-500/30 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-all relative group"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full">
                          {link.badge || 'Shortcut'}
                        </span>
                        <button
                          onClick={(e) => toggleFavorite(link.id, e)}
                          className="text-amber-500 hover:text-gray-400 transition-colors"
                          title="ลบจากทางลัด"
                        >
                          <Star className="w-4 h-4 fill-amber-500" />
                        </button>
                      </div>
                      
                      <h4 className="font-display font-bold text-sm text-on-surface dark:text-white line-clamp-1">
                        {link.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant dark:text-gray-400 mt-1 line-clamp-2">
                        {link.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                      <button
                        onClick={(e) => copyToClipboard(link.id, link.url, e)}
                        className="text-[11px] flex items-center gap-1 text-gray-400 hover:text-secondary transition-colors"
                      >
                        {copiedId === link.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-500">คัดลอกแล้ว</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>แชร์ลิงก์</span>
                          </>
                        )}
                      </button>

                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline"
                      >
                        เข้าสู่ระบบ <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* Quick Quality Check Interactive Widget */}
        <section className="bg-white dark:bg-[#08121f] border border-outline-variant/60 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-base md:text-lg text-on-surface dark:text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                แผงติดตามสถานะการควบคุมคุณภาพ (QC Checklist)
              </h3>
              <p className="text-xs text-on-surface-variant dark:text-gray-400">
                เครื่องมือบันทึกความพร้อมใช้งานประจำวันและประจำไตรมาสสำหรับเจ้าหน้าที่ประจำกะ (บันทึกส่วนตัวในเบราว์เซอร์นี้)
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setQcStatusToday(prev => ({ ...prev, daily: !prev.daily }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                  qcStatusToday.daily 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-transparent hover:border-gray-300'
                }`}
              >
                <ClipboardCheck className="w-4 h-4" />
                QC ประจำวัน: {qcStatusToday.daily ? '✓ บันทึกแล้ว' : 'ยังไม่ได้บันทึก'}
              </button>
              
              <button
                onClick={() => setQcStatusToday(prev => ({ ...prev, quarterly: !prev.quarterly }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                  qcStatusToday.quarterly 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-transparent hover:border-gray-300'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                QC ประจำไตรมาส: {qcStatusToday.quarterly ? '✓ ตรวจสอบแล้ว' : 'ยังไม่ได้ตรวจสอบ'}
              </button>
            </div>
          </div>
        </section>

        {/* Category Selector Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-outline-variant/40">
          {(Object.keys(CATEGORY_LABELS) as CategoryType[]).map((catKey) => (
            <button
              key={catKey}
              onClick={() => setSelectedCategory(catKey)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === catKey
                  ? 'bg-[#00201d] text-white dark:bg-[#86f2e4] dark:text-[#00201d] shadow-sm'
                  : 'bg-white dark:bg-[#0c1827] text-on-surface-variant dark:text-gray-300 border border-outline-variant/60 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {CATEGORY_LABELS[catKey].th}
            </button>
          ))}
        </div>

        {/* System Directory Grid */}
        <div className="space-y-12">
          {categories.map((categoryKey) => {
            // Filter systems in this category
            const categoryLinks = filteredLinks.filter(l => l.category === categoryKey);
            
            // Skip rendering this category if it is filtered out by search/tab
            if (categoryLinks.length === 0) return null;
            
            // Icon for section title
            let sectionIcon = <ClipboardCheck className="w-5 h-5 text-secondary" />;
            if (categoryKey === 'docs') sectionIcon = <FolderHeart className="w-5 h-5 text-secondary" />;
            if (categoryKey === 'training') sectionIcon = <GraduationCap className="w-5 h-5 text-secondary" />;
            if (categoryKey === 'safety') sectionIcon = <BarChart3 className="w-5 h-5 text-secondary" />;
            if (categoryKey === 'smart-hospital') sectionIcon = <Hospital className="w-5 h-5 text-secondary" />;

            return (
              <div key={categoryKey} className="space-y-4">
                
                {/* Section Header */}
                <div className="flex items-center gap-2 border-b border-outline-variant/60 pb-2">
                  {sectionIcon}
                  <h3 className="font-display font-bold text-base md:text-lg text-on-surface dark:text-white">
                    {CATEGORY_LABELS[categoryKey].th}
                  </h3>
                </div>

                {/* Normal grid or custom reports layout */}
                {categoryKey === 'safety' ? (
                  // Custom Layout for Safety & Reports: Left custom reporting block, right visual decorative block
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {categoryLinks.map(link => (
                      <div key={link.id} className="lg:col-span-5">
                        <div className="bg-surface-container-low dark:bg-[#0d1c2f] p-6 rounded-2xl border border-outline-variant h-full flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <div className="w-12 h-12 bg-white dark:bg-[#08121f] rounded-xl flex items-center justify-center text-secondary shadow-sm">
                                <BarChart3 className="w-6 h-6" />
                              </div>
                              <span className="text-xs font-semibold px-2 py-1 bg-secondary/10 text-secondary rounded-full">
                                {link.badge}
                              </span>
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="font-display font-bold text-lg text-on-surface dark:text-white flex items-center gap-2">
                                {link.title}
                              </h4>
                              {link.englishTitle && (
                                <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                                  {link.englishTitle}
                                </p>
                              )}
                              <p className="font-body text-sm text-on-surface-variant dark:text-gray-300 leading-relaxed">
                                {link.description}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3 mt-6">
                            {link.altUrls?.map((alt, index) => (
                              <a
                                key={index}
                                href={alt.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full p-3.5 bg-white dark:bg-[#0c1827] border border-outline-variant rounded-xl hover:bg-secondary hover:text-white dark:hover:bg-secondary dark:hover:text-white text-sm font-bold text-on-surface dark:text-white transition-all group shadow-sm"
                              >
                                <span className="flex items-center gap-2">
                                  {alt.iconName && IconMap[alt.iconName] ? (
                                    React.createElement(IconMap[alt.iconName], {
                                      className: "w-4 h-4 text-secondary group-hover:text-white transition-colors"
                                    })
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-secondary group-hover:text-white transition-colors" />
                                  )}
                                  {alt.label}
                                </span>
                                <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Right block: Asymmetric clinical precision decorative visual */}
                    <div className="hidden lg:block lg:col-span-7">
                      <div className="relative h-full w-full rounded-2xl overflow-hidden border border-outline-variant bg-primary-container group">
                        {/* MRI Background image */}
                        <div className="absolute inset-0 z-0">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYxBmoGIKUObSuqywtdyqh_b6oK2fo5D1hohcz41CfUaGDFPLhIp-Df5Y6EPDMOdvjXOc2_DRn06tERYtm-tXO5KDwCmX-1LiEbgh9IKjD2SukTaHCCUmkklsVi-r9-rEQj1c7vaFWwEahHZFeyuwsCujbq0cNYaFKl59nFYREn0TxulDXuF9almBz7c7odvu_AXcAtciImwioIkyaPg44IAcfHN7NZ6r3VBBx85DKD768OFyTY4zywZShe3VPhNraatN7N_xC0r4"
                            alt="Maetha MRI Suite"
                            className="w-full h-full object-cover object-center opacity-45 group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        </div>
                        
                        <div className="relative z-10 p-8 flex flex-col justify-end h-full text-white space-y-3">
                          <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-teal-300">
                            Clinical Precision
                          </span>
                          <h4 className="font-display font-extrabold text-2xl tracking-tight">
                            เพื่อความปลอดภัยสูงสุดของผู้รับบริการ
                          </h4>
                          <p className="font-body text-sm text-gray-300 max-w-lg leading-relaxed">
                            เพราะเราคือด่านหน้าของการวินิจฉัย ความแม่นยำและการควบคุมคุณภาพคือหัวใจสำคัญของงานรังสีเทคนิค โรงพยาบาลแม่ทา
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Generic directories list (Grid)
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryLinks.map((link) => {
                      const IconComponent = IconMap[link.iconName] || ClipboardCheck;
                      const isFavorite = favorites.includes(link.id);

                      return (
                        <div
                          key={link.id}
                          className="bg-white dark:bg-[#0c1827] border border-outline-variant/60 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                        >
                          <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                          
                          <div className="space-y-4">
                            
                            {/* Card top elements */}
                            <div className="flex justify-between items-start gap-2">
                              <div className="w-12 h-12 bg-surface-container-low dark:bg-[#08121f] rounded-xl flex items-center justify-center text-secondary shadow-sm transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                                <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                              </div>

                              <div className="flex items-center gap-2">
                                {link.isPopular && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 bg-teal-500/15 text-teal-600 dark:text-teal-400 rounded">
                                    แนะนำ
                                  </span>
                                )}
                                <button
                                  onClick={(e) => toggleFavorite(link.id, e)}
                                  className={`p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isFavorite ? 'text-amber-500' : 'text-gray-300 hover:text-amber-400'}`}
                                  title={isFavorite ? "ลบออกจากระบบที่ใช้บ่อย" : "ทำเครื่องหมายเป็นระบบที่ใช้บ่อย"}
                                >
                                  <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-500' : ''}`} />
                                </button>
                              </div>
                            </div>

                            {/* Card text metadata */}
                            <div className="space-y-2">
                              <h4 className="font-display font-bold text-base md:text-md text-on-surface dark:text-white line-clamp-2 leading-snug group-hover:text-secondary transition-colors duration-300">
                                {link.title}
                              </h4>
                              {link.englishTitle && (
                                <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
                                  {link.englishTitle}
                                </p>
                              )}
                              <p className="font-body text-xs md:text-sm text-on-surface-variant dark:text-gray-300 leading-relaxed line-clamp-3">
                                {link.description}
                              </p>
                            </div>
                          </div>

                          {/* Card bottom buttons */}
                          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                            
                            {/* Copy URL share trigger */}
                            <button
                              onClick={(e) => copyToClipboard(link.id, link.url, e)}
                              className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-secondary dark:hover:text-teal-400 transition-colors"
                            >
                              {copiedId === link.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                                  <span className="text-emerald-500 font-semibold">คัดลอกสำเร็จ</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>แชร์ลิงก์</span>
                                </>
                              )}
                            </button>

                            {/* Direct URL launcher */}
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary dark:text-teal-400 hover:underline group-hover:translate-x-1 transition-transform"
                            >
                              <span>{link.category === 'docs' ? 'เข้าใช้งาน' : 'เปิดระบบ'}</span>
                              {link.category === 'docs' ? <ExternalLink className="w-3.5 h-3.5" /> : <ChevronRight className="w-4 h-4" />}
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State when Search Query filters out everything */}
        {filteredLinks.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-[#08121f] border border-outline-variant/60 rounded-2xl max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500 mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-lg text-on-surface dark:text-white">
              ไม่พบผลลัพธ์ที่ค้นหา
            </h3>
            <p className="text-sm text-on-surface-variant dark:text-gray-400 px-6">
              ขออภัย เราไม่พบระบบหรือเอกสารที่ตรงกับคำค้นหา "{searchQuery}" ของคุณ กรุณาตรวจสอบความถูกต้องหรือลองค้นหาด้วยคำอื่น
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="text-sm font-bold text-secondary hover:underline"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#0c1827] border-t border-outline-variant/60 mt-16 transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center py-8 px-6 w-full max-w-7xl mx-auto gap-6">
          
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" />
              <span className="font-display font-bold text-base text-on-surface dark:text-white">
                Maetha Radiology Hub
              </span>
            </div>
            <p className="font-sans text-xs text-on-surface-variant dark:text-gray-400 text-center md:text-left">
              © 2026 Maetha Hospital Radiology Department. Clinical Precision & Patient Safety.
            </p>
          </div>

          {/* Footer Action Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <button
              onClick={() => setActiveModal('privacy')}
              className="text-xs font-semibold text-on-surface-variant dark:text-gray-400 hover:text-secondary dark:hover:text-teal-400 hover:underline transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays Container */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0b1c30] rounded-2xl border border-outline-variant shadow-2xl p-6 overflow-hidden max-h-[85vh] flex flex-col"
            >
              
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4 mb-4 flex-shrink-0">
                <h3 className="font-display font-bold text-lg text-on-surface dark:text-white flex items-center gap-2">
                  {activeModal === 'notifications' && (
                    <>
                      <Bell className="w-5 h-5 text-secondary" />
                      การแจ้งเตือนและอัปเดตระบบ
                    </>
                  )}
                  {activeModal === 'help' && (
                    <>
                      <HelpCircle className="w-5 h-5 text-secondary" />
                      คู่มือการใช้งานระบบ
                    </>
                  )}
                  {activeModal === 'emergency' && (
                    <>
                      <AlertTriangle className="w-5 h-5 text-rose-500 animate-bounce" />
                      แผนและมาตรการตอบโต้ภาวะฉุกเฉิน
                    </>
                  )}
                  {activeModal === 'directory' && (
                    <>
                      <Users className="w-5 h-5 text-secondary" />
                      สมุดรายนามแผนกรังสีเทคนิค
                    </>
                  )}
                  {activeModal === 'support' && (
                    <>
                      <Wrench className="w-5 h-5 text-secondary" />
                      ฝ่ายสนับสนุนด้านเทคนิค (IT)
                    </>
                  )}
                  {activeModal === 'privacy' && (
                    <>
                      <Shield className="w-5 h-5 text-secondary" />
                      นโยบายการคุ้มครองข้อมูลส่วนบุคคล (PDPA)
                    </>
                  )}
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-on-surface dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Contents */}
              <div className="flex-grow overflow-y-auto pr-1 space-y-4 text-sm text-on-surface-variant dark:text-gray-300 leading-relaxed font-body">
                
                {/* 1. Notifications Modal */}
                {activeModal === 'notifications' && (
                  <div className="space-y-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-emerald-800 dark:text-emerald-400">ระบบอัปเดตหลักฐาน Smart Evidence v3.0</h4>
                        <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">อัปเกรดความเร็วในการดึงข้อมูล และปรับโครงสร้างเอกสารตามมาตรฐานกระทรวงสาธารณสุขฉบับปรับปรุงปี 2569 พร้อมเปิดใช้การเชื่อมโยงระบบสมบูรณ์แบบ</p>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-2 block">อัปเดตเมื่อ: 28 มิถุนายน 2026</span>
                      </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                        <Info className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-800 dark:text-amber-400">แจ้งเตรียมการทดสอบระบบประจำไตรมาส</h4>
                        <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">เจ้าหน้าที่งานรังสีเทคนิคทุกท่าน กรุณาทำบันทึกประเมินความสม่ำเสมอของภาพ (Monitor Quality Assurance) ผ่านลิงก์ระบบ QC monitor DarkNoise ภายในสัปดาห์นี้</p>
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono mt-2 block">อัปเดตเมื่อ: 25 มิถุนายน 2026</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Help Modal */}
                {activeModal === 'help' && (
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-on-surface dark:text-white">ยินดีต้อนรับสู่ศูนย์รวมระบบงานรังสีเทคนิค โรงพยาบาลแม่ทา</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        <strong>ค้นหาระบบงานที่ต้องการ:</strong> ใช้แถบค้นหาด้านบน พิมพ์คำหลักเพื่อสกรีนฟอร์มหรือรายงานที่ต้องการอย่างรวดเร็ว
                      </li>
                      <li>
                        <strong>สร้างระบบทางลัดส่วนตัว (Shortcuts):</strong> คลิกไอคอนดาว ⭐ บนการ์ดระบบงานที่คุณเข้าใช้งานเป็นประจำ เพื่อพินระบบงานนั้นขึ้นไว้ด้านบนสุด สะดวกในการใช้ในรอบกะงานของคุณ
                      </li>
                      <li>
                        <strong>แชร์ลิงก์ให้ผู้ร่วมงาน:</strong> คลิกปุ่มแชร์ลิงก์ 🔗 บนการ์ดเพื่อคัดลอก URL สู่คลิปบอร์ด ส่งต่อในกลุ่มไลน์งานได้อย่างสะดวกสบาย
                      </li>
                    </ol>
                    <div className="p-3.5 bg-secondary-container/30 text-on-secondary-container rounded-xl flex gap-3 mt-4">
                      <Info className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <p className="text-xs">
                        หากไม่สามารถเข้าใช้งานระบบใดๆ ได้ โปรดตรวจสอบสถานะการเชื่อมต่อเครือข่ายภายในโรงพยาบาลแม่ทา หรือแจ้งผู้ดูแลฝ่ายไอทีโดยตรง
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. Emergency Modal */}
                {activeModal === 'emergency' && (
                  <div className="space-y-4">
                    <p className="font-bold text-rose-600 dark:text-rose-400">หากเกิดเหตุฉุกเฉินทางรังสี (Radiation Leakage or Overexposure):</p>
                    <div className="border-l-4 border-rose-500 pl-3 space-y-2">
                      <p className="text-sm"><strong>1. ยุติการแผ่รังสีทันที:</strong> กดปุ่มหยุดทำงานฉุกเฉิน (Emergency Stop) บนหน้าปัดควบคุมเครื่องควบคุมเอกซเรย์</p>
                      <p className="text-sm"><strong>2. อพยพผู้ป่วยและเจ้าหน้าที่:</strong> นำบุคคลออกจากพื้นที่เสี่ยง ปิดประตูป้องกันรังสี (ประตูตะกั่ว) และติดป้ายห้ามเข้าเด็ดขาด</p>
                      <p className="text-sm"><strong>3. รายงานผู้รับผิดชอบความปลอดภัยทางรังสี (RSO):</strong> รายงานสายตรง โทรเบอร์ภายใน <strong className="text-rose-500">2214</strong></p>
                    </div>

                    <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/10 space-y-2">
                      <h4 className="font-bold text-on-surface dark:text-white flex items-center gap-1.5">
                        <PhoneCall className="w-4 h-4 text-rose-500" />
                        หมายเลขโทรศัพท์ติดต่อด่วนกรณีฉุกเฉิน:
                      </h4>
                      <ul className="text-xs space-y-1.5 pl-4 list-disc">
                        <li><strong>ผู้ควบคุมความปลอดภัยทางรังสี (RSO):</strong> เบอร์โทรศัพท์ 081-XXX-XXXX (เบอร์ภายใน 2214)</li>
                        <li><strong>ศูนย์บริหารความเสี่ยงและเหตุฉุกเฉิน รพ.แม่ทา:</strong> เบอร์ภายใน 1910</li>
                        <li><strong>วิศวกรชีวการแพทย์ผู้ดูแลเครื่องมือ:</strong> เบอร์ภายใน 2211</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* 4. Directory Modal */}
                {activeModal === 'directory' && (
                  <div className="space-y-3">
                    <p className="font-semibold text-on-surface dark:text-white">สมุดโทรศัพท์และสายตรงภายในกลุ่มงานรังสีวิทยา โรงพยาบาลแม่ทา:</p>
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                      <div className="py-2 flex justify-between items-center text-xs">
                        <span><strong>เคาน์เตอร์บริการงานรังสีวิทยา</strong></span>
                        <span className="font-mono bg-surface-container px-2 py-0.5 rounded">เบอร์ภายใน: 1101</span>
                      </div>
                      <div className="py-2 flex justify-between items-center text-xs">
                        <span><strong>ห้องตรวจเอกซเรย์ทั่วไป (X-ray Room 1)</strong></span>
                        <span className="font-mono bg-surface-container px-2 py-0.5 rounded">เบอร์ภายใน: 1102</span>
                      </div>
                      <div className="py-2 flex justify-between items-center text-xs">
                        <span><strong>ห้องเอกซเรย์ระบบเคลื่อนที่ (Portable X-ray)</strong></span>
                        <span className="font-mono bg-surface-container px-2 py-0.5 rounded">เบอร์ภายใน: 1103</span>
                      </div>
                      <div className="py-2 flex justify-between items-center text-xs">
                        <span><strong>สำนักงานรังสีแพทย์ / เจ้าหน้าที่รังสีเทคนิค</strong></span>
                        <span className="font-mono bg-surface-container px-2 py-0.5 rounded">เบอร์ภายใน: 1104</span>
                      </div>
                      <div className="py-2 flex justify-between items-center text-xs">
                        <span><strong>หัวหน้างานรังสีเทคนิค</strong></span>
                        <span className="font-mono bg-surface-container px-2 py-0.5 rounded">เบอร์ภายใน: 1100</span>
                      </div>
                    </div>
                    <div className="p-3 bg-teal-500/5 rounded-xl border border-teal-500/10 text-xs">
                      <strong>หมายเหตุ:</strong> การติดต่อภายนอกจากโทรศัพท์ในระบบ ให้กด 9 นำหน้าตามด้วยหมายเลขปลายทาง
                    </div>
                  </div>
                )}

                {/* 5. Support Modal */}
                {activeModal === 'support' && (
                  <div className="space-y-3">
                    <p className="text-sm">หากคุณพบปัญหาระบบไอที, ระบบบันทึกฟอร์มไม่ทำงาน หรือการดึงข้อมูลจาก Dashboard ผิดพลาด:</p>
                    <div className="space-y-3">
                      <div className="p-3.5 bg-gray-50 dark:bg-[#0c1827] rounded-xl border border-outline-variant/50">
                        <h4 className="font-bold text-on-surface dark:text-white text-xs">ผู้พัฒนาระบบกลางกลุ่มงานรังสี</h4>
                        <p className="text-xs text-on-surface-variant dark:text-gray-400 mt-1">
                          คุณสิทธิศักดิ์ เลาหกุล (กลุ่มงานเทคนิคบริการและสารสนเทศ โรงพยาบาลแม่ทา)<br />
                          อีเมลติดต่อ: sittisak.laohakool@gmail.com
                        </p>
                      </div>
                      <div className="p-3.5 bg-gray-50 dark:bg-[#0c1827] rounded-xl border border-outline-variant/50">
                        <h4 className="font-bold text-on-surface dark:text-white text-xs">ศูนย์คอมพิวเตอร์และสารสนเทศ โรงพยาบาลแม่ทา</h4>
                        <p className="text-xs text-on-surface-variant dark:text-gray-400 mt-1">
                          บริการประสานงานโครงข่ายเครือข่ายภายใน (LAN/Wi-Fi/VPN) และระบบสารสนเทศโรงพยาบาล (HIS)<br />
                          เบอร์โทรศัพท์ภายใน: 2222
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. Privacy Modal */}
                {activeModal === 'privacy' && (
                  <div className="space-y-3 text-xs md:text-sm">
                    <p className="font-bold text-on-surface dark:text-white">พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA):</p>
                    <p>
                      หน่วยงานรังสีเทคนิค โรงพยาบาลแม่ทา มุ่งมั่นและตระหนักถึงความปลอดภัยของข้อมูลส่วนบุคคลของผู้ป่วยและเจ้าหน้าที่ทุกท่านเป็นอันดับแรก:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>การเก็บข้อมูล:</strong> เอกสารฟอร์มความยินยอมหญิงตั้งครรภ์และปริมาณรังสี จะใช้เฉพาะเพื่อวัตถุประสงค์ในการดูแลรักษาทางการแพทย์และส่งเสริมความปลอดภัยทางสุขภาพตามระเบียบของโรงพยาบาลเท่านั้น</li>
                      <li><strong>ความปลอดภัย:</strong> ระบบได้รับการคุ้มครองด้วยการเข้ารหัสข้อมูลที่ได้มาตรฐานสูงสุด และสิทธิ์การเข้าถึงแบบเฉพาะเจาะจงเฉพาะเจ้าหน้าที่ผู้รับผิดชอบโดยตรง</li>
                      <li><strong>การถอนความยินยอม:</strong> บุคลากรหรือผู้รับบริการ สามารถแจ้งความประสงค์ขอตรวจสอบ แก้ไข หรือลบข้อมูลส่วนบุคคลตามสิทธิ์ของท่านได้โดยการติดต่อฝ่ายบริหารจัดการสารสนเทศ</li>
                    </ul>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="flex-shrink-0 border-t border-gray-100 dark:border-gray-800 pt-4 mt-4 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-secondary text-white hover:bg-secondary-container hover:text-on-secondary-container rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  ตกลง / เข้าใจแล้ว
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
