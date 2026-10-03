import React, { useState } from 'react';
import { ROMRecord, BodyRegionId } from '../types';
import { Compass, CheckCircle2, TrendingUp, Plus, Activity } from 'lucide-react';

interface ROMChartProps {
  records: ROMRecord[];
  onAddRecord: (record: Omit<ROMRecord, 'id' | 'timestamp'>) => void;
}

const JOINT_PRESETS = [
  { joint: 'Cột sống cổ', movement: 'Xoay cổ sang phải/trái', region: 'neck' as BodyRegionId, target: 80, min: 0, max: 90 },
  { joint: 'Cột sống cổ', movement: 'Gập cổ trước', region: 'neck' as BodyRegionId, target: 45, min: 0, max: 60 },
  { joint: 'Khớp vai', movement: 'Dạng cánh tay', region: 'shoulder' as BodyRegionId, target: 180, min: 0, max: 180 },
  { joint: 'Khớp vai', movement: 'Xoay ngoài cánh tay', region: 'shoulder' as BodyRegionId, target: 90, min: 0, max: 90 },
  { joint: 'Cột sống thắt lưng', movement: 'Gập thân trước', region: 'lower_back' as BodyRegionId, target: 60, min: 0, max: 90 },
  { joint: 'Khớp gối', movement: 'Gập gối', region: 'knee' as BodyRegionId, target: 135, min: 0, max: 150 },
  { joint: 'Khớp gối', movement: 'Duỗi gối thẳng', region: 'knee' as BodyRegionId, target: 0, min: 0, max: 30 },
  { joint: 'Cổ chân', movement: 'Gập mu bàn chân', region: 'ankle_foot' as BodyRegionId, target: 20, min: 0, max: 30 }
];

export const ROMChart: React.FC<ROMChartProps> = ({ records, onAddRecord }) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const currentPreset = JOINT_PRESETS[selectedPresetIndex];

  const [measuredAngle, setMeasuredAngle] = useState(currentPreset.target * 0.7);
  const [notes, setNotes] = useState('');
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  const filteredHistory = records.filter(
    (r) => r.jointName === currentPreset.joint && r.movementType === currentPreset.movement
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRecord({
      jointName: currentPreset.joint,
      movementType: currentPreset.movement,
      bodyRegionId: currentPreset.region,
      measuredAngle: Math.round(measuredAngle),
      targetAngle: currentPreset.target,
      unit: 'độ (°)',
      notes: notes || undefined
    });
    setNotes('');
    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 3000);
  };

  const percentage = Math.min(
    100,
    Math.round(
      currentPreset.target === 0
        ? Math.max(0, 100 - measuredAngle * 5)
        : (measuredAngle / currentPreset.target) * 100
    )
  );

  return (
    <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-[#31465A]/10 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#31465A]/10">
        <div>
          <h3 className="text-xl font-bold text-[#31465A] flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#89B9E6]" />
            <span>Theo Dõi Biên Độ Vận Động Khớp (ROM)</span>
          </h3>
          <p className="text-xs text-[#31465A]/70 mt-1">
            Ghi nhận và đo góc tầm vận động của các khớp để theo dõi sự phục hồi linh hoạt theo thời gian.
          </p>
        </div>
      </div>

      {/* Preset Selector */}
      <div>
        <label className="block text-xs font-semibold text-[#31465A] mb-2">
          Chọn khớp & động tác cần đánh giá:
        </label>
        <div className="flex flex-wrap gap-2">
          {JOINT_PRESETS.map((p, idx) => {
            const isSelected = selectedPresetIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedPresetIndex(idx);
                  setMeasuredAngle(p.target * 0.7);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#31465A] text-[#FFFDF7] shadow-sm ring-2 ring-[#C7DFA3]'
                    : 'bg-[#D9F0FF]/50 text-[#31465A] hover:bg-[#D9F0FF]'
                }`}
              >
                {p.joint} - {p.movement}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Angle Gauge & Measurement Input */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#D9F0FF]/30 p-6 rounded-3xl border border-[#89B9E6]/30">
        {/* Visual Angle Arc */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* SVG Circular Arc */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-[#FFFDF7] fill-none"
                strokeWidth="10"
              />
              {/* Target reference arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-[#89B9E6]/40 fill-none"
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset="0"
              />
              {/* Progress measured arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-[#31465A] fill-none transition-all duration-500"
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * percentage) / 100}
                strokeLinecap="round"
              />
            </svg>

            {/* Center Angle Value */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-[#31465A]">
                {Math.round(measuredAngle)}°
              </span>
              <span className="text-[11px] text-[#31465A]/70 font-medium">
                Mục tiêu: {currentPreset.target}°
              </span>
              <span className="mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C7DFA3] text-[#31465A]">
                {percentage}% chuẩn
              </span>
            </div>
          </div>

          <p className="text-xs text-[#31465A]/80 font-medium mt-3 text-center">
            {currentPreset.joint} ({currentPreset.movement})
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSave} className="lg:col-span-6 space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-[#31465A] mb-2">
              <span>Điều chỉnh góc đo thực tế:</span>
              <span className="text-sm font-bold bg-[#FFFDF7] px-2 py-0.5 rounded-lg border border-[#31465A]/10">
                {Math.round(measuredAngle)} độ (°)
              </span>
            </div>
            <input
              type="range"
              min={currentPreset.min}
              max={currentPreset.max}
              step="1"
              value={measuredAngle}
              onChange={(e) => setMeasuredAngle(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-[#FFFDF7] rounded-lg appearance-none cursor-pointer accent-[#31465A] border border-[#31465A]/10"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#31465A] mb-1">
              Ghi chú thêm về cảm giác vận động:
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="VD: Không đau, cử động êm ái..."
              className="w-full p-2.5 rounded-xl border border-[#31465A]/15 bg-[#FFFDF7] text-xs text-[#31465A] focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#31465A] text-[#FFFDF7] text-xs font-bold hover:bg-[#31465A]/90 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#C7DFA3]" />
            <span>Lưu bản ghi ROM này</span>
          </button>

          {showAddSuccess && (
            <div className="p-2.5 rounded-xl bg-[#C7DFA3]/60 text-[#31465A] text-xs font-medium flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-[#31465A]" />
              <span>Đã lưu thành công số đo ROM!</span>
            </div>
          )}
        </form>
      </div>

      {/* History Records List */}
      <div>
        <h4 className="text-sm font-bold text-[#31465A] mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#89B9E6]" />
          <span>Lịch sử các lần đo gần đây</span>
        </h4>

        {records.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {records.slice(0, 6).map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#31465A]/10 hover:border-[#89B9E6] transition-colors space-y-1.5"
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-xs text-[#31465A]">{rec.jointName}</span>
                  <span className="text-[10px] text-[#31465A]/60">
                    {new Date(rec.timestamp).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <p className="text-[11px] text-[#31465A]/70">{rec.movementType}</p>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-lg font-extrabold text-[#31465A]">
                    {rec.measuredAngle}°
                  </span>
                  <span className="text-[10px] text-[#31465A]/60">
                    / {rec.targetAngle}° chuẩn
                  </span>
                </div>
                {rec.notes && (
                  <p className="text-[10px] text-[#31465A]/80 italic bg-[#D9F0FF]/40 p-1 rounded-lg">
                    "{rec.notes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#31465A]/60 italic">Chưa có bản ghi đo ROM nào.</p>
        )}
      </div>
    </div>
  );
};
