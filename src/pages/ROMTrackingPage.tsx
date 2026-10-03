import React, { useState } from 'react';
import { 
  Compass, 
  HeartPulse, 
  Plus, 
  Calendar, 
  Activity, 
  CheckCircle2, 
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { ROMChart } from '../components/ROMChart';
import { PainScaleModal } from '../components/PainScaleModal';
import { ROMRecord, PainRecord, BodyRegionId } from '../types';
import { BODY_REGIONS } from '../data/bodyRegions';

interface ROMTrackingPageProps {
  romRecords: ROMRecord[];
  painRecords: PainRecord[];
  onAddROMRecord: (record: Omit<ROMRecord, 'id' | 'timestamp'>) => void;
  onAddPainRecord: (record: Omit<PainRecord, 'id' | 'timestamp'>) => void;
}

export const ROMTrackingPage: React.FC<ROMTrackingPageProps> = ({
  romRecords,
  painRecords,
  onAddROMRecord,
  onAddPainRecord
}) => {
  const [activeTab, setActiveTab] = useState<'rom' | 'pain'>('rom');
  const [showPainModal, setShowPainModal] = useState(false);
  const [selectedPainRegion, setSelectedPainRegion] = useState<BodyRegionId>('neck');

  const handleSavePain = (level: number, notes: string) => {
    const region = BODY_REGIONS.find((r) => r.id === selectedPainRegion) || BODY_REGIONS[0];
    onAddPainRecord({
      bodyRegionId: region.id,
      bodyRegionName: region.name,
      painLevelBefore: level,
      notes: notes || undefined
    });
  };

  const selectedRegionName =
    BODY_REGIONS.find((r) => r.id === selectedPainRegion)?.vietnameseName || 'Vùng Cổ';

  return (
    <div className="space-y-8 py-4 sm:py-6">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C7DFA3] text-[#31465A] text-xs font-bold shadow-sm">
          <Activity className="w-3.5 h-3.5" />
          <span>Công cụ đo lường lâm sàng</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#31465A] tracking-tight">
          Theo Dõi Biên Độ Khớp (ROM) & Nhật Ký Đau
        </h1>

        <p className="text-sm text-[#31465A]/80 leading-relaxed">
          Đo góc tầm vận động (Range of Motion) của các khớp và ghi nhận mức độ đau thang điểm VAS (0-10) để theo sát quá trình hồi phục.
        </p>

        {/* Tab switcher */}
        <div className="flex justify-center pt-2">
          <div className="inline-flex bg-[#D9F0FF]/60 p-1.5 rounded-2xl border border-[#31465A]/10">
            <button
              onClick={() => setActiveTab('rom')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'rom'
                  ? 'bg-[#31465A] text-[#FFFDF7] shadow-sm'
                  : 'text-[#31465A]/70 hover:text-[#31465A]'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Đo góc vận động (ROM)</span>
            </button>

            <button
              onClick={() => setActiveTab('pain')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'pain'
                  ? 'bg-[#31465A] text-[#FFFDF7] shadow-sm'
                  : 'text-[#31465A]/70 hover:text-[#31465A]'
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              <span>Nhật ký mức độ đau (VAS)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: ROM Measurements */}
      {activeTab === 'rom' && (
        <div className="space-y-6 animate-fadeIn">
          <ROMChart records={romRecords} onAddRecord={onAddROMRecord} />
        </div>
      )}

      {/* Tab 2: Pain Diary */}
      {activeTab === 'pain' && (
        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 border border-[#31465A]/10 shadow-sm space-y-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#31465A]/10">
            <div>
              <h3 className="text-xl font-bold text-[#31465A] flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-[#C7DFA3]" />
                <span>Nhật Ký Đau Thang Điểm VAS (0-10)</span>
              </h3>
              <p className="text-xs text-[#31465A]/70 mt-1">
                Ghi nhận tình trạng đau tự nhiên hoặc sau khi tập luyện để bác sĩ và bạn cùng theo dõi.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedPainRegion}
                onChange={(e) => setSelectedPainRegion(e.target.value as BodyRegionId)}
                className="text-xs font-semibold text-[#31465A] bg-[#D9F0FF] border border-[#89B9E6]/30 rounded-xl px-3 py-2"
              >
                {BODY_REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowPainModal(true)}
                className="flex-1 sm:flex-none py-2 px-4 rounded-xl bg-[#31465A] text-[#FFFDF7] text-xs font-bold hover:bg-[#31465A]/90 transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4 text-[#C7DFA3]" />
                <span>Thêm bản ghi đau</span>
              </button>
            </div>
          </div>

          {/* Pain History Table / Cards */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#31465A]">
              Tất cả các lần đánh giá đau ({painRecords.length})
            </h4>

            {painRecords.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {painRecords.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl bg-[#FFFDF7] border border-[#31465A]/10 hover:border-[#89B9E6] shadow-xs space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs text-[#31465A]">{p.bodyRegionName}</span>
                      <span className="text-[10px] text-[#31465A]/60">
                        {new Date(p.timestamp).toLocaleDateString('vi-VN')} {new Date(p.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {p.exerciseTitle && (
                      <p className="text-[11px] text-[#31465A]/70 truncate">
                        Bài: {p.exerciseTitle}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#31465A]/70">Trước:</span>
                        <span className="font-bold text-sm text-[#31465A]">
                          {p.painLevelBefore}/10
                        </span>
                        {p.painLevelAfter !== undefined && (
                          <>
                            <span className="text-xs text-[#31465A]/70">→ Sau:</span>
                            <span className="font-bold text-sm text-emerald-600">
                              {p.painLevelAfter}/10
                            </span>
                          </>
                        )}
                      </div>

                      {p.painLevelAfter !== undefined && p.painLevelAfter < p.painLevelBefore && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <TrendingDown className="w-3 h-3" />
                          Giảm {p.painLevelBefore - p.painLevelAfter} điểm
                        </span>
                      )}
                    </div>

                    {p.notes && (
                      <p className="text-[10px] text-[#31465A]/80 italic bg-[#D9F0FF]/40 p-2 rounded-xl">
                        "{p.notes}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#31465A]/60 italic">Chưa có bản ghi đau nào.</p>
            )}
          </div>

          <PainScaleModal
            isOpen={showPainModal}
            title="Ghi nhận mức độ đau"
            bodyRegionName={selectedRegionName}
            onSave={handleSavePain}
            onClose={() => setShowPainModal(false)}
          />
        </div>
      )}
    </div>
  );
};
