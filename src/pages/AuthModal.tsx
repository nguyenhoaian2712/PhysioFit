import React, { useState } from 'react';
import { X, User, Lock, Mail, Activity, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: Partial<UserProfile>) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('Nguyễn Văn An');
  const [email, setEmail] = useState('nguyenvanan@example.com');
  const [password, setPassword] = useState('password123');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      name: name || 'Người dùng PhysioFit',
      email: email || 'user@example.com'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#31465A]/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FFFDF7] rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#31465A]/15 shadow-2xl relative overflow-hidden animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#31465A]/60 hover:text-[#31465A] hover:bg-[#D9F0FF] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#31465A] text-[#FFFDF7] mb-3 shadow-md">
            <Activity className="w-6 h-6 text-[#C7DFA3]" />
          </div>
          <h3 className="text-xl font-bold text-[#31465A]">
            {isRegister ? 'Đăng Ký Tài Khoản PhysioFit' : 'Đăng Nhập Tài Khoản'}
          </h3>
          <p className="text-xs text-[#31465A]/70 mt-1">
            Lưu trữ tiến trình tập luyện và dữ liệu đo ROM của bạn
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-[#31465A] mb-1">
                Họ và tên
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#31465A]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#31465A]/15 bg-[#FFFDF7] text-xs text-[#31465A] focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#31465A] mb-1">
              Địa chỉ Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#31465A]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#31465A]/15 bg-[#FFFDF7] text-xs text-[#31465A] focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#31465A] mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#31465A]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#31465A]/15 bg-[#FFFDF7] text-xs text-[#31465A] focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#31465A] text-[#FFFDF7] text-xs font-bold hover:bg-[#31465A]/90 transition-all shadow-md mt-2"
          >
            {isRegister ? 'Tạo tài khoản' : 'Đăng nhập ngay'}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-[#31465A]/70">
          {isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}{' '}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="font-bold text-[#31465A] hover:underline"
          >
            {isRegister ? 'Đăng nhập' : 'Đăng ký miễn phí'}
          </button>
        </div>
      </div>
    </div>
  );
};
