import React, { useState } from 'react';
import { BodyRegionId, BodyView } from '../types';
import { BODY_REGIONS } from '../data/bodyRegions';
import { Sparkles, Info, ArrowRight } from 'lucide-react';

interface BodyMapProps {
  selectedRegionId?: BodyRegionId | null;
  onSelectRegion: (regionId: BodyRegionId) => void;
  showDetailsCard?: boolean;
}

export const BodyMap: React.FC<BodyMapProps> = ({
  selectedRegionId,
  onSelectRegion,
  showDetailsCard = true
}) => {
  const [view, setView] = useState<BodyView>('front');
  const [hoveredRegion, setHoveredRegion] = useState<BodyRegionId | null>(null);

  const activeRegion = BODY_REGIONS.find(
    (r) => r.id === (hoveredRegion || selectedRegionId)
  ) || (selectedRegionId ? BODY_REGIONS.find((r) => r.id === selectedRegionId) : null);

  const getRegionClass = (regionId: BodyRegionId) => {
    const isSelected = selectedRegionId === regionId;
    const isHovered = hoveredRegion === regionId;

    if (isSelected) {
      return 'fill-[#31465A] stroke-[#C7DFA3] stroke-[3] filter drop-shadow(0 0 8px rgba(199,223,163,0.8)) cursor-pointer transition-all duration-300';
    }
    if (isHovered) {
      return 'fill-[#89B9E6] stroke-[#31465A] stroke-[2] cursor-pointer transition-all duration-200';
    }
    return 'fill-[#D9F0FF] hover:fill-[#89B9E6]/70 stroke-[#31465A]/40 stroke-[1.5] cursor-pointer transition-all duration-200';
  };

  return (
    <div className="w-full bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-[#31465A]/10 shadow-sm relative overflow-hidden">
      {/* Top Header & View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#31465A]/10">
        <div>
          <h3 className="text-xl font-bold text-[#31465A] flex items-center gap-2">
            <span>Sơ Đồ Cơ Thể Tương Tác</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#C7DFA3] text-[#31465A] font-semibold">
              Chọn vùng đau
            </span>
          </h3>
          <p className="text-xs text-[#31465A]/70 mt-1">
            Chạm hoặc nhấp vào bất kỳ bộ phận nào trên sơ đồ để nhận các bài tập phục hồi chính xác.
          </p>
        </div>

        {/* Front / Back switch */}
        <div className="flex items-center bg-[#D9F0FF]/60 p-1 rounded-2xl border border-[#31465A]/10">
          <button
            onClick={() => setView('front')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              view === 'front'
                ? 'bg-[#31465A] text-[#FFFDF7] shadow-sm'
                : 'text-[#31465A]/70 hover:text-[#31465A]'
            }`}
          >
            Mặt trước
          </button>
          <button
            onClick={() => setView('back')}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              view === 'back'
                ? 'bg-[#31465A] text-[#FFFDF7] shadow-sm'
                : 'text-[#31465A]/70 hover:text-[#31465A]'
            }`}
          >
            Mặt sau
          </button>
        </div>
      </div>

      {/* Main Grid: Body SVG and Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Anatomical Map */}
        <div className="lg:col-span-7 flex justify-center items-center relative py-4 bg-gradient-to-b from-[#D9F0FF]/30 to-transparent rounded-2xl border border-[#31465A]/5">
          <svg
            viewBox="0 0 400 620"
            className="w-full max-w-[340px] sm:max-w-[380px] h-auto select-none filter drop-shadow-md"
          >
            <defs>
              <linearGradient id="bodyBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFDF7" />
                <stop offset="100%" stopColor="#D9F0FF" />
              </linearGradient>
            </defs>

            {/* Silhouette Outline Guide */}
            <g opacity="0.15" stroke="#31465A" strokeWidth="1" fill="none">
              <ellipse cx="200" cy="50" rx="36" ry="44" />
              <path d="M165,85 Q200,95 235,85 Q285,125 295,240 Q265,260 250,230 L250,330 L260,470 L255,590 L220,590 L210,420 L200,340 L190,420 L180,590 L145,590 L140,470 L150,330 L150,230 Q135,260 105,240 Q115,125 165,85 Z" />
            </g>

            {/* Head (Neutral Aesthetic) */}
            <circle
              cx="200"
              cy="48"
              r="34"
              className="fill-[#FFFDF7] stroke-[#31465A]/30 stroke-[1.5]"
            />

            {/* 1. Neck / Cổ */}
            <path
              d="M184,80 C184,98 180,105 174,112 C186,118 214,118 226,112 C220,105 216,98 216,80 Z"
              className={getRegionClass('neck')}
              onMouseEnter={() => setHoveredRegion('neck')}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => onSelectRegion('neck')}
            />

            {/* FRONT VIEW ANATOMY */}
            {view === 'front' && (
              <g>
                {/* 2. Left & Right Shoulder / Vai */}
                <path
                  d="M174,112 C150,115 125,130 115,155 C125,168 140,165 152,148 C160,135 168,124 174,112 Z"
                  className={getRegionClass('shoulder')}
                  onMouseEnter={() => setHoveredRegion('shoulder')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('shoulder')}
                />
                <path
                  d="M226,112 C250,115 275,130 285,155 C275,168 260,165 248,148 C240,135 232,124 226,112 Z"
                  className={getRegionClass('shoulder')}
                  onMouseEnter={() => setHoveredRegion('shoulder')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('shoulder')}
                />

                {/* 3. Chest / Lưng trên (Upper body front) */}
                <path
                  d="M152,140 C170,132 230,132 248,140 C252,185 245,210 240,225 C215,230 185,230 160,225 C155,210 148,185 152,140 Z"
                  className={getRegionClass('upper_back')}
                  onMouseEnter={() => setHoveredRegion('upper_back')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('upper_back')}
                />

                {/* 4. Elbows / Khuỷu tay */}
                <ellipse
                  cx="110"
                  cy="235"
                  rx="16"
                  ry="18"
                  className={getRegionClass('elbow')}
                  onMouseEnter={() => setHoveredRegion('elbow')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('elbow')}
                />
                <ellipse
                  cx="290"
                  cy="235"
                  rx="16"
                  ry="18"
                  className={getRegionClass('elbow')}
                  onMouseEnter={() => setHoveredRegion('elbow')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('elbow')}
                />

                {/* 5. Wrists & Hands / Cổ tay & Bàn tay */}
                <path
                  d="M95,290 C85,305 85,340 100,355 C110,345 115,315 110,290 Z"
                  className={getRegionClass('wrist_hand')}
                  onMouseEnter={() => setHoveredRegion('wrist_hand')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('wrist_hand')}
                />
                <path
                  d="M305,290 C315,305 315,340 300,355 C290,345 285,315 290,290 Z"
                  className={getRegionClass('wrist_hand')}
                  onMouseEnter={() => setHoveredRegion('wrist_hand')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('wrist_hand')}
                />

                {/* 6. Hip & Pelvis / Hông */}
                <path
                  d="M158,230 C185,235 215,235 242,230 C248,270 245,300 236,315 C215,322 185,322 164,315 C155,300 152,270 158,230 Z"
                  className={getRegionClass('hip')}
                  onMouseEnter={() => setHoveredRegion('hip')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('hip')}
                />

                {/* 7. Thighs / Đùi trước */}
                <path
                  d="M162,320 C185,324 195,330 196,365 C196,405 190,440 186,450 C175,450 155,445 150,405 C146,365 152,330 162,320 Z"
                  className={getRegionClass('thigh')}
                  onMouseEnter={() => setHoveredRegion('thigh')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('thigh')}
                />
                <path
                  d="M238,320 C215,324 205,330 204,365 C204,405 210,440 214,450 C225,450 245,445 250,405 C254,365 248,330 238,320 Z"
                  className={getRegionClass('thigh')}
                  onMouseEnter={() => setHoveredRegion('thigh')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('thigh')}
                />

                {/* 8. Knees / Đầu gối */}
                <ellipse
                  cx="168"
                  cy="472"
                  rx="18"
                  ry="20"
                  className={getRegionClass('knee')}
                  onMouseEnter={() => setHoveredRegion('knee')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('knee')}
                />
                <ellipse
                  cx="232"
                  cy="472"
                  rx="18"
                  ry="20"
                  className={getRegionClass('knee')}
                  onMouseEnter={() => setHoveredRegion('knee')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('knee')}
                />

                {/* 9. Shin & Calf / Cẳng chân */}
                <path
                  d="M155,496 C165,496 178,496 178,510 C175,545 170,570 165,580 C155,580 150,560 150,530 Z"
                  className={getRegionClass('calf_shin')}
                  onMouseEnter={() => setHoveredRegion('calf_shin')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('calf_shin')}
                />
                <path
                  d="M245,496 C235,496 222,496 222,510 C225,545 230,570 235,580 C245,580 250,560 250,530 Z"
                  className={getRegionClass('calf_shin')}
                  onMouseEnter={() => setHoveredRegion('calf_shin')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('calf_shin')}
                />

                {/* 10. Ankle & Foot / Cổ chân & Bàn chân */}
                <ellipse
                  cx="162"
                  cy="598"
                  rx="16"
                  ry="12"
                  className={getRegionClass('ankle_foot')}
                  onMouseEnter={() => setHoveredRegion('ankle_foot')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('ankle_foot')}
                />
                <ellipse
                  cx="238"
                  cy="598"
                  rx="16"
                  ry="12"
                  className={getRegionClass('ankle_foot')}
                  onMouseEnter={() => setHoveredRegion('ankle_foot')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('ankle_foot')}
                />
              </g>
            )}

            {/* BACK VIEW ANATOMY */}
            {view === 'back' && (
              <g>
                {/* Upper Back / Lưng trên */}
                <path
                  d="M152,120 C180,115 220,115 248,120 C255,160 248,190 240,195 C215,200 185,200 160,195 C152,190 145,160 152,120 Z"
                  className={getRegionClass('upper_back')}
                  onMouseEnter={() => setHoveredRegion('upper_back')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('upper_back')}
                />

                {/* Mid Back & Spine / Lưng giữa & Cột sống ngực */}
                <path
                  d="M160,198 C185,202 215,202 240,198 C242,235 240,260 235,270 C215,275 185,275 165,270 C160,260 158,235 160,198 Z"
                  className={getRegionClass('mid_back')}
                  onMouseEnter={() => setHoveredRegion('mid_back')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('mid_back')}
                />

                {/* Spine Indicator Center Line */}
                <line
                  x1="200"
                  y1="125"
                  x2="200"
                  y2="310"
                  stroke="#31465A"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  opacity="0.4"
                  pointerEvents="none"
                />

                {/* Lower Back & Lumbar / Thắt lưng */}
                <path
                  d="M165,272 C185,276 215,276 235,272 C238,310 236,325 228,335 C210,340 190,340 172,335 C164,325 162,310 165,272 Z"
                  className={getRegionClass('lower_back')}
                  onMouseEnter={() => setHoveredRegion('lower_back')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('lower_back')}
                />

                {/* Gluteus & Hip / Mông & Khung chậu */}
                <path
                  d="M162,338 C185,342 215,342 238,338 C248,375 240,410 232,420 C210,425 190,425 168,420 C160,410 152,375 162,338 Z"
                  className={getRegionClass('hip')}
                  onMouseEnter={() => setHoveredRegion('hip')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('hip')}
                />

                {/* Calves / Bắp chân */}
                <path
                  d="M152,490 C165,488 178,488 180,515 C176,550 170,575 164,585 C154,585 148,565 148,530 Z"
                  className={getRegionClass('calf_shin')}
                  onMouseEnter={() => setHoveredRegion('calf_shin')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('calf_shin')}
                />
                <path
                  d="M248,490 C235,488 222,488 220,515 C224,550 230,575 236,585 C246,585 252,565 252,530 Z"
                  className={getRegionClass('calf_shin')}
                  onMouseEnter={() => setHoveredRegion('calf_shin')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onClick={() => onSelectRegion('calf_shin')}
                />
              </g>
            )}
          </svg>
        </div>

        {/* Selected / Hovered Region Information Panel */}
        {showDetailsCard && (
          <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#D9F0FF]/40 border border-[#89B9E6]/30 p-6 rounded-3xl">
            {activeRegion ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C7DFA3] text-[#31465A] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Vùng cơ thể đã chọn</span>
                </div>

                <div>
                  <h4 className="text-2xl font-bold text-[#31465A]">
                    {activeRegion.vietnameseName}
                  </h4>
                  <p className="text-xs text-[#31465A]/60 font-medium uppercase tracking-wider mt-0.5">
                    {activeRegion.name}
                  </p>
                </div>

                <p className="text-sm text-[#31465A]/85 leading-relaxed bg-[#FFFDF7] p-4 rounded-2xl border border-[#31465A]/10">
                  {activeRegion.description}
                </p>

                <div className="flex items-center justify-between text-xs text-[#31465A]/80 pt-2 border-t border-[#31465A]/10">
                  <span>Các bệnh lý & vấn đề phổ biến:</span>
                  <strong className="text-[#31465A] font-bold">{activeRegion.problemCount} nhóm</strong>
                </div>

                <button
                  onClick={() => onSelectRegion(activeRegion.id)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#31465A] text-[#FFFDF7] font-semibold text-sm hover:bg-[#31465A]/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md mt-4"
                >
                  <span>Xem bài tập cho vùng này</span>
                  <ArrowRight className="w-4 h-4 text-[#C7DFA3]" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 text-[#31465A]/70 space-y-3 my-auto">
                <div className="w-12 h-12 rounded-2xl bg-[#FFFDF7] flex items-center justify-center text-[#31465A] shadow-sm">
                  <Info className="w-6 h-6 text-[#89B9E6]" />
                </div>
                <h5 className="font-semibold text-base text-[#31465A]">Chưa chọn vùng cơ thể</h5>
                <p className="text-xs max-w-xs">
                  Di chuột hoặc nhấp vào hình người bên trái để xem chi tiết vùng đau và các bài tập phục hồi chức năng tương ứng.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick selection pills for mobile / accessibility */}
      <div className="mt-8 pt-6 border-t border-[#31465A]/10">
        <p className="text-xs font-semibold text-[#31465A]/70 mb-3">
          Hoặc chọn nhanh theo danh sách vùng:
        </p>
        <div className="flex flex-wrap gap-2">
          {BODY_REGIONS.map((region) => {
            const isSelected = selectedRegionId === region.id;
            return (
              <button
                key={region.id}
                onClick={() => onSelectRegion(region.id)}
                className={`text-xs px-3.5 py-2 rounded-xl transition-all font-medium ${
                  isSelected
                    ? 'bg-[#31465A] text-[#FFFDF7] shadow-sm ring-2 ring-[#C7DFA3]'
                    : 'bg-[#D9F0FF]/50 text-[#31465A] hover:bg-[#D9F0FF]'
                }`}
              >
                {region.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
