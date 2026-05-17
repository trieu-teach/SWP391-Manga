export const dashboardMock = {
    stats: [
        { label: 'Tổng truyện', value: '1,284', delta: '+24 tháng này', dir: 'up' },
        { label: 'Lượt đọc hôm nay', value: '48.3K', delta: '+12.4%', dir: 'up' },
        { label: 'Độc giả tích cực', value: '9,721', delta: '+382 tuần này', dir: 'up' },
        { label: 'Báo cáo chờ xử lý', value: '3', delta: 'Cần xử lý', dir: 'down' },
    ],
    chartData: [
        { day: 'T2', reads: 70, newCh: 30 },
        { day: 'T3', reads: 90, newCh: 45 },
        { day: 'T4', reads: 60, newCh: 20 },
        { day: 'T5', reads: 110, newCh: 55 },
        { day: 'T6', reads: 95, newCh: 40 },
        { day: 'T7', reads: 120, newCh: 60 },
        { day: 'CN', reads: 85, newCh: 35 },
    ],
    genres: [
        { name: 'Hành động', pct: 34, color: 'var(--red)' },
        { name: 'Tình cảm', pct: 28, color: 'var(--gold)' },
        { name: 'Isekai', pct: 19, color: 'var(--teal)' },
        { name: 'Kinh dị', pct: 11, color: 'var(--purple)' },
        { name: 'Khác', pct: 8, color: 'var(--text)' },
    ],
    topManga: [
        { id: 1, initials: 'OT', bg: '#e63946', title: 'One Thorn', genre: 'Hành động', chapters: 142, reads: '8.2K', status: 'ongoing' },
        { id: 2, initials: 'SK', bg: '#4361ee', title: 'Sắc Không', genre: 'Isekai', chapters: 87, reads: '6.5K', status: 'ongoing' },
        { id: 3, initials: 'HT', bg: '#06d6a0', title: 'Hoa Tàn', genre: 'Tình cảm', chapters: 215, reads: '5.1K', status: 'completed' },
        { id: 4, initials: 'MD', bg: '#9b5de5', title: 'Ma Đạo', genre: 'Kinh dị', chapters: 33, reads: '3.7K', status: 'hiatus' },
    ],
    activities: [
        { type: 'upload', icon: '↑', text: 'TruyenBot đã đăng chương 143 của One Thorn', bold: ['TruyenBot', 'One Thorn'], time: '5 phút trước' },
        { type: 'report', icon: '⚑', text: 'user_2841 báo cáo bình luận vi phạm trong Ma Đạo', bold: ['user_2841', 'Ma Đạo'], time: '18 phút trước' },
        { type: 'user', icon: '+', text: '15 tài khoản mới đã đăng ký trong 1 giờ qua', bold: [], time: '1 giờ trước' },
        { type: 'comment', icon: '✉', text: 'manga_fan99 bình luận 12 lần trong Sắc Không', bold: ['manga_fan99', 'Sắc Không'], time: '2 giờ trước' },
    ],
}