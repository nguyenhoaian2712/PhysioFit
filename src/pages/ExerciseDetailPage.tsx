import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  Bookmark, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Share2,
  Sparkles,
  Layers,
  HeartPulse
} from 'lucide-react';
import { EXERCISES_DATA } from '../data/exercises';
import { Exercise } from '../types';

interface ExerciseDetailPageProps {
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

export const ExerciseDetailPage: React.FC<ExerciseDetailPageProps> = ({
  isBookmarked,
  onToggleBookmark
}) => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();

  const exercise = EXERCISES_DATA.find((e) => e.id === exerciseId) || EXERCISES_DATA[0];
  const bookmarked = isBookmarked(exercise.id);

  // Related exercises
  const relatedExercises = EXERCISES_DATA.filter(
    (e) => e.bodyRegionId === exercise.bodyRegionId && e.id !== exercise.id
  ).slice(0, 3);

  return (
    <div className="space-y-8 py-4 sm:py-6 max-w-5xl mx-auto">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#31465A] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleBookmark(exercise.id)}
            className={`flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
              bookmarked
                ? 'bg-[#C7DFA3] text-[#31465A] shadow-sm'
                : 'bg-[#D9F0FF] text-[#31465A] hover:bg-[#D9F0FF]/80'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-[#31465A]' : ''}`} />
            <span>{bookmarked ? 'Đã lưu' : 'Lưu bài tập'}</span>
          </button>
        </div>
      </div>

      {/* Video Player Box */}
      <div className="bg-[#31465A] rounded-3xl overflow-hidden shadow-xl border border-[#31465A]/20">
        <div className="relative aspect-video w-full">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${exercise.video.videoId}?rel=0&modestbranding=1`}
            title={exercise.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </div>

      {/* Exercise Main Header Info */}
      <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-[#31465A]/10 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#31465A] text-[#FFFDF7] text-xs font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#C7DFA3]" />
            {exercise.bodyRegionName}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#C7DFA3] text-[#31465A] text-xs font-bold">
            {exercise.difficulty}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#D9F0FF] text-[#31465A] text-xs font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {exercise.durationMinutes} phút
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#31465A] tracking-tight leading-snug">
            {exercise.title}
          </h1>

          {exercise.problemNames.length > 0 && (
            <p className="text-sm text-[#31465A]/70 mt-2 font-medium">
              Chỉ định phục hồi: <span className="text-[#31465A] font-bold">{exercise.problemNames.join(', ')}</span>
            </p>
          )}
        </div>

        {/* Primary CTA Start Workout */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#D9F0FF]/60 via-[#FFFDF7] to-[#C7DFA3]/40 border border-[#89B9E6]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[#31465A]/70">Khuyến nghị thực hiện</p>
            <p className="font-bold text-sm text-[#31465A] mt-0.5">{exercise.repsSets}</p>
          </div>

          <Link
            to={`/session/${exercise.id}`}
            className="w-full sm:w-auto py-3 px-8 rounded-2xl bg-[#31465A] text-[#FFFDF7] font-bold text-sm hover:bg-[#31465A]/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Play className="w-4 h-4 fill-[#C7DFA3] text-[#C7DFA3]" />
            <span>Bắt đầu buổi tập có đồng hồ đếm</span>
          </Link>
        </div>
      </div>

      {/* Two Column Grid: Instructions & Goals */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Step-by-Step Instructions */}
        <div className="md:col-span-7 bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-[#31465A]/10 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-[#31465A] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#89B9E6]" />
            <span>Hướng dẫn thực hiện từng bước</span>
          </h3>

          <div className="space-y-4">
            {exercise.instructions.map((step) => (
              <div
                key={step.stepNumber}
                className="p-4 rounded-2xl bg-[#D9F0FF]/20 border border-[#89B9E6]/20 flex items-start gap-3.5"
              >
                <div className="w-7 h-7 rounded-xl bg-[#31465A] text-[#FFFDF7] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {step.stepNumber}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-xs sm:text-sm text-[#31465A]">
                      {step.title}
                    </h4>
                    {step.durationSeconds && (
                      <span className="text-[10px] font-semibold text-[#31465A]/70 px-2 py-0.5 rounded-md bg-[#FFFDF7]">
                        ~{step.durationSeconds}s
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#31465A]/85 leading-relaxed">
                    {step.instruction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Goals & Precautions */}
        <div className="md:col-span-5 space-y-6">
          {/* Goals */}
          <div className="bg-[#FFFDF7] rounded-3xl p-6 border border-[#31465A]/10 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#31465A] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#C7DFA3]" />
              <span>Mục tiêu phục hồi</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#31465A]/85">
              {exercise.goals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#C7DFA3] font-bold">✓</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Precautions */}
          <div className="bg-[#FFFDF7] rounded-3xl p-6 border border-amber-200 bg-amber-50/40 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-amber-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
              <span>Lưu ý an toàn</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-amber-950/90 leading-relaxed">
              {exercise.precautions.map((prec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span>•</span>
                  <span>{prec}</span>
                </li>
              ))}
              <li className="flex items-start gap-2 pt-1 font-medium">
                <span>•</span>
                <span>Ngưng tập ngay nếu xuất hiện cơn đau nhói cấp tính vượt ngưỡng 5/10.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
