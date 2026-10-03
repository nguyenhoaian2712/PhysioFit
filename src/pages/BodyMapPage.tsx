import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BodyMap } from '../components/BodyMap';
import { BodyRegionId } from '../types';
import { Sparkles, Layers, ShieldCheck, HelpCircle } from 'lucide-react';

export const BodyMapPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<BodyRegionId | null>(null);

  const handleSelectRegion = (regionId: BodyRegionId) => {
    setSelectedRegion(regionId);
    navigate(`/problem-select/${regionId}`);
  };

  return (
    <div className="space-y-8 py-4 sm:py-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C7DFA3] text-[#31465A] text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bản đồ chẩn đoán giải phẫu</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#31465A] tracking-tight">
          Sơ Đồ Cơ Thể Tương Tác
        </h1>

        <p className="text-sm text-[#31465A]/80 leading-relaxed">
          Xác định vùng cơ thể đang gặp vấn đề (đau nhức, hạn chế biên độ vận động, sau phẫu thuật hoặc sai lệch tư thế) để tiếp cận phác đồ bài tập phù hợp.
        </p>
      </div>

      {/* Main Interactive Body Map */}
      <BodyMap
        selectedRegionId={selectedRegion}
        onSelectRegion={handleSelectRegion}
        showDetailsCard={true}
      />

      {/* Guidance Notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="p-5 rounded-3xl bg-[#D9F0FF]/40 border border-[#89B9E6]/30 flex items-start gap-3">
          <Layers className="w-5 h-5 text-[#31465A] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#31465A]">Đa chiều 2 mặt</h4>
            <p className="text-xs text-[#31465A]/75 mt-0.5 leading-relaxed">
              Dễ dàng chuyển đổi giữa Mặt trước và Mặt sau để khảo sát toàn bộ các khớp và cơ.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#C7DFA3]/30 border border-[#C7DFA3] flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#31465A] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#31465A]">Chuẩn y khoa phục hồi</h4>
            <p className="text-xs text-[#31465A]/75 mt-0.5 leading-relaxed">
              Các bài tập phân loại theo các trường phái như Schroth, McKenzie, Manual Therapy.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#FFFDF7] border border-[#31465A]/10 flex items-start gap-3 shadow-sm">
          <HelpCircle className="w-5 h-5 text-[#89B9E6] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#31465A]">Không chắc chắn vùng đau?</h4>
            <p className="text-xs text-[#31465A]/75 mt-0.5 leading-relaxed">
              Bạn có thể khám phá toàn bộ 33 bài tập trong thư viện tổng hợp bất cứ lúc nào.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
