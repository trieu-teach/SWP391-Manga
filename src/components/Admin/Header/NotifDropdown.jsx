import { useState, useEffect } from 'react'
import { api } from '../../../api/index.js'

export default function NotifDropdown() {
  const [notifs, setNotifs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getNotifications()
      .then(setNotifs)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="topbar__dropdown">
      <div className="topbar__notif-item">Đang tải...</div>
    </div>
  )

  return (
    <div className="topbar__dropdown">
      <div className="topbar__dropdown-title">Thông báo</div>
      {notifs.length === 0 && (
        <div className="topbar__notif-item">Không có thông báo nào</div>
      )}
      {notifs.map(n => (
        <div key={n.id} className="topbar__notif-item">
          <span className="topbar__notif-icon">{n.icon}</span>
          <div>
            <div className="topbar__notif-text">{n.text}</div>
            <div className="topbar__notif-time">{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}