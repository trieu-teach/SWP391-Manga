// ===== MANGA =====
export const mangaMock = [
  { id: 1,  initials: 'OT', bg: '#e63946', title: 'One Thorn',      genre: ['Hành động', 'Phiêu lưu'], author: 'Nguyễn Văn A', chapters: 142, reads: 82400, status: 'ongoing',   createdAt: '2022-03-10', updatedAt: '2025-01-14' },
  { id: 2,  initials: 'SK', bg: '#4361ee', title: 'Sắc Không',      genre: ['Isekai', 'Hành động'],    author: 'Trần Thị B',   chapters: 87,  reads: 65000, status: 'ongoing',   createdAt: '2023-06-01', updatedAt: '2025-01-13' },
  { id: 3,  initials: 'HT', bg: '#06d6a0', title: 'Hoa Tàn',        genre: ['Tình cảm', 'Drama'],      author: 'Lê Văn C',     chapters: 215, reads: 51200, status: 'completed', createdAt: '2021-01-15', updatedAt: '2024-08-20' },
  { id: 4,  initials: 'MD', bg: '#9b5de5', title: 'Ma Đạo',         genre: ['Kinh dị', 'Huyền bí'],    author: 'Phạm Thị D',   chapters: 33,  reads: 37000, status: 'hiatus',    createdAt: '2024-02-28', updatedAt: '2024-12-01' },
  { id: 5,  initials: 'VL', bg: '#f4a261', title: 'Vô Lượng',       genre: ['Hành động', 'Isekai'],    author: 'Hoàng Văn E',  chapters: 56,  reads: 28000, status: 'ongoing',   createdAt: '2023-11-05', updatedAt: '2025-01-10' },
  { id: 6,  initials: 'TT', bg: '#2a9d8f', title: 'Thần Thoại',     genre: ['Phiêu lưu', 'Thần thoại'],author: 'Đỗ Thị F',    chapters: 98,  reads: 44500, status: 'ongoing',   createdAt: '2022-07-20', updatedAt: '2025-01-12' },
  { id: 7,  initials: 'ĐL', bg: '#e9c46a', title: 'Đại Lục Huyền',  genre: ['Huyền huyễn'],            author: 'Vũ Văn G',     chapters: 310, reads: 91000, status: 'completed', createdAt: '2020-05-01', updatedAt: '2023-12-31' },
  { id: 8,  initials: 'BH', bg: '#e76f51', title: 'Bóng Hồng',      genre: ['Tình cảm'],               author: 'Bùi Thị H',    chapters: 12,  reads: 9800,  status: 'ongoing',   createdAt: '2024-12-01', updatedAt: '2025-01-11' },
  { id: 9,  initials: 'KN', bg: '#457b9d', title: 'Không Nhớ',      genre: ['Drama', 'Tâm lý'],        author: 'Đinh Văn I',   chapters: 67,  reads: 33000, status: 'hiatus',    createdAt: '2023-04-14', updatedAt: '2024-10-05' },
  { id: 10, initials: 'CK', bg: '#b5838d', title: 'Chiến Kỷ Nguyên',genre: ['Hành động', 'Sci-fi'],    author: 'Lý Thị J',     chapters: 189, reads: 72000, status: 'ongoing',   createdAt: '2021-09-30', updatedAt: '2025-01-15' },
]

// ===== CHAPTERS =====
export const chaptersMock = {
  1: [
    { id: 101, number: 143, title: 'Trận chiến cuối',    pages: 28, uploadedAt: '2025-01-14', uploadedBy: 'TruyenBot' },
    { id: 102, number: 142, title: 'Kẻ thù cũ',         pages: 24, uploadedAt: '2025-01-07', uploadedBy: 'TruyenBot' },
    { id: 103, number: 141, title: 'Bí mật bị tiết lộ', pages: 32, uploadedAt: '2024-12-31', uploadedBy: 'Admin'     },
    { id: 104, number: 140, title: 'Vết thương lòng',   pages: 20, uploadedAt: '2024-12-24', uploadedBy: 'TruyenBot' },
  ],
  2: [
    { id: 201, number: 87, title: 'Thế giới mới',        pages: 30, uploadedAt: '2025-01-13', uploadedBy: 'TruyenBot' },
    { id: 202, number: 86, title: 'Sức mạnh thức tỉnh',  pages: 26, uploadedAt: '2025-01-06', uploadedBy: 'Admin'     },
  ],
}

