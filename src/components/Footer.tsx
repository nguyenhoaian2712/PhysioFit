import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldAlert, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#31465A] text-[#FFFDF7] border-t border-[#31465A]/20 pt-12 pb-8 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: About PhysioFit */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#C7DFA3] flex items-center justify-center text-[#31465A] font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#FFFDF7]">
                Physio<span className="text-[#C7DFA3]">Fit</span>
              </span>
            </div>
            <p className="text-sm text-[#FFFDF7]/80 leading-relaxed max-w-md">
              Nền tảng hỗ trợ phục hồi chức năng cơ xương khớp thông minh, trực quan. Kết nối trực tiếp các bài tập chuyên sâu chuẩn hóa giúp người dùng tự chủ cải thiện sức khỏe vận động.
            </p>
            <p className="text-xs text-[#C7DFA3] italic">
              "Tập đúng hơn. Theo dõi tốt hơn. Phục hồi chủ động hơn."
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C7DFA3]">Chức năng chính</h4>
            <ul className="space-y-1.5 text-sm text-[#FFFDF7]/80">
              <li>
                <Link to="/body-map" className="hover:text-[#FFFDF7] transition-colors">Sơ đồ cơ thể tương tác</Link>
              </li>
              <li>
                <Link to="/exercises" className="hover:text-[#FFFDF7] transition-colors">Thư viện 33+ bài tập</Link>
              </li>
              <li>
                <Link to="/rom-tracking" className="hover:text-[#FFFDF7] transition-colors">Ghi nhận biên độ ROM</Link>
              </li>
              <li>
                <Link to="/progress" className="hover:text-[#FFFDF7] transition-colors">Biểu đồ tiến trình hồi phục</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Conditions */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C7DFA3]">Nhóm bài tập</h4>
            <ul className="space-y-1.5 text-sm text-[#FFFDF7]/80">
              <li>Cổ vai gáy & Hội chứng cổ rùa</li>
              <li>Đông cứng & Cơ chóp xoay vai</li>
              <li>Cong vẹo cột sống (Schroth)</li>
              <li>Đau thắt lưng (McKenzie)</li>
              <li>Đứt dây chằng chéo trước (ACL)</li>
              <li>Hội chứng ống cổ tay & De Quervain</li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer Banner (Mandatory) */}
        <div className="p-4 rounded-2xl bg-[#FFFDF7]/10 border border-[#FFFDF7]/15 backdrop-blur-sm mb-8">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#C7DFA3] shrink-0 mt-0.5" />
            <div className="text-xs text-[#FFFDF7]/90 leading-relaxed">
              <strong className="text-[#C7DFA3]">Tuyên bố miễn trừ trách nhiệm y khoa:</strong> PhysioFit là nền tảng công nghệ hỗ trợ hướng dẫn bài tập phục hồi chức năng và theo dõi thể chất cá nhân. Các thông tin, video và hướng dẫn trên hệ thống mang tính chất tham khảo khoa học, không thay thế cho chẩn đoán, điều trị chuyên sâu hoặc chỉ định y tế trực tiếp từ bác sĩ chuyên khoa cơ xương khớp. Hãy ngưng tập và tham vấn bác sĩ nếu bạn cảm thấy đau nhói đột ngột hoặc các triệu chứng bất thường.
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-[#FFFDF7]/10 flex flex-col sm:flex-row justify-between items-center text-xs text-[#FFFDF7]/60 gap-3">
          <p>© 2026 PhysioFit Platform. Phát triển phục vụ sức khỏe cộng đồng.</p>
          <div className="flex items-center gap-1 text-[#FFFDF7]/70">
            <span>Đồng hành cùng sự phục hồi của bạn</span>
            <Heart className="w-3.5 h-3.5 text-[#C7DFA3] fill-[#C7DFA3]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
