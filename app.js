// PHYSIOFIT PLATFORM - FULL JAVASCRIPT APPLICATION WITH ONBOARDING & PERSONALIZED PROFILES
const { useState, useEffect, useRef, useMemo } = React;

// --- 1. DATASETS & PLAYLIST MAPPING (33 EXERCISES) ---
const BODY_REGIONS = [
  { id: 'neck', name: 'Cổ', vietnameseName: 'Vùng Cổ & Gáy', description: 'Giảm đau mỏi cổ vai gáy, cải thiện hội chứng cổ rùa, đau dưới chẩm và tăng tầm vận động xoay cổ.', view: ['front', 'back'], problemCount: 4 },
  { id: 'shoulder', name: 'Vai', vietnameseName: 'Khớp Vai & Chóp Xoay', description: 'Phục hồi khớp vai đông cứng, tổn thương cơ chóp xoay, viêm quanh khớp vai và tăng độ linh hoạt.', view: ['front', 'back'], problemCount: 4 },
  { id: 'elbow', name: 'Khuỷu tay', vietnameseName: 'Khớp Khuỷu & Cẳng Tay', description: 'Giảm căng cơ cánh tay, đau lồi cầu trong/ngoài cánh tay do vận động hoặc làm việc máy tính.', view: ['front', 'back'], problemCount: 2 },
  { id: 'wrist_hand', name: 'Cổ tay & Bàn tay', vietnameseName: 'Cổ Tay & Ngón Tay', description: 'Điều trị hội chứng ống cổ tay (CTS), viêm bao gân De Quervain, tê bì ngón tay.', view: ['front', 'back'], problemCount: 3 },
  { id: 'upper_back', name: 'Lưng trên', vietnameseName: 'Lưng Trên & Lồng Ngực', description: 'Giải phóng căng cứng nhóm cơ hình thang, cơ trám và mở rộng biên độ thở lồng ngực.', view: ['back'], problemCount: 3 },
  { id: 'mid_back', name: 'Lưng giữa & Cột sống', vietnameseName: 'Cột Sống Ngực & Lưng Giữa', description: 'Chỉnh sửa cong vẹo cột sống (phương pháp Schroth), tăng độ dẻo dai cột sống.', view: ['back'], problemCount: 5 },
  { id: 'lower_back', name: 'Lưng dưới & Thắt lưng', vietnameseName: 'Thắt Lưng & Cùng Cụt', description: 'Phục hồi đau lưng dưới, thoát vị đĩa đệm (phương pháp McKenzie), cải thiện võng lưng.', view: ['back'], problemCount: 5 },
  { id: 'hip', name: 'Hông & Khung chậu', vietnameseName: 'Khớp Hông & Khung Chậu', description: 'Cải thiện độ mở khớp háng, cân bằng khung chậu và giải tỏa áp lực thần kinh tọa.', view: ['front', 'back'], problemCount: 3 },
  { id: 'thigh', name: 'Đùi', vietnameseName: 'Cơ Tứ Đầu & Gân Kheo', description: 'Kéo giãn và tăng cường sức mạnh nhóm cơ đùi trước, đùi sau hỗ trợ khớp gối.', view: ['front', 'back'], problemCount: 2 },
  { id: 'knee', name: 'Đầu gối', vietnameseName: 'Khớp Gối & Dây Chằng', description: 'Phục hồi sau phẫu thuật tái tạo dây chằng chéo trước (ACL), thoái hóa khớp gối.', view: ['front'], problemCount: 3 },
  { id: 'calf_shin', name: 'Cẳng chân', vietnameseName: 'Bắp Chân & Ống Chân', description: 'Giảm chuột rút bắp chân, căng gân gót Achilles và tăng tuần hoàn máu.', view: ['front', 'back'], problemCount: 2 },
  { id: 'ankle_foot', name: 'Cổ chân & Bàn chân', vietnameseName: 'Cổ Chân & Bàn Chân Bẹt', description: 'Bài tập cải thiện bàn chân bẹt cho trẻ em và người lớn, phục hồi sau bong gân.', view: ['front', 'back'], problemCount: 4 }
];

const HEALTH_CONDITIONS_LIST = [
  'Đau cổ – vai – gáy',
  'Đau lưng',
  'Đau khớp gối',
  'Thoát vị đĩa đệm',
  'Đau khớp vai',
  'Đau cổ tay / khuỷu tay',
  'Đau hông',
  'Đau cổ chân',
  'Đau cơ',
  'Đang phục hồi sau chấn thương',
  'Đang phục hồi sau phẫu thuật',
  'Khác'
];

const PROBLEMS_DATA = [
  { id: 'prob-neck-turtle', name: 'Hội chứng cổ rùa & Đau mỏi văn phòng', bodyRegionId: 'neck', description: 'Tư thế đầu đưa ra trước quá mức khi dùng máy tính, gây co cứng cơ thang và đau gáy.', symptoms: ['Đau mỏi sau gáy', 'Căng cứng vai gáy', 'Đau đầu âm ỉ vùng chẩm'], recommendedGoals: ['Kéo giãn cơ nâng vai', 'Tăng cường nhóm cơ gập cổ sâu'], exerciseIds: ['ex-02', 'ex-18', 'ex-19', 'ex-31'] },
  { id: 'prob-neck-suboccipital', name: 'Đau điểm bám dưới chẩm & Kẹt khớp cổ', bodyRegionId: 'neck', description: 'Co rút nhóm cơ dưới chẩm gây kẹt tầm vận động ngửa xoay cổ.', symptoms: ['Kẹt đau sau gáy sát chân tóc', 'Khó quay cổ', 'Chóng mặt nhẹ khi đổi tư thế'], recommendedGoals: ['Giải phóng manual therapy dưới chẩm', 'Tăng ROM xoay cổ'], exerciseIds: ['ex-02', 'ex-31'] },
  { id: 'prob-shoulder-frozen', name: 'Đông cứng khớp vai (Frozen Shoulder)', bodyRegionId: 'shoulder', description: 'Viêm bao khớp vai gây dày dính, hạn chế nghiêm trọng tầm vận động dạng, xoay ngoài.', symptoms: ['Đau nhức vai khi về đêm', 'Không với tay ra sau lưng được', 'Cứng khớp buổi sáng'], recommendedGoals: ['Tăng biên độ vận động', 'Giảm dính bao khớp'], exerciseIds: ['ex-04', 'ex-13', 'ex-31'] },
  { id: 'prob-shoulder-rotator-cuff', name: 'Tổn thương nhóm cơ chóp xoay vai', bodyRegionId: 'shoulder', description: 'Yếu hoặc rách vi thể gân cơ trên gai, dưới gai làm đau khi nâng tay qua đầu.', symptoms: ['Đau nhói khi nâng tay', 'Yếu lực cánh tay', 'Tiếng lạo xạo trong khớp'], recommendedGoals: ['Rèn luyện cơ chóp xoay', 'Ổn định bả vai'], exerciseIds: ['ex-07', 'ex-13'] },
  { id: 'prob-wrist-carpal-tunnel', name: 'Hội chứng ống cổ tay (Carpal Tunnel)', bodyRegionId: 'wrist_hand', description: 'Chèn ép dây thần kinh giữa khi đi qua ống cổ tay.', symptoms: ['Tê bì ngón cái, ngón trỏ, giữa', 'Yếu lực cầm nắm', 'Tê tăng khi ngủ'], recommendedGoals: ['Trượt thần kinh giữa', 'Kéo giãn cơ gấp cổ tay'], exerciseIds: ['ex-17', 'ex-30', 'ex-32'] },
  { id: 'prob-wrist-de-quervain', name: 'Hội chứng Viêm bao gân De Quervain', bodyRegionId: 'wrist_hand', description: 'Viêm gân dạng dài và duỗi ngắn ngón tay cái tại rãnh cổ tay.', symptoms: ['Đau vùng gốc ngón cái', 'Đau khi cầm điện thoại, gập ngón cái'], recommendedGoals: ['Kéo giãn bao gân nhẹ nhàng', 'Tăng sức bền cổ tay'], exerciseIds: ['ex-27'] },
  { id: 'prob-spine-scoliosis', name: 'Cong vẹo cột sống (Scoliosis - Schroth)', bodyRegionId: 'mid_back', description: 'Biến dạng cột sống không gian 3 chiều, gây lệch vai, bướu sườn.', symptoms: ['Hai vai không đều', 'Bướu sườn nhô khi cúi', 'Mỏi lưng khi đứng lâu'], recommendedGoals: ['Chỉnh sửa tư thế Schroth', 'Tập thở mở rộng vùng xẹp'], exerciseIds: ['ex-05', 'ex-11', 'ex-15', 'ex-16', 'ex-20', 'ex-23', 'ex-24'] },
  { id: 'prob-spine-posture-desk', name: 'Gù lưng & Đau mỏi cột sống văn phòng', bodyRegionId: 'mid_back', description: 'Ngồi khom lưng kéo dài làm giảm tính linh hoạt đốt sống ngực.', symptoms: ['Mỏi nhừ giữa 2 xương bả vai', 'Gù nhẹ lưng trên'], recommendedGoals: ['Mở ngực duỗi cột sống', 'Tăng độ dẻo dai lưng giữa'], exerciseIds: ['ex-08', 'ex-21', 'ex-25', 'ex-26'] },
  { id: 'prob-lowback-mckenzie', name: 'Đau thắt lưng & Thoát vị đĩa đệm (McKenzie)', bodyRegionId: 'lower_back', description: 'Áp lực lên đĩa đệm thắt lưng gây đau cục bộ hoặc lan xuống đùi.', symptoms: ['Đau khi ngồi lâu hoặc cúi gập', 'Đau khi chuyển tư thế nằm sang ngồi'], recommendedGoals: ['Kỹ thuật duỗi McKenzie', 'Tăng vững cơ lõi'], exerciseIds: ['ex-09', 'ex-28', 'ex-33'] },
  { id: 'prob-lowback-hyperlordosis', name: 'Võng thắt lưng (Nghiêng chậu trước)', bodyRegionId: 'lower_back', description: 'Độ cong thắt lưng quá mức kèm bụng nhô ra trước do căng cơ gập hông.', symptoms: ['Mỏi thắt lưng khi đứng lâu', 'Căng tức đùi trước'], recommendedGoals: ['Kéo giãn cơ gập hông', 'Kích hoạt cơ bụng sâu và cơ mông'], exerciseIds: ['ex-12', 'ex-22'] },
  { id: 'prob-knee-acl', name: 'Phục hồi đứt dây chằng chéo trước (ACL)', bodyRegionId: 'knee', description: 'Tập luyện phục hồi gối từ tuần 0-2+ giúp duỗi thẳng gối và kích hoạt cơ đùi.', symptoms: ['Cứng gối sau mổ', 'Khó duỗi gối hết biên độ', 'Teo cơ tứ đầu đùi'], recommendedGoals: ['Đạt duỗi gối 0 độ hoàn toàn', 'Gồng cơ tĩnh tứ đầu đùi'], exerciseIds: ['ex-01', 'ex-03'] },
  { id: 'prob-foot-flatfoot', name: 'Bàn chân bẹt (Flat Feet)', bodyRegionId: 'ankle_foot', description: 'Giảm hoặc mất vòm dọc bàn chân ở trẻ em và người lớn.', symptoms: ['Lòng bàn chân chạm phẳng đất', 'Mau mỏi chân khi đi bộ', 'Gót chân vẹo ngoài'], recommendedGoals: ['Kích hoạt cơ chày sau', 'Tập bài tập Short Foot tạo vòm'], exerciseIds: ['ex-06', 'ex-10', 'ex-14', 'ex-29'] }
];