// ===== USERS =====
export const usersMock = [
  { id: 1,  initials: 'MF', name: 'manga_fan99',   email: 'fan99@gmail.com',       role: 'user',  status: 'active',  joinDate: '2023-03-12', comments: 342, reports: 0,  readCount: 1820 },
  { id: 2,  initials: 'TK', name: 'truyen_king',   email: 'king@manga.vn',         role: 'user',  status: 'active',  joinDate: '2022-11-05', comments: 89,  reports: 1,  readCount: 4210 },
  { id: 3,  initials: 'AD', name: 'admin_local',   email: 'admin@mangahub.vn',     role: 'admin', status: 'active',  joinDate: '2021-01-01', comments: 12,  reports: 0,  readCount: 320  },
  { id: 4,  initials: 'NV', name: 'nguyen_van_a',  email: 'nva@yahoo.com',         role: 'mod',   status: 'active',  joinDate: '2023-07-18', comments: 567, reports: 3,  readCount: 2900 },
  { id: 5,  initials: 'BU', name: 'bad_user_2841', email: 'bad@tempmail.com',       role: 'user',  status: 'banned',  joinDate: '2024-05-22', comments: 21,  reports: 8,  readCount: 150  },
  { id: 6,  initials: 'LT', name: 'le_thi_b',      email: 'ltb@gmail.com',         role: 'user',  status: 'active',  joinDate: '2024-01-09', comments: 234, reports: 0,  readCount: 3100 },
  { id: 7,  initials: 'PH', name: 'phantom_read',  email: 'phantom@outlook.com',   role: 'user',  status: 'active',  joinDate: '2022-08-30', comments: 1021,reports: 2,  readCount: 6700 },
  { id: 8,  initials: 'SB', name: 'spam_bot_001',  email: 'bot@nowhere.net',       role: 'user',  status: 'banned',  joinDate: '2024-11-01', comments: 444, reports: 15, readCount: 10   },
]

// ===== COMMENTS =====
export const commentsMock = [
  { id: 1,  user: 'manga_fan99',  userInitials: 'MF', mangaTitle: 'One Thorn',  chapter: 143, content: 'Chương này hay quá, tác giả vẽ cảnh chiến đấu rất đỉnh!', likes: 42, createdAt: '2025-01-14 10:22', flagged: false },
  { id: 2,  user: 'bad_user_2841',userInitials: 'BU', mangaTitle: 'Ma Đạo',     chapter: 33,  content: 'Nội dung vi phạm — bình luận này đã bị ẩn bởi hệ thống.',   likes: 0,  createdAt: '2025-01-14 09:18', flagged: true  },
  { id: 3,  user: 'truyen_king',  userInitials: 'TK', mangaTitle: 'Sắc Không',  chapter: 87,  content: 'Plot twist chương này không ai đoán trước được, 10/10!',    likes: 87, createdAt: '2025-01-13 21:05', flagged: false },
  { id: 4,  user: 'le_thi_b',     userInitials: 'LT', mangaTitle: 'Hoa Tàn',    chapter: 215, content: 'Kết thúc quá buồn, tôi đọc mà khóc cả đêm 😭',             likes: 123,createdAt: '2025-01-13 18:44', flagged: false },
  { id: 5,  user: 'phantom_read', userInitials: 'PH', mangaTitle: 'Đại Lục Huyền', chapter: 310, content: 'Bộ này xứng đáng top 1 all-time của site, không bàn cãi.', likes: 201, createdAt: '2025-01-12 14:30', flagged: false },
  { id: 6,  user: 'spam_bot_001', userInitials: 'SB', mangaTitle: 'Chiến Kỷ Nguyên', chapter: 189, content: 'Nội dung spam quảng cáo — đã bị báo cáo và xử lý.',      likes: 0,  createdAt: '2025-01-12 08:00', flagged: true  },
  { id: 7,  user: 'nguyen_van_a', userInitials: 'NV', mangaTitle: 'Thần Thoại', chapter: 98,  content: 'Art style của tác giả ngày càng đẹp, rõ ràng có sự tiến bộ.', likes: 55, createdAt: '2025-01-11 16:12', flagged: false },
  { id: 8,  user: 'manga_fan99',  userInitials: 'MF', mangaTitle: 'Sắc Không',  chapter: 86,  content: 'Đợi chương tiếp theo mà hồi hộp quá, tác giả đừng drop nhé!',likes: 34, createdAt: '2025-01-11 11:50', flagged: false },
]

