import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  ArrowLeft, 
  Clock, 
  HeartPulse, 
  VolumeX, 
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { EXERCISES_DATA } from '../data/exercises';
import { audioService } from '../services/audioService';
import { PainScaleModal } from '../components/PainScaleModal';
import { WorkoutSession, PainRecord } from '../types';

interface ExerciseSessionPageProps {
  onCompleteSession: (session: Omit<WorkoutSession, 'id' | 'timestamp'>) => void;
  onAddPainRecord: (record: Omit<PainRecord, 'id' | 'timestamp'>) => void;
}

export const ExerciseSessionPage: React.FC<ExerciseSessionPageProps> = ({
  onCompleteSession,
  onAddPainRecord
}) => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();

  const exercise = EXERCISES_DATA.find((e) => e.id === exerciseId) || EXERCISES_DATA[0];

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [initialPain, setInitialPain] = useState<number>(4);
  const [showPainModal, setShowPainModal] = useState(false);

  const timerRef = useRef<number | null>(null);

  // Auto pause ambient music during active exercise video
  useEffect(() => {
    audioService.stop();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinishWorkout = () => {
    setIsActive(false);
    setShowPainModal(true);
  };

  const handleSavePainAndFinish = (afterPain: number, notes: string) => {
    // 1. Save session record
    onCompleteSession({
      exerciseId: exercise.id,
      exerciseTitle: exercise.title,
      bodyRegionId: exercise.bodyRegionId,
      durationSeconds: Math.max(30, seconds),
      completed: true,
      painBefore: initialPain,
      painAfter: afterPain,
      notes: notes || undefined
    });

    // 2. Save pain diary entry
    onAddPainRecord({
      exerciseId: exercise.id,
      exerciseTitle: exercise.title,
      bodyRegionId: exercise.bodyRegionId,
      bodyRegionName: exercise.bodyRegionName,
      painLevelBefore: initialPain,
      painLevelAfter: afterPain,
      notes: notes || undefined
    });

    // 3. Navigate to Progress
    navigate('/progress');
  };

  const currentStep = exercise.instructions[currentStepIndex] || exercise.instructions[0];

  return (
    <div className="space-y-6 py-4 sm:py-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#31465A] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Thoát buổi tập</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#31465A]/70">Mức đau trước tập:</span>
          <select
            value={initialPain}
            onChange={(e) => setInitialPain(parseInt(e.target.value, 10))}
            className="text-xs font-bold text-[#31465A] bg-[#D9F0FF] border border-[#89B9E6]/40 rounded-xl px-2.5 py-1"
          >
            {Array.from({ length: 11 }).map((_, i) => (
              <option key={i} value={i}>
                {i}/10
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Workout Panel: Video + Live Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Video Player */}
        <div className="lg:col-span-8 bg-[#31465A] rounded-3xl overflow-hidden shadow-xl border border-[#31465A]/20">
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${exercise.video.videoId}?autoplay=1&rel=0`}
              title={exercise.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          <div className="p-4 bg-[#31465A] text-[#FFFDF7] flex justify-between items-center text-xs">
            <span className="truncate max-w-sm font-medium">{exercise.title}</span>
            <span className="text-[#C7DFA3] font-bold">{exercise.bodyRegionName}</span>
          </div>
        </div>

        {/* Right: Timer & Interactive Step Tracker */}
        <div className="lg:col-span-4 bg-[#FFFDF7] rounded-3xl p-6 border border-[#31465A]/10 shadow-sm space-y-6">
          {/* Stopwatch Display */}
          <div className="text-center p-5 rounded-2xl bg-gradient-to-b from-[#D9F0FF]/50 to-[#FFFDF7] border border-[#89B9E6]/30">
            <span className="text-xs font-bold text-[#31465A]/70 uppercase tracking-wider">
              Thời gian luyện tập
            </span>
            <div className="text-4xl sm:text-5xl font-black text-[#31465A] tracking-tight my-2 font-mono">
              {formatTime(seconds)}
            </div>

            {/* Timer Controls */}
            <div className="flex justify-center items-center gap-2 pt-1">
              <button
                onClick={toggleTimer}
                className={`py-2 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                  isActive
                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                    : 'bg-[#31465A] text-[#FFFDF7] hover:bg-[#31465A]/90'
                }`}
              >
                {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isActive ? 'Tạm dừng' : 'Bắt đầu đếm'}</span>
              </button>

              <button
                onClick={resetTimer}
                className="p-2 rounded-xl border border-[#31465A]/20 text-[#31465A] hover:bg-[#D9F0FF] transition-colors"
                title="Đặt lại đồng hồ"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Step Instruction */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-[#31465A]/70">
              <span className="font-bold text-[#31465A]">
                Bước {currentStepIndex + 1}/{exercise.instructions.length}
              </span>
              <div className="flex gap-1">
                <button
                  disabled={currentStepIndex === 0}
                  onClick={() => setCurrentStepIndex((p) => Math.max(0, p - 1))}
                  className="p-1 rounded-lg border border-[#31465A]/20 disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={currentStepIndex === exercise.instructions.length - 1}
                  onClick={() =>
                    setCurrentStepIndex((p) => Math.min(exercise.instructions.length - 1, p + 1))
                  }
                  className="p-1 rounded-lg border border-[#31465A]/20 disabled:opacity-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#D9F0FF]/30 border border-[#89B9E6]/30 space-y-1.5">
              <h4 className="font-bold text-xs sm:text-sm text-[#31465A]">
                {currentStep.title}
              </h4>
              <p className="text-xs text-[#31465A]/85 leading-relaxed">
                {currentStep.instruction}
              </p>
            </div>
          </div>

          {/* Finish Session CTA */}
          <button
            onClick={handleFinishWorkout}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#31465A] text-[#FFFDF7] font-bold text-sm hover:bg-[#31465A]/90 transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <CheckCircle2 className="w-5 h-5 text-[#C7DFA3]" />
            <span>Hoàn thành bài tập & Đánh giá</span>
          </button>
        </div>
      </div>

      {/* Post Workout Pain Scale Assessment Modal */}
      <PainScaleModal
        isOpen={showPainModal}
        title="Đánh giá sau khi tập"
        initialValue={Math.max(0, initialPain - 2)}
        bodyRegionName={exercise.bodyRegionName}
        isAfterWorkout={true}
        onSave={handleSavePainAndFinish}
        onClose={() => setShowPainModal(false)}
      />
    </div>
  );
};
