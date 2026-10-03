import React, { useState } from 'react';
import { Smile, Meh, Frown, AlertCircle, X, CheckCircle2, HeartPulse } from 'lucide-react';
import { BodyRegionId } from '../types';

interface PainScaleModalProps {
  isOpen: boolean;
  title?: string;
  initialValue?: number;
  bodyRegionName?: string;
  onSave: (painLevel: number, notes: string) => void;
  onClose: () => void;
  isAfterWorkout?: boolean;
}

export const PainScaleModal: React.FC<PainScaleModalProps> = ({
  isOpen,
  title = 'Đánh giá mức độ đau',
  initialValue = 3,
  bodyRegionName,
  onSave,
  onClose,
  isAfterWorkout = false
}) => {
  const [painLevel, setPainLevel] = useState<number>(initialValue);
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const getPainInfo = (val: number) => {
    if (val === 0) {
      return {
        label: 'Không đau (0)',
        desc: 'Cơ thể hoàn toàn thoải mái, dễ chịu.',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
        icon: Smile
      };
    }
    if (val <= 3) {
      return {
        label: `Đau nhẹ (${val})`,
        desc: 'Chỉ hơi căng tức nhẹ hoặc mỏi, không ảnh hưởng sinh hoạt.',
        color: 'text-[#31465A] bg-[#C7DFA3]/40 border-[#C7DFA3]',
        icon: Smile
      };
    }
    if (val <= 6) {
      return {
        label: `Đau vừa (${val})`,
        desc: 'Đau âm ỉ khó chịu, có thể tập chậm rãi có kiểm soát.',
        color: 'text-amber-800 bg-amber-50 border-amber-300',
        icon: Meh
      };
    }
    if (val <= 8) {
      return {
        label: `Đau nhiều (${val})`,
        desc: 'Đau rõ rệt khi vận động khớp, cần giảm cường độ hoặc nghỉ ngơi.',
        color: 'text-orange-800 bg-orange-50 border-orange-300',
        icon: Frown
      };
    }
    return {
      label: `Đau dữ dội (${val})`,
      desc: 'Cơn đau chói gắt, không thể tiếp tục cử động. Cần tham khảo ý kiến y tế.',
      color: 'text-rose-800 bg-rose-50 border-rose-400',
      icon: AlertCircle
    };
  };

  const currentInfo = getPainInfo(painLevel);
  const IconComponent = currentInfo.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#31465A]/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FFFDF7] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#31465A]/15 shadow-2xl relative overflow-hidden animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#31465A]/60 hover:text-[#31465A] hover:bg-[#D9F0FF] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#D9F0FF] text-[#31465A] mb-3 shadow-inner">
            <HeartPulse className="w-6 h-6 text-[#31465A]" />
          </div>
          <h3 className="text-xl font-bold text-[#31465A]">{title}</h3>
          {bodyRegionName && (
            <p className="text-xs text-[#31465A]/70 mt-0.5">
              Vùng theo dõi: <span className="font-semibold text-[#31465A]">{bodyRegionName}</span>
            </p>
          )}
          {isAfterWorkout && (
            <p className="text-xs text-[#31465A]/80 mt-1 bg-[#C7DFA3]/40 py-1 px-3 rounded-full inline-block">
              🎉 Bạn vừa hoàn thành bài tập! Hãy ghi nhận lại mức độ đau sau tập.
            </p>
          )}
        </div>

        {/* Pain Level Display Card */}
        <div className={`p-4 rounded-2xl border mb-6 text-center transition-all ${currentInfo.color}`}>
          <div className="flex items-center justify-center gap-2 mb-1">
            <IconComponent className="w-6 h-6" />
            <h4 className="text-lg font-bold">{currentInfo.label}</h4>
          </div>
          <p className="text-xs leading-relaxed">{currentInfo.desc}</p>
        </div>

        {/* 0-10 Slider & Number Buttons */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-xs font-semibold text-[#31465A]/70 px-1">
            <span>0 (Không đau)</span>
            <span>5 (Đau vừa)</span>
            <span>10 (Dữ dội)</span>
          </div>

          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={painLevel}
            onChange={(e) => setPainLevel(parseInt(e.target.value, 10))}
            className="w-full h-3 bg-gradient-to-r from-[#C7DFA3] via-amber-300 to-rose-400 rounded-lg appearance-none cursor-pointer accent-[#31465A]"
          />

          {/* Quick Click Number Selector */}
          <div className="grid grid-cols-11 gap-1 pt-1">
            {Array.from({ length: 11 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPainLevel(i)}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  painLevel === i
                    ? 'bg-[#31465A] text-[#FFFDF7] shadow-md scale-105'
                    : 'bg-[#D9F0FF]/50 text-[#31465A] hover:bg-[#D9F0FF]'
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        {/* Note / Feedback Input */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-[#31465A] mb-1.5">
            Ghi chú thêm về cảm giác cơ thể (Tùy chọn):
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ví dụ: Cổ xoay nhẹ nhàng hơn, bớt căng sau gáy..."
            rows={2}
            className="w-full p-3 rounded-xl border border-[#31465A]/20 bg-[#FFFDF7] text-sm text-[#31465A] focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-[#31465A]/20 text-xs font-semibold text-[#31465A] hover:bg-[#D9F0FF]/40 transition-colors"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={() => {
              onSave(painLevel, notes);
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-[#31465A] text-[#FFFDF7] text-xs font-bold hover:bg-[#31465A]/90 transition-all flex items-center justify-center gap-1.5 shadow-md"
          >
            <CheckCircle2 className="w-4 h-4 text-[#C7DFA3]" />
            <span>Lưu kết quả ({painLevel}/10)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
