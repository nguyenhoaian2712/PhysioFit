import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  HeartPulse, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Play, 
  ArrowRight, 
  Sparkles, 
  Compass,
  Calendar
} from 'lucide-react';
import { UserProfile, PainRecord, ROMRecord, WorkoutSession, BodyRegionId } from '../types';
import { EXERCISES_DATA } from '../data/exercises';
import { BODY_REGIONS } from '../data/bodyRegions';
import { ExerciseCard } from '../components/ExerciseCard';

interface HomePageProps {
  user: UserProfile;
  painRecords: PainRecord[];
  romRecords: ROMRecord[];
  sessions: WorkoutSession[];
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  user,
  painRecords,
  romRecords,
  sessions,
  isBookmarked,
  onToggleBookmark
}) => {
  const navigate = useNavigate();

  // Compute stats
  const totalMinutes = Math.round(
    sessions.reduce((acc, s) => acc + s.durationSeconds, 0) / 60
  );
  const completedCount = sessions.filter((s) => s.completed).length;
  const latestPain = painRecords[0];
  const latestROM = romRecords[0];

  // User's recommended exercises based on primaryRegion or popular
  const recommendedExercises = user.primaryRegion
    ? EXERCISES_DATA.filter((e) => e.bodyRegionId === user.primaryRegion).slice(0, 3)
    : EXERCISES_DATA.filter((e) => e.isPopular).slice(0, 3);

  return (
    <div className="space-y-10 py-4 sm:py-6">
      {/* 1. Welcome & Daily Goal Banner */}
      <section className="bg-gradient-to-r from-[#31465A] via-[#31465A] to-[#3a546d] rounded-3xl p-6 sm:p-8 text-[#FFFDF7] shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#89B9E6]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C7DFA3] text-[#31465A] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chào mừng trở lại</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Xin chào, {user.name || 'Bạn'}! 👋
            </h1>

            <p className="text-xs sm:text-sm text-[#FFFDF7]/80 max-w-lg leading-relaxed">
              Mục tiêu hôm nay: <strong className="text-[#C7DFA3]">{user.dailyGoalMinutes} phút</strong> luyện tập phục hồi. Duy trì đều đặn để cải thiện cột sống và khớp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/body-map"
              className="py-3 px-5 rounded-2xl bg-[#C7DFA3] text-[#31465A] text-xs sm:text-sm font-bold hover:bg-[#C7DFA3]/90 transition-all flex items-center gap-2 shadow-sm"
            >
              <Activity className="w-4 h-4" />
              <span>Khám phá Body Map</span>
            </Link>

            <Link
              to="/session/ex-02"
              className="py-3 px-5 rounded-2xl bg-[#FFFDF7]/15 border border-[#FFFDF7]/25 text-[#FFFDF7] text-xs sm:text-sm font-semibold hover:bg-[#FFFDF7]/25 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-[#FFFDF7]" />
              <span>Tập ngay</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#FFFDF7]/15">
          <div className="bg-[#FFFDF7]/10 p-3 rounded-2xl">
            <p className="text-[11px] text-[#FFFDF7]/70">Tổng thời gian tập</p>
            <p className="text-xl font-bold text-[#C7DFA3] mt-0.5">{totalMinutes} phút</p>
          </div>
          <div className="bg-[#FFFDF7]/10 p-3 rounded-2xl">
            <p className="text-[11px] text-[#FFFDF7]/70">Buổi tập hoàn thành</p>
            <p className="text-xl font-bold text-[#FFFDF7] mt-0.5">{completedCount} buổi</p>
          </div>
          <div className="bg-[#FFFDF7]/10 p-3 rounded-2xl">
            <p className="text-[11px] text-[#FFFDF7]/70">Mức đau gần nhất</p>
            <p className="text-xl font-bold text-[#C7DFA3] mt-0.5">
              {latestPain ? `${latestPain.painLevelAfter ?? latestPain.painLevelBefore}/10` : 'Chưa có'}
            </p>
          </div>
          <div className="bg-[#FFFDF7]/10 p-3 rounded-2xl">
            <p className="text-[11px] text-[#FFFDF7]/70">Số đo ROM gần nhất</p>
            <p className="text-xl font-bold text-[#FFFDF7] mt-0.5">
              {latestROM ? `${latestROM.measuredAngle}°` : 'Chưa có'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Body Region Quick Navigator */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold text-[#31465A] flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#89B9E6]" />
            <span>Chọn nhanh vị trí khớp cần tập</span>
          </h2>
          <Link
            to="/body-map"
            className="text-xs font-bold text-[#31465A] hover:underline flex items-center gap-1"
          >
            <span>Mở sơ đồ 3D</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {BODY_REGIONS.slice(0, 6).map((region) => (
            <button
              key={region.id}
              onClick={() => navigate(`/problem-select/${region.id}`)}
              className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#31465A]/10 hover:border-[#89B9E6] hover:bg-[#D9F0FF]/30 transition-all text-left flex flex-col justify-between group shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-[#D9F0FF] flex items-center justify-center text-[#31465A] mb-2 group-hover:scale-110 transition-transform">
                <Activity className="w-4 h-4 text-[#31465A]" />
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm text-[#31465A]">{region.name}</p>
                <p className="text-[10px] text-[#31465A]/60">{region.problemCount} nhóm bệnh</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Recommended Exercises Today */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#31465A] flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-[#C7DFA3]" />
              <span>Gợi ý luyện tập hôm nay</span>
            </h2>
            <p className="text-xs text-[#31465A]/70">
              Các bài tập được tối ưu cho vùng quan tâm của bạn
            </p>
          </div>
          <Link
            to="/exercises"
            className="text-xs font-bold text-[#31465A] hover:underline flex items-center gap-1"
          >
            <span>Tất cả bài tập</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              isBookmarked={isBookmarked(exercise.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      </section>

      {/* 4. Tracking Shortcuts (Pain + ROM) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pain diary snippet */}
        <div className="bg-[#FFFDF7] p-6 rounded-3xl border border-[#31465A]/10 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-base text-[#31465A] flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-[#C7DFA3]" />
                <span>Nhật ký mức độ đau (VAS)</span>
              </h3>
              <p className="text-xs text-[#31465A]/70 mt-0.5">
                Theo dõi sự thuyên giảm cơn đau qua từng ngày
              </p>
            </div>
            <Link
              to="/progress"
              className="text-xs font-bold text-[#31465A] hover:underline"
            >
              Chi tiết
            </Link>
          </div>

          <div className="space-y-2">
            {painRecords.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-2xl bg-[#D9F0FF]/30 border border-[#89B9E6]/20 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-[#31465A]">{p.bodyRegionName}</p>
                  <p className="text-[10px] text-[#31465A]/60">
                    {new Date(p.timestamp).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#31465A] text-sm">
                    {p.painLevelBefore}/10
                    {p.painLevelAfter !== undefined && (
                      <span className="text-[#31465A] font-semibold text-xs ml-1">
                        → {p.painLevelAfter}/10
                      </span>
                    )}
                  </span>
                  <p className="text-[10px] text-[#31465A]/70">
                    {p.painLevelAfter !== undefined && p.painLevelAfter < p.painLevelBefore
                      ? 'Giảm đau tốt'
                      : 'Đang duy trì'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/rom-tracking"
            className="block text-center py-2.5 px-4 rounded-xl bg-[#D9F0FF] text-[#31465A] font-semibold text-xs hover:bg-[#D9F0FF]/80 transition-colors"
          >
            + Ghi nhận mức đau hôm nay
          </Link>
        </div>

        {/* ROM snippet */}
        <div className="bg-[#FFFDF7] p-6 rounded-3xl border border-[#31465A]/10 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-base text-[#31465A] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#89B9E6]" />
                <span>Biên độ khớp (ROM)</span>
              </h3>
              <p className="text-xs text-[#31465A]/70 mt-0.5">
                Độ linh hoạt và góc mở của các khớp vận động
              </p>
            </div>
            <Link
              to="/rom-tracking"
              className="text-xs font-bold text-[#31465A] hover:underline"
            >
              Chi tiết
            </Link>
          </div>

          <div className="space-y-2">
            {romRecords.slice(0, 3).map((r) => (
              <div
                key={r.id}
                className="p-3 rounded-2xl bg-[#D9F0FF]/30 border border-[#89B9E6]/20 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-[#31465A]">{r.jointName}</p>
                  <p className="text-[10px] text-[#31465A]/60">{r.movementType}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#31465A] text-sm">{r.measuredAngle}°</span>
                  <span className="text-[10px] text-[#31465A]/60"> / {r.targetAngle}°</span>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/rom-tracking"
            className="block text-center py-2.5 px-4 rounded-xl bg-[#31465A] text-[#FFFDF7] font-semibold text-xs hover:bg-[#31465A]/90 transition-colors"
          >
            + Đo góc ROM mới
          </Link>
        </div>
      </section>
    </div>
  );
};
