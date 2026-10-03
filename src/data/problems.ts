import { ProblemCondition } from '../types';

export const PROBLEMS_DATA: ProblemCondition[] = [
  // Cổ
  {
    id: 'prob-neck-turtle',
    name: 'Hội chứng cổ rùa & Đau mỏi văn phòng',
    bodyRegionId: 'neck',
    description: 'Tư thế đầu đưa ra trước quá mức khi làm việc với máy tính, gây co cứng cơ thang và đau gáy.',
    symptoms: ['Đau mỏi sau gáy', 'Căng cứng hai bên vai gáy', 'Đau đầu âm ỉ vùng chẩm'],
    recommendedGoals: ['Kéo giãn cơ nâng vai', 'Tăng cường nhóm cơ gập cổ sâu', 'Điều chỉnh tư thế cột sống cổ'],
    exerciseIds: ['ex-02', 'ex-18', 'ex-19', 'ex-31']
  },
  {
    id: 'prob-neck-suboccipital',
    name: 'Đau điểm bám dưới chẩm & Kẹt khớp cổ',
    bodyRegionId: 'neck',
    description: 'Co rút nhóm cơ dưới chẩm gây kẹt tầm vận động ngửa xoay cổ và đau nhức lan tỏa đỉnh đầu.',
    symptoms: ['Cảm giác kẹp đau sau gáy sát chân tóc', 'Khó quay cổ sang hai bên', 'Chóng mặt nhẹ khi đổi tư thế'],
    recommendedGoals: ['Giải phóng manual therapy cơ dưới chẩm', 'Tăng ROM xoay cổ'],
    exerciseIds: ['ex-02', 'ex-31']
  },

  // Vai
  {
    id: 'prob-shoulder-frozen',
    name: 'Đông cứng khớp vai (Frozen Shoulder)',
    bodyRegionId: 'shoulder',
    description: 'Tình trạng viêm bao khớp vai gây dày dính, hạn chế nghiêm trọng tầm vận động dạng, xoay ngoài.',
    symptoms: ['Đau nhức vai khi về đêm', 'Không với tay ra sau lưng hoặc chải tóc được', 'Cứng khớp buổi sáng'],
    recommendedGoals: ['Tăng dần biên độ vận động khớp vai', 'Giảm dính bao khớp', 'Phục hồi chức năng sinh hoạt'],
    exerciseIds: ['ex-04', 'ex-13', 'ex-31']
  },
  {
    id: 'prob-shoulder-rotator-cuff',
    name: 'Tổn thương & Yếu nhóm cơ chóp xoay vai',
    bodyRegionId: 'shoulder',
    description: 'Mất cân bằng hoặc rách vi thể gân cơ trên gai, dưới gai, dưới vai làm vai đau khi nâng tay qua đầu.',
    symptoms: ['Đau nhói khi giơ tay qua đầu hoặc nhấc vật nặng', 'Yếu lực cánh tay', 'Có tiếng lạo xạo trong khớp'],
    recommendedGoals: ['Tái rèn luyện cơ chóp xoay', 'Ổn định xương bả vai', 'Tránh xung đột mỏm cùng vai'],
    exerciseIds: ['ex-07', 'ex-13']
  },

  // Cổ tay & Bàn tay
  {
    id: 'prob-wrist-carpal-tunnel',
    name: 'Hội chứng ống cổ tay (Carpal Tunnel Syndrome)',
    bodyRegionId: 'wrist_hand',
    description: 'Chèn ép dây thần kinh giữa khi đi qua ống cổ tay, thường gặp ở người dùng chuột/bàn phím nhiều.',
    symptoms: ['Tê bì châm chích ngón cái, ngón trỏ, ngón giữa', 'Yếu lực cầm nắm, dễ rơi đồ vật', 'Tê tăng khi ngủ'],
    recommendedGoals: ['Trượt thần kinh giữa (Nerve Gliding)', 'Kéo giãn nhóm cơ gấp cổ tay', 'Giảm áp lực trong ống cổ tay'],
    exerciseIds: ['ex-17', 'ex-30', 'ex-32']
  },
  {
    id: 'prob-wrist-de-quervain',
    name: 'Hội chứng Viêm bao gân De Quervain',
    bodyRegionId: 'wrist_hand',
    description: 'Viêm gân dạng dài và duỗi ngắn ngón tay cái tại rãnh cổ tay phía ngón cái.',
    symptoms: ['Đau sưng vùng gốc ngón cái', 'Đau tăng khi cầm điện thoại, nắm ngón tay gập cổ tay (Finkelstein test)'],
    recommendedGoals: ['Kéo giãn bao gân ngón cái nhẹ nhàng', 'Tăng sức bền cổ tay không gây đau'],
    exerciseIds: ['ex-27']
  },

  // Lưng giữa & Cột sống
  {
    id: 'prob-spine-scoliosis',
    name: 'Cong vẹo cột sống (Scoliosis & Schroth Method)',
    bodyRegionId: 'mid_back',
    description: 'Biến dạng cột sống theo mặt phẳng không gian 3 chiều, gây lệch vai, khung chậu và bất đối xứng thân mình.',
    symptoms: ['Hai vai không đều', 'Bướu sườn một bên nhô cao khi cúi người', 'Mỏi lưng khi đứng lâu'],
    recommendedGoals: ['Chỉnh sửa tư thế phương pháp Schroth', 'Tăng cường cơ lưng bất đối xứng', 'Tập thở mở rộng vùng xẹp'],
    exerciseIds: ['ex-05', 'ex-11', 'ex-15', 'ex-16', 'ex-20', 'ex-23', 'ex-24']
  },
  {
    id: 'prob-spine-posture-desk',
    name: 'Gù lưng & Đau lưng mỏi cột sống văn phòng',
    bodyRegionId: 'mid_back',
    description: 'Ngồi khom lưng kéo dài làm căng cơ dựng sống lưng và giảm tính linh hoạt của đốt sống ngực.',
    symptoms: ['Cảm giác mỏi nhừ giữa hai xương bả vai', 'Gù nhẹ lưng trên', 'Khó ưỡn thẳng lưng'],
    recommendedGoals: ['Mở ngực duỗi cột sống', 'Tăng độ dẻo dai khớp đốt sống ngực', 'Kích hoạt cơ trám và lưng dưới'],
    exerciseIds: ['ex-08', 'ex-21', 'ex-25', 'ex-26']
  },

  // Lưng dưới & Thắt lưng
  {
    id: 'prob-lowback-mckenzie',
    name: 'Đau thắt lưng & Thoát vị đĩa đệm (Phương pháp McKenzie)',
    bodyRegionId: 'lower_back',
    description: 'Áp lực lên đĩa đệm vùng L4-L5, L5-S1 gây đau thắt lưng cục bộ hoặc đau lan xuống mông đùi.',
    symptoms: ['Đau nhức thắt lưng khi ngồi lâu hoặc cúi gập', 'Đau khi chuyển tư thế nằm sang ngồi'],
    recommendedGoals: ['Kỹ thuật duỗi McKenzie dịch chuyển nhân nhầy', 'Tăng vững cơ lõi (Core stability)', 'Giảm áp lực rễ thần kinh'],
    exerciseIds: ['ex-09', 'ex-28', 'ex-33']
  },
  {
    id: 'prob-lowback-hyperlordosis',
    name: 'Võng thắt lưng (Tật nghiêng chậu trước)',
    bodyRegionId: 'lower_back',
    description: 'Độ cong thắt lưng quá mức kèm bụng nhô ra trước do căng cơ thắt lưng chậu và yếu cơ bụng.',
    symptoms: ['Đau mỏi thắt lưng khi đứng lâu', 'Bụng dưới bị đẩy ra trước dù người gầy', 'Căng tức cơ đùi trước'],
    recommendedGoals: ['Kéo giãn cơ gập hông', 'Kích hoạt cơ mông và cơ bụng sâu', 'Cân bằng lại góc nghiêng xương chậu'],
    exerciseIds: ['ex-12', 'ex-22']
  },

  // Đầu gối
  {
    id: 'prob-knee-acl',
    name: 'Phục hồi sau phẫu thuật Đứt dây chằng chéo trước (ACL)',
    bodyRegionId: 'knee',
    description: 'Giai đoạn tập luyện từ tuần 0-2 và các tuần tiếp theo giúp phục hồi duỗi thẳng gối, kiểm soát phù nề và kích hoạt cơ đùi.',
    symptoms: ['Cứng gối sau mổ', 'Khó khăn duỗi gối hết biên độ', 'Teo cơ tứ đầu đùi tạm thời'],
    recommendedGoals: ['Đạt duỗi gối 0 độ hoàn toàn', 'Kích hoạt gồng cơ tĩnh tứ đầu đùi', 'Gập gối thụ động đến 90 độ an toàn'],
    exerciseIds: ['ex-01', 'ex-03']
  },

  // Cổ chân & Bàn chân
  {
    id: 'prob-foot-flatfoot',
    name: 'Bàn chân bẹt & Sụp vòm bàn chân (Flat Feet)',
    bodyRegionId: 'ankle_foot',
    description: 'Mất hoặc giảm vòm dọc bàn chân ở trẻ em và người lớn, dẫn đến lệch trục gối và mỏi cổ chân khi đi bộ.',
    symptoms: ['Toàn bộ lòng bàn chân chạm đất khi đứng', 'Mau mỏi chân, đau gót chân khi đi bộ', 'Gót chân vẹo ngoài'],
    recommendedGoals: ['Kích hoạt cơ chày sau', 'Tập co nhấc vòm chân (Short Foot)', 'Cân bằng thăng bằng mắt cá chân'],
    exerciseIds: ['ex-06', 'ex-10', 'ex-14', 'ex-29']
  }
];