const EXERCISES_DATA = [
  {
    id: 'ex-01',
    title: 'Hướng dẫn bài tập tại nhà sau phẫu thuật đứt dây chằng chéo (Giai đoạn 0-2 tuần)',
    bodyRegionId: 'knee',
    bodyRegionName: 'Đầu gối',
    problemIds: ['prob-knee-acl'],
    problemNames: ['Phục hồi đứt dây chằng chéo trước (ACL)'],
    difficulty: 'Dễ',
    durationMinutes: 8,
    repsSets: '3 hiệp x 10-15 lần',
    goals: ['Đạt duỗi thẳng gối hoàn toàn (0 độ)', 'Kích hoạt gồng cơ tĩnh tứ đầu đùi', 'Ngừa teo cơ sau mổ'],
    precautions: ['Không gập gối quá góc cho phép của bác sĩ', 'Ngưng tập nếu sưng nóng đỏ'],
    instructions: [
      { stepNumber: 1, title: 'Gồng cơ tứ đầu đùi (Quad Sets)', instruction: 'Nằm ngửa kê khăn dưới gót chân, ép gối sát mặt sàn 5 giây.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Bơm cổ chân (Ankle Pumps)', instruction: 'Gập duỗi cổ chân liên tục tăng tuần hoàn tĩnh mạch.', durationSeconds: 60 },
      { stepNumber: 3, title: 'Nâng thẳng chân (SLR)', instruction: 'Gồng đùi nâng chân cách giường 20-30cm giữ 3 giây.', durationSeconds: 90 },
      { stepNumber: 4, title: 'Trượt gót thụ động', instruction: 'Dùng dây hỗ trợ trượt nhẹ gót chân về mông trong biên độ an toàn.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'p2IYswerPDU', url: 'https://www.youtube.com/watch?v=p2IYswerPDU', thumbnail: 'https://img.youtube.com/vi/p2IYswerPDU/hqdefault.jpg' },
    tags: ['Dây chằng chéo', 'Gối sau mổ', 'ACL 0-2 tuần'],
    isPopular: true
  },
  {
    id: 'ex-02',
    title: 'Manual Therapy - Giải pháp đau dưới chẩm và đau cổ gáy',
    bodyRegionId: 'neck',
    bodyRegionName: 'Cổ',
    problemIds: ['prob-neck-turtle', 'prob-neck-suboccipital'],
    problemNames: ['Hội chứng cổ rùa & Đau mỏi văn phòng', 'Đau điểm bám dưới chẩm'],
    difficulty: 'Dễ',
    durationMinutes: 6,
    repsSets: '2-3 hiệp x 8 lần',
    goals: ['Giải tỏa co cứng cơ dưới chẩm', 'Giảm nhức đỉnh đầu', 'Gia tăng tầm xoay cổ'],
    precautions: ['Thao tác nhẹ nhàng, không bẻ giật cổ đột ngột'],
    instructions: [
      { stepNumber: 1, title: 'Xác định hõm dưới chẩm', instruction: 'Đặt 2 ngón cái vào hõm sau gáy sát chân hộp sọ.', durationSeconds: 45 },
      { stepNumber: 2, title: 'Massage giải phóng điểm căng', instruction: 'Ấn nhẹ hướng lên kết hợp hít thở sâu trong 30 giây.', durationSeconds: 60 },
      { stepNumber: 3, title: 'Thu cằm (Chin Tuck)', instruction: 'Kéo nhẹ cằm vào trong như tạo cằm đôi giữ 5 giây.', durationSeconds: 60 }
    ],
    video: { provider: 'youtube', videoId: 'Tae8d9qtEzA', url: 'https://www.youtube.com/watch?v=Tae8d9qtEzA', thumbnail: 'https://img.youtube.com/vi/Tae8d9qtEzA/hqdefault.jpg' },
    tags: ['Cổ vai gáy', 'Manual Therapy', 'Dưới chẩm'],
    isPopular: true
  },
  {
    id: 'ex-03',
    title: 'Bài tập sau phẫu thuật đứt dây chằng chéo (Tăng tiến)',
    bodyRegionId: 'knee',
    bodyRegionName: 'Đầu gối',
    problemIds: ['prob-knee-acl'],
    problemNames: ['Phục hồi đứt dây chằng chéo trước (ACL)'],
    difficulty: 'Trung bình',
    durationMinutes: 10,
    repsSets: '3 hiệp x 12 lần',
    goals: ['Tăng sức mạnh cơ gân kheo và đùi', 'Cải thiện biên độ gập gối', 'Lấy lại thăng bằng'],
    precautions: ['Tập khi gối không còn tràn dịch cấp'],
    instructions: [
      { stepNumber: 1, title: 'Gập gối nằm sấp', instruction: 'Nằm sấp, gập gối kéo gót về phía mông từ từ.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Cầu mông (Glute Bridge)', instruction: 'Nâng hông tạo đường thẳng từ ngực đến gối.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'ljn9td1SF6U', url: 'https://www.youtube.com/watch?v=ljn9td1SF6U', thumbnail: 'https://img.youtube.com/vi/ljn9td1SF6U/hqdefault.jpg' },
    tags: ['ACL', 'Khớp gối', 'Tăng tiến']
  },
  {
    id: 'ex-04',
    title: 'Hướng dẫn bài tập phục hồi chức năng đông cứng khớp vai sau tiêm',
    bodyRegionId: 'shoulder',
    bodyRegionName: 'Vai',
    problemIds: ['prob-shoulder-frozen'],
    problemNames: ['Đông cứng khớp vai (Frozen Shoulder)'],
    difficulty: 'Dễ',
    durationMinutes: 7,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Tách bao khớp vai dày dính', 'Tăng góc dạng và xoay ngoài', 'Giảm đau cánh tay'],
    precautions: ['Tập trong biên độ không quá đau 4/10'],
    instructions: [
      { stepNumber: 1, title: 'Con lắc Codman', instruction: 'Cúi người chống tay bàn, để tay đau đung đưa tự do vòng tròn.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Bò tường (Finger Ladder)', instruction: 'Dùng ngón tay bò từ từ lên cao trên tường.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'SlG-SFBSYiM', url: 'https://www.youtube.com/watch?v=SlG-SFBSYiM', thumbnail: 'https://img.youtube.com/vi/SlG-SFBSYiM/hqdefault.jpg' },
    tags: ['Đông cứng khớp vai', 'Codman', 'Khớp vai'],
    isPopular: true
  },
  {
    id: 'ex-05',
    title: 'Hướng dẫn bài tập Schroth tại nhà cho cong vẹo cột sống',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-scoliosis'],
    problemNames: ['Cong vẹo cột sống (Scoliosis - Schroth)'],
    difficulty: 'Trung bình',
    durationMinutes: 12,
    repsSets: '3 hiệp x 5 nhịp thở Schroth',
    goals: ['Chỉnh sửa không gian 3 chiều cột sống', 'Mở rộng thể tích phổi vùng lưng xẹp', 'Tăng sức mạnh cơ cạnh sống'],
    precautions: ['Xác định đường cong chính trước khi tập'],
    instructions: [
      { stepNumber: 1, title: 'Kéo giãn dọc thân (Elongation)', instruction: 'Ngồi thẳng vươn đỉnh đầu lên cao giải áp đốt sống.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Thở xoay Schroth', instruction: 'Hít sâu dồn khí vào vùng lưng lõm xẹp rồi thở ra kháng lực.', durationSeconds: 120 }
    ],
    video: { provider: 'youtube', videoId: 'ngGxCC3QdKU', url: 'https://www.youtube.com/watch?v=ngGxCC3QdKU', thumbnail: 'https://img.youtube.com/vi/ngGxCC3QdKU/hqdefault.jpg' },
    tags: ['Schroth', 'Vẹo cột sống', 'Lưng giữa'],
    isPopular: true
  },
  {
    id: 'ex-06',
    title: '2 bài tập cải thiện bàn chân bẹt cho trẻ em hiệu quả tại nhà',
    bodyRegionId: 'ankle_foot',
    bodyRegionName: 'Cổ chân & Bàn chân',
    problemIds: ['prob-foot-flatfoot'],
    problemNames: ['Bàn chân bẹt (Flat Feet)'],
    difficulty: 'Dễ',
    durationMinutes: 6,
    repsSets: '2 hiệp x 15 lần',
    goals: ['Hình thành vòm dọc lòng bàn chân', 'Tăng sức mạnh cơ gập ngón và gân chày sau'],
    precautions: ['Cho trẻ tập trên thảm chống trượt an toàn'],
    instructions: [
      { stepNumber: 1, title: 'Gắp khăn bằng ngón chân', instruction: 'Dùng các ngón chân co quắp gắp khăn nhỏ trên sàn.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Đi nhón ngón và mép ngoài', instruction: 'Đi nhón gót 10 bước rồi chuyển đi bằng cạnh ngoài.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'PXO6u-d6qus', url: 'https://www.youtube.com/watch?v=PXO6u-d6qus', thumbnail: 'https://img.youtube.com/vi/PXO6u-d6qus/hqdefault.jpg' },
    tags: ['Bàn chân bẹt', 'Trẻ em', 'Vòm chân']
  },
  {
    id: 'ex-07',
    title: 'Bài tập nhóm cơ chóp xoay - Ổn định và phục hồi khớp vai',
    bodyRegionId: 'shoulder',
    bodyRegionName: 'Vai',
    problemIds: ['prob-shoulder-rotator-cuff'],
    problemNames: ['Tổn thương nhóm cơ chóp xoay vai'],
    difficulty: 'Trung bình',
    durationMinutes: 9,
    repsSets: '3 hiệp x 12 lần',
    goals: ['Tăng cường sức mạnh cơ trên gai, dưới gai', 'Ổn định chỏm xương cánh tay', 'Tránh va chạm mỏm cùng vai'],
    precautions: ['Bắt đầu với dây kháng lực đàn hồi nhẹ'],
    instructions: [
      { stepNumber: 1, title: 'Xoay ngoài vai với dây chun', instruction: 'Khuỷu tay gập 90 độ sát sườn kéo dây chun xoay ra ngoài.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Nâng tay góc Scaption 30 độ', instruction: 'Nâng tay góc chéo 30 độ ngón cái hướng lên trên.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'QA0rAKA46A8', url: 'https://www.youtube.com/watch?v=QA0rAKA46A8', thumbnail: 'https://img.youtube.com/vi/QA0rAKA46A8/hqdefault.jpg' },
    tags: ['Chóp xoay', 'Khớp vai', 'Dây kháng lực']
  },
  {
    id: 'ex-08',
    title: 'Phương pháp tập toàn diện cho tư thế và cột sống',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-posture-desk', 'prob-spine-scoliosis'],
    problemNames: ['Gù lưng & Đau mỏi cột sống văn phòng'],
    difficulty: 'Trung bình',
    durationMinutes: 10,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Mở rộng khoang ngực', 'Duỗi đốt sống ngực', 'Lấy lại dáng đứng tự nhiên'],
    precautions: ['Không ưỡn ép thắt lưng quá mức'],
    instructions: [
      { stepNumber: 1, title: 'Tư thế Mèo - Bò (Cat-Cow)', instruction: 'Quỳ 4 điểm võng lưng ngẩng mặt rồi cuộn tròn lưng cúi đầu.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Mở ngực chữ T', instruction: 'Nằm sấp dang 2 tay chữ T nâng nhẹ ngực.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: '21Ch5Rhl6JY', url: 'https://www.youtube.com/watch?v=21Ch5Rhl6JY', thumbnail: 'https://img.youtube.com/vi/21Ch5Rhl6JY/hqdefault.jpg' },
    tags: ['Tư thế', 'Cột sống', 'Cat-Cow']
  },
  {
    id: 'ex-09',
    title: '3 bài tập hiệu quả giải phóng đau cột sống thắt lưng',
    bodyRegionId: 'lower_back',
    bodyRegionName: 'Lưng dưới & Thắt lưng',
    problemIds: ['prob-lowback-mckenzie'],
    problemNames: ['Đau thắt lưng & Thoát vị đĩa đệm (McKenzie)'],
    difficulty: 'Dễ',
    durationMinutes: 8,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Giảm áp lực đĩa đệm thắt lưng', 'Kích hoạt cơ sàn chậu và cơ ngang bụng', 'Giảm đau lan xuống chân'],
    precautions: ['Dừng nếu đau lan xa xuống bàn chân'],
    instructions: [
      { stepNumber: 1, title: 'Duỗi thắt lưng nằm sấp (Prone Press-up)', instruction: 'Nằm sấp chống tay đẩy ngực lên, hông giữ chạm sàn.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Cây cầu (Bridge)', instruction: 'Nằm ngửa gập gối nâng hông siết mông.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: '7WH39OZwJw4', url: 'https://www.youtube.com/watch?v=7WH39OZwJw4', thumbnail: 'https://img.youtube.com/vi/7WH39OZwJw4/hqdefault.jpg' },
    tags: ['Thắt lưng', 'McKenzie', 'Hết đau lưng'],
    isPopular: true
  },
  {
    id: 'ex-10',
    title: 'Bài tập cải thiện bàn chân bẹt cho trẻ tại nhà',
    bodyRegionId: 'ankle_foot',
    bodyRegionName: 'Cổ chân & Bàn chân',
    problemIds: ['prob-foot-flatfoot'],
    problemNames: ['Bàn chân bẹt (Flat Feet)'],
    difficulty: 'Dễ',
    durationMinutes: 7,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Kích hoạt vòm gan chân', 'Tăng sức mạnh cơ chày sau'],
    precautions: ['Khuyến khích trẻ đi chân đất trên cỏ/cát'],
    instructions: [
      { stepNumber: 1, title: 'Nhặt bi bằng ngón chân', instruction: 'Dùng ngón chân gắp từng viên bi nhỏ thả vào hộp.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Lăn bóng tennis lòng bàn chân', instruction: 'Lăn bóng dưới lòng bàn chân 1 phút mỗi bên.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'c5N5rEyTg_c', url: 'https://www.youtube.com/watch?v=c5N5rEyTg_c', thumbnail: 'https://img.youtube.com/vi/c5N5rEyTg_c/hqdefault.jpg' },
    tags: ['Bàn chân bẹt', 'Trẻ em', 'Lăn bóng']
  },
  {
    id: 'ex-11',
    title: 'Bài tập chỉnh sửa cong vẹo cột sống chuyên sâu',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-scoliosis'],
    problemNames: ['Cong vẹo cột sống (Scoliosis - Schroth)'],
    difficulty: 'Trung bình',
    durationMinutes: 11,
    repsSets: '3 hiệp x 8 lần',
    goals: ['Kéo dài trục cột sống', 'Kích hoạt cơ dựng gai sống bên yếu', 'Cân đối bả vai'],
    precautions: ['Tập trước gương kiểm tra tư thế'],
    instructions: [
      { stepNumber: 1, title: 'Bird-Dog chỉnh trục', instruction: 'Nâng tay phải và chân trái song song sàn giữ 5 giây.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Nghiêng lườn bóng tập', instruction: 'Tựa lườn vào bóng duỗi tay qua đầu kéo căng liên sườn.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'k0N3yvrkbZY', url: 'https://www.youtube.com/watch?v=k0N3yvrkbZY', thumbnail: 'https://img.youtube.com/vi/k0N3yvrkbZY/hqdefault.jpg' },
    tags: ['Vẹo cột sống', 'Bird-Dog', 'Lưng giữa']
  },
  {
    id: 'ex-12',
    title: 'Bài tập cải thiện tình trạng võng lưng (Hyperlordosis) tại nhà',
    bodyRegionId: 'lower_back',
    bodyRegionName: 'Lưng dưới & Thắt lưng',
    problemIds: ['prob-lowback-hyperlordosis'],
    problemNames: ['Võng thắt lưng (Nghiêng chậu trước)'],
    difficulty: 'Dễ',
    durationMinutes: 8,
    repsSets: '3 hiệp x 12 lần',
    goals: ['Kéo giãn cơ gập hông', 'Tăng sức mạnh cơ bụng thẳng và cơ mông', 'Đưa khung chậu về trung tính'],
    precautions: ['Tránh các bài ưỡn lưng quá mức'],
    instructions: [
      { stepNumber: 1, title: 'Pelvic Tilt ép lưng chạm sàn', instruction: 'Nằm ngửa co gối siết bụng ép chặt thắt lưng xuống sàn 5s.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Deadbug siết cơ lõi', instruction: 'Nằm ngửa hạ tay trái chân phải mà lưng vẫn ép sàn.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'crBIALNenoU', url: 'https://www.youtube.com/watch?v=crBIALNenoU', thumbnail: 'https://img.youtube.com/vi/crBIALNenoU/hqdefault.jpg' },
    tags: ['Võng lưng', 'Pelvic Tilt', 'Deadbug'],
    isPopular: true
  },
  {
    id: 'ex-13',
    title: '5 bài tập giúp khớp vai linh hoạt, vận động êm ái mỗi ngày',
    bodyRegionId: 'shoulder',
    bodyRegionName: 'Vai',
    problemIds: ['prob-shoulder-frozen', 'prob-shoulder-rotator-cuff'],
    problemNames: ['Đông cứng khớp vai (Frozen Shoulder)'],
    difficulty: 'Dễ',
    durationMinutes: 9,
    repsSets: '2 hiệp x 10 lần',
    goals: ['Bôi trơn ổ khớp vai', 'Tăng góc đưa tay lên cao', 'Giải tỏa căng cơ cầu vai'],
    precautions: ['Thở đều nhịp nhàng'],
    instructions: [
      { stepNumber: 1, title: 'Xoay tròn khớp vai', instruction: 'Xoay tròn khớp vai từ trước ra sau rồi đổi chiều.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Đưa tay hình chữ W', instruction: 'Mở rộng tay 2 bên tạo chữ W siết 2 bả vai.', durationSeconds: 60 }
    ],
    video: { provider: 'youtube', videoId: '19YqhQcjDzM', url: 'https://www.youtube.com/watch?v=19YqhQcjDzM', thumbnail: 'https://img.youtube.com/vi/19YqhQcjDzM/hqdefault.jpg' },
    tags: ['Khớp vai', 'Linh hoạt', 'Chữ W']
  },
  {
    id: 'ex-14',
    title: '13 bài tập cải thiện tình trạng bàn chân bẹt toàn diện',
    bodyRegionId: 'ankle_foot',
    bodyRegionName: 'Cổ chân & Bàn chân',
    problemIds: ['prob-foot-flatfoot'],
    problemNames: ['Bàn chân bẹt (Flat Feet)'],
    difficulty: 'Trung bình',
    durationMinutes: 14,
    repsSets: 'Chuỗi bài 15 phút',
    goals: ['Tạo dựng lại vòm gan chân tự nhiên', 'Tăng sức bền cổ chân', 'Hạn chế vẹo gót'],
    precautions: ['Tập đều đặn hàng ngày'],
    instructions: [
      { stepNumber: 1, title: 'Short Foot (Bàn chân ngắn)', instruction: 'Kéo khớp ngón chân về phía gót nâng vòm mà không co quắp ngón.', durationSeconds: 120 },
      { stepNumber: 2, title: 'Nhón gót kẹp bóng', instruction: 'Kẹp bóng giữa 2 gót chân rồi nhón gót lên giữ 3 giây.', durationSeconds: 120 }
    ],
    video: { provider: 'youtube', videoId: 'dehLFRdu3s8', url: 'https://www.youtube.com/watch?v=dehLFRdu3s8', thumbnail: 'https://img.youtube.com/vi/dehLFRdu3s8/hqdefault.jpg' },
    tags: ['Bàn chân bẹt', '13 bài tập', 'Short Foot'],
    isPopular: true
  },
  {
    id: 'ex-15',
    title: 'Bài tập hỗ trợ cong vẹo cột sống và tăng sức bền cơ lưng',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-scoliosis'],
    problemNames: ['Cong vẹo cột sống (Scoliosis - Schroth)'],
    difficulty: 'Trung bình',
    durationMinutes: 10,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Tăng cường nhóm cơ dựng sống', 'Giải phóng ức chế cột sống ngực'],
    precautions: ['Giữ nhịp thở đều không nín thở'],
    instructions: [
      { stepNumber: 1, title: 'Duỗi ngực trên bục nâng', instruction: 'Tựa lưng mở rộng 2 cánh tay hít sâu.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Kéo dây kháng lực mở ngực', instruction: 'Kéo căng dây thun sang 2 bên ép sát bả vai.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'Oh2E8Dh0UWo', url: 'https://www.youtube.com/watch?v=Oh2E8Dh0UWo', thumbnail: 'https://img.youtube.com/vi/Oh2E8Dh0UWo/hqdefault.jpg' },
    tags: ['Vẹo cột sống', 'Sức bền', 'Dây kháng lực']
  },
  {
    id: 'ex-16',
    title: 'Bài tập chỉnh sửa cong vẹo cột sống với bóng tập thể dục',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-scoliosis'],
    problemNames: ['Cong vẹo cột sống (Scoliosis - Schroth)'],
    difficulty: 'Trung bình',
    durationMinutes: 10,
    repsSets: '3 hiệp x 8-10 lần',
    goals: ['Dùng bóng làm điểm tựa uốn nắn cột sống', 'Kéo dài cơ lưng bên lõm'],
    precautions: ['Chọn kích thước bóng phù hợp chiều cao'],
    instructions: [
      { stepNumber: 1, title: 'Nằm sấp ôm bóng tập', instruction: 'Thả lỏng thân mình ôm sát bóng giải áp đốt sống.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Nâng tay chữ Y trên bóng', instruction: 'Nằm sấp nâng 2 tay hình chữ Y ngón cái hướng lên.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: '8JTy15_bDJU', url: 'https://www.youtube.com/watch?v=8JTy15_bDJU', thumbnail: 'https://img.youtube.com/vi/8JTy15_bDJU/hqdefault.jpg' },
    tags: ['Vẹo cột sống', 'Bóng Gymball', 'Chữ Y']
  },
  {
    id: 'ex-17',
    title: '5 bài tập điều trị hội chứng ống cổ tay (Carpal Tunnel) giảm tê bì',
    bodyRegionId: 'wrist_hand',
    bodyRegionName: 'Cổ tay & Bàn tay',
    problemIds: ['prob-wrist-carpal-tunnel'],
    problemNames: ['Hội chứng ống cổ tay (Carpal Tunnel)'],
    difficulty: 'Dễ',
    durationMinutes: 7,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Trượt dây thần kinh giữa (Median nerve gliding)', 'Giải tỏa áp lực trong ống cổ tay', 'Giảm tê châm chích ngón tay'],
    precautions: ['Không kéo căng quá mạnh gây buốt'],
    instructions: [
      { stepNumber: 1, title: 'Nắm và mở ngón tay', instruction: 'Nắm bàn tay mở thẳng các ngón rồi ngửa cổ tay nhẹ nhàng.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Tư thế cầu nguyện kéo cổ tay', instruction: 'Áp 2 lòng bàn tay trước ngực hạ thấp cổ tay xuống.', durationSeconds: 60 }
    ],
    video: { provider: 'youtube', videoId: 'vQq3kW-0VTs', url: 'https://www.youtube.com/watch?v=vQq3kW-0VTs', thumbnail: 'https://img.youtube.com/vi/vQq3kW-0VTs/hqdefault.jpg' },
    tags: ['Ống cổ tay', 'Tê ngón tay', 'Trượt thần kinh'],
    isPopular: true
  },
  {
    id: 'ex-18',
    title: '4 bài tập cải thiện cổ rùa cho dân văn phòng giảm mỏi tức thì',
    bodyRegionId: 'neck',
    bodyRegionName: 'Cổ',
    problemIds: ['prob-neck-turtle'],
    problemNames: ['Hội chứng cổ rùa & Đau mỏi văn phòng'],
    difficulty: 'Dễ',
    durationMinutes: 6,
    repsSets: '2 hiệp x 8-10 lần',
    goals: ['Chỉnh trục đầu thẳng hàng với vai', 'Kéo giãn cơ ngực và cơ nâng vai', 'Tăng sức mạnh cơ gập cổ sâu'],
    precautions: ['Có thể tập ngay tại bàn làm việc'],
    instructions: [
      { stepNumber: 1, title: 'Thu cằm (Chin Tucks)', instruction: 'Kéo cằm lùi về phía sau giữ 5 giây.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Kéo nghiêng đầu sang vai', instruction: 'Nghiêng tai về phía vai cảm nhận độ căng dọc cổ bên.', durationSeconds: 60 }
    ],
    video: { provider: 'youtube', videoId: '7RiX9_USJJA', url: 'https://www.youtube.com/watch?v=7RiX9_USJJA', thumbnail: 'https://img.youtube.com/vi/7RiX9_USJJA/hqdefault.jpg' },
    tags: ['Cổ rùa', 'Dân văn phòng', 'Chin tuck'],
    isPopular: true
  },
  {
    id: 'ex-19',
    title: 'Bài tập cải thiện cổ rùa và phục hồi đường cong sinh lý cổ',
    bodyRegionId: 'neck',
    bodyRegionName: 'Cổ',
    problemIds: ['prob-neck-turtle'],
    problemNames: ['Hội chứng cổ rùa & Đau mỏi văn phòng'],
    difficulty: 'Dễ',
    durationMinutes: 7,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Tái lập đường cong ưỡn sinh lý cổ', 'Giảm tải đĩa đệm cổ C5-C6', 'Thư giãn cơ thang trên'],
    precautions: ['Không ngửa đầu quá đột ngột'],
    instructions: [
      { stepNumber: 1, title: 'Dùng khăn hỗ trợ ngửa cổ', instruction: 'Quàng khăn quanh gáy kéo nhẹ vát lên khi ngửa đầu.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Xoay cổ nhìn qua vai', instruction: 'Quay đầu nhìn sang trái giữ 3s rồi đổi sang phải.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'oM3oQY4W2JY', url: 'https://www.youtube.com/watch?v=oM3oQY4W2JY', thumbnail: 'https://img.youtube.com/vi/oM3oQY4W2JY/hqdefault.jpg' },
    tags: ['Cổ rùa', 'Đường cong sinh lý', 'Khăn hỗ trợ']
  },
  {
    id: 'ex-20',
    title: 'Bài tập cải thiện cong vẹo cột sống tại nhà không cần dụng cụ',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-scoliosis'],
    problemNames: ['Cong vẹo cột sống (Scoliosis - Schroth)'],
    difficulty: 'Trung bình',
    durationMinutes: 9,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Tăng tính đối xứng cơ 2 bên thân', 'Kéo dài cơ bị co ngắn ở phần lõm'],
    precautions: ['Thực hiện động tác chậm rãi có kiểm soát'],
    instructions: [
      { stepNumber: 1, title: 'Em bé kéo dài lưng', instruction: 'Quỳ gối mông chạm gót vươn dài 2 tay về trước.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Bò tay chéo sang một bên', instruction: 'Bò 2 tay sang phía cong lồi để kéo giãn bên đối diện.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'N6NBArw8x-g', url: 'https://www.youtube.com/watch?v=N6NBArw8x-g', thumbnail: 'https://img.youtube.com/vi/N6NBArw8x-g/hqdefault.jpg' },
    tags: ['Vẹo cột sống', 'Không dụng cụ', 'Em bé kéo lưng']
  },
  {
    id: 'ex-21',
    title: 'Bài tập lưng cho dân văn phòng - Giải phóng căng cứng khi ngồi lâu',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-posture-desk'],
    problemNames: ['Gù lưng & Đau mỏi cột sống văn phòng'],
    difficulty: 'Dễ',
    durationMinutes: 6,
    repsSets: 'Tập mỗi 2 tiếng ngồi làm việc',
    goals: ['Ngăn ngừa thoái hóa đốt sống ngực', 'Kích hoạt lưu thông máu cơ lưng'],
    precautions: ['Thực hiện ngay trên ghế văn phòng'],
    instructions: [
      { stepNumber: 1, title: 'Vặn mình trên ghế', instruction: 'Đặt tay phải qua đùi trái xoay thân ra sau giữ 10s rồi đổi bên.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Đan tay duỗi căng qua đầu', instruction: 'Đan ngón tay vươn người cao hết cỡ hướng lên trần.', durationSeconds: 60 }
    ],
    video: { provider: 'youtube', videoId: 'gUO4L2wFF7Q', url: 'https://www.youtube.com/watch?v=gUO4L2wFF7Q', thumbnail: 'https://img.youtube.com/vi/gUO4L2wFF7Q/hqdefault.jpg' },
    tags: ['Văn phòng', 'Lưng giữa', 'Ngồi lâu'],
    isPopular: true
  },
  {
    id: 'ex-22',
    title: 'Bài tập vẹo cột sống thắt lưng và lệch khung chậu',
    bodyRegionId: 'lower_back',
    bodyRegionName: 'Lưng dưới & Thắt lưng',
    problemIds: ['prob-lowback-hyperlordosis', 'prob-spine-scoliosis'],
    problemNames: ['Võng thắt lưng', 'Cong vẹo cột sống'],
    difficulty: 'Trung bình',
    durationMinutes: 10,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Cân bằng chiều cao 2 bên mào chậu', 'Giảm co thắt cơ vuông thắt lưng'],
    precautions: ['Không tập khi đang đau cấp khớp cùng chậu'],
    instructions: [
      { stepNumber: 1, title: 'Nâng hông nằm nghiêng', instruction: 'Nằm nghiêng nâng nhẹ một bên mào chậu lên phía nách.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Kéo giãn cơ vuông thắt lưng', instruction: 'Ngồi khoanh chân nghiêng người qua đầu chạm sàn bên kia.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'fupk5grEqHQ', url: 'https://www.youtube.com/watch?v=fupk5grEqHQ', thumbnail: 'https://img.youtube.com/vi/fupk5grEqHQ/hqdefault.jpg' },
    tags: ['Thắt lưng', 'Lệch chậu', 'Cơ vuông thắt lưng']
  },
  {
    id: 'ex-23',
    title: 'Bài tập cong vẹo cột sống tại nhà - Tư thế nâng cao',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-scoliosis'],
    problemNames: ['Cong vẹo cột sống (Scoliosis - Schroth)'],
    difficulty: 'Nâng cao',
    durationMinutes: 12,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Tăng sức mạnh toàn diện chuỗi cơ giữ thân', 'Chống đà tăng độ Cobbs vẹo cột sống'],
    precautions: ['Tập khi đã quen bài cơ bản'],
    instructions: [
      { stepNumber: 1, title: 'Plank điều chỉnh bất đối xứng', instruction: 'Giữ plank nâng nhẹ tay hoặc chân theo phác đồ.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Superman', instruction: 'Nằm sấp nâng đồng thời tay và chân đối diện cách sàn 10cm.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'BEl1fP0wYq8', url: 'https://www.youtube.com/watch?v=BEl1fP0wYq8', thumbnail: 'https://img.youtube.com/vi/BEl1fP0wYq8/hqdefault.jpg' },
    tags: ['Vẹo cột sống', 'Superman', 'Nâng cao']
  },
  {
    id: 'ex-24',
    title: 'Bài tập cong vẹo cột sống tại nhà - Phục hồi cấu trúc liên sườn',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-scoliosis'],
    problemNames: ['Cong vẹo cột sống (Scoliosis - Schroth)'],
    difficulty: 'Trung bình',
    durationMinutes: 9,
    repsSets: '3 hiệp x 8 lần',
    goals: ['Giải tỏa co kéo cơ liên sườn bên lõm', 'Cân đối độ nhô bướu sườn'],
    precautions: ['Hít thở sâu trong từng nhịp'],
    instructions: [
      { stepNumber: 1, title: 'Kéo căng lồng ngực dây đai', instruction: 'Quấn dây đai nhẹ quanh ngực hít thở đẩy bung lồng ngực.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Vặn người ngồi xoắn', instruction: 'Ngồi gập chân xoay người về phía ngược chiều đường cong.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'lDW7xpsjXYA', url: 'https://www.youtube.com/watch?v=lDW7xpsjXYA', thumbnail: 'https://img.youtube.com/vi/lDW7xpsjXYA/hqdefault.jpg' },
    tags: ['Vẹo cột sống', 'Liên sườn', 'Hít thở']
  },
  {
    id: 'ex-25',
    title: 'Bài tập xương khớp 10 phút mỗi ngày giúp cột sống linh hoạt',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-posture-desk'],
    problemNames: ['Gù lưng & Đau mỏi cột sống văn phòng'],
    difficulty: 'Dễ',
    durationMinutes: 10,
    repsSets: '1 chuỗi 10 phút buổi sáng',
    goals: ['Bôi trơn toàn bộ các đốt sống', 'Giảm cứng đờ khớp sau ngủ dậy', 'Tăng năng lượng ngày mới'],
    precautions: ['Thực hiện biên độ êm ái'],
    instructions: [
      { stepNumber: 1, title: 'Uốn lượn cột sống nằm ngửa', instruction: 'Gập 2 gối nghiêng sang trái rồi sang phải nhịp nhàng.', durationSeconds: 120 },
      { stepNumber: 2, title: 'Rắn hổ mang nhẹ nhàng', instruction: 'Nâng nhẹ ngực duỗi mở lồng ngực không gập ép thắt lưng.', durationSeconds: 120 }
    ],
    video: { provider: 'youtube', videoId: '20r6bGR--YU', url: 'https://www.youtube.com/watch?v=20r6bGR--YU', thumbnail: 'https://img.youtube.com/vi/20r6bGR--YU/hqdefault.jpg' },
    tags: ['10 phút', 'Linh hoạt', 'Cột sống'],
    isPopular: true
  },
  {
    id: 'ex-26',
    title: 'Bài tập xương khớp 10 phút mỗi ngày giúp cơ thể dẻo dai',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-posture-desk'],
    problemNames: ['Gù lưng & Đau mỏi cột sống văn phòng'],
    difficulty: 'Dễ',
    durationMinutes: 10,
    repsSets: '1 chuỗi 10 phút',
    goals: ['Tăng độ đàn hồi hệ gân cơ', 'Tăng tuần hoàn máu đến đĩa đệm'],
    precautions: ['Tập trên thảm êm ái'],
    instructions: [
      { stepNumber: 1, title: 'Kéo giãn toàn thân', instruction: 'Nằm ngửa duỗi thẳng tay qua đầu đạp căng gót chân.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Xoay tròn khớp hông và lưng', instruction: 'Đứng thẳng chống tay xoay tròn hông nhẹ nhàng.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'gaU3CLtYITE', url: 'https://www.youtube.com/watch?v=gaU3CLtYITE', thumbnail: 'https://img.youtube.com/vi/gaU3CLtYITE/hqdefault.jpg' },
    tags: ['Dẻo dai', 'Xương khớp', 'Toàn thân']
  },
  {
    id: 'ex-27',
    title: 'Bài tập cải thiện hội chứng De Quervain viêm bao gân ngón cái',
    bodyRegionId: 'wrist_hand',
    bodyRegionName: 'Cổ tay & Bàn tay',
    problemIds: ['prob-wrist-de-quervain'],
    problemNames: ['Hội chứng Viêm bao gân De Quervain'],
    difficulty: 'Dễ',
    durationMinutes: 6,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Giảm viêm ma sát gân ngón cái', 'Kéo giãn nhẹ ngừa xơ dính bao gân', 'Cầm nắm đồ vật không đau'],
    precautions: ['Tránh véo ngón cái mạnh trong đợt đau cấp'],
    instructions: [
      { stepNumber: 1, title: 'Kéo giãn ngón cái', instruction: 'Gập nhẹ ngón cái vào lòng bàn tay dùng tay kia kéo nhẹ về cổ tay.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Đeo chun búng ngón tay', instruction: 'Lồng dây chun quanh 5 đầu ngón mở rộng các ngón ra ngoài.', durationSeconds: 60 }
    ],
    video: { provider: 'youtube', videoId: 'jy9zBwQWmr4', url: 'https://www.youtube.com/watch?v=jy9zBwQWmr4', thumbnail: 'https://img.youtube.com/vi/jy9zBwQWmr4/hqdefault.jpg' },
    tags: ['De Quervain', 'Gân ngón cái', 'Cổ tay'],
    isPopular: true
  },
  {
    id: 'ex-28',
    title: 'Bài tập 10 phút hết đau lưng, cột sống linh hoạt tức thì',
    bodyRegionId: 'lower_back',
    bodyRegionName: 'Lưng dưới & Thắt lưng',
    problemIds: ['prob-lowback-mckenzie'],
    problemNames: ['Đau thắt lưng & Thoát vị đĩa đệm (McKenzie)'],
    difficulty: 'Dễ',
    durationMinutes: 10,
    repsSets: '1 chuỗi 10 phút thư giãn lưng',
    goals: ['Giải tỏa co thắt cơ dựng gai thắt lưng', 'Kéo giãn cơ hình lê giảm chèn ép thần kinh tọa', 'Tăng linh hoạt L1-S1'],
    precautions: ['Dừng nếu tê lan nhanh xuống gót chân'],
    instructions: [
      { stepNumber: 1, title: 'Ôm hai gối ép ngực', instruction: 'Ôm 2 gối kéo về ngực lăn nhẹ lưng massage cột sống.', durationSeconds: 120 },
      { stepNumber: 2, title: 'Kéo giãn cơ hình lê (Figure 4)', instruction: 'Đặt mắt cá chân phải lên đầu gối trái luồn tay kéo đùi trái về ngực.', durationSeconds: 120 }
    ],
    video: { provider: 'youtube', videoId: 'TlCfrvEqBP8', url: 'https://www.youtube.com/watch?v=TlCfrvEqBP8', thumbnail: 'https://img.youtube.com/vi/TlCfrvEqBP8/hqdefault.jpg' },
    tags: ['Hết đau lưng', '10 phút', 'Thắt lưng'],
    isPopular: true
  },
  {
    id: 'ex-29',
    title: '9 bài tập cho trẻ có hội chứng bàn chân bẹt phát triển toàn diện',
    bodyRegionId: 'ankle_foot',
    bodyRegionName: 'Cổ chân & Bàn chân',
    problemIds: ['prob-foot-flatfoot'],
    problemNames: ['Bàn chân bẹt (Flat Feet)'],
    difficulty: 'Dễ',
    durationMinutes: 11,
    repsSets: 'Chuỗi 10-15 phút',
    goals: ['Kích thích dây thần kinh cảm thụ bản thể lòng bàn chân', 'Hình thành vòm gan chân tự nhiên', 'Tăng sức mạnh mắt cá'],
    precautions: ['Tạo không khí vui vẻ cho trẻ'],
    instructions: [
      { stepNumber: 1, title: 'Đi trên đầu ngón chân', instruction: 'Cho trẻ bước đi kiểu vũ công ba-lê trong 1 phút.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Kẹp bóng nhảy lò cò', instruction: 'Kẹp bóng nhỏ giữa 2 mắt cá bật nhảy nhẹ tại chỗ.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: 'LrlE777Kh30', url: 'https://www.youtube.com/watch?v=LrlE777Kh30', thumbnail: 'https://img.youtube.com/vi/LrlE777Kh30/hqdefault.jpg' },
    tags: ['Bàn chân bẹt trẻ em', '9 bài tập', 'Cổ chân']
  },
  {
    id: 'ex-30',
    title: '5 bài tập điều trị Hội chứng Ống cổ tay nâng cao',
    bodyRegionId: 'wrist_hand',
    bodyRegionName: 'Cổ tay & Bàn tay',
    problemIds: ['prob-wrist-carpal-tunnel'],
    problemNames: ['Hội chứng ống cổ tay (Carpal Tunnel)'],
    difficulty: 'Trung bình',
    durationMinutes: 8,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Kéo giãn các nhánh thần kinh chi trên', 'Tăng sức mạnh cơ giun bàn tay', 'Phục hồi tầm vận động cổ tay'],
    precautions: ['Thả lỏng vai và cổ khi tập cổ tay'],
    instructions: [
      { stepNumber: 1, title: 'Trượt thần kinh chữ O', instruction: 'Chạm đầu ngón cái lần lượt vào đầu các ngón trỏ, giữa, áp út, út.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Bóp bóng xốp phục hồi', instruction: 'Bóp nhẹ quả bóng xốp mềm trong lòng bàn tay 10 lần.', durationSeconds: 60 }
    ],
    video: { provider: 'youtube', videoId: '442-zCQP8b8', url: 'https://www.youtube.com/watch?v=442-zCQP8b8', thumbnail: 'https://img.youtube.com/vi/442-zCQP8b8/hqdefault.jpg' },
    tags: ['Ống cổ tay', 'Bóp bóng', 'Thần kinh giữa']
  },
  {
    id: 'ex-31',
    title: '6 bài tập kéo giãn các nhóm cơ cổ vai giảm đau mỏi',
    bodyRegionId: 'neck',
    bodyRegionName: 'Cổ',
    problemIds: ['prob-neck-turtle', 'prob-shoulder-frozen'],
    problemNames: ['Hội chứng cổ rùa & Đau mỏi văn phòng', 'Đong cứng khớp vai'],
    difficulty: 'Dễ',
    durationMinutes: 8,
    repsSets: '2 hiệp x 10 lần',
    goals: ['Kéo giãn cơ thang trên và cơ nâng vai', 'Mở khớp bả vai lồng ngực', 'Xua tan căng thẳng'],
    precautions: ['Không kéo giật đột ngột'],
    instructions: [
      { stepNumber: 1, title: 'Kéo nghiêng đầu góc 45 độ', instruction: 'Nghiêng đầu nhìn xuống nách cùng bên dùng tay kéo nhẹ đỉnh đầu giữ 15s.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Xoay bả vai mở ngực', instruction: 'Đặt ngón tay lên đầu vai xoay khuỷu tay thành vòng tròn lớn.', durationSeconds: 60 }
    ],
    video: { provider: 'youtube', videoId: '_ZmIqnC7ucw', url: 'https://www.youtube.com/watch?v=_ZmIqnC7ucw', thumbnail: 'https://img.youtube.com/vi/_ZmIqnC7ucw/hqdefault.jpg' },
    tags: ['Kéo giãn cổ vai', 'Cơ nâng vai', 'Thư giãn'],
    isPopular: true
  },
  {
    id: 'ex-32',
    title: 'Bài tập phục hồi hội chứng ống cổ tay chuyên biệt',
    bodyRegionId: 'wrist_hand',
    bodyRegionName: 'Cổ tay & Bàn tay',
    problemIds: ['prob-wrist-carpal-tunnel'],
    problemNames: ['Hội chứng ống cổ tay (Carpal Tunnel)'],
    difficulty: 'Dễ',
    durationMinutes: 7,
    repsSets: '3 hiệp x 8 lần',
    goals: ['Tăng tính đàn hồi gân cơ gấp ngón', 'Giải phóng ống cổ tay', 'Tăng cảm giác xúc giác'],
    precautions: ['Ngâm nước ấm trước khi tập nếu bị cứng khớp'],
    instructions: [
      { stepNumber: 1, title: 'Kéo giãn duỗi cổ tay', instruction: 'Ngửa bàn tay lên trần dùng tay kia kéo nhẹ các ngón về phía mình.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Móng vuốt (Claw fist)', instruction: 'Gập các khớp đốt ngón tay tạo hình móng vuốt giữ 3 giây rồi mở thẳng.', durationSeconds: 60 }
    ],
    video: { provider: 'youtube', videoId: 'mSEzasicUQo', url: 'https://www.youtube.com/watch?v=mSEzasicUQo', thumbnail: 'https://img.youtube.com/vi/mSEzasicUQo/hqdefault.jpg' },
    tags: ['Ống cổ tay', 'Móng vuốt', 'Cổ tay']
  },
  {
    id: 'ex-33',
    title: 'Các bài tập McKenzie ứng dụng cho người đau thắt lưng thoát vị đĩa đệm',
    bodyRegionId: 'lower_back',
    bodyRegionName: 'Lưng dưới & Thắt lưng',
    problemIds: ['prob-lowback-mckenzie'],
    problemNames: ['Đau thắt lưng & Thoát vị đĩa đệm (McKenzie)'],
    difficulty: 'Trung bình',
    durationMinutes: 11,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Quy luật tập trung hóa đau (Centralization)', 'Đẩy nhân nhầy đĩa đệm về vị trí an toàn', 'Đứng thẳng đi lại không co cứng'],
    precautions: ['Ngưng nếu đau lan xa xuống bàn chân'],
    instructions: [
      { stepNumber: 1, title: 'Nằm sấp nghỉ tĩnh (Prone Lying)', instruction: 'Nằm sấp thả lỏng hoàn toàn hít thở bụng sâu 2-3 phút.', durationSeconds: 120 },
      { stepNumber: 2, title: 'Nằm sấp chống khuỷu tay', instruction: 'Chống cẳng tay vuông góc sàn nâng nhẹ thân trên giữ 1-2 phút.', durationSeconds: 120 },
      { stepNumber: 3, title: 'Đẩy thẳng tay ngửa thắt lưng', instruction: 'Chống tay đẩy thẳng nâng thân trên lên giữ hông chạm sàn 2s rồi hạ xuống.', durationSeconds: 120 },
      { stepNumber: 4, title: 'Đứng ngửa thắt lưng ra sau', instruction: 'Đứng thẳng đặt 2 tay sau thắt lưng ngửa người ra sau từ từ.', durationSeconds: 90 }
    ],
    video: { provider: 'youtube', videoId: '2T7Sicx-ScA', url: 'https://www.youtube.com/watch?v=2T7Sicx-ScA', thumbnail: 'https://img.youtube.com/vi/2T7Sicx-ScA/hqdefault.jpg' },
    tags: ['McKenzie', 'Thoát vị đĩa đệm', 'Thắt lưng'],
    isPopular: true
  }
];

// --- 2. LOCALSTORAGE KEYS & DEMO DATA ---
const STORAGE_KEYS = {
  USER: 'physiofit_user',
  PAIN: 'physiofit_pain_records',
  ROM: 'physiofit_rom_records',
  SESSIONS: 'physiofit_workout_sessions'
};

const DEMO_USER_PROFILE = {
  id: "demo-user-001",
  fullName: "Nguyễn Văn A",
  age: 35,
  location: "Hà Nội",
  commonConditions: ["Đau lưng", "Đau khớp gối"],
  otherCondition: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  onboardingCompleted: true,
  savedExerciseIds: ['ex-09', 'ex-01', 'ex-12', 'ex-28'],
  dailyGoalMinutes: 15
};

const SEED_PAIN = [
  { id: 'p1', timestamp: new Date(Date.now() - 5 * 86400000).toISOString(), bodyRegionId: 'lower_back', bodyRegionName: 'Lưng dưới', exerciseId: 'ex-09', exerciseTitle: '3 bài tập giải phóng thắt lưng', painLevelBefore: 6, painLevelAfter: 3, notes: 'Đỡ mỏi lưng khi đứng lâu' },
  { id: 'p2', timestamp: new Date(Date.now() - 3 * 86400000).toISOString(), bodyRegionId: 'knee', bodyRegionName: 'Đầu gối', exerciseId: 'ex-01', exerciseTitle: 'Bài tập gối sau phẫu thuật', painLevelBefore: 5, painLevelAfter: 3, notes: 'Gối gập êm hơn' },
  { id: 'p3', timestamp: new Date().toISOString(), bodyRegionId: 'lower_back', bodyRegionName: 'Lưng dưới', exerciseId: 'ex-28', exerciseTitle: '10 phút hết đau lưng', painLevelBefore: 4, painLevelAfter: 2, notes: 'Thắt lưng nhẹ nhõm' }
];

const SEED_ROM = [
  { id: 'rom1', timestamp: new Date(Date.now() - 7 * 86400000).toISOString(), jointName: 'Khớp gối', movementType: 'Gập gối', bodyRegionId: 'knee', measuredAngle: 95, targetAngle: 135, unit: 'độ (°)', notes: 'Căng gân bánh chè' },
  { id: 'rom2', timestamp: new Date().toISOString(), jointName: 'Khớp gối', movementType: 'Gập gối', bodyRegionId: 'knee', measuredAngle: 110, targetAngle: 135, unit: 'độ (°)', notes: 'Đạt 110° linh hoạt' },
  { id: 'rom3', timestamp: new Date(Date.now() - 4 * 86400000).toISOString(), jointName: 'Cột sống thắt lưng', movementType: 'Gập thân trước', bodyRegionId: 'lower_back', measuredAngle: 55, targetAngle: 60, unit: 'độ (°)', notes: 'Gần đạt chuẩn' }
];

const SEED_SESSIONS = [
  { id: 's1', timestamp: new Date(Date.now() - 4 * 86400000).toISOString(), exerciseId: 'ex-09', exerciseTitle: '3 bài tập giải phóng thắt lưng', bodyRegionId: 'lower_back', durationSeconds: 480, completed: true, painBefore: 6, painAfter: 3 },
  { id: 's2', timestamp: new Date(Date.now() - 3 * 86400000).toISOString(), exerciseId: 'ex-01', exerciseTitle: 'Bài tập phục hồi khớp gối ACL', bodyRegionId: 'knee', durationSeconds: 480, completed: true, painBefore: 5, painAfter: 3 },
  { id: 's3', timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), exerciseId: 'ex-12', exerciseTitle: 'Bài tập cải thiện võng lưng', bodyRegionId: 'lower_back', durationSeconds: 480, completed: true, painBefore: 5, painAfter: 3 },
  { id: 's4', timestamp: new Date(Date.now() - 86400000).toISOString(), exerciseId: 'ex-28', exerciseTitle: '10 phút hết đau lưng tức thì', bodyRegionId: 'lower_back', durationSeconds: 600, completed: true, painBefore: 4, painAfter: 2 },
  { id: 's5', timestamp: new Date().toISOString(), exerciseId: 'ex-03', exerciseTitle: 'Bài tập gối tăng tiến', bodyRegionId: 'knee', durationSeconds: 600, completed: true, painBefore: 4, painAfter: 2 }
];

// --- 3. AMBIENT AUDIO SYNTHESIZER ---
class AmbientAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.nodes = [];
  }
  start(vol = 0.25) {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(vol, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      const freqs = [174, 217.5, 261.63, 329.63, 392.0, 523.25];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.035 / (idx + 1), this.ctx.currentTime);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        this.nodes.push(osc);
      });
      this.isPlaying = true;
    } catch (e) {
      console.warn(e);
    }
  }
  stop() {
    if (!this.isPlaying) return;
    try {
      this.nodes.forEach(n => { n.stop && n.stop(); n.disconnect(); });
      this.nodes = [];
      this.isPlaying = false;
    } catch (e) {}
  }
}
const ambientEngine = new AmbientAudio();

// --- 4. MAIN ROOT APPLICATION ---
function PhysioFitApp() {
  // Load user from localStorage or initialize with demo user
  const [user, setUser] = useState(() => {
    try {
      const d = localStorage.getItem(STORAGE_KEYS.USER);
      if (d) return JSON.parse(d);
    } catch (e) {}
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEMO_USER_PROFILE));
    return DEMO_USER_PROFILE;
  });

  const [painRecords, setPainRecords] = useState(() => {
    try { const d = localStorage.getItem(STORAGE_KEYS.PAIN); if (d) return JSON.parse(d); } catch (e) {}
    localStorage.setItem(STORAGE_KEYS.PAIN, JSON.stringify(SEED_PAIN));
    return SEED_PAIN;
  });

  const [romRecords, setRomRecords] = useState(() => {
    try { const d = localStorage.getItem(STORAGE_KEYS.ROM); if (d) return JSON.parse(d); } catch (e) {}
    localStorage.setItem(STORAGE_KEYS.ROM, JSON.stringify(SEED_ROM));
    return SEED_ROM;
  });

  const [sessions, setSessions] = useState(() => {
    try { const d = localStorage.getItem(STORAGE_KEYS.SESSIONS); if (d) return JSON.parse(d); } catch (e) {}
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(SEED_SESSIONS));
    return SEED_SESSIONS;
  });

  // Current Screen / Route
  // Default to 'home' if onboardingCompleted, else 'intro'
  const [currentRoute, setCurrentRoute] = useState(() => {
    try {
      const d = localStorage.getItem(STORAGE_KEYS.USER);
      if (d) {
        const parsed = JSON.parse(d);
        if (parsed && parsed.onboardingCompleted) return 'home';
      }
    } catch (e) {}
    return 'home';
  });

  const [routeParam, setRouteParam] = useState(null);
  const [sparklesEnabled, setSparklesEnabled] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Sync user state to localStorage
  const saveUser = (updated) => {
    setUser(updated);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
  };

  const toggleBookmark = (id) => {
    const list = user.savedExerciseIds.includes(id)
      ? user.savedExerciseIds.filter(x => x !== id)
      : [...user.savedExerciseIds, id];
    saveUser({ ...user, savedExerciseIds: list });
  };
  const isBookmarked = (id) => (user.savedExerciseIds || []).includes(id);

  const addPainRecord = (record) => {
    const newRecord = { ...record, id: 'p_' + Date.now(), timestamp: new Date().toISOString() };
    const list = [newRecord, ...painRecords];
    setPainRecords(list);
    localStorage.setItem(STORAGE_KEYS.PAIN, JSON.stringify(list));
  };

  const addROMRecord = (record) => {
    const newRecord = { ...record, id: 'rom_' + Date.now(), timestamp: new Date().toISOString() };
    const list = [newRecord, ...romRecords];
    setRomRecords(list);
    localStorage.setItem(STORAGE_KEYS.ROM, JSON.stringify(list));
  };

  const completeSession = (session) => {
    const newSession = { ...session, id: 's_' + Date.now(), timestamp: new Date().toISOString() };
    const list = [newSession, ...sessions];
    setSessions(list);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(list));
  };

  const navigateTo = (route, param = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentRoute(route);
    setRouteParam(param);
  };

  const toggleAmbientAudio = () => {
    if (isAudioPlaying) {
      ambientEngine.stop();
      setIsAudioPlaying(false);
    } else {
      ambientEngine.start();
      setIsAudioPlaying(true);
    }
  };

  // Check if we are inside onboarding flow (intro, setup-step1, setup-step2, welcome)
  const isOnboardingFlow = ['intro', 'setup-step1', 'setup-step2', 'welcome'].includes(currentRoute);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#31465A] relative selection:bg-[#C7DFA3]">
      {/* Floating Sparkles Background */}
      {sparklesEnabled && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#C7DFA3] animate-pulse opacity-25"
              style={{
                top: `${(i * 17) % 100}%`,
                left: `${(i * 23) % 100}%`,
                width: `${(i % 3) + 4}px`,
                height: `${(i % 3) + 4}px`,
                animationDuration: `${(i % 4) + 4}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Main Navigation Header (Hidden during standalone intro if desired, but accessible) */}
      <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#31465A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div onClick={() => navigateTo('home')} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 rounded-2xl bg-[#31465A] flex items-center justify-center text-[#FFFDF7] shadow-md group-hover:scale-105 transition-transform">
              <span className="text-[#C7DFA3] font-black text-xl">⚡</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#31465A] flex items-center gap-1">
                PHYSIOFIT
                <span className="w-2 h-2 rounded-full bg-[#C7DFA3]"></span>
              </span>
              <p className="text-[10px] text-[#31465A]/70 hidden sm:block">Phục hồi vận động thông minh</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { route: 'home', label: 'Trang chủ' },
              { route: 'body-map', label: 'Sơ đồ cơ thể' },
              { route: 'exercises', label: 'Thư viện bài tập' },
              { route: 'rom-tracking', label: 'Theo dõi ROM & Đau' },
              { route: 'progress', label: 'Tiến độ' },
              { route: 'my-exercises', label: 'Bài tập của tôi' }
            ].map((item) => (
              <button
                key={item.route}
                onClick={() => navigateTo(item.route)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                  currentRoute === item.route
                    ? 'bg-[#D9F0FF] text-[#31465A] font-bold shadow-xs'
                    : 'text-[#31465A]/80 hover:bg-[#D9F0FF]/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleAmbientAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                isAudioPlaying
                  ? 'bg-[#C7DFA3] text-[#31465A] border-[#C7DFA3] shadow-inner animate-pulse'
                  : 'bg-[#FFFDF7] text-[#31465A]/80 border-[#31465A]/15 hover:bg-[#D9F0FF]'
              }`}
              title="Bật/Tắt sóng âm thanh thư giãn 174Hz"
            >
              <span>{isAudioPlaying ? '🎵 Nhạc thiền: BẬT' : '🎶 Nhạc thiền'}</span>
            </button>

            {/* Intro Replay Button */}
            <button
              onClick={() => navigateTo('intro')}
              className="p-1.5 px-2.5 rounded-xl text-xs font-semibold text-[#31465A]/80 bg-[#D9F0FF]/60 hover:bg-[#D9F0FF] border border-[#31465A]/10 hidden sm:inline"
              title="Xem lại màn hình giới thiệu"
            >
              Xem Intro
            </button>

            {/* Profile Avatar Button */}
            <button
              onClick={() => navigateTo('profile')}
              className="flex items-center gap-1.5 p-1 px-2.5 rounded-full bg-[#31465A] text-[#FFFDF7] text-xs font-bold shadow-sm hover:bg-[#31465A]/90 transition-transform active:scale-95"
              title="Xem thông tin tài khoản"
            >
              <span className="w-6 h-6 rounded-full bg-[#C7DFA3] text-[#31465A] flex items-center justify-center font-bold">
                {user.fullName ? user.fullName.charAt(0) : 'A'}
              </span>
              <span className="hidden md:inline font-semibold">{user.fullName || 'Nguyễn Văn A'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {/* 1. INTRO SCREEN */}
        {currentRoute === 'intro' && (
          <IntroView
            onStart={() => navigateTo('setup-step1')}
            onLogin={() => {
              saveUser({ ...user, onboardingCompleted: true });
              navigateTo('home');
            }}
          />
        )}

        {/* 2. PROFILE SETUP STEP 1 */}
        {currentRoute === 'setup-step1' && (
          <SetupStep1View
            user={user}
            onNext={(step1Data) => {
              saveUser({ ...user, ...step1Data });
              navigateTo('setup-step2');
            }}
            onBack={() => navigateTo('intro')}
          />
        )}

        {/* 3. PROFILE SETUP STEP 2 */}
        {currentRoute === 'setup-step2' && (
          <SetupStep2View
            user={user}
            onFinish={(step2Data) => {
              saveUser({ ...user, ...step2Data, onboardingCompleted: true, updatedAt: new Date().toISOString() });
              navigateTo('welcome');
            }}
            onBack={() => navigateTo('setup-step1')}
          />
        )}

        {/* 4. WELCOME AFTER ONBOARDING */}
        {currentRoute === 'welcome' && (
          <WelcomeView
            user={user}
            onExplore={() => navigateTo('home')}
          />
        )}

        {/* 5. HOME DASHBOARD */}
        {currentRoute === 'home' && (
          <HomeView
            user={user}
            painRecords={painRecords}
            romRecords={romRecords}
            sessions={sessions}
            onSelectRegion={(reg) => navigateTo('problem-select', reg)}
            onStartExercise={(id) => navigateTo('session', id)}
            onViewExercise={(id) => navigateTo('detail', id)}
            onToggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
            onNavigate={navigateTo}
          />
        )}

        {/* 6. BODY MAP */}
        {currentRoute === 'body-map' && (
          <BodyMapView onSelectRegion={(reg) => navigateTo('problem-select', reg)} />
        )}

        {/* 7. PROBLEM SELECTION */}
        {currentRoute === 'problem-select' && (
          <ProblemSelectView
            regionId={routeParam || 'lower_back'}
            onSelectProblem={(prob) => navigateTo('exercises')}
            onStartExercise={(id) => navigateTo('session', id)}
            onViewExercise={(id) => navigateTo('detail', id)}
            onToggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
            onBack={() => navigateTo('body-map')}
          />
        )}

        {/* 8. EXERCISES LIBRARY (33 EXERCISES) */}
        {currentRoute === 'exercises' && (
          <ExercisesView
            onViewExercise={(id) => navigateTo('detail', id)}
            onStartExercise={(id) => navigateTo('session', id)}
            onToggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
          />
        )}

        {/* 9. EXERCISE DETAIL */}
        {currentRoute === 'detail' && (
          <DetailView
            exerciseId={routeParam || 'ex-09'}
            onStartWorkout={(id) => navigateTo('session', id)}
            onToggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
            onBack={() => navigateTo('exercises')}
          />
        )}

        {/* 10. WORKOUT SESSION (TIMER + VAS) */}
        {currentRoute === 'session' && (
          <SessionView
            exerciseId={routeParam || 'ex-09'}
            onFinishSession={(sess, pain) => {
              completeSession(sess);
              addPainRecord(pain);
              navigateTo('progress');
            }}
            onExit={() => navigateTo('exercises')}
          />
        )}

        {/* 11. ROM & PAIN TRACKING */}
        {currentRoute === 'rom-tracking' && (
          <ROMTrackingView
            romRecords={romRecords}
            painRecords={painRecords}
            onAddROM={addROMRecord}
            onAddPain={addPainRecord}
          />
        )}

        {/* 12. PROGRESS */}
        {currentRoute === 'progress' && (
          <ProgressView
            sessions={sessions}
            painRecords={painRecords}
            romRecords={romRecords}
            onNewWorkout={() => navigateTo('exercises')}
          />
        )}

        {/* 13. MY EXERCISES */}
        {currentRoute === 'my-exercises' && (
          <MyExercisesView
            user={user}
            sessions={sessions}
            onViewExercise={(id) => navigateTo('detail', id)}
            onStartExercise={(id) => navigateTo('session', id)}
            onToggleBookmark={toggleBookmark}
            isBookmarked={isBookmarked}
          />
        )}

        {/* 14. PROFILE & ACCOUNT */}
        {currentRoute === 'profile' && (
          <ProfileView
            user={user}
            onSave={saveUser}
            onReplayIntro={() => navigateTo('intro')}
            onReset={() => {
              localStorage.clear();
              setUser(DEMO_USER_PROFILE);
              setPainRecords(SEED_PAIN);
              setRomRecords(SEED_ROM);
              setSessions(SEED_SESSIONS);
              alert('Đã khôi phục dữ liệu mẫu của Nguyễn Văn A!');
            }}
          />
        )}
      </main>

      {/* Global Medical Disclaimer & Footer */}
      <footer className="bg-[#31465A] text-[#FFFDF7] border-t border-[#31465A]/20 pt-10 pb-8 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-xl font-bold tracking-tight text-[#FFFDF7] flex items-center gap-1">
                PHYSIOFIT
              </span>
              <p className="text-xs text-[#FFFDF7]/80 mt-2 leading-relaxed">
                "Hiểu cơ thể hơn. Tập đúng hơn. Tiến bộ từng ngày."
              </p>
              <p className="text-[11px] text-[#C7DFA3] mt-1">
                33 bài tập phục hồi chức năng chuẩn hóa từ YouTube playlist chuyên khoa.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C7DFA3] mb-2">Chức năng</h4>
              <div className="grid grid-cols-2 gap-1 text-xs text-[#FFFDF7]/80">
                <span onClick={() => navigateTo('body-map')} className="cursor-pointer hover:underline">Sơ đồ cơ thể</span>
                <span onClick={() => navigateTo('exercises')} className="cursor-pointer hover:underline">Thư viện bài tập</span>
                <span onClick={() => navigateTo('rom-tracking')} className="cursor-pointer hover:underline">Theo dõi ROM</span>
                <span onClick={() => navigateTo('progress')} className="cursor-pointer hover:underline">Tiến độ phục hồi</span>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C7DFA3] mb-2">Hồ sơ người dùng</h4>
              <p className="text-xs text-[#FFFDF7]/80">
                Tài khoản: <strong className="text-[#C7DFA3]">{user.fullName}</strong> ({user.age} tuổi, {user.location})
              </p>
              <p className="text-[11px] text-[#FFFDF7]/70 mt-1">
                Đang theo dõi: {user.commonConditions.join(', ')}
              </p>
            </div>
          </div>

          {/* Prominent Medical Disclaimer */}
          <div className="p-4 rounded-2xl bg-[#FFFDF7]/10 border border-[#FFFDF7]/15 backdrop-blur-sm text-xs text-[#FFFDF7]/90 leading-relaxed">
            <strong className="text-[#C7DFA3]">⚠️ Tuyên bố miễn trừ trách nhiệm y khoa:</strong> PhysioFit là công cụ hỗ trợ theo dõi và hướng dẫn tập luyện, không thay thế chẩn đoán hoặc điều trị trực tiếp từ chuyên gia y tế.
          </div>

          <div className="pt-4 border-t border-[#FFFDF7]/10 text-center text-xs text-[#FFFDF7]/60">
            © 2026 PhysioFit Platform.
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- 5. ONBOARDING & SETUP COMPONENTS ---

// 1. INTRO VIEW
function IntroView({ onStart, onLogin }) {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 space-y-10 animate-fadeIn">
      {/* Hero Illustration & Tagline */}
      <div className="text-center space-y-6 bg-gradient-to-b from-[#D9F0FF]/50 via-[#FFFDF7] to-transparent p-8 sm:p-14 rounded-3xl border border-[#89B9E6]/30 shadow-xs">
        {/* PhysioFit Friendly Character / Mascot Badge */}
        <div className="w-20 h-20 rounded-3xl bg-[#31465A] text-[#FFFDF7] flex items-center justify-center mx-auto shadow-lg text-3xl font-black group hover:scale-105 transition-transform">
          <span className="text-[#C7DFA3] animate-pulse">🧘‍♂️</span>
        </div>

        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-[#31465A]/70 px-3.5 py-1 rounded-full bg-[#C7DFA3]/60">
            PHYSIOFIT
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#31465A] tracking-tight mt-3 leading-tight">
            "Hiểu cơ thể hơn. Tập đúng hơn. <br className="hidden sm:inline" />
            <span className="underline decoration-[#C7DFA3] decoration-wavy decoration-2">Tiến bộ từng ngày."</span>
          </h1>
        </div>

        <p className="text-sm sm:text-base text-[#31465A]/85 max-w-2xl mx-auto leading-relaxed">
          PhysioFit giúp bạn lựa chọn bài tập phù hợp với vùng cơ thể đang gặp vấn đề, theo dõi quá trình tập luyện và ghi nhận sự thay đổi của cơ thể.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onStart}
            className="w-full sm:w-auto py-4 px-10 rounded-2xl bg-[#31465A] text-[#FFFDF7] font-bold text-sm sm:text-base hover:bg-[#31465A]/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg transition-all"
          >
            Bắt đầu ngay →
          </button>
          <button
            onClick={onLogin}
            className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-[#FFFDF7] border-2 border-[#31465A]/20 text-[#31465A] font-bold text-sm sm:text-base hover:bg-[#D9F0FF]/40 transition-colors"
          >
            Đăng nhập
          </button>
        </div>
      </div>

      {/* 3 Core Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#FFFDF7] border border-[#31465A]/10 shadow-sm space-y-3 hover:border-[#89B9E6] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#D9F0FF] flex items-center justify-center text-xl">
            🎯
          </div>
          <h3 className="font-bold text-base text-[#31465A]">Cá nhân hóa bài tập</h3>
          <p className="text-xs sm:text-sm text-[#31465A]/80 leading-relaxed">
            Lựa chọn bài tập dựa trên vùng cơ thể và vấn đề bạn đang gặp phải.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#FFFDF7] border border-[#31465A]/10 shadow-sm space-y-3 hover:border-[#89B9E6] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#C7DFA3] flex items-center justify-center text-xl">
            📈
          </div>
          <h3 className="font-bold text-base text-[#31465A]">Theo dõi tiến độ</h3>
          <p className="text-xs sm:text-sm text-[#31465A]/80 leading-relaxed">
            Ghi nhận mức độ đau, biên độ vận động và quá trình tập luyện.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#FFFDF7] border border-[#31465A]/10 shadow-sm space-y-3 hover:border-[#89B9E6] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#89B9E6]/30 flex items-center justify-center text-xl">
            💚
          </div>
          <h3 className="font-bold text-base text-[#31465A]">Tập luyện an toàn</h3>
          <p className="text-xs sm:text-sm text-[#31465A]/80 leading-relaxed">
            Hỗ trợ bạn thực hiện bài tập với hướng dẫn và lưu ý phù hợp.
          </p>
        </div>
      </div>

      {/* Small Disclaimer */}
      <div className="text-center text-xs text-[#31465A]/70 max-w-xl mx-auto pt-4 border-t border-[#31465A]/10 leading-relaxed">
        PhysioFit là công cụ hỗ trợ theo dõi và hướng dẫn tập luyện, không thay thế chẩn đoán hoặc điều trị trực tiếp từ chuyên gia y tế.
      </div>
    </div>
  );
}

// 2. SETUP STEP 1: THÔNG TIN CƠ BẢN
function SetupStep1View({ user, onNext, onBack }) {
  const [fullName, setFullName] = useState(user.fullName || "Nguyễn Văn A");
  const [age, setAge] = useState(user.age || 35);
  const [location, setLocation] = useState(user.location || "Hà Nội");

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ fullName, age: parseInt(age, 10) || 35, location });
  };

  return (
    <div className="max-w-xl mx-auto py-6 space-y-6 animate-fadeIn">
      {/* Stepper indicator */}
      <div className="flex items-center justify-between text-xs font-bold text-[#31465A]/70 pb-2 border-b border-[#31465A]/10">
        <span className="text-[#31465A]">BƯỚC 1 / 2: THÔNG TIN CƠ BẢN</span>
        <span className="px-2.5 py-0.5 rounded-full bg-[#C7DFA3] text-[#31465A]">50%</span>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#31465A]">
          Trước khi bắt đầu, hãy cho PhysioFit biết một chút về bạn
        </h1>
        <p className="text-xs sm:text-sm text-[#31465A]/80">
          Những thông tin này giúp chúng tôi cá nhân hóa trải nghiệm tập luyện của bạn.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#FFFDF7] p-6 sm:p-8 rounded-3xl border border-[#31465A]/10 shadow-sm space-y-5">
        <div className="border-b border-[#31465A]/10 pb-3">
          <h2 className="font-bold text-base text-[#31465A]">Thông tin của bạn</h2>
          <p className="text-xs text-[#31465A]/60">Dữ liệu mẫu đã được điền sẵn để trải nghiệm nhanh.</p>
        </div>

        {/* 1. Họ và tên */}
        <div>
          <label className="block text-xs font-bold text-[#31465A] mb-1">
            Họ và tên
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 rounded-2xl border border-[#31465A]/20 bg-[#FFFDF7] text-sm text-[#31465A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
            placeholder="Nguyễn Văn A"
            required
          />
        </div>

        {/* 2. Tuổi */}
        <div>
          <label className="block text-xs font-bold text-[#31465A] mb-1">
            Tuổi
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 rounded-2xl border border-[#31465A]/20 bg-[#FFFDF7] text-sm text-[#31465A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
            placeholder="35"
            required
          />
        </div>

        {/* 3. Nơi bạn đang sống */}
        <div>
          <label className="block text-xs font-bold text-[#31465A] mb-1">
            Nơi bạn đang sống
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 rounded-2xl border border-[#31465A]/20 bg-[#FFFDF7] text-sm text-[#31465A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
            placeholder="Hà Nội"
            required
          />
        </div>

        <div className="flex items-center justify-between pt-4 gap-3">
          <button
            type="button"
            onClick={onBack}
            className="py-3 px-5 rounded-2xl border border-[#31465A]/20 text-[#31465A] font-bold text-xs hover:bg-[#D9F0FF]/40"
          >
            ← Quay lại
          </button>
          <button
            type="submit"
            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#31465A] text-[#FFFDF7] font-bold text-sm hover:bg-[#31465A]/90 shadow-md transition-all text-center"
          >
            Tiếp tục →
          </button>
        </div>
      </form>
    </div>
  );
}

// 3. SETUP STEP 2: TÌNH TRẠNG SỨC KHỎE
function SetupStep2View({ user, onFinish, onBack }) {
  const [selectedConditions, setSelectedConditions] = useState(
    user.commonConditions && user.commonConditions.length > 0
      ? user.commonConditions
      : ["Đau lưng", "Đau khớp gối"]
  );
  const [otherText, setOtherText] = useState(user.otherCondition || "");

  const toggleCondition = (item) => {
    if (selectedConditions.includes(item)) {
      setSelectedConditions(selectedConditions.filter((c) => c !== item));
    } else {
      setSelectedConditions([...selectedConditions, item]);
    }
  };

  const handleComplete = (e) => {
    e.preventDefault();
    onFinish({
      commonConditions: selectedConditions,
      otherCondition: selectedConditions.includes('Khác') ? otherText : ''
    });
  };

  const hasOther = selectedConditions.includes('Khác');

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6 animate-fadeIn">
      {/* Stepper indicator */}
      <div className="flex items-center justify-between text-xs font-bold text-[#31465A]/70 pb-2 border-b border-[#31465A]/10">
        <span className="text-[#31465A]">BƯỚC 2 / 2: TÌNH TRẠNG SỨC KHỎE</span>
        <span className="px-2.5 py-0.5 rounded-full bg-[#C7DFA3] text-[#31465A]">100%</span>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#31465A]">
          Bạn thường gặp vấn đề gì?
        </h1>
        <p className="text-xs sm:text-sm text-[#31465A]/80 max-w-lg mx-auto">
          Thông tin này giúp PhysioFit hiểu thêm về nhu cầu vận động của bạn.
        </p>
      </div>

      <form onSubmit={handleComplete} className="bg-[#FFFDF7] p-6 sm:p-8 rounded-3xl border border-[#31465A]/10 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {HEALTH_CONDITIONS_LIST.map((condition) => {
            const isChecked = selectedConditions.includes(condition);
            return (
              <label
                key={condition}
                onClick={() => toggleCondition(condition)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-[#D9F0FF]/50 border-[#31465A] font-bold text-[#31465A] shadow-xs'
                    : 'bg-[#FFFDF7] border-[#31465A]/15 text-[#31465A]/80 hover:bg-[#D9F0FF]/20'
                }`}
              >
                <span className="text-xs sm:text-sm">{condition}</span>
                <span
                  className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                    isChecked ? 'bg-[#31465A] text-[#C7DFA3]' : 'border border-[#31465A]/30'
                  }`}
                >
                  {isChecked ? '✓' : ''}
                </span>
              </label>
            );
          })}
        </div>

        {/* Other text description */}
        {hasOther && (
          <div className="pt-2 animate-fadeIn">
            <label className="block text-xs font-bold text-[#31465A] mb-1">
              Bạn có thể mô tả thêm:
            </label>
            <textarea
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              rows={2}
              placeholder="VD: Cảm giác mỏi cơ sau khi đá bóng..."
              className="w-full p-3 rounded-2xl border border-[#31465A]/20 bg-[#FFFDF7] text-xs text-[#31465A] focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-4 gap-3">
          <button
            type="button"
            onClick={onBack}
            className="py-3 px-5 rounded-2xl border border-[#31465A]/20 text-[#31465A] font-bold text-xs hover:bg-[#D9F0FF]/40"
          >
            ← Quay lại
          </button>
          <button
            type="submit"
            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#31465A] text-[#FFFDF7] font-bold text-sm hover:bg-[#31465A]/90 shadow-md transition-all text-center"
          >
            Hoàn tất hồ sơ ✓
          </button>
        </div>
      </form>
    </div>
  );
}

// 4. WELCOME VIEW
function WelcomeView({ user, onExplore }) {
  return (
    <div className="max-w-xl mx-auto py-10 sm:py-16 text-center space-y-6 animate-fadeIn">
      <div className="w-20 h-20 rounded-full bg-[#C7DFA3] text-[#31465A] flex items-center justify-center mx-auto text-3xl shadow-md animate-bounce">
        💚
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl sm:text-4xl font-black text-[#31465A]">
          Chào mừng bạn đến với PhysioFit, {user.fullName} 💚
        </h1>
        <p className="text-sm text-[#31465A]/85 max-w-md mx-auto leading-relaxed">
          Thông tin của bạn đã được lưu. Hãy bắt đầu bằng cách cho chúng tôi biết vùng cơ thể bạn đang gặp vấn đề.
        </p>
      </div>

      {/* Summary card */}
      <div className="p-4 rounded-2xl bg-[#D9F0FF]/40 border border-[#89B9E6]/30 max-w-sm mx-auto text-xs text-[#31465A]/80 space-y-1 text-left">
        <p><strong>Người tập:</strong> {user.fullName} ({user.age} tuổi - {user.location})</p>
        <p><strong>Vấn đề theo dõi:</strong> {user.commonConditions.join(', ')}</p>
      </div>

      <button
        onClick={onExplore}
        className="py-4 px-10 rounded-2xl bg-[#31465A] text-[#FFFDF7] font-bold text-sm sm:text-base hover:bg-[#31465A]/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg transition-all"
      >
        Khám phá PhysioFit →
      </button>
    </div>
  );
}

// --- 6. CORE APP SCREENS ---

// HOME DASHBOARD VIEW (PERSONALIZED WITH BODY MAP & TRACKING)
function HomeView({ user, painRecords, romRecords, sessions, onSelectRegion, onStartExercise, onViewExercise, onToggleBookmark, isBookmarked, onNavigate }) {
  const totalSessions = sessions.length || 5;

  // Filter exercises matching user's common conditions
  const personalizedExercises = useMemo(() => {
    const conds = user.commonConditions || [];
    let list = [];
    if (conds.includes('Đau lưng') || conds.includes('Thoát vị đĩa đệm')) {
      list.push(...EXERCISES_DATA.filter(e => e.bodyRegionId === 'lower_back' || e.bodyRegionId === 'mid_back'));
    }
    if (conds.includes('Đau khớp gối')) {
      list.push(...EXERCISES_DATA.filter(e => e.bodyRegionId === 'knee'));
    }
    if (conds.includes('Đau cổ – vai – gáy')) {
      list.push(...EXERCISES_DATA.filter(e => e.bodyRegionId === 'neck' || e.bodyRegionId === 'shoulder'));
    }
    // Remove duplicates
    const unique = Array.from(new Set(list.map(a => a.id))).map(id => list.find(a => a.id === id));
    return unique.length > 0 ? unique : EXERCISES_DATA.slice(0, 4);
  }, [user.commonConditions]);

  return (
    <div className="space-y-10 py-4">
      {/* 1. Greeting Banner */}
      <section className="bg-gradient-to-r from-[#31465A] via-[#31465A] to-[#3a546d] rounded-3xl p-6 sm:p-8 text-[#FFFDF7] shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C7DFA3] text-[#31465A] text-xs font-bold">
              ✨ Chào mừng bạn
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Xin chào, {user.fullName} 💚
            </h1>
            <p className="text-sm text-[#FFFDF7]/90 font-medium">
              Hôm nay bạn cảm thấy thế nào?
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate('body-map')}
              className="py-3 px-5 rounded-2xl bg-[#C7DFA3] text-[#31465A] text-xs sm:text-sm font-bold hover:bg-[#C7DFA3]/90 shadow-sm transition-all"
            >
              Chọn vùng trên Body Map
            </button>
            <button
              onClick={() => onStartExercise('ex-09')}
              className="py-3 px-5 rounded-2xl bg-[#FFFDF7]/15 border border-[#FFFDF7]/25 text-[#FFFDF7] text-xs sm:text-sm font-semibold hover:bg-[#FFFDF7]/25 transition-all"
            >
              ▶ Bắt đầu bài tập
            </button>
          </div>
        </div>

        {/* User Status Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#FFFDF7]/15">
          {/* Card: Bạn đang theo dõi */}
          <div className="bg-[#FFFDF7]/10 p-4 rounded-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C7DFA3]">
              Bạn đang theo dõi
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {user.commonConditions.map((cond, idx) => (
                <span
                  key={idx}
                  onClick={() => onNavigate(cond.includes('lưng') ? 'problem-select' : 'problem-select', cond.includes('lưng') ? 'lower_back' : 'knee')}
                  className="px-3 py-1 rounded-xl bg-[#FFFDF7] text-[#31465A] text-xs font-bold cursor-pointer hover:bg-[#C7DFA3] transition-colors"
                >
                  • {cond}
                </span>
              ))}
            </div>
          </div>

          {/* Card: Tiến độ của bạn */}
          <div className="bg-[#FFFDF7]/10 p-4 rounded-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C7DFA3]">
              Tiến độ của bạn
            </span>
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-[#FFFDF7]/15 p-2 rounded-xl">
                <span className="text-[10px] text-[#FFFDF7]/70 block">Đã hoàn thành</span>
                <strong className="text-sm font-bold text-[#FFFDF7]">{totalSessions} buổi</strong>
              </div>
              <div className="bg-[#FFFDF7]/15 p-2 rounded-xl">
                <span className="text-[10px] text-[#FFFDF7]/70 block">ROM hiện tại</span>
                <strong className="text-sm font-bold text-[#C7DFA3]">110°</strong>
              </div>
              <div className="bg-[#FFFDF7]/15 p-2 rounded-xl">
                <span className="text-[10px] text-[#FFFDF7]/70 block">Mức đau hôm nay</span>
                <strong className="text-sm font-bold text-[#FFFDF7]">3/10</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Body Map Shortcut Section */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold text-[#31465A]">
            Bạn đang gặp vấn đề ở đâu?
          </h2>
          <p className="text-xs sm:text-sm text-[#31465A]/70">
            Chạm vào vùng cơ thể bên dưới để nhận các bài tập phù hợp nhất
          </p>
        </div>

        <div className="bg-[#FFFDF7] p-6 rounded-3xl border border-[#31465A]/10 shadow-sm">
          <BodyMapView onSelectRegion={onSelectRegion} />
        </div>
      </section>

      {/* 3. Personalized Recommended Exercises for Nguyễn Văn A */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-[#31465A]">
              Bài tập cá nhân hóa cho bạn
            </h3>
            <p className="text-xs text-[#31465A]/70">
              Dựa trên tình trạng: {user.commonConditions.join(', ')}
            </p>
          </div>
          <button
            onClick={() => onNavigate('exercises')}
            className="text-xs font-bold text-[#31465A] hover:underline"
          >
            Xem tất cả 33 bài →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personalizedExercises.slice(0, 4).map((ex) => (
            <ExerciseCardItem
              key={ex.id}
              exercise={ex}
              onView={() => onViewExercise(ex.id)}
              onToggleBookmark={() => onToggleBookmark(ex.id)}
              isBookmarked={isBookmarked(ex.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

// BODY MAP VIEW (INTERACTIVE SVG WITH FRONT/BACK)
function BodyMapView({ onSelectRegion }) {
  const [view, setView] = useState('front');
  const [selectedId, setSelectedId] = useState('lower_back');

  const activeRegion = BODY_REGIONS.find((r) => r.id === selectedId) || BODY_REGIONS[0];

  const getPathClass = (id) => {
    return selectedId === id
      ? 'fill-[#31465A] stroke-[#C7DFA3] stroke-[3] cursor-pointer drop-shadow-md'
      : 'fill-[#D9F0FF] hover:fill-[#89B9E6] stroke-[#31465A]/40 stroke-[1.5] cursor-pointer transition-colors';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* SVG Figure */}
      <div className="lg:col-span-7 flex flex-col items-center">
        <div className="flex gap-2 mb-4 bg-[#D9F0FF]/50 p-1 rounded-2xl">
          <button
            onClick={() => setView('front')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              view === 'front' ? 'bg-[#31465A] text-[#FFFDF7]' : 'text-[#31465A]/70'
            }`}
          >
            Mặt trước
          </button>
          <button
            onClick={() => setView('back')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              view === 'back' ? 'bg-[#31465A] text-[#FFFDF7]' : 'text-[#31465A]/70'
            }`}
          >
            Mặt sau
          </button>
        </div>

        <svg viewBox="0 0 400 620" className="w-full max-w-[320px] h-auto select-none">
          <circle cx="200" cy="48" r="34" className="fill-[#FFFDF7] stroke-[#31465A]/30 stroke-[1.5]" />
          {/* Neck */}
          <path d="M184,80 C184,98 180,105 174,112 C186,118 214,118 226,112 C220,105 216,98 216,80 Z" className={getPathClass('neck')} onClick={() => setSelectedId('neck')} />
          {view === 'front' ? (
            <g>
              {/* Shoulder */}
              <path d="M174,112 C150,115 125,130 115,155 C125,168 140,165 152,148 Z" className={getPathClass('shoulder')} onClick={() => setSelectedId('shoulder')} />
              <path d="M226,112 C250,115 275,130 285,155 C275,168 260,165 248,148 Z" className={getPathClass('shoulder')} onClick={() => setSelectedId('shoulder')} />
              {/* Upper Back / Chest */}
              <path d="M152,140 C170,132 230,132 248,140 C252,185 245,210 240,225 C215,230 185,230 160,225 Z" className={getPathClass('upper_back')} onClick={() => setSelectedId('upper_back')} />
              {/* Elbows */}
              <ellipse cx="110" cy="235" rx="16" ry="18" className={getPathClass('elbow')} onClick={() => setSelectedId('elbow')} />
              <ellipse cx="290" cy="235" rx="16" ry="18" className={getPathClass('elbow')} onClick={() => setSelectedId('elbow')} />
              {/* Wrists */}
              <path d="M95,290 C85,305 85,340 100,355 C110,345 115,315 110,290 Z" className={getPathClass('wrist_hand')} onClick={() => setSelectedId('wrist_hand')} />
              <path d="M305,290 C315,305 315,340 300,355 C290,345 285,315 290,290 Z" className={getPathClass('wrist_hand')} onClick={() => setSelectedId('wrist_hand')} />
              {/* Hip */}
              <path d="M158,230 C185,235 215,235 242,230 C248,270 245,300 236,315 C215,322 185,322 164,315 Z" className={getPathClass('hip')} onClick={() => setSelectedId('hip')} />
              {/* Thighs */}
              <path d="M162,320 C185,324 195,330 196,365 C196,405 186,450 175,450 C155,445 150,405 162,320 Z" className={getPathClass('thigh')} onClick={() => setSelectedId('thigh')} />
              <path d="M238,320 C215,324 205,330 204,365 C204,405 214,450 225,450 C245,445 250,405 238,320 Z" className={getPathClass('thigh')} onClick={() => setSelectedId('thigh')} />
              {/* Knees */}
              <ellipse cx="168" cy="472" rx="18" ry="20" className={getPathClass('knee')} onClick={() => setSelectedId('knee')} />
              <ellipse cx="232" cy="472" rx="18" ry="20" className={getPathClass('knee')} onClick={() => setSelectedId('knee')} />
              {/* Shin / Calf */}
              <path d="M155,496 C178,496 175,545 165,580 C150,560 155,496 155,496 Z" className={getPathClass('calf_shin')} onClick={() => setSelectedId('calf_shin')} />
              <path d="M245,496 C222,496 225,545 235,580 C250,560 245,496 245,496 Z" className={getPathClass('calf_shin')} onClick={() => setSelectedId('calf_shin')} />
              {/* Ankle / Foot */}
              <ellipse cx="162" cy="598" rx="16" ry="12" className={getPathClass('ankle_foot')} onClick={() => setSelectedId('ankle_foot')} />
              <ellipse cx="238" cy="598" rx="16" ry="12" className={getPathClass('ankle_foot')} onClick={() => setSelectedId('ankle_foot')} />
            </g>
          ) : (
            <g>
              {/* Upper Back */}
              <path d="M152,120 C180,115 220,115 248,120 C255,160 240,195 160,195 Z" className={getPathClass('upper_back')} onClick={() => setSelectedId('upper_back')} />
              {/* Mid Back / Spine */}
              <path d="M160,198 C185,202 215,202 240,198 C242,235 235,270 165,270 Z" className={getPathClass('mid_back')} onClick={() => setSelectedId('mid_back')} />
              {/* Lower Back */}
              <path d="M165,272 C185,276 215,276 235,272 C238,310 228,335 172,335 Z" className={getPathClass('lower_back')} onClick={() => setSelectedId('lower_back')} />
              {/* Gluteus Hip */}
              <path d="M162,338 C185,342 215,342 238,338 C248,375 232,420 168,420 Z" className={getPathClass('hip')} onClick={() => setSelectedId('hip')} />
              {/* Calves */}
              <path d="M152,490 C180,515 170,575 164,585 C148,565 152,490 152,490 Z" className={getPathClass('calf_shin')} onClick={() => setSelectedId('calf_shin')} />
              <path d="M248,490 C220,515 230,575 236,585 C252,565 248,490 248,490 Z" className={getPathClass('calf_shin')} onClick={() => setSelectedId('calf_shin')} />
            </g>
          )}
        </svg>
      </div>

      {/* Selected Region Card */}
      <div className="lg:col-span-5 bg-[#D9F0FF]/40 border border-[#89B9E6]/30 p-6 rounded-3xl space-y-4">
        <span className="px-3 py-1 rounded-full bg-[#C7DFA3] text-[#31465A] text-xs font-bold">
          Vùng đang chọn
        </span>
        <h3 className="text-2xl font-bold text-[#31465A]">{activeRegion.vietnameseName}</h3>
        <p className="text-xs text-[#31465A]/80 leading-relaxed bg-[#FFFDF7] p-4 rounded-2xl border border-[#31465A]/10">
          {activeRegion.description}
        </p>
        <div className="pt-2 border-t border-[#31465A]/10 flex justify-between text-xs font-semibold">
          <span>Bệnh lý liên quan:</span>
          <span>{activeRegion.problemCount} nhóm</span>
        </div>
        <button
          onClick={() => onSelectRegion(activeRegion.id)}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#31465A] text-[#FFFDF7] font-bold text-sm hover:bg-[#31465A]/90 shadow-md transition-transform active:scale-95"
        >
          Xem danh sách bài tập vùng này →
        </button>
      </div>
    </div>
  );
}

// PROBLEM SELECT VIEW
function ProblemSelectView({ regionId, onSelectProblem, onStartExercise, onViewExercise, onToggleBookmark, isBookmarked, onBack }) {
  const region = BODY_REGIONS.find((r) => r.id === regionId) || BODY_REGIONS[0];
  const problems = PROBLEMS_DATA.filter((p) => p.bodyRegionId === region.id);
  const [selectedProbId, setSelectedProbId] = useState(problems[0]?.id || '');

  const activeProb = problems.find((p) => p.id === selectedProbId) || problems[0];
  const exercises = activeProb
    ? EXERCISES_DATA.filter((e) => e.problemIds.includes(activeProb.id))
    : EXERCISES_DATA.filter((e) => e.bodyRegionId === region.id);

  return (
    <div className="space-y-8 py-4">
      <button onClick={onBack} className="text-xs font-bold text-[#31465A] hover:underline flex items-center gap-1">
        ← Quay lại Sơ đồ cơ thể
      </button>

      <div className="bg-gradient-to-r from-[#D9F0FF]/60 to-[#FFFDF7] p-6 sm:p-8 rounded-3xl border border-[#89B9E6]/30 space-y-2">
        <span className="px-3 py-1 rounded-full bg-[#C7DFA3] text-[#31465A] text-xs font-bold">Xác định vấn đề</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#31465A]">{region.vietnameseName}</h1>
        <p className="text-xs sm:text-sm text-[#31465A]/80">{region.description}</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-[#31465A]">Vấn đề & Bệnh lý phổ biến:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problems.map((prob) => {
            const isSel = selectedProbId === prob.id;
            return (
              <div
                key={prob.id}
                onClick={() => setSelectedProbId(prob.id)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                  isSel ? 'bg-[#FFFDF7] border-[#31465A] ring-2 ring-[#C7DFA3] shadow-md' : 'bg-[#FFFDF7] border-[#31465A]/10 hover:border-[#89B9E6]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-[#31465A]">{prob.name}</h4>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${isSel ? 'bg-[#31465A] text-[#C7DFA3]' : 'bg-[#D9F0FF]'}`}>✓</span>
                </div>
                <p className="text-xs text-[#31465A]/80 mt-2">{prob.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {prob.symptoms.map((s, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-[#D9F0FF]/60 text-[#31465A]">
                      • {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t border-[#31465A]/10">
        <h3 className="font-bold text-lg text-[#31465A]">
          Bài tập đề xuất ({exercises.length} bài)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((ex) => (
            <ExerciseCardItem
              key={ex.id}
              exercise={ex}
              onView={() => onViewExercise(ex.id)}
              onToggleBookmark={() => onToggleBookmark(ex.id)}
              isBookmarked={isBookmarked(ex.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// EXERCISES CATALOG VIEW (ALL 33 EXERCISES)
function ExercisesView({ onViewExercise, onStartExercise, onToggleBookmark, isBookmarked }) {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');

  const filtered = useMemo(() => {
    return EXERCISES_DATA.filter((ex) => {
      const q = search.toLowerCase().trim();
      const matchQ = q === '' || ex.title.toLowerCase().includes(q) || ex.tags.some((t) => t.toLowerCase().includes(q));
      const matchR = regionFilter === 'all' || ex.bodyRegionId === regionFilter;
      const matchD = diffFilter === 'all' || ex.difficulty === diffFilter;
      return matchQ && matchR && matchD;
    });
  }, [search, regionFilter, diffFilter]);

  return (
    <div className="space-y-6 py-4">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-[#31465A]">Thư Viện Bài Tập Chuẩn Hóa</h1>
        <p className="text-xs sm:text-sm text-[#31465A]/80">Tổng hợp 33 bài tập phục hồi chức năng cơ xương khớp trực tiếp từ playlist YouTube.</p>
      </div>

      <div className="bg-[#FFFDF7] p-5 rounded-3xl border border-[#31465A]/10 shadow-sm space-y-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên bài tập, triệu chứng (ví dụ: McKenzie, Schroth, cổ rùa, ACL, ống cổ tay...)"
          className="w-full p-3 rounded-2xl border border-[#31465A]/15 bg-[#FFFDF7] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#31465A]/10">
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setRegionFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold ${regionFilter === 'all' ? 'bg-[#31465A] text-[#FFFDF7]' : 'bg-[#D9F0FF]/50 text-[#31465A]'}`}
            >
              Tất cả vùng
            </button>
            {BODY_REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setRegionFilter(r.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-medium ${regionFilter === r.id ? 'bg-[#31465A] text-[#FFFDF7]' : 'bg-[#D9F0FF]/40 text-[#31465A]'}`}
              >
                {r.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#31465A]/70">Độ khó:</span>
            {['all', 'Dễ', 'Trung bình', 'Nâng cao'].map((d) => (
              <button
                key={d}
                onClick={() => setDiffFilter(d)}
                className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${diffFilter === d ? 'bg-[#31465A] text-[#FFFDF7]' : 'text-[#31465A]/70'}`}
              >
                {d === 'all' ? 'Tất cả' : d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs font-semibold text-[#31465A]">
        <span>Hiển thị {filtered.length} / 33 bài tập</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((ex) => (
          <ExerciseCardItem
            key={ex.id}
            exercise={ex}
            onView={() => onViewExercise(ex.id)}
            onToggleBookmark={() => onToggleBookmark(ex.id)}
            isBookmarked={isBookmarked(ex.id)}
          />
        ))}
      </div>
    </div>
  );
}

// EXERCISE DETAIL VIEW
function DetailView({ exerciseId, onStartWorkout, onToggleBookmark, isBookmarked, onBack }) {
  const exercise = EXERCISES_DATA.find((e) => e.id === exerciseId) || EXERCISES_DATA[0];
  const bookmarked = isBookmarked(exercise.id);

  return (
    <div className="space-y-6 py-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-xs font-bold text-[#31465A] hover:underline">
          ← Quay lại danh sách
        </button>
        <button
          onClick={() => onToggleBookmark(exercise.id)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            bookmarked ? 'bg-[#C7DFA3] text-[#31465A]' : 'bg-[#D9F0FF] text-[#31465A]'
          }`}
        >
          {bookmarked ? '★ Đã lưu bài tập' : '☆ Lưu vào bài tập của tôi'}
        </button>
      </div>

      {/* Video Responsive Box */}
      <div className="bg-[#31465A] rounded-3xl overflow-hidden shadow-xl aspect-video w-full">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${exercise.video.videoId}?rel=0`}
          title={exercise.title}
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>

      <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-3xl border border-[#31465A]/10 shadow-sm space-y-4">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-[#31465A] text-[#FFFDF7] text-xs font-bold">{exercise.bodyRegionName}</span>
          <span className="px-3 py-1 rounded-full bg-[#C7DFA3] text-[#31465A] text-xs font-bold">{exercise.difficulty}</span>
          <span className="px-3 py-1 rounded-full bg-[#D9F0FF] text-[#31465A] text-xs font-semibold">{exercise.durationMinutes} phút</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-[#31465A] leading-snug">{exercise.title}</h1>
        <p className="text-xs text-[#31465A]/80">Gợi ý tập: <strong>{exercise.repsSets}</strong></p>

        <button
          onClick={() => onStartWorkout(exercise.id)}
          className="w-full py-4 rounded-2xl bg-[#31465A] text-[#FFFDF7] font-bold text-sm hover:bg-[#31465A]/90 shadow-md transition-transform active:scale-98"
        >
          ▶ Bắt đầu buổi tập có đồng hồ đếm
        </button>
      </div>

      <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-3xl border border-[#31465A]/10 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[#31465A]">Hướng dẫn động tác từng bước</h3>
        <div className="space-y-3">
          {exercise.instructions.map((step) => (
            <div key={step.stepNumber} className="p-4 rounded-2xl bg-[#D9F0FF]/25 border border-[#89B9E6]/20 flex gap-3">
              <span className="w-6 h-6 rounded-lg bg-[#31465A] text-[#FFFDF7] flex items-center justify-center text-xs font-bold shrink-0">
                {step.stepNumber}
              </span>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#31465A]">{step.title}</h4>
                <p className="text-xs text-[#31465A]/80 mt-0.5">{step.instruction}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// SESSION WORKOUT VIEW
function SessionView({ exerciseId, onFinishSession, onExit }) {
  const exercise = EXERCISES_DATA.find((e) => e.id === exerciseId) || EXERCISES_DATA[0];
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [painBefore, setPainBefore] = useState(4);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [painAfter, setPainAfter] = useState(2);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    ambientEngine.stop();
    let interval = null;
    if (running) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTimer = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinish = () => {
    setRunning(false);
    setShowFinishModal(true);
  };

  const handleSubmitFinish = () => {
    onFinishSession(
      {
        exerciseId: exercise.id,
        exerciseTitle: exercise.title,
        bodyRegionId: exercise.bodyRegionId,
        durationSeconds: Math.max(20, seconds),
        completed: true,
        painBefore: painBefore,
        painAfter: painAfter,
        notes: notes
      },
      {
        exerciseId: exercise.id,
        exerciseTitle: exercise.title,
        bodyRegionId: exercise.bodyRegionId,
        bodyRegionName: exercise.bodyRegionName,
        painLevelBefore: painBefore,
        painLevelAfter: painAfter,
        notes: notes
      }
    );
  };

  return (
    <div className="space-y-6 py-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <button onClick={onExit} className="text-xs font-bold text-[#31465A] hover:underline">
          ← Thoát buổi tập
        </button>
        <div className="flex items-center gap-2 text-xs">
          <span>Mức đau trước tập:</span>
          <select
            value={painBefore}
            onChange={(e) => setPainBefore(parseInt(e.target.value, 10))}
            className="p-1 rounded-lg bg-[#D9F0FF] font-bold"
          >
            {Array.from({ length: 11 }).map((_, i) => (
              <option key={i} value={i}>{i}/10</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-[#31465A] rounded-3xl overflow-hidden aspect-video shadow-xl">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${exercise.video.videoId}?autoplay=1&rel=0`}
            title={exercise.title}
            allow="autoplay"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        <div className="lg:col-span-4 bg-[#FFFDF7] p-6 rounded-3xl border border-[#31465A]/10 shadow-sm flex flex-col justify-between space-y-6 text-center">
          <div>
            <span className="text-xs font-bold text-[#31465A]/70 uppercase">Thời gian tập</span>
            <div className="text-4xl font-black text-[#31465A] my-3 font-mono">
              {formatTimer(seconds)}
            </div>
            <button
              onClick={() => setRunning(!running)}
              className={`py-2.5 px-6 rounded-xl text-xs font-bold ${
                running ? 'bg-amber-500 text-white' : 'bg-[#31465A] text-[#FFFDF7]'
              }`}
            >
              {running ? '⏸ Tạm dừng' : '▶ Bắt đầu đếm'}
            </button>
          </div>

          <div className="text-left bg-[#D9F0FF]/30 p-3 rounded-2xl text-xs space-y-1">
            <span className="font-bold text-[#31465A]">Động tác chính:</span>
            <p className="text-[#31465A]/80">{exercise.instructions[0]?.instruction}</p>
          </div>

          <button
            onClick={handleFinish}
            className="w-full py-3.5 rounded-2xl bg-[#31465A] text-[#FFFDF7] font-bold text-xs hover:bg-[#31465A]/90 shadow-md"
          >
            ✓ Hoàn thành bài tập & Đánh giá đau
          </button>
        </div>
      </div>

      {showFinishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#31465A]/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FFFDF7] p-6 rounded-3xl max-w-md w-full border border-[#31465A]/15 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#31465A] text-center">🎉 Đánh giá mức độ đau sau tập</h3>
            <p className="text-xs text-[#31465A]/70 text-center">So sánh với mức đau trước tập: {painBefore}/10</p>

            <div className="p-3 bg-[#C7DFA3]/40 rounded-2xl text-center">
              <span className="text-2xl font-black text-[#31465A]">{painAfter}/10</span>
              <p className="text-xs text-[#31465A]/80">
                {painAfter < painBefore ? `Giảm được ${painBefore - painAfter} điểm đau!` : 'Mức đau ổn định'}
              </p>
            </div>

            <input
              type="range"
              min="0"
              max="10"
              value={painAfter}
              onChange={(e) => setPainAfter(parseInt(e.target.value, 10))}
              className="w-full h-2.5 bg-[#D9F0FF] rounded-lg accent-[#31465A]"
            />

            <div>
              <label className="block text-xs font-semibold text-[#31465A] mb-1">Ghi chú cảm giác (Tùy chọn):</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="VD: Cổ xoay nhẹ nhàng hơn, đỡ căng..."
                className="w-full p-2.5 rounded-xl border border-[#31465A]/15 text-xs"
              />
            </div>

            <button
              onClick={handleSubmitFinish}
              className="w-full py-3 rounded-xl bg-[#31465A] text-[#FFFDF7] font-bold text-xs shadow-md"
            >
              Lưu kết quả & Xem tiến độ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ROM TRACKING VIEW
function ROMTrackingView({ romRecords, painRecords, onAddROM, onAddPain }) {
  const [tab, setTab] = useState('rom');
  const [joint, setJoint] = useState('Khớp gối');
  const [movement, setMovement] = useState('Gập gối');
  const [angle, setAngle] = useState(110);
  const [target] = useState(135);
  const [notes, setNotes] = useState('');

  const handleSaveROM = (e) => {
    e.preventDefault();
    onAddROM({
      jointName: joint,
      movementType: movement,
      bodyRegionId: 'knee',
      measuredAngle: angle,
      targetAngle: target,
      unit: 'độ (°)',
      notes: notes
    });
    setNotes('');
    alert('Đã lưu số đo ROM thành công!');
  };

  return (
    <div className="space-y-6 py-4">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-[#31465A]">Theo Dõi Biên Độ Khớp (ROM) & Đau</h1>
        <p className="text-xs sm:text-sm text-[#31465A]/80">Ghi nhận độ linh hoạt góc xoay các khớp và nhật ký mức đau.</p>
      </div>

      <div className="flex justify-center">
        <div className="bg-[#D9F0FF]/60 p-1 rounded-2xl flex gap-1">
          <button onClick={() => setTab('rom')} className={`px-4 py-1.5 rounded-xl text-xs font-bold ${tab === 'rom' ? 'bg-[#31465A] text-[#FFFDF7]' : 'text-[#31465A]/70'}`}>
            Đo góc vận động (ROM)
          </button>
          <button onClick={() => setTab('pain')} className={`px-4 py-1.5 rounded-xl text-xs font-bold ${tab === 'pain' ? 'bg-[#31465A] text-[#FFFDF7]' : 'text-[#31465A]/70'}`}>
            Nhật ký mức đau (VAS)
          </button>
        </div>
      </div>

      {tab === 'rom' ? (
        <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-3xl border border-[#31465A]/10 shadow-sm space-y-6">
          <form onSubmit={handleSaveROM} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="text-center p-6 bg-[#D9F0FF]/30 rounded-3xl border border-[#89B9E6]/30">
              <span className="text-xs font-bold text-[#31465A]/70">{joint} - {movement}</span>
              <div className="text-5xl font-black text-[#31465A] my-3">{angle}°</div>
              <span className="text-xs px-3 py-1 rounded-full bg-[#C7DFA3] text-[#31465A] font-bold">
                Mục tiêu chuẩn: {target}° ({Math.round((angle / target) * 100)}%)
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#31465A] mb-1">Góc đo thực tế: {angle}°</label>
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-[#D9F0FF] rounded-lg accent-[#31465A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#31465A] mb-1">Ghi chú vận động:</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="VD: Gối gập êm, không bị chèn ép..."
                  className="w-full p-2.5 rounded-xl border border-[#31465A]/15 text-xs"
                />
              </div>

              <button type="submit" className="w-full py-3 rounded-xl bg-[#31465A] text-[#FFFDF7] text-xs font-bold shadow-md">
                + Lưu bản ghi ROM này
              </button>
            </div>
          </form>

          <div className="space-y-3 pt-4 border-t border-[#31465A]/10">
            <h4 className="font-bold text-sm text-[#31465A]">Lịch sử đo ROM ({romRecords.length})</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {romRecords.map((r) => (
                <div key={r.id} className="p-3.5 rounded-2xl bg-[#D9F0FF]/25 border border-[#89B9E6]/20 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-[#31465A]">
                    <span>{r.jointName}</span>
                    <span>{r.measuredAngle}° / {r.targetAngle}°</span>
                  </div>
                  <p className="text-[11px] text-[#31465A]/70">{r.movementType}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-3xl border border-[#31465A]/10 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#31465A]">Tất cả bản ghi mức đau (VAS 0-10)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {painRecords.map((p) => (
              <div key={p.id} className="p-3.5 rounded-2xl bg-[#D9F0FF]/25 border border-[#89B9E6]/20 text-xs space-y-1">
                <span className="font-bold text-[#31465A]">{p.bodyRegionName}</span>
                <p className="text-sm font-bold text-[#31465A]">
                  Trước: {p.painLevelBefore}/10 → Sau: {p.painLevelAfter ?? p.painLevelBefore}/10
                </p>
                {p.notes && <p className="text-[10px] text-[#31465A]/70 italic">"{p.notes}"</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// PROGRESS VIEW
function ProgressView({ sessions, painRecords, romRecords, onNewWorkout }) {
  const totalMinutes = Math.round(sessions.reduce((acc, s) => acc + s.durationSeconds, 0) / 60);

  return (
    <div className="space-y-6 py-4">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-[#31465A]">Tiến Độ Phục Hồi Thể Chất</h1>
        <p className="text-xs sm:text-sm text-[#31465A]/80">Theo dõi kết quả cải thiện mức độ đau và tầm vận động qua thời gian.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-[#FFFDF7] border border-[#31465A]/10 shadow-sm space-y-1">
          <span className="text-xs text-[#31465A]/70">Tổng phút tập</span>
          <p className="text-2xl font-black text-[#31465A]">{totalMinutes}p</p>
        </div>
        <div className="p-5 rounded-3xl bg-[#FFFDF7] border border-[#31465A]/10 shadow-sm space-y-1">
          <span className="text-xs text-[#31465A]/70">Buổi hoàn thành</span>
          <p className="text-2xl font-black text-[#31465A]">{sessions.length} buổi</p>
        </div>
        <div className="p-5 rounded-3xl bg-[#FFFDF7] border border-[#31465A]/10 shadow-sm space-y-1">
          <span className="text-xs text-[#31465A]/70">Giảm đau TB</span>
          <p className="text-2xl font-black text-[#C7DFA3] bg-[#31465A] px-2 py-0.5 rounded-lg inline-block">-2.0 điểm</p>
        </div>
        <div className="p-5 rounded-3xl bg-[#FFFDF7] border border-[#31465A]/10 shadow-sm space-y-1">
          <span className="text-xs text-[#31465A]/70">Số đo ROM</span>
          <p className="text-2xl font-black text-[#31465A]">{romRecords.length} lần</p>
        </div>
      </div>

      <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-3xl border border-[#31465A]/10 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[#31465A]">Diễn tiến giảm đau sau các buổi tập gần đây</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {painRecords.slice(0, 6).map((p, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#D9F0FF]/30 border border-[#89B9E6]/20 space-y-2 text-xs">
              <span className="font-bold text-[#31465A]">{p.bodyRegionName}</span>
              <div className="flex justify-between font-bold">
                <span className="text-rose-700">Trước: {p.painLevelBefore}/10</span>
                <span className="text-emerald-700">Sau: {p.painLevelAfter ?? p.painLevelBefore}/10</span>
              </div>
              <div className="w-full h-2 bg-[#FFFDF7] rounded-full overflow-hidden flex">
                <div style={{ width: `${((p.painLevelAfter ?? p.painLevelBefore) / 10) * 100}%` }} className="bg-emerald-500 h-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// MY EXERCISES VIEW
function MyExercisesView({ user, sessions, onViewExercise, onStartExercise, onToggleBookmark, isBookmarked }) {
  const saved = EXERCISES_DATA.filter((e) => (user.savedExerciseIds || []).includes(e.id));

  return (
    <div className="space-y-6 py-4">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-[#31465A]">Bài Tập Của Tôi</h1>
        <p className="text-xs sm:text-sm text-[#31465A]/80">Danh sách bài tập bạn đã lưu và lịch sử các buổi tập đã hoàn thành.</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-base text-[#31465A]">Bài tập đã lưu ({saved.length})</h3>
        {saved.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {saved.map((ex) => (
              <ExerciseCardItem
                key={ex.id}
                exercise={ex}
                onView={() => onViewExercise(ex.id)}
                onToggleBookmark={() => onToggleBookmark(ex.id)}
                isBookmarked={true}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#31465A]/60 italic">Chưa có bài tập nào được lưu.</p>
        )}
      </div>

      <div className="space-y-4 pt-6 border-t border-[#31465A]/10">
        <h3 className="font-bold text-base text-[#31465A]">Lịch sử các buổi tập ({sessions.length})</h3>
        <div className="space-y-2">
          {sessions.map((s) => (
            <div key={s.id} className="p-3.5 rounded-2xl bg-[#D9F0FF]/30 border border-[#89B9E6]/20 flex justify-between items-center text-xs">
              <div>
                <p className="font-bold text-[#31465A]">{s.exerciseTitle}</p>
                <span className="text-[10px] text-[#31465A]/60">Thời lượng: {Math.round(s.durationSeconds / 60)} phút</span>
              </div>
              <span className="font-bold text-[#31465A]">Đau: {s.painBefore}/10 → <span className="text-emerald-700">{s.painAfter}/10</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 6. TRANG TÀI KHOẢN (PROFILE & ACCOUNT VIEW)
function ProfileView({ user, onSave, onReplayIntro, onReset }) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user.fullName || "Nguyễn Văn A");
  const [age, setAge] = useState(user.age || 35);
  const [location, setLocation] = useState(user.location || "Hà Nội");
  const [conditions, setConditions] = useState(user.commonConditions || ["Đau lưng", "Đau khớp gối"]);

  const toggleCond = (c) => {
    if (conditions.includes(c)) {
      setConditions(conditions.filter((item) => item !== c));
    } else {
      setConditions([...conditions, c]);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    onSave({
      ...user,
      fullName,
      age: parseInt(age, 10) || 35,
      location,
      commonConditions: conditions,
      updatedAt: new Date().toISOString()
    });
    setIsEditing(false);
    alert('Đã cập nhật thông tin hồ sơ thành công!');
  };

  return (
    <div className="space-y-6 py-4 max-w-xl mx-auto animate-fadeIn">
      {/* Avatar & Header */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-[#31465A] text-[#FFFDF7] flex items-center justify-center mx-auto text-3xl font-black shadow-lg">
          <span className="text-[#C7DFA3]">{user.fullName ? user.fullName.charAt(0) : 'A'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#31465A]">
          {user.fullName || "Nguyễn Văn A"}
        </h1>
        <p className="text-xs text-[#31465A]/70">Tài khoản thành viên PhysioFit</p>
      </div>

      {/* Main Info Card */}
      {!isEditing ? (
        <div className="bg-[#FFFDF7] p-6 sm:p-8 rounded-3xl border border-[#31465A]/10 shadow-sm space-y-6">
          <div className="border-b border-[#31465A]/10 pb-4 flex justify-between items-center">
            <h2 className="font-bold text-base text-[#31465A]">Thông tin cá nhân</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#C7DFA3] text-[#31465A] font-semibold">
              Hoạt động
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-[#31465A]/5">
              <span className="text-[#31465A]/70">Họ và tên:</span>
              <strong className="text-[#31465A]">{user.fullName}</strong>
            </div>

            <div className="flex justify-between py-2 border-b border-[#31465A]/5">
              <span className="text-[#31465A]/70">Tuổi:</span>
              <strong className="text-[#31465A]">{user.age} tuổi</strong>
            </div>

            <div className="flex justify-between py-2 border-b border-[#31465A]/5">
              <span className="text-[#31465A]/70">Nơi sống:</span>
              <strong className="text-[#31465A]">{user.location}</strong>
            </div>

            <div className="py-2">
              <span className="text-[#31465A]/70 block mb-2">Bệnh lý / vấn đề thường gặp:</span>
              <div className="flex flex-wrap gap-2">
                {user.commonConditions.map((cond, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-[#D9F0FF] text-[#31465A] font-bold text-xs"
                  >
                    • {cond}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#31465A]/10 space-y-2">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-3.5 rounded-2xl bg-[#31465A] text-[#FFFDF7] font-bold text-xs hover:bg-[#31465A]/90 shadow-sm transition-all"
            >
              Chỉnh sửa thông tin
            </button>

            <button
              onClick={onReplayIntro}
              className="w-full py-3 rounded-2xl border border-[#31465A]/20 text-[#31465A] font-bold text-xs hover:bg-[#D9F0FF]/40 transition-colors"
            >
              Xem lại màn hình giới thiệu (Intro)
            </button>

            <button
              onClick={onReset}
              className="w-full py-2.5 text-center text-xs text-rose-700 hover:underline block"
            >
              Đăng xuất / Khôi phục dữ liệu demo ban đầu
            </button>
          </div>
        </div>
      ) : (
        /* Edit Mode Form */
        <form onSubmit={handleSaveEdit} className="bg-[#FFFDF7] p-6 sm:p-8 rounded-3xl border border-[#31465A]/10 shadow-sm space-y-4">
          <div className="border-b border-[#31465A]/10 pb-3">
            <h2 className="font-bold text-base text-[#31465A]">Chỉnh sửa hồ sơ</h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#31465A] mb-1">Họ và tên:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#31465A]/15 text-xs focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#31465A] mb-1">Tuổi:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#31465A]/15 text-xs focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#31465A] mb-1">Nơi sống:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#31465A]/15 text-xs focus:outline-none focus:ring-2 focus:ring-[#89B9E6]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#31465A] mb-1">Bệnh lý / vấn đề thường gặp:</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
              {HEALTH_CONDITIONS_LIST.map((cond) => {
                const checked = conditions.includes(cond);
                return (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => toggleCond(cond)}
                    className={`p-2 rounded-xl text-left text-xs font-semibold border ${
                      checked ? 'bg-[#D9F0FF] border-[#31465A] text-[#31465A]' : 'bg-[#FFFDF7] border-[#31465A]/10 text-[#31465A]/70'
                    }`}
                  >
                    {checked ? '☑ ' : '☐ '} {cond}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 py-3 rounded-xl border border-[#31465A]/20 text-xs font-bold text-[#31465A]"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#31465A] text-[#FFFDF7] text-xs font-bold shadow-md"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// EXERCISE CARD ITEM COMPONENT
function ExerciseCardItem({ exercise, onView, onToggleBookmark, isBookmarked }) {
  return (
    <div className="bg-[#FFFDF7] rounded-3xl border border-[#31465A]/10 shadow-sm hover:shadow-md hover:border-[#89B9E6]/60 transition-all flex flex-col overflow-hidden group">
      <div className="relative aspect-video w-full overflow-hidden bg-[#31465A]/5">
        <img
          src={exercise.video.thumbnail}
          alt={exercise.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${exercise.video.videoId}/0.jpg`; }}
        />
        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center">
          <span className="px-2.5 py-0.5 rounded-full bg-[#31465A]/85 backdrop-blur-md text-[#FFFDF7] text-[10px] font-bold">
            {exercise.bodyRegionName}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleBookmark(); }}
            className={`p-1.5 rounded-full ${isBookmarked ? 'bg-[#C7DFA3] text-[#31465A]' : 'bg-[#FFFDF7]/80 text-[#31465A]'}`}
          >
            {isBookmarked ? '★' : '☆'}
          </button>
        </div>
        <div className="absolute bottom-2 left-2.5 right-2.5 flex justify-between text-[10px] text-[#FFFDF7] font-semibold">
          <span className="bg-[#31465A]/80 px-2 py-0.5 rounded-md">⏱ {exercise.durationMinutes}p</span>
          <span className="bg-[#C7DFA3] text-[#31465A] px-2 py-0.5 rounded-md">{exercise.difficulty}</span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h4 className="font-bold text-xs sm:text-sm text-[#31465A] line-clamp-2 leading-snug">
            {exercise.title}
          </h4>
          <p className="text-[11px] text-[#31465A]/70 mt-1 line-clamp-1">{exercise.problemNames[0]}</p>
        </div>

        <div className="pt-2 border-t border-[#31465A]/10 flex gap-2">
          <button
            onClick={onView}
            className="flex-1 py-2 rounded-xl border border-[#31465A]/20 hover:border-[#31465A] text-xs font-bold text-[#31465A] transition-colors text-center"
          >
            Chi tiết & Tập
          </button>
        </div>
      </div>
    </div>
  );
}

// MOUNT REACT DOM
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<PhysioFitApp />);
}
