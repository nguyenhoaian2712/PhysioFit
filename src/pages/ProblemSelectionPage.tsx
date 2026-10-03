import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle,
  Play
} from 'lucide-react';
import { BODY_REGIONS } from '../data/bodyRegions';
import { PROBLEMS_DATA } from '../data/problems';
import { EXERCISES_DATA } from '../data/exercises';
import { BodyRegionId, ProblemCondition } from '../types';
import { ExerciseCard } from '../components/ExerciseCard';

interface ProblemSelectionPageProps {
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

export const ProblemSelectionPage: React.FC<ProblemSelectionPageProps> = ({
  isBookmarked,
  onToggleBookmark
}) => {
  const { regionId } = useParams<{ regionId: string }>();
  const navigate = useNavigate();

  const selectedRegion = BODY_REGIONS.find((r) => r.id === regionId) || BODY_REGIONS[0];
  const regionProblems = PROBLEMS_DATA.filter((p) => p.bodyRegionId === selectedRegion.id);

  const [activeProblemId, setActiveProblemId] = useState<string>(
    regionProblems.length > 0 ? regionProblems[0].id : ''
  );

  const activeProblem = PROBLEMS_DATA.find((p) => p.id === activeProblemId) || regionProblems[0];

  // Exercises matching the selected problem or the region
  const matchingExercises = activeProblem
    ? EXERCISES_DATA.filter((e) => e.problemIds.includes(activeProblem.id))
    : EXERCISES_DATA.filter((e) => e.bodyRegionId === selectedRegion.id);

  return (
    <div className="space-y-8 py-4 sm:py-6">
      {/* Back to Body Map link */}
      <div className="flex items-center justify-between">
        <Link
          to="/body-map"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#31465A] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Sơ đồ cơ thể</span>
        </Link>

        {/* Region selector pill dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#31465A]/70 hidden sm:inline">Vùng đang xem:</span>
          <select
            value={selectedRegion.id}
            onChange={(e) => navigate(`/problem-select/${e.target.value}`)}
            className="text-xs font-bold text-[#31465A] bg-[#D9F0FF] border border-[#89B9E6]/40 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
          >
            {BODY_REGIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.vietnameseName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Region Header Card */}
      <div className="bg-gradient-to-r from-[#D9F0FF]/60 via-[#FFFDF7] to-[#FFFDF7] p-6 sm:p-8 rounded-3xl border border-[#89B9E6]/30 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C7DFA3] text-[#31465A] text-xs font-bold">
            <Activity className="w-3.5 h-3.5" />
            <span>Xác định vấn đề</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#31465A]">
            {selectedRegion.vietnameseName}
          </h1>
          <p className="text-xs sm:text-sm text-[#31465A]/80 max-w-2xl leading-relaxed">
            {selectedRegion.description}
          </p>
        </div>
      </div>

      {/* Main Condition Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#31465A] flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#89B9E6]" />
          <span>Vấn đề / Bệnh lý thường gặp ở vùng này:</span>
        </h2>

        {regionProblems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regionProblems.map((problem) => {
              const isSelected = activeProblem?.id === problem.id;
              return (
                <div
                  key={problem.id}
                  onClick={() => setActiveProblemId(problem.id)}
                  className={`p-5 rounded-3xl border text-left cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#FFFDF7] border-[#31465A] ring-2 ring-[#C7DFA3] shadow-md'
                      : 'bg-[#FFFDF7] border-[#31465A]/10 hover:border-[#89B9E6] hover:bg-[#D9F0FF]/20 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-base text-[#31465A]">
                      {problem.name}
                    </h3>
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                        isSelected ? 'bg-[#31465A] text-[#C7DFA3]' : 'bg-[#D9F0FF] text-[#31465A]'
                      }`}
                    >
                      ✓
                    </span>
                  </div>

                  <p className="text-xs text-[#31465A]/80 mt-2 leading-relaxed">
                    {problem.description}
                  </p>

                  {/* Symptoms */}
                  <div className="mt-3 pt-3 border-t border-[#31465A]/10">
                    <p className="text-[11px] font-bold text-[#31465A]/70 mb-1">
                      Triệu chứng điển hình:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {problem.symptoms.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg bg-[#D9F0FF]/50 text-[#31465A] text-[11px]"
                        >
                          • {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Goals */}
                  <div className="mt-3">
                    <p className="text-[11px] font-bold text-[#31465A]/70 mb-1">
                      Mục tiêu phục hồi:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {problem.recommendedGoals.map((g, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-[#C7DFA3]/40 text-[#31465A] text-[11px] font-medium"
                        >
                          🎯 {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 bg-[#D9F0FF]/30 rounded-3xl text-center text-xs text-[#31465A]/70">
            Hiện tại các bài tập vùng này đang được phân loại tổng quan bên dưới.
          </div>
        )}
      </div>

      {/* Matching Exercises Section */}
      <div className="space-y-6 pt-6 border-t border-[#31465A]/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-[#31465A] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C7DFA3]" />
              <span>
                Bài tập đề xuất cho {activeProblem ? `"${activeProblem.name}"` : selectedRegion.name}
              </span>
            </h3>
            <p className="text-xs text-[#31465A]/70">
              Có {matchingExercises.length} bài tập phù hợp trong thư viện
            </p>
          </div>
        </div>

        {matchingExercises.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                isBookmarked={isBookmarked(exercise.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-[#FFFDF7] rounded-3xl border border-[#31465A]/10 space-y-3">
            <p className="text-sm font-semibold text-[#31465A]">
              Chưa có bài tập riêng cho vấn đề này.
            </p>
            <Link
              to="/exercises"
              className="inline-block py-2 px-4 rounded-xl bg-[#31465A] text-[#FFFDF7] text-xs font-bold"
            >
              Xem tất cả 33 bài tập trong thư viện
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
