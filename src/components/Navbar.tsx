import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  User, 
  Bookmark, 
  TrendingUp, 
  HeartPulse, 
  Menu, 
  X, 
  Compass,
  Sparkles
} from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile;
  sparklesEnabled: boolean;
  onToggleSparkles: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  sparklesEnabled,
  onToggleSparkles,
  onOpenAuthModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Trang chủ', icon: Compass },
    { path: '/body-map', label: 'Sơ đồ cơ thể', icon: Activity },
    { path: '/exercises', label: 'Thư viện bài tập', icon: HeartPulse },
    { path: '/rom-tracking', label: 'Theo dõi ROM & Đau', icon: Activity },
    { path: '/progress', label: 'Tiến độ', icon: TrendingUp },
    { path: '/my-exercises', label: 'Bài tập của tôi', icon: Bookmark },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#31465A]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-[#31465A] flex items-center justify-center text-[#FFFDF7] shadow-md group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 text-[#C7DFA3]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#31465A] flex items-center gap-1">
                Physio<span className="text-[#31465A]/80 font-medium">Fit</span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#C7DFA3]"></span>
              </span>
              <p className="text-[10px] text-[#31465A]/70 hidden sm:block">Phục hồi vận động thông minh</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#D9F0FF] text-[#31465A] font-semibold'
                      : 'text-[#31465A]/80 hover:text-[#31465A] hover:bg-[#D9F0FF]/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#31465A]' : 'text-[#31465A]/70'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <AudioPlayer sparklesEnabled={sparklesEnabled} onToggleSparkles={onToggleSparkles} />

            <Link
              to="/profile"
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-[#31465A]/15 bg-[#D9F0FF]/40 hover:bg-[#D9F0FF] transition-all group"
            >
              <div className="w-7 h-7 rounded-full bg-[#31465A] text-[#FFFDF7] flex items-center justify-center text-xs font-bold">
                {user.name ? user.name.charAt(0) : 'U'}
              </div>
              <span className="text-xs font-semibold text-[#31465A] hidden md:inline truncate max-w-[100px]">
                {user.name || 'Tài khoản'}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#31465A] hover:bg-[#D9F0FF] transition-colors"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF7] border-b border-[#31465A]/10 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-fadeIn">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  active
                    ? 'bg-[#D9F0FF] text-[#31465A] font-bold'
                    : 'text-[#31465A]/80 hover:bg-[#D9F0FF]/40'
                }`}
              >
                <Icon className="w-5 h-5 text-[#31465A]" />
                {item.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-[#31465A]/10 flex gap-2">
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 px-3 rounded-xl bg-[#31465A] text-[#FFFDF7] text-sm font-medium"
            >
              Hồ sơ của tôi
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
