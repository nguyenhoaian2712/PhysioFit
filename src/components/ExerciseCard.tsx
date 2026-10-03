import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Bookmark, Sparkles, ChevronRight, Activity } from 'lucide-react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  isBookmarked: boolean;
  onToggleBookmark: (exerciseId: string) => void;
  onQuickStart?: (exercise: Exercise) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  isBookmarked,
  onToggleBookmark,
  onQuickStart
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Dễ':
        return 'bg-[#C7DFA3] text-[#31465A]';
      case 'Trung bình':
        return 'bg-[#89B9E6] text-[#31465A]';
      case 'Nâng cao':
        return 'bg-[#31465A] text-[#FFFDF7]';
      default:
        return 'bg-[#D9F0FF] text-[#31465A]';
    }
  };

  return (
    <div className="group bg-[#FFFDF7] rounded-3xl border border-[#31465A]/10 shadow-sm hover:shadow-md hover:border-[#89B9E6]/60 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#31465A]/5">
        <img
          src={exercise.video.thumbnail}
          alt={exercise.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback if hqdefault fails to load
            (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${exercise.video.videoId}/0.jpg`;
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#31465A]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Play Button Overlay */}
        <Link
          to={`/session/${exercise.id}`}
          className="absolute inset-0 flex items-center justify-center"
          title="Bắt đầu tập ngay"
        >
          <div className="w-12 h-12 rounded-full bg-[#FFFDF7]/90 text-[#31465A] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#C7DFA3] transition-all">
            <Play className="w-5 h-5 ml-0.5 fill-[#31465A] text-[#31465A]" />
          </div>
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-[#31465A]/80 backdrop-blur-md text-[#FFFDF7] text-[11px] font-semibold flex items-center gap-1">
            <Activity className="w-3 h-3 text-[#C7DFA3]" />
            {exercise.bodyRegionName}
          </span>

          {/* Bookmark Action */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleBookmark(exercise.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isBookmarked
                ? 'bg-[#C7DFA3] text-[#31465A] shadow-md'
                : 'bg-[#FFFDF7]/80 text-[#31465A] hover:bg-[#FFFDF7]'
            }`}
            title={isBookmarked ? 'Bỏ lưu bài tập' : 'Lưu vào bài tập yêu thích'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#31465A]' : ''}`} />
          </button>
        </div>

        {/* Bottom Time & Difficulty Badges */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-[#FFFDF7]">
          <span className="flex items-center gap-1 bg-[#31465A]/80 backdrop-blur-md px-2 py-0.5 rounded-lg text-[11px] font-medium">
            <Clock className="w-3 h-3 text-[#C7DFA3]" />
            {exercise.durationMinutes} phút
          </span>

          <span className={`px-2 py-0.5 rounded-lg text-[11px] font-bold ${getDifficultyColor(exercise.difficulty)}`}>
            {exercise.difficulty}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h4 className="font-bold text-base text-[#31465A] line-clamp-2 group-hover:text-[#31465A]/90 transition-colors leading-snug">
            {exercise.title}
          </h4>

          {exercise.problemNames.length > 0 && (
            <p className="text-xs text-[#31465A]/70 mt-1 line-clamp-1">
              Phù hợp: <span className="font-medium text-[#31465A]">{exercise.problemNames[0]}</span>
            </p>
          )}

          {/* Reps / Sets guidance */}
          <div className="mt-3 py-1.5 px-3 rounded-xl bg-[#D9F0FF]/40 border border-[#89B9E6]/20 text-[11px] text-[#31465A]/80">
            <strong>Gợi ý tập:</strong> {exercise.repsSets}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#31465A]/10">
          <Link
            to={`/exercise/${exercise.id}`}
            className="flex-1 py-2.5 px-3 rounded-xl border border-[#31465A]/20 hover:border-[#31465A] text-[#31465A] text-xs font-semibold text-center transition-colors hover:bg-[#D9F0FF]/30"
          >
            Chi tiết & Hướng dẫn
          </Link>

          <Link
            to={`/session/${exercise.id}`}
            className="py-2.5 px-4 rounded-xl bg-[#31465A] hover:bg-[#31465A]/90 text-[#FFFDF7] text-xs font-semibold flex items-center gap-1 transition-transform active:scale-95 shadow-sm"
          >
            <span>Tập ngay</span>
            <Play className="w-3 h-3 fill-[#C7DFA3] text-[#C7DFA3]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
