import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  HeartPulse, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Layers,
  Activity
} from 'lucide-react';
import { EXERCISES_DATA } from '../data/exercises';
import { BODY_REGIONS } from '../data/bodyRegions';
import { ExerciseCard } from '../components/ExerciseCard';
import { BodyRegionId, DifficultyLevel } from '../types';

interface ExerciseRecommendationPageProps {
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

export const ExerciseRecommendationPage: React.FC<ExerciseRecommendationPageProps> = ({
  isBookmarked,
  onToggleBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'duration_asc' | 'duration_desc'>('default');

  const filteredExercises = useMemo(() => {
    return EXERCISES_DATA.filter((ex) => {
      // Search text match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        ex.title.toLowerCase().includes(query) ||
        ex.bodyRegionName.toLowerCase().includes(query) ||
        ex.tags.some((t) => t.toLowerCase().includes(query)) ||
        ex.problemNames.some((p) => p.toLowerCase().includes(query));

      // Region match
      const matchesRegion = selectedRegion === 'all' || ex.bodyRegionId === selectedRegion;

      // Difficulty match
      const matchesDiff = selectedDifficulty === 'all' || ex.difficulty === selectedDifficulty;

      return matchesSearch && matchesRegion && matchesDiff;
    }).sort((a, b) => {
      if (sortBy === 'duration_asc') return a.durationMinutes - b.durationMinutes;
      if (sortBy === 'duration_desc') return b.durationMinutes - a.durationMinutes;
      return 0;
    });
  }, [searchQuery, selectedRegion, selectedDifficulty, sortBy]);

  return (
    <div className="space-y-8 py-4 sm:py-6">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C7DFA3] text-[#31465A] text-xs font-bold shadow-sm">
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Thư viện phục hồi chuẩn hóa</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#31465A] tracking-tight">
          Danh Sách Bài Tập Phục Hồi Chức Năng
        </h1>

        <p className="text-sm text-[#31465A]/80 leading-relaxed">
          Tổng hợp 33+ bài tập chuyên sâu hỗ trợ các bệnh lý cơ xương khớp: cổ vai gáy, đông cứng khớp vai, cong vẹo cột sống Schroth, đau thắt lưng McKenzie, bàn chân bẹt, ống cổ tay và sau mổ dây chằng gối.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#FFFDF7] rounded-3xl p-5 sm:p-6 border border-[#31465A]/10 shadow-sm space-y-4">
        {/* Search row */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#31465A]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên bài tập, vùng cơ thể, bệnh lý (ví dụ: McKenzie, Schroth, cổ rùa, ống cổ tay...)"
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-[#31465A]/15 bg-[#FFFDF7] text-sm text-[#31465A] focus:outline-none focus:ring-2 focus:ring-[#89B9E6] shadow-inner"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-2 border-t border-[#31465A]/10">
          {/* Body Region Selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-[#31465A]/70 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Vùng:
            </span>
            <button
              onClick={() => setSelectedRegion('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedRegion === 'all'
                  ? 'bg-[#31465A] text-[#FFFDF7] shadow-sm'
                  : 'bg-[#D9F0FF]/50 text-[#31465A] hover:bg-[#D9F0FF]'
              }`}
            >
              Tất cả
            </button>
            {BODY_REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedRegion === r.id
                    ? 'bg-[#31465A] text-[#FFFDF7] shadow-sm'
                    : 'bg-[#D9F0FF]/50 text-[#31465A] hover:bg-[#D9F0FF]'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>

          {/* Difficulty & Sort Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-[#D9F0FF]/40 p-1 rounded-xl border border-[#31465A]/10 text-xs">
              <span className="px-2 font-medium text-[#31465A]/70">Độ khó:</span>
              {['all', 'Dễ', 'Trung bình', 'Nâng cao'].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    selectedDifficulty === d
                      ? 'bg-[#31465A] text-[#FFFDF7] shadow-xs'
                      : 'text-[#31465A]/70 hover:text-[#31465A]'
                  }`}
                >
                  {d === 'all' ? 'Tất cả' : d}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold text-[#31465A] bg-[#D9F0FF]/40 border border-[#31465A]/10 rounded-xl px-3 py-2 focus:outline-none"
            >
              <option value="default">Sắp xếp: Mặc định</option>
              <option value="duration_asc">Thời lượng: Ngắn nhất</option>
              <option value="duration_desc">Thời lượng: Dài nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm font-semibold text-[#31465A]">
          Tìm thấy <span className="font-bold text-[#31465A]">{filteredExercises.length}</span> bài tập phù hợp
        </p>

        {(selectedRegion !== 'all' || selectedDifficulty !== 'all' || searchQuery !== '') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('all');
              setSelectedDifficulty('all');
              setSortBy('default');
            }}
            className="text-xs font-bold text-[#31465A] hover:underline"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Exercise Cards Grid */}
      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              isBookmarked={isBookmarked(exercise.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#FFFDF7] rounded-3xl border border-[#31465A]/10 p-8 space-y-3">
          <p className="text-base font-bold text-[#31465A]">
            Không tìm thấy bài tập nào phù hợp với điều kiện tìm kiếm.
          </p>
          <p className="text-xs text-[#31465A]/70">
            Hãy thử tìm kiếm bằng từ khóa khác hoặc bỏ chọn một số bộ lọc.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('all');
              setSelectedDifficulty('all');
            }}
            className="mt-2 py-2.5 px-5 rounded-xl bg-[#31465A] text-[#FFFDF7] text-xs font-bold"
          >
            Xem toàn bộ bài tập
          </button>
        </div>
      )}
    </div>
  );
};
