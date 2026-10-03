import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  HeartPulse, 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Layers,
  Compass
} from 'lucide-react';
import { BodyMap } from '../components/BodyMap';
import { ExerciseCard } from '../components/ExerciseCard';
import { EXERCISES_DATA } from '../data/exercises';
import { BodyRegionId } from '../types';

interface LandingPageProps {
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  isBookmarked,
  onToggleBookmark
}) => {
  const navigate = useNavigate();

  const handleSelectRegion = (regionId: BodyRegionId) => {
    navigate(`/problem-select/${regionId}`);
  };

  const featuredExercises = EXERCISES_DATA.filter((e) => e.isPopular).slice(0, 6);

  return (
    <div className="space-y-20 py-6 sm:py-10">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#D9F0FF]/40 via-[#FFFDF7] to-transparent p-6 sm:p-12 border border-[#89B9E6]/30">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C7DFA3] text-[#31465A] text-xs sm:text-sm font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-[#31465A]" />
            <span>Nền tảng phục hồi vận động cơ xương khớp</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#31465A] tracking-tight leading-[1.15]">
            Tập đúng hơn. Theo dõi tốt hơn. <br className="hidden sm:inline" />
            <span className="text-[#31465A] underline decoration-[#C7DFA3] decoration-wavy decoration-2">
              Phục hồi chủ động hơn.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#31465A]/80 max-w-2xl mx-auto leading-relaxed">
            PhysioFit hỗ trợ bạn lựa chọn bài tập phục hồi chức năng chuẩn y khoa theo từng vùng cơ thể và đồng hành theo dõi tiến trình giảm đau cùng biên độ vận động.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
            <Link
              to="/body-map"
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-8 rounded-2xl bg-[#31465A] text-[#FFFDF7] font-bold text-base hover:bg-[#31465A]/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
            >
              <span>Bắt đầu ngay</span>
              <ArrowRight className="w-5 h-5 text-[#C7DFA3]" />
            </Link>

            <Link
              to="/exercises"
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-8 rounded-2xl bg-[#FFFDF7] border-2 border-[#31465A]/20 text-[#31465A] font-bold text-base hover:bg-[#D9F0FF]/40 transition-colors"
            >
              <span>Xem thư viện bài tập</span>
            </Link>
          </div>

          {/* Quick trust metrics */}
          <div className="pt-8 grid grid-cols-3 gap-2 sm:gap-6 border-t border-[#31465A]/10 max-w-xl mx-auto text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#31465A]">33+</p>
              <p className="text-[11px] sm:text-xs text-[#31465A]/70 font-medium">Bài tập chuẩn hóa</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#31465A]">16</p>
              <p className="text-[11px] sm:text-xs text-[#31465A]/70 font-medium">Vùng cơ thể chi tiết</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-[#31465A]">100%</p>
              <p className="text-[11px] sm:text-xs text-[#31465A]/70 font-medium">Theo dõi chủ động</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE PILLARS (3 Điểm nổi bật) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#31465A]">
            Quy trình phục hồi 3 bước đơn giản
          </h2>
          <p className="text-xs sm:text-sm text-[#31465A]/70 mt-1">
            Thiết kế trực quan, dễ thực hiện giúp bạn lấy lại sự linh hoạt mỗi ngày
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-[#31465A]/10 shadow-sm hover:border-[#89B9E6] transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D9F0FF] flex items-center justify-center text-[#31465A] font-bold text-lg">
              <Activity className="w-6 h-6 text-[#31465A]" />
            </div>
            <span className="text-xs font-bold text-[#89B9E6] uppercase tracking-wider">Bước 1</span>
            <h3 className="text-lg font-bold text-[#31465A]">Chọn vùng cơ thể</h3>
            <p className="text-xs sm:text-sm text-[#31465A]/80 leading-relaxed">
              Nhấp trực tiếp vào sơ đồ giải phẫu học trực quan để chỉ định chính xác vùng đau hoặc khớp cần hồi phục.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-[#31465A]/10 shadow-sm hover:border-[#89B9E6] transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C7DFA3] flex items-center justify-center text-[#31465A] font-bold text-lg">
              <HeartPulse className="w-6 h-6 text-[#31465A]" />
            </div>
            <span className="text-xs font-bold text-[#31465A] uppercase tracking-wider">Bước 2</span>
            <h3 className="text-lg font-bold text-[#31465A]">Nhận bài tập phù hợp</h3>
            <p className="text-xs sm:text-sm text-[#31465A]/80 leading-relaxed">
              Hệ thống lọc danh sách video bài tập chuyên khoa khớp, hướng dẫn động tác từng bước chi tiết và an toàn.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-[#31465A]/10 shadow-sm hover:border-[#89B9E6] transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#89B9E6]/30 flex items-center justify-center text-[#31465A] font-bold text-lg">
              <TrendingUp className="w-6 h-6 text-[#31465A]" />
            </div>
            <span className="text-xs font-bold text-[#31465A] uppercase tracking-wider">Bước 3</span>
            <h3 className="text-lg font-bold text-[#31465A]">Theo dõi tiến trình</h3>
            <p className="text-xs sm:text-sm text-[#31465A]/80 leading-relaxed">
              Ghi nhận mức độ đau theo thang điểm 0-10 và đo lường sự cải thiện biên độ khớp (ROM) sau mỗi buổi tập.
            </p>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE BODY MAP SECTION */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#D9F0FF] text-[#31465A]">
            Tương tác trực quan
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#31465A] mt-2">
            Khám phá qua sơ đồ cơ thể
          </h2>
          <p className="text-xs sm:text-sm text-[#31465A]/70 mt-1">
            Chọn một bộ phận bên dưới để bắt đầu tìm kiếm bài tập phù hợp
          </p>
        </div>

        <BodyMap onSelectRegion={handleSelectRegion} />
      </section>

      {/* 4. FEATURED POPULAR EXERCISES */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#31465A]">
              Bài tập phục hồi tiêu biểu
            </h2>
            <p className="text-xs sm:text-sm text-[#31465A]/70 mt-1">
              Được hướng dẫn chi tiết bởi chuyên gia phục hồi chức năng
            </p>
          </div>

          <Link
            to="/exercises"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#31465A] hover:underline"
          >
            <span>Xem tất cả 33 bài tập</span>
            <ArrowRight className="w-4 h-4 text-[#31465A]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              isBookmarked={isBookmarked(exercise.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
