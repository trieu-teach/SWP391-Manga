import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
})

// Tự động gắn token vào mọi request
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Tự động xử lý lỗi
instance.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err)
)

export const realService = {
    getDashboard:       () => instance.get('/dashboard'),
    getMangaList:       () => instance.get('/manga'),
    getMangaById:       (id) => instance.get(`/manga/${id}`),
    createManga:        (data) => instance.post('/manga', data),
    updateManga:        (id, data) => instance.put(`/manga/${id}`, data),
    deleteManga:        (id) => instance.delete(`/manga/${id}`),
    getChaptersByManga: (mangaId) => instance.get(`/manga/${mangaId}/chapters`),
    createChapter:      (data) => instance.post('/chapters', data),
    deleteChapter:      (id) => instance.delete(`/chapters/${id}`),
    getUsers:           () => instance.get('/users'),
    getUserById:        (id) => instance.get(`/users/${id}`),
    updateUserStatus:   (id, status) => instance.put(`/users/${id}/status`, { status }),
    updateUserRole:     (id, role) => instance.put(`/users/${id}/role`, { role }),
    getComments:        () => instance.get('/comments'),
    deleteComment:      (id) => instance.delete(`/comments/${id}`),
    approveComment:     (id) => instance.put(`/comments/${id}/approve`),
    getReports:         () => instance.get('/reports'),
    resolveReport:      (id, data) => instance.put(`/reports/${id}/resolve`, data),
    getStats:           () => instance.get('/stats'),
    getSettings:        () => instance.get('/settings'),
    updateSettings:     (s, data) => instance.put(`/settings/${s}`, data),
    getProfile:         () => instance.get('/profile'),
    updateProfile:      (data) => instance.put('/profile', data),
    getNotifications:   () => instance.get('/notifications'),
}