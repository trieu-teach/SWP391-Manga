import { mockService } from './mock.service.js'
import { realService } from './real.service.js'

// Đổi thành false để dùng API thật
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

export const api = USE_MOCK ? mockService : realService