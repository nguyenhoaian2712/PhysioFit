import { BodyRegion } from '../types';

export const BODY_REGIONS: BodyRegion[] = [
  {
    id: 'neck',
    name: 'Cổ',
    vietnameseName: 'Vùng Cổ & Gáy',
    description: 'Giảm đau mỏi cổ vai gáy, cải thiện hội chứng cổ rùa, đau dưới chẩm và tăng tầm vận động xoay cổ.',
    view: ['front', 'back'],
    icon: 'Activity',
    problemCount: 4
  },
  {
    id: 'shoulder',
    name: 'Vai',
    vietnameseName: 'Khớp Vai & Chóp Xoay',
    description: 'Phục hồi khớp vai đông cứng, tổn thương cơ chóp xoay, viêm quanh khớp vai và tăng độ linh hoạt khớp vai.',
    view: ['front', 'back'],
    icon: 'Shield',
    problemCount: 4
  },
  {
    id: 'elbow',
    name: 'Khuỷu tay',
    vietnameseName: 'Khớp Khuỷu & Cẳng Tay',
    description: 'Giảm căng cơ cánh tay, đau lồi cầu trong/ngoài cánh tay do vận động nhiều hoặc làm việc văn phòng.',
    view: ['front', 'back'],
    icon: 'Zap',
    problemCount: 2
  },
  {
    id: 'wrist_hand',
    name: 'Cổ tay & Bàn tay',
    vietnameseName: 'Cổ Tay, Ngón Tay & Bàn Tay',
    description: 'Điều trị hội chứng ống cổ tay (CTS), viêm bao gân De Quervain, tê bì ngón tay và phục hồi sức mạnh cầm nắm.',
    view: ['front', 'back'],
    icon: 'Hand',
    problemCount: 3
  },
  {
    id: 'upper_back',
    name: 'Lưng trên',
    vietnameseName: 'Lưng Trên & Lồng Ngực',
    description: 'Giải phóng căng cứng nhóm cơ hình thang, cơ trám và mở rộng biên độ thở lồng ngực.',
    view: ['back'],
    icon: 'Layers',
    problemCount: 3
  },
  {
    id: 'mid_back',
    name: 'Lưng giữa & Cột sống',
    vietnameseName: 'Cột Sống Ngực & Lưng Giữa',
    description: 'Chỉnh sửa cong vẹo cột sống (phương pháp Schroth), tăng độ dẻo dai cột sống cho người ngồi lâu.',
    view: ['back'],
    icon: 'GitCommit',
    problemCount: 5
  },
  {
    id: 'lower_back',
    name: 'Lưng dưới & Thắt lưng',
    vietnameseName: 'Thắt Lưng & Cùng Cụt',
    description: 'Phục hồi đau lưng dưới, thoát vị đĩa đệm (phương pháp McKenzie), cải thiện tư thế võng lưng và vẹo thắt lưng.',
    view: ['back'],
    icon: 'HeartPulse',
    problemCount: 5
  },
  {
    id: 'hip',
    name: 'Hông & Khung chậu',
    vietnameseName: 'Khớp Hông & Khung Chậu',
    description: 'Cải thiện độ mở khớp háng, cân bằng khung chậu và giải tỏa áp lực dây thần kinh tọa.',
    view: ['front', 'back'],
    icon: 'Compass',
    problemCount: 3
  },
  {
    id: 'thigh',
    name: 'Đùi',
    vietnameseName: 'Cơ Tứ Đầu & Cơ Gân Kheo',
    description: 'Kéo giãn và tăng cường sức mạnh nhóm cơ đùi trước, đùi sau hỗ trợ khớp gối và hông.',
    view: ['front', 'back'],
    icon: 'TrendingUp',
    problemCount: 2
  },
  {
    id: 'knee',
    name: 'Đầu gối',
    vietnameseName: 'Khớp Gối & Dây Chằng',
    description: 'Phục hồi sau phẫu thuật tái tạo dây chằng chéo trước (ACL 0-2 tuần+), thoái hóa khớp gối và đau bánh chè.',
    view: ['front'],
    icon: 'Crosshair',
    problemCount: 3
  },
  {
    id: 'calf_shin',
    name: 'Cẳng chân',
    vietnameseName: 'Bắp Chân & Ống Chân',
    description: 'Giảm chuột rút bắp chân, căng gân gót Achilles và tăng cường lưu thông tuần hoàn máu ngoại vi.',
    view: ['front', 'back'],
    icon: 'Feather',
    problemCount: 2
  },
  {
    id: 'ankle_foot',
    name: 'Cổ chân & Bàn chân',
    vietnameseName: 'Cổ Chân & Bàn Chân Bẹt',
    description: 'Bài tập cải thiện bàn chân bẹt cho trẻ em và người lớn, phục hồi dây chằng cổ chân sau bong gân.',
    view: ['front', 'back'],
    icon: 'Anchor',
    problemCount: 4
  }
];
