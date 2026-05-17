import { useState } from 'react'
import './Sidebar.css'

const NAV_ITEMS = [
  {
    section: 'Tổng quan',
    links: [
      { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
      { id: 'manga', label: 'Quản lý truyện', icon: '📚' },
      { id: 'chapters', label: 'Chương truyện', icon: '📄' },
    ],
  },
  {
    section: 'Cộng đồng',
    links: [
      { id: 'users', label: 'Độc giả', icon: '👥' },
      { id: 'comments', label: 'Bình luận', icon: '💬', badge: 12 },
      { id: 'reports', label: 'Báo cáo', icon: '🚩', badge: 3, badgeWarning: true },
    ],
  },
  {
    section: 'Hệ thống',
    links: [
      { id: 'stats', label: 'Thống kê', icon: '📊' },
      { id: 'settings', label: 'Cài đặt', icon: '⚙️' },
    ],
  },
]

export default function Sidebar({ activePage = 'dashboard', onNavigate }) {
  function handleClick(id) {
    onNavigate?.(id)
  }

  return (
    <aside className="sidebar" role="navigation" aria-label="Sidebar">
      <div className="sidebar__logo">
        <div className="sidebar__logo-text">Manga<span> Management</span></div>
        <div className="sidebar__logo-sub">Admin Panel</div>
      </div>

      {NAV_ITEMS.map(group => (
        <div key={group.section}>
          <div className="sidebar__section">{group.section}</div>
          {group.links.map(link => (
            <button
              key={link.id}
              className={`sidebar__nav-item${activePage === link.id ? ' sidebar__nav-item--active' : ''}`}
              onClick={() => handleClick(link.id)}
              aria-current={activePage === link.id ? 'page' : undefined}
            >
              <span aria-hidden="true">{link.icon}</span>
              {link.label}
              {link.badge != null && (
                <span className={`sidebar__badge${link.badgeWarning ? ' sidebar__badge--warning' : ''}`}>
                  {link.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      ))}

      <div className="sidebar__footer">
        <button className="sidebar__logout" onClick={() => console.log('logout')} aria-label="Đăng xuất">
          ⏻ Đăng xuất
        </button>
      </div>
    </aside>
  )
}