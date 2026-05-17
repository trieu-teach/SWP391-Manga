import { useState, useEffect } from 'react'
import { api } from '../../../api/index.js'

export default function ProfileDropdown({ onNavigate, onClose }) {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    api.getProfile().then(setProfile)
  }, [])

  function handleNav(page) {
    onNavigate?.(page)
    onClose()
  }

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    window.location.href = '/login'
  }

  return (
    <div className="topbar__dropdown topbar__dropdown--right">
      <div className="topbar__dropdown-title">Tài khoản</div>
      <div className="topbar__profile-info">
        <div className="topbar__avatar topbar__avatar--lg">
          {profile ? profile.initials : '...'}
        </div>
        <div>
          <div className="topbar__user-name">{profile ? profile.name : '...'}</div>
          <div className="topbar__user-role">{profile ? profile.role : '...'}</div>
        </div>
      </div>
      <div className="topbar__dropdown-divider" />
      <button className="topbar__dropdown-item" onClick={() => handleNav('profile')}>
        👤 Hồ sơ
      </button>
      <button className="topbar__dropdown-item" onClick={() => handleNav('settings')}>
        ⚙️ Cài đặt
      </button>
      <div className="topbar__dropdown-divider" />
      <button className="topbar__dropdown-item topbar__dropdown-item--danger" onClick={handleLogout}>
        🚪 Đăng xuất
      </button>
    </div>
  )
}