// ===== REPORTS =====
export const reportsMock = [
  { id: 'RPT-001', type: 'Bình luận vi phạm',  severity: 'high',   status: 'pending',  reporter: 'manga_fan99', target: 'bad_user_2841', description: 'Người dùng đăng bình luận chứa ngôn từ thù địch và nội dung không phù hợp trong chương 33 Ma Đạo.', createdAt: '2025-01-14 09:20' },
  { id: 'RPT-002', type: 'Nội dung bản quyền', severity: 'high',   status: 'pending',  reporter: 'truyen_king', target: 'One Thorn ch.143', description: 'Chương 143 có vẻ được scan từ nguồn có bản quyền, cần kiểm tra lại.', createdAt: '2025-01-13 15:40' },
  { id: 'RPT-003', type: 'Spam quảng cáo',     severity: 'medium', status: 'resolved', reporter: 'le_thi_b',    target: 'spam_bot_001', description: 'Tài khoản này liên tục đăng link quảng cáo trong phần bình luận nhiều bộ truyện.', createdAt: '2025-01-12 08:05', resolvedAt: '2025-01-12 10:30', resolvedBy: 'Admin', resolution: 'Ban tài khoản 30 ngày' },
  { id: 'RPT-004', type: 'Ảnh bìa không phù hợp', severity: 'medium', status: 'reviewing', reporter: 'nguyen_van_a', target: 'Bóng Hồng', description: 'Ảnh bìa của bộ truyện Bóng Hồng có thể không phù hợp với đối tượng dưới 18 tuổi.', createdAt: '2025-01-11 20:00' },
  { id: 'RPT-005', type: 'Tên người dùng',     severity: 'low',    status: 'resolved', reporter: 'phantom_read', target: 'bad_user_2841', description: 'Tên người dùng vi phạm quy định cộng đồng.', createdAt: '2025-01-10 14:22', resolvedAt: '2025-01-10 16:00', resolvedBy: 'Mod', resolution: 'Yêu cầu đổi tên' },
]

// ===== STATS =====
export const statsMock = {
  overview: [
    { label: 'Tổng lượt đọc', value: '2.4M', delta: '+18.2%', dir: 'up'   },
    { label: 'Người dùng mới', value: '1,240', delta: '+9.5%', dir: 'up'  },
    { label: 'Chương mới',    value: '384',   delta: '+5.1%',  dir: 'up'   },
    { label: 'Tỷ lệ rời bỏ', value: '24%',   delta: '-2.3%',  dir: 'up'   },
  ],
  monthly: [
    { month: 'T8',  reads: 180000, users: 820,  chapters: 52 },
    { month: 'T9',  reads: 210000, users: 950,  chapters: 61 },
    { month: 'T10', reads: 195000, users: 880,  chapters: 48 },
    { month: 'T11', reads: 240000, users: 1100, chapters: 70 },
    { month: 'T12', reads: 290000, users: 1350, chapters: 85 },
    { month: 'T1',  reads: 320000, users: 1240, chapters: 68 },
  ],
  topManga: [
    { title: 'Đại Lục Huyền',   reads: 91000 },
    { title: 'One Thorn',       reads: 82400 },
    { title: 'Chiến Kỷ Nguyên', reads: 72000 },
    { title: 'Sắc Không',       reads: 65000 },
    { title: 'Thần Thoại',      reads: 44500 },
  ],
  deviceSplit: [
    { label: 'Mobile',  pct: 62, color: 'var(--purple)' },
    { label: 'Desktop', pct: 30, color: 'var(--teal)'   },
    { label: 'Tablet',  pct: 8,  color: 'var(--gold)'   },
  ],
}

// ===== SETTINGS =====
export const settingsMock = {
  site: { name: 'MangaHub', tagline: 'Đọc truyện tranh online', logo: '', maintenanceMode: false },
  notifications: { emailOnReport: true, emailOnNewUser: false, emailOnComment: false, slackWebhook: '' },
  storage: { used: 18.4, total: 50, unit: 'GB' },
  apiKey: 'sk-••••••••••••••••••••••••••••XkQ9',
}