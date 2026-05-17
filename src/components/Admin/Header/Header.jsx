import { useState, useEffect, useRef } from 'react'
import NotifDropdown from './NotifDropdown'
import ProfileDropdown from './ProfileDropdown'
import './Header.css'

export default function Header({ onNavigate }) {
  const [showNotif, setShowNotif] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowNotif(false)
        setShowProfile(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="topbar">
      <div className="topbar__actions" ref={ref}>

        <div className="topbar__dropdown-wrap">
          <button
            className="topbar__icon-btn"
            aria-label="Thông báo"
            onClick={() => { setShowNotif(v => !v); setShowProfile(false) }}
          >
            🔔
            <span className="topbar__notif-dot" />
          </button>
          {showNotif && <NotifDropdown />}
        </div>

        <div className="topbar__divider" />

        <div className="topbar__dropdown-wrap">
          <div
            className="topbar__user"
            onClick={() => { setShowProfile(v => !v); setShowNotif(false) }}
          >
            <div className="topbar__avatar">AD</div>
            <div>
              <div className="topbar__user-name">Admin</div>
              <div className="topbar__user-role">Super Admin</div>
            </div>
          </div>
          {showProfile && (
            <ProfileDropdown
              onNavigate={onNavigate}
              onClose={() => setShowProfile(false)}
            />
          )}
        </div>

      </div>
    </header>
  )
}