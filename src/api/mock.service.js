import { dashboardMock } from './mock/dashboard.mock.js'
import { mangaMock, chaptersMock, usersMock, commentsMock, reportsMock, statsMock, settingsMock } from './mock/all.mock.js'
import { mockNotifications } from './mock/notif.mock.js'
import { mockProfile } from './mock/profile.mock.js'

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms))

export const mockService = {
    // Dashboard
    getDashboard: async () => { await delay(); return dashboardMock },

    // Manga
    getMangaList: async () => { await delay(); return mangaMock },
    getMangaById: async (id) => { await delay(); return mangaMock.find(m => m.id === id) ?? null },
    createManga: async (data) => { await delay(500); return { ...data, id: Date.now(), createdAt: new Date().toISOString() } },
    updateManga: async (id, data) => { await delay(400); return { ...data, id } },
    deleteManga: async () => { await delay(300); return { success: true } },

    // Chapters
    getChaptersByManga: async (mangaId) => { await delay(); return chaptersMock[mangaId] ?? [] },
    createChapter: async (data) => { await delay(500); return { ...data, id: Date.now(), uploadedAt: new Date().toISOString() } },
    deleteChapter: async () => { await delay(300); return { success: true } },

    // Users
    getUsers: async () => { await delay(); return usersMock },
    getUserById: async (id) => { await delay(); return usersMock.find(u => u.id === id) ?? null },
    updateUserStatus: async (id, status) => { await delay(400); return { id, status } },
    updateUserRole: async (id, role) => { await delay(400); return { id, role } },

    // Comments
    getComments: async () => { await delay(); return commentsMock },
    deleteComment: async () => { await delay(300); return { success: true } },
    approveComment: async (id) => { await delay(300); return { id, flagged: false } },

    // Reports
    getReports: async () => { await delay(); return reportsMock },
    resolveReport: async (id, resolution) => { await delay(400); return { id, status: 'resolved', resolution, resolvedAt: new Date().toISOString() } },

    // Stats
    getStats: async () => { await delay(); return statsMock },

    // Settings
    getSettings: async () => { await delay(); return settingsMock },
    updateSettings: async (section, data) => { await delay(500); return { section, ...data } },

    // Notifications
    getNotifications: async () => { await delay(); return mockNotifications },

    // Profile
    getProfile: async () => { await delay(); return mockProfile },
    updateProfile: async (data) => { await delay(400); return { ...mockProfile, ...data } },
}