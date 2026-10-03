import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Volume2, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Activity, 
  Target,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { UserProfile, BodyRegionId } from '../types';
import { BODY_REGIONS } from '../data/bodyRegions';

interface ProfilePageProps {
  user: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onResetData: () => void;
  sparklesEnabled: boolean;
  onToggleSparkles: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onSaveProfile,
  onResetData,
  sparklesEnabled,
  onToggleSparkles
}) => {
  const [formData, setFormData] = useState<UserProfile>(user);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 py-4 sm:py-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C7DFA3] text-[#31465A] text-xs font-bold shadow-sm">
          <User className="w-3.5 h-3.5" />
          <span>Hồ sơ sức khỏe cá nhân</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#31465A] tracking-tight">
          Cài Đặt Tài Khoản & Mục Tiêu
        </h1>

        <p className="text-sm text-[#31465A]/80 leading-relaxed">
          Tùy chỉnh thông tin thể chất và cài đặt trải nghiệm luyện tập trên hệ thống PhysioFit.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Card */}
        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-[#31465A]/10 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-[#31465A] flex items-center gap-2">
            <User className="w-5 h-5 text-[#89B9E6]" />
            <span>Thông tin người dùng</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#31465A] mb-1.5">
                Họ và tên:
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 rounded-2xl border border-[#31465A]/15 bg-[#FFFDF7] text-sm text-[#31465A] focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#31465A] mb-1.5">
                Email liên hệ:
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 rounded-2xl border border-[#31465A]/15 bg-[#FFFDF7] text-sm text-[#31465A] focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#31465A] mb-1.5">
                Độ tuổi:
              </label>
              <input
                type="number"
                value={formData.age || ''}
                onChange={(e) =>
                  setFormData({ ...formData, age: parseInt(e.target.value, 10) || 0 })
                }
                className="w-full p-3 rounded-2xl border border-[#31465A]/15 bg-[#FFFDF7] text-sm text-[#31465A] focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#31465A] mb-1.5">
                Vùng cơ thể ưu tiên phục hồi:
              </label>
              <select
                value={formData.primaryRegion || 'neck'}
                onChange={(e) =>
                  setFormData({ ...formData, primaryRegion: e.target.value as BodyRegionId })
                }
                className="w-full p-3 rounded-2xl border border-[#31465A]/15 bg-[#FFFDF7] text-sm text-[#31465A] focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
              >
                {BODY_REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.vietnameseName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#31465A] mb-1.5">
              Tình trạng thể chất / Triệu chứng hiện tại:
            </label>
            <textarea
              value={formData.primaryConcern || ''}
              onChange={(e) => setFormData({ ...formData, primaryConcern: e.target.value })}
              rows={3}
              placeholder="VD: Đau mỏi đốt sống cổ sau 8 tiếng ngồi làm việc máy tính..."
              className="w-full p-3 rounded-2xl border border-[#31465A]/15 bg-[#FFFDF7] text-sm text-[#31465A] focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#31465A] mb-1.5">
              Mục tiêu thời gian luyện tập mỗi ngày: <strong className="text-[#31465A]">{formData.dailyGoalMinutes} phút</strong>
            </label>
            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={formData.dailyGoalMinutes}
              onChange={(e) =>
                setFormData({ ...formData, dailyGoalMinutes: parseInt(e.target.value, 10) })
              }
              className="w-full h-2.5 bg-[#D9F0FF] rounded-lg appearance-none cursor-pointer accent-[#31465A]"
            />
            <div className="flex justify-between text-[11px] text-[#31465A]/60 mt-1">
              <span>5 phút</span>
              <span>15 phút (Khuyến nghị)</span>
              <span>60 phút</span>
            </div>
          </div>
        </div>

        {/* Experience & Preferences Card */}
        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-[#31465A]/10 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-[#31465A] flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#89B9E6]" />
            <span>Tùy chỉnh trải nghiệm</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#D9F0FF]/30 border border-[#89B9E6]/20">
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#31465A]">
                  Hiệu ứng lấp lánh thư giãn (Sparkles)
                </h4>
                <p className="text-xs text-[#31465A]/70">
                  Hiển thị các hạt ánh sáng chuyển động êm dịu trên nền giao diện
                </p>
              </div>
              <button
                type="button"
                onClick={onToggleSparkles}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  sparklesEnabled ? 'bg-[#31465A]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-[#FFFDF7] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    sparklesEnabled ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Submit & Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <button
            type="submit"
            className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-[#31465A] text-[#FFFDF7] font-bold text-sm hover:bg-[#31465A]/90 transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <CheckCircle2 className="w-4 h-4 text-[#C7DFA3]" />
            <span>Lưu thay đổi hồ sơ</span>
          </button>

          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl animate-fadeIn">
              ✓ Đã lưu cài đặt thành công!
            </span>
          )}

          {/* Reset / Demo seed data */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn đặt lại toàn bộ dữ liệu demo về trạng thái ban đầu?')) {
                onResetData();
                window.location.reload();
              }
            }}
            className="text-xs text-rose-700 hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đặt lại toàn bộ dữ liệu mẫu</span>
          </button>
        </div>
      </form>
    </div>
  );
};
