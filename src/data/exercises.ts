import { Exercise } from '../types';

export const EXERCISES_DATA: Exercise[] = [
  {
    id: 'ex-01',
    title: 'Hướng dẫn bài tập tại nhà sau phẫu thuật đứt dây chằng chéo (Giai đoạn 0-2 tuần)',
    bodyRegionId: 'knee',
    bodyRegionName: 'Đầu gối',
    problemIds: ['prob-knee-acl'],
    problemNames: ['Phục hồi sau phẫu thuật Đứt dây chằng chéo trước (ACL)'],
    difficulty: 'Dễ',
    durationMinutes: 8,
    repsSets: '3 hiệp x 10-15 lần (Tập 2-3 lần/ngày)',
    goals: ['Đạt duỗi thẳng gối hoàn toàn (0 độ)', 'Kích hoạt gồng cơ tĩnh tứ đầu đùi', 'Ngăn ngừa biến chứng teo cơ sau mổ'],
    precautions: ['Không gập gối quá góc cho phép của bác sĩ phẫu thuật', 'Ngưng tập nếu xuất hiện sưng nóng đỏ hoặc đau nhói vượt mức 5/10'],
    instructions: [
      { stepNumber: 1, title: 'Gồng cơ tứ đầu đùi (Quad Sets)', instruction: 'Nằm ngửa, kê khăn nhỏ dưới gót chân, ép mặt sau đầu gối sát xuống mặt đệm trong 5 giây rồi thả lỏng.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Bơm cổ chân (Ankle Pumps)', instruction: 'Gập duỗi khớp cổ chân nhịp nhàng liên tục để kích thích tuần hoàn máu tĩnh mạch chi dưới.', durationSeconds: 60 },
      { stepNumber: 3, title: 'Nâng thẳng chân có nẹp (Straight Leg Raise)', instruction: 'Gồng chặt cơ đùi, nâng chân thẳng lên cách mặt giường 20-30cm, giữ 3 giây rồi từ từ hạ xuống.', durationSeconds: 90 },
      { stepNumber: 4, title: 'Trượt gót thụ động (Heel Slides)', instruction: 'Dùng dây hỗ trợ trượt nhẹ gót chân về phía mông đến góc dễ chịu, không gượng ép.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'p2IYswerPDU',
      url: 'https://www.youtube.com/watch?v=p2IYswerPDU',
      thumbnail: 'https://img.youtube.com/vi/p2IYswerPDU/hqdefault.jpg'
    },
    tags: ['Dây chằng chéo', 'Gối sau mổ', 'ACL Giai đoạn 0-2 tuần', 'Gồng đùi'],
    isPopular: true
  },
  {
    id: 'ex-02',
    title: 'Manual Therapy - Giải pháp đau dưới chẩm và đau cổ gáy',
    bodyRegionId: 'neck',
    bodyRegionName: 'Cổ',
    problemIds: ['prob-neck-turtle', 'prob-neck-suboccipital'],
    problemNames: ['Hội chứng cổ rùa & Đau mỏi văn phòng', 'Đau điểm bám dưới chẩm & Kẹt khớp cổ'],
    difficulty: 'Dễ',
    durationMinutes: 6,
    repsSets: '2-3 hiệp x 5-8 lần',
    goals: ['Giải tỏa co cứng nhóm cơ dưới chẩm', 'Giảm đau nhức sau đầu lan lên đỉnh đầu', 'Gia tăng tầm vận động gập ngửa xoay cổ'],
    precautions: ['Thao tác nhẹ nhàng, không bẻ giật khớp cổ đột ngột'],
    instructions: [
      { stepNumber: 1, title: 'Xác định hõm dưới chẩm', instruction: 'Đặt 2 ngón tay cái vào vị trí hõm sau gáy ngay sát chân hộp sọ.', durationSeconds: 45 },
      { stepNumber: 2, title: 'Massage giải phóng điểm căng', instruction: 'Dùng lực ngón tay ấn nhẹ hướng lên trên kết hợp hít thở sâu trong 30 giây.', durationSeconds: 60 },
      { stepNumber: 3, title: 'Kỹ thuật thụt cằm (Chin Tuck)', instruction: 'Kéo nhẹ cằm vào trong như tạo cằm đôi, giữ 5 giây rồi thả lỏng.', durationSeconds: 60 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'Tae8d9qtEzA',
      url: 'https://www.youtube.com/watch?v=Tae8d9qtEzA',
      thumbnail: 'https://img.youtube.com/vi/Tae8d9qtEzA/hqdefault.jpg'
    },
    tags: ['Cổ vai gáy', 'Manual Therapy', 'Dưới chẩm', 'Cổ rùa'],
    isPopular: true
  },
  {
    id: 'ex-03',
    title: 'Bài tập sau phẫu thuật đứt dây chằng chéo (Tăng tiến)',
    bodyRegionId: 'knee',
    bodyRegionName: 'Đầu gối',
    problemIds: ['prob-knee-acl'],
    problemNames: ['Phục hồi sau phẫu thuật Đứt dây chằng chéo trước (ACL)'],
    difficulty: 'Trung bình',
    durationMinutes: 10,
    repsSets: '3 hiệp x 12 lần',
    goals: ['Tăng cường sức mạnh cơ gân kheo và cơ tứ đầu', 'Cải thiện biên độ gập gối', 'Lấy lại thăng bằng khi đứng'],
    precautions: ['Thực hiện bài tập khi gối không còn tràn dịch cấp tính'],
    instructions: [
      { stepNumber: 1, title: 'Tập gập gối nằm sấp', instruction: 'Nằm sấp, gập gối kéo gót về phía mông từ từ.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Cầu mông hai chân (Glute Bridge)', instruction: 'Nằm ngửa, co gối, nâng hông lên cao tạo đường thẳng từ ngực đến gối.', durationSeconds: 90 },
      { stepNumber: 3, title: 'Nhón gót đứng vững', instruction: 'Đứng bám ghế, nhón hai gót chân lên giữ 2 giây rồi hạ xuống.', durationSeconds: 60 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'ljn9td1SF6U',
      url: 'https://www.youtube.com/watch?v=ljn9td1SF6U',
      thumbnail: 'https://img.youtube.com/vi/ljn9td1SF6U/hqdefault.jpg'
    },
    tags: ['ACL', 'Dây chằng gối', 'Tăng tiến', 'Khớp gối']
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
    repsSets: '3 hiệp x 10 lần mỗi động tác',
    goals: ['Kéo tách bao khớp vai đang bị dày dính', 'Tăng góc dạng và xoay ngoài khớp vai', 'Giảm đau khi vận động cánh tay'],
    precautions: ['Tập trong biên độ không vượt ngưỡng đau 4/10'],
    instructions: [
      { stepNumber: 1, title: 'Bài tập con lắc Codman', instruction: 'Cúi người chống một tay vào bàn, để tay đau thõng tự do đung đưa hình tròn theo quán tính.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Bài tập bò tường (Finger Ladder)', instruction: 'Đứng đối diện tường, dùng các ngón tay bò từ từ lên cao nhất có thể.', durationSeconds: 90 },
      { stepNumber: 3, title: 'Xoay ngoài có trợ giúp bằng gậy', instruction: 'Giữ khuỷu tay 90 độ sát sườn, dùng tay khỏe đẩy gậy để xoay tay đau ra ngoài.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'SlG-SFBSYiM',
      url: 'https://www.youtube.com/watch?v=SlG-SFBSYiM',
      thumbnail: 'https://img.youtube.com/vi/SlG-SFBSYiM/hqdefault.jpg'
    },
    tags: ['Đông cứng khớp vai', 'Khớp vai', 'Codman', 'Sau tiêm'],
    isPopular: true
  },
  {
    id: 'ex-05',
    title: 'Hướng dẫn bài tập Schroth tại nhà cho cong vẹo cột sống',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-scoliosis'],
    problemNames: ['Cong vẹo cột sống (Scoliosis & Schroth Method)'],
    difficulty: 'Trung bình',
    durationMinutes: 12,
    repsSets: '3 hiệp x 5 nhịp thở Schroth',
    goals: ['Chỉnh sửa mất cân bằng cột sống không gian 3 chiều', 'Mở rộng thể tích phổi vùng lưng bị lõm', 'Tăng cường sức mạnh cơ cạnh sống'],
    precautions: ['Cần xác định chính xác đường cong chính trước khi tập'],
    instructions: [
      { stepNumber: 1, title: 'Kéo giãn dọc thân (Elongation)', instruction: 'Ngồi thẳng, tưởng tượng đỉnh đầu được kéo dài lên trần nhà để giảm áp lực đốt sống.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Kỹ thuật thở xoay (Rotational Breathing)', instruction: 'Hít sâu dồn khí vào vùng lưng xẹp lép lõm vào, giữ hơi 3 giây rồi thở ra có kháng lực.', durationSeconds: 120 },
      { stepNumber: 3, title: 'Tư thế bán quỳ giữ chỉnh sửa', instruction: 'Chống tay đối diện tạo đối trọng, gồng cơ thân mình duy trì trục thẳng.', durationSeconds: 120 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'ngGxCC3QdKU',
      url: 'https://www.youtube.com/watch?v=ngGxCC3QdKU',
      thumbnail: 'https://img.youtube.com/vi/ngGxCC3QdKU/hqdefault.jpg'
    },
    tags: ['Schroth', 'Vẹo cột sống', 'Cột sống ngực', 'Thở xoay'],
    isPopular: true
  },
  {
    id: 'ex-06',
    title: '2 bài tập cải thiện bàn chân bẹt cho trẻ em hiệu quả tại nhà',
    bodyRegionId: 'ankle_foot',
    bodyRegionName: 'Cổ chân & Bàn chân',
    problemIds: ['prob-foot-flatfoot'],
    problemNames: ['Bàn chân bẹt & Sụp vòm bàn chân (Flat Feet)'],
    difficulty: 'Dễ',
    durationMinutes: 6,
    repsSets: '2 hiệp x 15 lần',
    goals: ['Kích thích hình thành vòm dọc lòng bàn chân', 'Tăng sức mạnh nhóm cơ gập ngón chân và gân chày sau', 'Giúp trẻ có bước đi thăng bằng vững chãi'],
    precautions: ['Cho trẻ tập trên thảm chống trượt an toàn'],
    instructions: [
      { stepNumber: 1, title: 'Gắp khăn / đồ vật bằng ngón chân', instruction: 'Ngồi trên ghế, dùng các ngón chân co quắp gắp chiếc khăn nhỏ trên sàn.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Đi bằng cạnh ngoài và nhón ngón chân', instruction: 'Cho trẻ đi nhón gót 10 bước rồi chuyển sang đi bằng mép ngoài bàn chân.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'PXO6u-d6qus',
      url: 'https://www.youtube.com/watch?v=PXO6u-d6qus',
      thumbnail: 'https://img.youtube.com/vi/PXO6u-d6qus/hqdefault.jpg'
    },
    tags: ['Bàn chân bẹt', 'Trẻ em', 'Vòm chân', 'Cổ chân']
  },
  {
    id: 'ex-07',
    title: 'Bài tập nhóm cơ chóp xoay - Ổn định và phục hồi khớp vai',
    bodyRegionId: 'shoulder',
    bodyRegionName: 'Vai',
    problemIds: ['prob-shoulder-rotator-cuff'],
    problemNames: ['Tổn thương & Yếu nhóm cơ chóp xoay vai'],
    difficulty: 'Trung bình',
    durationMinutes: 9,
    repsSets: '3 hiệp x 12 lần mỗi bên',
    goals: ['Tăng cường sức mạnh cơ trên gai, dưới gai và dưới vai', 'Ổn định chỏm xương cánh tay trong ổ chảo', 'Hạn chế va chạm mỏm cùng vai khi nâng tay'],
    precautions: ['Bắt đầu với tạ rất nhẹ (0.5kg - 1kg) hoặc dây thun đàn hồi nhẹ'],
    instructions: [
      { stepNumber: 1, title: 'Xoay ngoài vai với dây kháng lực', instruction: 'Khuỷu tay gập vuông góc ép sát hông, kéo dây chun xoay cẳng tay ra ngoài.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Xoay trong vai với dây kháng lực', instruction: 'Từ vị trí mở, kéo dây kháng lực xoay cẳng tay vào sát bụng.', durationSeconds: 90 },
      { stepNumber: 3, title: 'Nâng tay góc Scaption (30 độ trước)', instruction: 'Nâng cánh tay theo góc chéo 30-45 độ về phía trước, ngón cái hướng lên trên.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'QA0rAKA46A8',
      url: 'https://www.youtube.com/watch?v=QA0rAKA46A8',
      thumbnail: 'https://img.youtube.com/vi/QA0rAKA46A8/hqdefault.jpg'
    },
    tags: ['Chóp xoay', 'Cơ trên gai', 'Khớp vai', 'Kháng lực']
  },
  {
    id: 'ex-08',
    title: 'Phương pháp tập toàn diện cho tư thế và cột sống',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-posture-desk', 'prob-spine-scoliosis'],
    problemNames: ['Gù lưng & Đau lưng mỏi cột sống văn phòng', 'Cong vẹo cột sống (Scoliosis & Schroth Method)'],
    difficulty: 'Trung bình',
    durationMinutes: 10,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Mở rộng khoang ngực và duỗi cột sống ngực', 'Kích hoạt chuỗi cơ lưng sau', 'Giúp lấy lại dáng đứng thẳng tự nhiên'],
    precautions: ['Không ưỡn ép vùng thắt lưng dưới quá mức'],
    instructions: [
      { stepNumber: 1, title: 'Tư thế Mèo - Bò (Cat-Cow)', instruction: 'Quỳ 4 điểm, hít vào võng lưng ngẩng mặt, thở ra cong tròn lưng cúi đầu.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Mở ngực hình chữ T', instruction: 'Nằm sấp, dang 2 tay hình chữ T, nâng ngực và 2 cánh tay nhẹ nhàng.', durationSeconds: 90 },
      { stepNumber: 3, title: 'Tư thế chim bồ câu thư giãn hông', instruction: 'Kéo một chân gập trước gối, duỗi chân sau để mở khớp háng.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: '21Ch5Rhl6JY',
      url: 'https://www.youtube.com/watch?v=21Ch5Rhl6JY',
      thumbnail: 'https://img.youtube.com/vi/21Ch5Rhl6JY/hqdefault.jpg'
    },
    tags: ['Tư thế', 'Cột sống', 'Cat-Cow', 'Lưng giữa']
  },
  {
    id: 'ex-09',
    title: '3 bài tập hiệu quả giải phóng đau cột sống thắt lưng',
    bodyRegionId: 'lower_back',
    bodyRegionName: 'Lưng dưới & Thắt lưng',
    problemIds: ['prob-lowback-mckenzie'],
    problemNames: ['Đau thắt lưng & Thoát vị đĩa đệm (Phương pháp McKenzie)'],
    difficulty: 'Dễ',
    durationMinutes: 8,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Giảm áp lực chèn ép đĩa đệm thắt lưng', 'Kích hoạt cơ sàn chậu và cơ ngang bụng', 'Giảm đau lan toả xuống hông đùi'],
    precautions: ['Nếu đau tăng lan xuống ngón chân khi ngửa, hãy dừng ngay và tham khảo chuyên gia'],
    instructions: [
      { stepNumber: 1, title: 'Duỗi thắt lưng nằm sấp (Prone Press-up)', instruction: 'Nằm sấp chống 2 bàn tay ngang vai, từ từ đẩy thẳng cánh tay nâng thân trên lên, giữ hông áp sát sàn.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Tư thế cây cầu (Bridge)', instruction: 'Nằm ngửa gập gối, siết cơ mông nâng chậu lên cao tạo trục thẳng.', durationSeconds: 90 },
      { stepNumber: 3, title: 'Kéo gối đơn về ngực (Single Knee-to-Chest)', instruction: 'Nằm ngửa, ôm một đầu gối kéo nhẹ về phía ngực, giữ 20 giây rồi đổi bên.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: '7WH39OZwJw4',
      url: 'https://www.youtube.com/watch?v=7WH39OZwJw4',
      thumbnail: 'https://img.youtube.com/vi/7WH39OZwJw4/hqdefault.jpg'
    },
    tags: ['Thắt lưng', 'McKenzie', 'Cột sống lưng', 'Giảm đau lưng'],
    isPopular: true
  },
  {
    id: 'ex-10',
    title: 'Bài tập cải thiện bàn chân bẹt cho trẻ tại nhà',
    bodyRegionId: 'ankle_foot',
    bodyRegionName: 'Cổ chân & Bàn chân',
    problemIds: ['prob-foot-flatfoot'],
    problemNames: ['Bàn chân bẹt & Sụp vòm bàn chân (Flat Feet)'],
    difficulty: 'Dễ',
    durationMinutes: 7,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Kích hoạt vòm gan bàn chân', 'Tăng cường sức mạnh cơ chày sau và gân gót', 'Cải thiện bước đi tự tin cho trẻ'],
    precautions: ['Khuyến khích trẻ đi chân đất trên các bề mặt cỏ hoặc cát an toàn'],
    instructions: [
      { stepNumber: 1, title: 'Tập nhặt viên bi/bút chì bằng ngón chân', instruction: 'Đặt 5 viên bi nhỏ trước mặt, cho trẻ dùng ngón chân gắp từng viên thả vào hộp.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Lăn bóng tennis lòng bàn chân', instruction: 'Đặt quả bóng tennis dưới lòng bàn chân, lăn nhẹ từ gót đến các ngón chân trong 1 phút.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'c5N5rEyTg_c',
      url: 'https://www.youtube.com/watch?v=c5N5rEyTg_c',
      thumbnail: 'https://img.youtube.com/vi/c5N5rEyTg_c/hqdefault.jpg'
    },
    tags: ['Bàn chân bẹt', 'Trẻ em', 'Vòm bàn chân', 'Lăn bóng']
  },
  {
    id: 'ex-11',
    title: 'Bài tập chỉnh sửa cong vẹo cột sống chuyên sâu',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-scoliosis'],
    problemNames: ['Cong vẹo cột sống (Scoliosis & Schroth Method)'],
    difficulty: 'Trung bình',
    durationMinutes: 11,
    repsSets: '3 hiệp x 8 lần',
    goals: ['Kéo dài trục cột sống ngực - thắt lưng', 'Kích hoạt cơ dựng gai sống bên yếu', 'Cân đối vị trí xương bả vai'],
    precautions: ['Thực hiện trước gương để kiểm tra độ thẳng trục cơ thể'],
    instructions: [
      { stepNumber: 1, title: 'Tư thế Bird-Dog chỉnh trục', instruction: 'Quỳ 4 điểm, nâng tay phải và chân trái song song mặt sàn, siết bụng giữ 5 giây rồi đổi bên.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Nghiêng lườn với bóng tập', instruction: 'Tựa bên lườn lồi vào bóng tập, duỗi tay bên lõm qua đầu để kéo căng khoang liên sườn.', durationSeconds: 90 },
      { stepNumber: 3, title: 'Plank nghiêng có điều chỉnh', instruction: 'Nằm nghiêng nâng hông giữ 15-20 giây kích hoạt cơ vuông thắt lưng.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'k0N3yvrkbZY',
      url: 'https://www.youtube.com/watch?v=k0N3yvrkbZY',
      thumbnail: 'https://img.youtube.com/vi/k0N3yvrkbZY/hqdefault.jpg'
    },
    tags: ['Vẹo cột sống', 'Bird-Dog', 'Lưng giữa', 'Cân bằng']
  },
  {
    id: 'ex-12',
    title: 'Bài tập cải thiện tình trạng võng lưng (Hyperlordosis) tại nhà',
    bodyRegionId: 'lower_back',
    bodyRegionName: 'Lưng dưới & Thắt lưng',
    problemIds: ['prob-lowback-hyperlordosis'],
    problemNames: ['Võng thắt lưng (Tật nghiêng chậu trước)'],
    difficulty: 'Dễ',
    durationMinutes: 8,
    repsSets: '3 hiệp x 12 lần',
    goals: ['Kéo giãn cơ gập hông (Iliopsoas) và cơ lưng dưới', 'Tăng cường sức mạnh cơ bụng thẳng và cơ mông lớn', 'Đưa khung chậu về vị trí trung tính'],
    precautions: ['Tránh các bài tập ưỡn lưng quá mức'],
    instructions: [
      { stepNumber: 1, title: 'Ép lưng chạm sàn (Pelvic Tilt)', instruction: 'Nằm ngửa co gối, siết cơ bụng ép chặt toàn bộ phần thắt lưng sát sàn, giữ 5 giây.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Kéo giãn cơ thắt lưng chậu quỳ gối', instruction: 'Quỳ một chân bước tới trước, đẩy nhẹ hông về phía trước cảm nhận cơ đùi trước kéo căng.', durationSeconds: 90 },
      { stepNumber: 3, title: 'Deadbug siết cơ lõi', instruction: 'Nằm ngửa giơ 2 tay 2 chân, từ từ hạ tay trái chân phải mà lưng vẫn ép chặt sàn.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'crBIALNenoU',
      url: 'https://www.youtube.com/watch?v=crBIALNenoU',
      thumbnail: 'https://img.youtube.com/vi/crBIALNenoU/hqdefault.jpg'
    },
    tags: ['Võng lưng', 'Nghiêng chậu trước', 'Pelvic Tilt', 'Deadbug'],
    isPopular: true
  },
  {
    id: 'ex-13',
    title: '5 bài tập giúp khớp vai linh hoạt, vận động êm ái mỗi ngày',
    bodyRegionId: 'shoulder',
    bodyRegionName: 'Vai',
    problemIds: ['prob-shoulder-frozen', 'prob-shoulder-rotator-cuff'],
    problemNames: ['Đông cứng khớp vai (Frozen Shoulder)', 'Tổn thương & Yếu nhóm cơ chóp xoay vai'],
    difficulty: 'Dễ',
    durationMinutes: 9,
    repsSets: '2 hiệp x 10 lần mỗi bài',
    goals: ['Bôi trơn ổ khớp vai', 'Tăng góc đưa tay lên cao và xoay vai', 'Giải tỏa căng cơ cầu vai'],
    precautions: ['Thở đều nhịp nhàng trong suốt các động tác xoay'],
    instructions: [
      { stepNumber: 1, title: 'Xoay tròn khớp vai', instruction: 'Thả lỏng 2 tay, xoay khớp vai tròn từ trước ra sau rồi đổi chiều.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Kéo chéo cánh tay qua ngực', instruction: 'Dùng tay này ôm khuỷu tay kia kéo sát qua ngực để kéo giãn bao khớp sau.', durationSeconds: 60 },
      { stepNumber: 3, title: 'Đưa tay hình chữ W', instruction: 'Mở rộng 2 tay sang 2 bên tạo chữ W, siết chặt hai xương bả vai lại với nhau.', durationSeconds: 60 }
    ],
    video: {
      provider: 'youtube',
      videoId: '19YqhQcjDzM',
      url: 'https://www.youtube.com/watch?v=19YqhQcjDzM',
      thumbnail: 'https://img.youtube.com/vi/19YqhQcjDzM/hqdefault.jpg'
    },
    tags: ['Khớp vai', 'Linh hoạt', 'Chữ W', 'Vai êm ái']
  },
  {
    id: 'ex-14',
    title: '13 bài tập cải thiện tình trạng bàn chân bẹt toàn diện',
    bodyRegionId: 'ankle_foot',
    bodyRegionName: 'Cổ chân & Bàn chân',
    problemIds: ['prob-foot-flatfoot'],
    problemNames: ['Bàn chân bẹt & Sụp vòm bàn chân (Flat Feet)'],
    difficulty: 'Trung bình',
    durationMinutes: 14,
    repsSets: 'Bộ bài tập hoàn chỉnh 15 phút',
    goals: ['Tạo dựng lại vòm gan chân tự nhiên', 'Tăng sức bền cổ chân khi chạy nhảy', 'Hạn chế tình trạng vẹo gót chân'],
    precautions: ['Tập đều đặn hàng ngày để đạt hiệu quả cấu trúc cơ'],
    instructions: [
      { stepNumber: 1, title: 'Bài tập Short Foot (Bàn chân ngắn)', instruction: 'Đặt chân phẳng, kéo khớp ngón chân về phía gót chân mà không co quắp ngón để nâng vòm.', durationSeconds: 120 },
      { stepNumber: 2, title: 'Nhón gót kẹp bóng', instruction: 'Kẹp quả bóng nhỏ giữa 2 gót chân, nhón cao gót chân lên giữ 3 giây.', durationSeconds: 120 },
      { stepNumber: 3, title: 'Dạng các ngón chân (Toe Splay)', instruction: 'Xòe rộng các ngón chân hết mức có thể rồi ấn ngón chân cái xuống sàn.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'dehLFRdu3s8',
      url: 'https://www.youtube.com/watch?v=dehLFRdu3s8',
      thumbnail: 'https://img.youtube.com/vi/dehLFRdu3s8/hqdefault.jpg'
    },
    tags: ['Bàn chân bẹt', '13 bài tập', 'Short Foot', 'Cổ chân'],
    isPopular: true
  },
  {
    id: 'ex-15',
    title: 'Bài tập hỗ trợ cong vẹo cột sống và tăng sức bền cơ lưng',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-scoliosis'],
    problemNames: ['Cong vẹo cột sống (Scoliosis & Schroth Method)'],
    difficulty: 'Trung bình',
    durationMinutes: 10,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Tăng cường nhóm cơ dựng sống', 'Giải phóng ức chế cột sống ngực', 'Cải thiện dung tích lồng ngực'],
    precautions: ['Giữ nhịp thở đều, không nín thở khi siết cơ'],
    instructions: [
      { stepNumber: 1, title: 'Duỗi ngực trên bục nâng', instruction: 'Tựa lưng trên bục hoặc gối dài, mở rộng 2 cánh tay đón nhận hơi thở sâu.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Kéo dây kháng lực mở ngực', instruction: 'Cầm dây thun trước ngực, kéo giãn sang 2 bên áp sát bả vai.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'Oh2E8Dh0UWo',
      url: 'https://www.youtube.com/watch?v=Oh2E8Dh0UWo',
      thumbnail: 'https://img.youtube.com/vi/Oh2E8Dh0UWo/hqdefault.jpg'
    },
    tags: ['Vẹo cột sống', 'Sức bền cơ lưng', 'Dây kháng lực']
  },
  {
    id: 'ex-16',
    title: 'Bài tập chỉnh sửa cong vẹo cột sống với bóng tập thể dục',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-scoliosis'],
    problemNames: ['Cong vẹo cột sống (Scoliosis & Schroth Method)'],
    difficulty: 'Trung bình',
    durationMinutes: 10,
    repsSets: '3 hiệp x 8-10 lần',
    goals: ['Dùng bóng tập làm điểm tựa uốn nắn cột sống', 'Kéo dài cơ lưng bên lõm', 'Cải thiện phản xạ thăng bằng'],
    precautions: ['Chọn kích thước bóng phù hợp với chiều cao cơ thể'],
    instructions: [
      { stepNumber: 1, title: 'Nằm sấp ôm bóng tập', instruction: 'Thả lỏng toàn bộ thân mình ôm sát theo độ cong của quả bóng để giải áp đốt sống.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Nâng tay chữ Y trên bóng', instruction: 'Nằm sấp trên bóng, nâng 2 cánh tay hình chữ Y ngón cái hướng lên trên.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: '8JTy15_bDJU',
      url: 'https://www.youtube.com/watch?v=8JTy15_bDJU',
      thumbnail: 'https://img.youtube.com/vi/8JTy15_bDJU/hqdefault.jpg'
    },
    tags: ['Vẹo cột sống', 'Bóng tập Gymball', 'Chữ Y']
  },
  {
    id: 'ex-17',
    title: '5 bài tập điều trị hội chứng ống cổ tay (Carpal Tunnel) giảm tê bì',
    bodyRegionId: 'wrist_hand',
    bodyRegionName: 'Cổ tay & Bàn tay',
    problemIds: ['prob-wrist-carpal-tunnel'],
    problemNames: ['Hội chứng ống cổ tay (Carpal Tunnel Syndrome)'],
    difficulty: 'Dễ',
    durationMinutes: 7,
    repsSets: '3 hiệp x 10 lần mỗi ngày',
    goals: ['Kỹ thuật trượt dây thần kinh giữa (Median nerve gliding)', 'Giải tỏa áp lực đè nén trong ống cổ tay', 'Giảm nhanh cảm giác tê châm chích ngón tay'],
    precautions: ['Không kéo căng quá mạnh gây cảm giác buốt điện giật'],
    instructions: [
      { stepNumber: 1, title: 'Tư thế nắm và mở ngón tay', instruction: 'Nắm bàn tay lại, mở thẳng các ngón tay, ngửa cổ tay ra sau nhẹ nhàng.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Trượt ngón cái mở rộng', instruction: 'Xòe ngón tay cái ra xa lòng bàn tay và xoay nhẹ cẳng tay.', durationSeconds: 60 },
      { stepNumber: 3, title: 'Tư thế cầu nguyện kéo giãn cổ tay', instruction: 'Áp 2 lòng bàn tay vào nhau trước ngực, hạ thấp cổ tay xuống để căng mặt trong cẳng tay.', durationSeconds: 60 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'vQq3kW-0VTs',
      url: 'https://www.youtube.com/watch?v=vQq3kW-0VTs',
      thumbnail: 'https://img.youtube.com/vi/vQq3kW-0VTs/hqdefault.jpg'
    },
    tags: ['Ống cổ tay', 'Tê ngón tay', 'Trượt thần kinh', 'Bàn tay'],
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
    goals: ['Chỉnh lại trục đầu thẳng hàng với vai', 'Kéo giãn cơ ngực lớn và cơ nâng vai', 'Tăng sức mạnh nhóm cơ gập cổ sâu'],
    precautions: ['Có thể thực hiện ngay tại bàn làm việc'],
    instructions: [
      { stepNumber: 1, title: 'Thu cằm vào trong (Chin Tucks)', instruction: 'Mắt nhìn thẳng phía trước, kéo cằm lùi về phía sau giữ 5 giây.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Kéo nghiêng đầu sang vai', instruction: 'Dùng tay đặt nhẹ lên đỉnh đầu, nghiêng tai về phía vai cảm nhận độ căng dọc cơ cổ bên.', durationSeconds: 60 },
      { stepNumber: 3, title: 'Mở vai góc 90 độ tựa ghế', instruction: 'Đưa 2 tay ra sau gáy, ngửa nhẹ lồng ngực tựa vào lưng ghế hít thở sâu.', durationSeconds: 60 }
    ],
    video: {
      provider: 'youtube',
      videoId: '7RiX9_USJJA',
      url: 'https://www.youtube.com/watch?v=7RiX9_USJJA',
      thumbnail: 'https://img.youtube.com/vi/7RiX9_USJJA/hqdefault.jpg'
    },
    tags: ['Cổ rùa', 'Dân văn phòng', 'Chin tuck', 'Mỏi gáy'],
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
    goals: ['Tái lập đường cong ưỡn sinh lý của cột sống cổ', 'Giảm tải cho các đĩa đệm đốt sống cổ C5-C6', 'Thư giãn toàn bộ vùng cơ thang trên'],
    precautions: ['Không ngửa đầu quá đột ngột về phía sau'],
    instructions: [
      { stepNumber: 1, title: 'Dùng khăn hỗ trợ ngửa cổ', instruction: 'Quàng khăn tắm quanh gáy, 2 tay kéo nhẹ vát lên trên khi ngửa đầu ra sau.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Xoay cổ nhìn qua vai', instruction: 'Từ từ quay đầu nhìn sang bên trái hết mức, giữ 3 giây rồi đổi sang bên phải.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'oM3oQY4W2JY',
      url: 'https://www.youtube.com/watch?v=oM3oQY4W2JY',
      thumbnail: 'https://img.youtube.com/vi/oM3oQY4W2JY/hqdefault.jpg'
    },
    tags: ['Cổ rùa', 'Đường cong sinh lý', 'Khăn hỗ trợ', 'Đốt sống cổ']
  },
  {
    id: 'ex-20',
    title: 'Bài tập cải thiện cong vẹo cột sống tại nhà không cần dụng cụ',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-scoliosis'],
    problemNames: ['Cong vẹo cột sống (Scoliosis & Schroth Method)'],
    difficulty: 'Trung bình',
    durationMinutes: 9,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Tăng tính đối xứng cơ 2 bên thân mình', 'Kéo dài các nhóm cơ bị co ngắn ở phần lõm', 'Cải thiện dáng đi đứng'],
    precautions: ['Thực hiện động tác chậm rãi, kiểm soát chuyển động'],
    instructions: [
      { stepNumber: 1, title: 'Tư thế em bé kéo dài lưng', instruction: 'Quỳ gối mông chạm gót chân, vươn dài 2 tay về phía trước trán chạm thảm.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Bò tay chéo sang một bên', instruction: 'Từ tư thế em bé, từ từ bò 2 tay sang phía bên cong lồi để kéo giãn bên đối diện.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'N6NBArw8x-g',
      url: 'https://www.youtube.com/watch?v=N6NBArw8x-g',
      thumbnail: 'https://img.youtube.com/vi/N6NBArw8x-g/hqdefault.jpg'
    },
    tags: ['Vẹo cột sống', 'Không dụng cụ', 'Em bé kéo lưng']
  },
  {
    id: 'ex-21',
    title: 'Bài tập lưng cho dân văn phòng - Giải phóng căng cứng khi ngồi lâu',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-posture-desk'],
    problemNames: ['Gù lưng & Đau lưng mỏi cột sống văn phòng'],
    difficulty: 'Dễ',
    durationMinutes: 6,
    repsSets: 'Thực hiện mỗi 2 tiếng ngồi làm việc',
    goals: ['Ngăn ngừa thoái hóa đốt sống ngực', 'Kích hoạt lưu thông máu vùng cơ lưng', 'Giảm cảm giác đờ đẫn mỏi mệt khi làm việc'],
    precautions: ['Thực hiện ngay trên ghế văn phòng'],
    instructions: [
      { stepNumber: 1, title: 'Vặn mình trên ghế', instruction: 'Ngồi thẳng, đặt tay phải qua đùi trái xoay nhẹ thân trên ra sau, giữ 10 giây rồi đổi bên.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Đan tay duỗi căng qua đầu', instruction: 'Đan các ngón tay vào nhau, lộn lòng bàn tay hướng lên trần nhà và vươn người cao hết cỡ.', durationSeconds: 60 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'gUO4L2wFF7Q',
      url: 'https://www.youtube.com/watch?v=gUO4L2wFF7Q',
      thumbnail: 'https://img.youtube.com/vi/gUO4L2wFF7Q/hqdefault.jpg'
    },
    tags: ['Văn phòng', 'Lưng giữa', 'Vặn mình', 'Ngồi lâu'],
    isPopular: true
  },
  {
    id: 'ex-22',
    title: 'Bài tập vẹo cột sống thắt lưng và lệch khung chậu',
    bodyRegionId: 'lower_back',
    bodyRegionName: 'Lưng dưới & Thắt lưng',
    problemIds: ['prob-lowback-hyperlordosis', 'prob-spine-scoliosis'],
    problemNames: ['Võng thắt lưng (Tật nghiêng chậu trước)', 'Cong vẹo cột sống (Scoliosis & Schroth Method)'],
    difficulty: 'Trung bình',
    durationMinutes: 10,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Cân bằng lại chiều cao 2 bên mào chậu', 'Giảm co thắt cơ vuông thắt lưng một bên', 'Ổn định khớp cùng chậu'],
    precautions: ['Không tập khi đang có đau cấp tính khớp cùng chậu'],
    instructions: [
      { stepNumber: 1, title: 'Nâng hông một bên nằm nghiêng', instruction: 'Nằm nghiêng, co gối nâng nhẹ một bên mào chậu lên phía nách.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Kéo giãn cơ vuông thắt lưng', instruction: 'Ngồi khoanh chân, vươn một tay nghiêng người qua đầu chạm sàn bên kia.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'fupk5grEqHQ',
      url: 'https://www.youtube.com/watch?v=fupk5grEqHQ',
      thumbnail: 'https://img.youtube.com/vi/fupk5grEqHQ/hqdefault.jpg'
    },
    tags: ['Thắt lưng', 'Lệch chậu', 'Cơ vuông thắt lưng']
  },
  {
    id: 'ex-23',
    title: 'Bài tập cong vẹo cột sống tại nhà - Tư thế nâng cao',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-scoliosis'],
    problemNames: ['Cong vẹo cột sống (Scoliosis & Schroth Method)'],
    difficulty: 'Nâng cao',
    durationMinutes: 12,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Tăng sức mạnh toàn diện chuỗi cơ giữ thân', 'Chống lại đà tăng độ Cobbs vẹo cột sống', 'Tăng cường sức bền khi vận động thể thao'],
    precautions: ['Chỉ thực hiện khi đã thuần thục các bài tập cơ bản'],
    instructions: [
      { stepNumber: 1, title: 'Plank điều chỉnh bất đối xứng', instruction: 'Giữ tư thế plank với một tay nâng nhẹ hoặc một chân nâng nhẹ tùy phác đồ.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Duỗi lưng siêu nhân (Superman)', instruction: 'Nằm sấp nâng đồng thời tay và chân đối diện lên cách sàn 10cm, giữ 3 giây.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'BEl1fP0wYq8',
      url: 'https://www.youtube.com/watch?v=BEl1fP0wYq8',
      thumbnail: 'https://img.youtube.com/vi/BEl1fP0wYq8/hqdefault.jpg'
    },
    tags: ['Vẹo cột sống', 'Superman', 'Nâng cao']
  },
  {
    id: 'ex-24',
    title: 'Bài tập cong vẹo cột sống tại nhà - Phục hồi cấu trúc liên sườn',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-scoliosis'],
    problemNames: ['Cong vẹo cột sống (Scoliosis & Schroth Method)'],
    difficulty: 'Trung bình',
    durationMinutes: 9,
    repsSets: '3 hiệp x 8 lần',
    goals: ['Giải tỏa co kéo cơ liên sườn bên lõm', 'Tăng sự linh hoạt của khớp sườn đốt sống', 'Giúp cân đối lại độ nhô của bướu sườn'],
    precautions: ['Hít thở sâu trong từng nhịp kéo căng'],
    instructions: [
      { stepNumber: 1, title: 'Kéo căng lồng ngực với dây đai', instruction: 'Quấn dây đai nhẹ quanh ngực, hít thở đẩy bung lồng ngực vào dây đai.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Tư thế vặn người ngồi xoắn', instruction: 'Ngồi gập chân, xoay người về phía ngược chiều đường cong vẹo.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'lDW7xpsjXYA',
      url: 'https://www.youtube.com/watch?v=lDW7xpsjXYA',
      thumbnail: 'https://img.youtube.com/vi/lDW7xpsjXYA/hqdefault.jpg'
    },
    tags: ['Vẹo cột sống', 'Liên sườn', 'Hít thở']
  },
  {
    id: 'ex-25',
    title: 'Bài tập xương khớp 10 phút mỗi ngày giúp cột sống linh hoạt',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-posture-desk'],
    problemNames: ['Gù lưng & Đau lưng mỏi cột sống văn phòng'],
    difficulty: 'Dễ',
    durationMinutes: 10,
    repsSets: '1 chuỗi hoàn chỉnh 10 phút vào buổi sáng',
    goals: ['Khởi động và bôi trơn toàn bộ các đốt sống', 'Giảm cảm giác cứng đờ khớp sau khi ngủ dậy', 'Tạo nguồn năng lượng tích cực cho ngày mới'],
    precautions: ['Thực hiện với biên độ êm ái, tăng dần theo từng phút'],
    instructions: [
      { stepNumber: 1, title: 'Uốn lượn cột sống nằm ngửa', instruction: 'Nằm ngửa gập 2 gối, từ từ nghiêng gối sang trái rồi sang phải nhịp nhàng.', durationSeconds: 120 },
      { stepNumber: 2, title: 'Tư thế rắn hổ mang nhẹ nhàng', instruction: 'Nằm sấp chống tay nâng nhẹ ngực, duỗi mở lồng ngực không gập ép thắt lưng.', durationSeconds: 120 }
    ],
    video: {
      provider: 'youtube',
      videoId: '20r6bGR--YU',
      url: 'https://www.youtube.com/watch?v=20r6bGR--YU',
      thumbnail: 'https://img.youtube.com/vi/20r6bGR--YU/hqdefault.jpg'
    },
    tags: ['10 phút', 'Linh hoạt', 'Cột sống', 'Mỗi ngày'],
    isPopular: true
  },
  {
    id: 'ex-26',
    title: 'Bài tập xương khớp 10 phút mỗi ngày giúp cơ thể dẻo dai',
    bodyRegionId: 'mid_back',
    bodyRegionName: 'Lưng giữa & Cột sống',
    problemIds: ['prob-spine-posture-desk'],
    problemNames: ['Gù lưng & Đau lưng mỏi cột sống văn phòng'],
    difficulty: 'Dễ',
    durationMinutes: 10,
    repsSets: '1 chuỗi hoàn chỉnh 10 phút',
    goals: ['Tăng độ đàn hồi của toàn bộ hệ gân cơ cơ thể', 'Tăng tuần hoàn máu đến các đĩa đệm', 'Cải thiện tầm với và độ dẻo'],
    precautions: ['Thực hiện trên thảm êm ái'],
    instructions: [
      { stepNumber: 1, title: 'Kéo giãn toàn thân nằm ngửa', instruction: 'Nằm ngửa duỗi thẳng 2 tay qua đầu, đạp căng 2 gót chân như vươn vai buổi sáng.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Xoay tròn khớp hông và lưng', instruction: 'Đứng thẳng chống 2 tay ngang hông, xoay tròn hông nhẹ nhàng theo vòng tròn.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'gaU3CLtYITE',
      url: 'https://www.youtube.com/watch?v=gaU3CLtYITE',
      thumbnail: 'https://img.youtube.com/vi/gaU3CLtYITE/hqdefault.jpg'
    },
    tags: ['Dẻo dai', 'Xương khớp', 'Toàn thân', '10 phút']
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
    goals: ['Giảm viêm ma sát gân dạng dài và duỗi ngắn ngón cái', 'Kéo giãn nhẹ nhàng ngăn xơ dính bao gân', 'Phục hồi khả năng cầm nắm đồ vật không đau'],
    precautions: ['Tránh các động tác véo ngón cái mạnh hoặc vắt quần áo trong giai đoạn đau cấp'],
    instructions: [
      { stepNumber: 1, title: 'Kéo giãn ngón tay cái nhẹ nhàng', instruction: 'Đưa tay ra trước, gập nhẹ ngón cái vào lòng bàn tay rồi dùng tay kia kéo nhẹ về phía cổ tay.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Nâng ngón tay cái có kháng lực nhẹ', instruction: 'Đặt bàn tay úp xuống bàn, nhấc riêng ngón cái lên cao rồi hạ xuống chậm.', durationSeconds: 60 },
      { stepNumber: 3, title: 'Đeo chun búng ngón tay', instruction: 'Lồng dây chun mảnh quanh 5 đầu ngón tay, mở rộng các ngón ra ngoài chống lại lực chun.', durationSeconds: 60 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'jy9zBwQWmr4',
      url: 'https://www.youtube.com/watch?v=jy9zBwQWmr4',
      thumbnail: 'https://img.youtube.com/vi/jy9zBwQWmr4/hqdefault.jpg'
    },
    tags: ['De Quervain', 'Gân ngón cái', 'Cổ tay', 'Bàn tay'],
    isPopular: true
  },
  {
    id: 'ex-28',
    title: 'Bài tập 10 phút hết đau lưng, cột sống linh hoạt tức thì',
    bodyRegionId: 'lower_back',
    bodyRegionName: 'Lưng dưới & Thắt lưng',
    problemIds: ['prob-lowback-mckenzie'],
    problemNames: ['Đau thắt lưng & Thoát vị đĩa đệm (Phương pháp McKenzie)'],
    difficulty: 'Dễ',
    durationMinutes: 10,
    repsSets: '1 chuỗi 10 phút thư giãn lưng',
    goals: ['Giải tỏa co thắt cơ dựng gai thắt lưng', 'Kéo giãn cơ mông và cơ hình lê giảm chèn ép thần kinh tọa', 'Tăng độ linh hoạt các đốt sống L1-S1'],
    precautions: ['Dừng tập nếu có cảm giác tê lan nhanh xuống gót chân'],
    instructions: [
      { stepNumber: 1, title: 'Ôm hai gối ép ngực (Double Knee-to-Chest)', instruction: 'Nằm ngửa ôm cả 2 đầu gối kéo nhẹ về phía ngực, lăn nhẹ lưng sang 2 bên để massage cột sống.', durationSeconds: 120 },
      { stepNumber: 2, title: 'Kéo giãn cơ hình lê (Figure 4 Stretch)', instruction: 'Đặt mắt cá chân phải lên đầu gối chân trái, luồn tay kéo đùi trái về phía ngực.', durationSeconds: 120 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'TlCfrvEqBP8',
      url: 'https://www.youtube.com/watch?v=TlCfrvEqBP8',
      thumbnail: 'https://img.youtube.com/vi/TlCfrvEqBP8/hqdefault.jpg'
    },
    tags: ['Hết đau lưng', '10 phút', 'Thắt lưng', 'Cơ hình lê'],
    isPopular: true
  },
  {
    id: 'ex-29',
    title: '9 bài tập cho trẻ có hội chứng bàn chân bẹt phát triển toàn diện',
    bodyRegionId: 'ankle_foot',
    bodyRegionName: 'Cổ chân & Bàn chân',
    problemIds: ['prob-foot-flatfoot'],
    problemNames: ['Bàn chân bẹt & Sụp vòm bàn chân (Flat Feet)'],
    difficulty: 'Dễ',
    durationMinutes: 11,
    repsSets: 'Chuỗi trò chơi tập luyện 10-15 phút',
    goals: ['Kích thích dây thần kinh cảm thụ bản thể dưới lòng bàn chân', 'Hình thành độ võng vòm gan chân tự nhiên', 'Tăng sức mạnh cho mắt cá chân'],
    precautions: ['Tạo không khí tập luyện vui vẻ như một trò chơi cho trẻ'],
    instructions: [
      { stepNumber: 1, title: 'Đi trên đầu ngón chân', instruction: 'Cho trẻ bước đi kiểu vũ công ba-lê trong 1 phút.', durationSeconds: 90 },
      { stepNumber: 2, title: 'Đi trên gót chân', instruction: 'Nhấc cao các ngón chân lên khỏi mặt đất và đi bằng gót chân.', durationSeconds: 90 },
      { stepNumber: 3, title: 'Kẹp gối hoặc bóng nhảy lò cò', instruction: 'Kẹp quả bóng nhỏ giữa 2 cổ chân và bật nhảy nhẹ tại chỗ.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'LrlE777Kh30',
      url: 'https://www.youtube.com/watch?v=LrlE777Kh30',
      thumbnail: 'https://img.youtube.com/vi/LrlE777Kh30/hqdefault.jpg'
    },
    tags: ['Bàn chân bẹt trẻ em', '9 bài tập', 'Vòm chân', 'Cổ chân']
  },
  {
    id: 'ex-30',
    title: '5 bài tập điều trị Hội chứng Ống cổ tay nâng cao',
    bodyRegionId: 'wrist_hand',
    bodyRegionName: 'Cổ tay & Bàn tay',
    problemIds: ['prob-wrist-carpal-tunnel'],
    problemNames: ['Hội chứng ống cổ tay (Carpal Tunnel Syndrome)'],
    difficulty: 'Trung bình',
    durationMinutes: 8,
    repsSets: '3 hiệp x 10 lần',
    goals: ['Kéo giãn các nhánh thần kinh chi trên', 'Tăng cường sức mạnh các cơ giun bàn tay', 'Phục hồi tầm vận động cổ tay'],
    precautions: ['Thả lỏng vai và cổ khi thực hiện các bài tập cổ tay'],
    instructions: [
      { stepNumber: 1, title: 'Tư thế trượt dây thần kinh chữ O', instruction: 'Chạm đầu ngón tay cái lần lượt vào đầu các ngón trỏ, giữa, áp út và út tạo thành chữ O.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Kéo gập cổ tay thụ động', instruction: 'Duỗi thẳng cánh tay, dùng tay kia gập cổ tay cụp xuống giữ 15 giây.', durationSeconds: 60 },
      { stepNumber: 3, title: 'Bóp bóng xốp phục hồi', instruction: 'Bóp nhẹ quả bóng xốp mềm trong lòng bàn tay 10 lần nhịp nhàng.', durationSeconds: 60 }
    ],
    video: {
      provider: 'youtube',
      videoId: '442-zCQP8b8',
      url: 'https://www.youtube.com/watch?v=442-zCQP8b8',
      thumbnail: 'https://img.youtube.com/vi/442-zCQP8b8/hqdefault.jpg'
    },
    tags: ['Ống cổ tay', 'Bóp bóng', 'Thần kinh giữa', 'Bàn tay']
  },
  {
    id: 'ex-31',
    title: '6 bài tập kéo giãn các nhóm cơ cổ vai giảm đau mỏi',
    bodyRegionId: 'neck',
    bodyRegionName: 'Cổ',
    problemIds: ['prob-neck-turtle', 'prob-shoulder-frozen'],
    problemNames: ['Hội chứng cổ rùa & Đau mỏi văn phòng', 'Đông cứng khớp vai (Frozen Shoulder)'],
    difficulty: 'Dễ',
    durationMinutes: 8,
    repsSets: '2 hiệp x 10 lần',
    goals: ['Kéo giãn cơ thang trên và cơ nâng vai', 'Mở khớp bả vai lồng ngực', 'Xua tan căng thẳng mệt mỏi sau ngày làm việc'],
    precautions: ['Không kéo giật đột ngột, duy trì nhịp hít thở êm'],
    instructions: [
      { stepNumber: 1, title: 'Kéo nghiêng đầu góc 45 độ (Cơ nâng vai)', instruction: 'Nghiêng đầu và nhìn xuống nách cùng bên, dùng tay kéo nhẹ đỉnh đầu xuống giữ 15 giây.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Xoay bả vai mở ngực', instruction: 'Đặt các ngón tay lên đầu vai, xoay khuỷu tay thành vòng tròn lớn.', durationSeconds: 60 }
    ],
    video: {
      provider: 'youtube',
      videoId: '_ZmIqnC7ucw',
      url: 'https://www.youtube.com/watch?v=_ZmIqnC7ucw',
      thumbnail: 'https://img.youtube.com/vi/_ZmIqnC7ucw/hqdefault.jpg'
    },
    tags: ['Kéo giãn cổ vai', 'Cơ nâng vai', 'Thư giãn', 'Văn phòng'],
    isPopular: true
  },
  {
    id: 'ex-32',
    title: 'Bài tập phục hồi hội chứng ống cổ tay chuyên biệt',
    bodyRegionId: 'wrist_hand',
    bodyRegionName: 'Cổ tay & Bàn tay',
    problemIds: ['prob-wrist-carpal-tunnel'],
    problemNames: ['Hội chứng ống cổ tay (Carpal Tunnel Syndrome)'],
    difficulty: 'Dễ',
    durationMinutes: 7,
    repsSets: '3 hiệp x 8 lần',
    goals: ['Tăng tính đàn hồi cho gân cơ gấp chung các ngón', 'Giải phóng đường hầm ống cổ tay', 'Tăng cảm giác xúc giác các đầu ngón'],
    precautions: ['Thực hiện bài tập khi bàn tay ấm (ngâm nước ấm trước khi tập nếu bị cứng lạnh)'],
    instructions: [
      { stepNumber: 1, title: 'Kéo giãn duỗi cổ tay', instruction: 'Đưa thẳng tay ra trước, ngửa bàn tay lên trần, dùng tay kia kéo nhẹ các ngón tay về phía thân mình.', durationSeconds: 60 },
      { stepNumber: 2, title: 'Trượt gân ngón tay hình móng vuốt (Claw fist)', instruction: 'Gập các khớp đốt ngón tay tạo hình móng vuốt giữ 3 giây rồi mở thẳng.', durationSeconds: 60 }
    ],
    video: {
      provider: 'youtube',
      videoId: 'mSEzasicUQo',
      url: 'https://www.youtube.com/watch?v=mSEzasicUQo',
      thumbnail: 'https://img.youtube.com/vi/mSEzasicUQo/hqdefault.jpg'
    },
    tags: ['Ống cổ tay', 'Móng vuốt', 'Cổ tay', 'Bàn tay']
  },
  {
    id: 'ex-33',
    title: 'Các bài tập McKenzie ứng dụng cho người đau thắt lưng thoát vị đĩa đệm',
    bodyRegionId: 'lower_back',
    bodyRegionName: 'Lưng dưới & Thắt lưng',
    problemIds: ['prob-lowback-mckenzie'],
    problemNames: ['Đau thắt lưng & Thoát vị đĩa đệm (Phương pháp McKenzie)'],
    difficulty: 'Trung bình',
    durationMinutes: 11,
    repsSets: '3 hiệp x 10 lần (Thực hiện khi đau thắt lưng mạn tính)',
    goals: ['Ứng dụng quy luật tập trung hóa hiện tượng đau (Centralization)', 'Đẩy nhân nhầy đĩa đệm về vị trí an toàn', 'Phục hồi khả năng đứng thẳng và đi lại không bị co cứng'],
    precautions: ['Ngưng bài tập nếu cảm giác đau lan xa hơn xuống bàn chân'],
    instructions: [
      { stepNumber: 1, title: 'Nằm sấp nghỉ tĩnh (Prone Lying)', instruction: 'Nằm sấp thả lỏng hoàn toàn 2 tay xuôi thân, hít thở bụng sâu trong 2-3 phút.', durationSeconds: 120 },
      { stepNumber: 2, title: 'Nằm sấp chống khuỷu tay (Prone on Elbows)', instruction: 'Chống 2 cẳng tay vuông góc sàn, nâng nhẹ thân trên giữ 1-2 phút thư giãn cơ thắt lưng.', durationSeconds: 120 },
      { stepNumber: 3, title: 'Đẩy thẳng tay ngửa thắt lưng (McKenzie Extension)', instruction: 'Chống bàn tay ngang vai, đẩy thẳng tay nâng thân trên lên hết mức có thể, giữ hông chạm sàn trong 2 giây rồi hạ xuống.', durationSeconds: 120 },
      { stepNumber: 4, title: 'Đứng ngửa thắt lưng ra sau', instruction: 'Đứng thẳng đặt 2 tay sau thắt lưng, ngửa người ra sau từ từ rồi trở về tư thế thẳng.', durationSeconds: 90 }
    ],
    video: {
      provider: 'youtube',
      videoId: '2T7Sicx-ScA',
      url: 'https://www.youtube.com/watch?v=2T7Sicx-ScA',
      thumbnail: 'https://img.youtube.com/vi/2T7Sicx-ScA/hqdefault.jpg'
    },
    tags: ['McKenzie', 'Thoát vị đĩa đệm', 'Thắt lưng', 'Tập trung hóa'],
    isPopular: true
  }
];
