import { useState, useEffect } from 'react'
import { api } from '../../../api/index.js'
import './Settings.css'

const NAV = [
  { id: 'site',   label: 'Trang web',    icon: '🌐' },
  { id: 'notif',  label: 'Thông báo',    icon: '🔔' },
  { id: 'storage',label: 'Lưu trữ',      icon: '💾' },
  { id: 'api',    label: 'API & Tích hợp',icon: '🔌' },
  { id: 'danger', label: 'Vùng nguy hiểm',icon: '⚠️' },
]

export default function Settings() {
  const [active, setActive]   = useState('site')
  const [cfg, setCfg]         = useState(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved]     = useState(false)

  useEffect(() => { api.getSettings().then(d => { setCfg(d); setLoading(false) }) }, [])

  async function handleSave(section, data) {
    await api.updateSettings(section, data)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function set(section, key, val) {
    setCfg(c => ({ ...c, [section]: { ...c[section], [key]: val } }))
  }

  if (loading) return <div className="page"><div className="page-empty"><div className="page-empty__icon">⏳</div><div className="page-empty__text">Đang tải...</div></div></div>

  return (
    <div className="page">
      <div className="page-title">
        <h2>Cài đặt</h2>
        {saved && <p style={{ color: 'var(--teal-text)' }}>✓ Đã lưu thay đổi</p>}
      </div>

      <div className="settings-layout">
        {/* Sidebar nav */}
        <nav className="settings-nav">
          {NAV.map(n => (
            <button key={n.id} className={`settings-nav-item${active === n.id ? ' active' : ''}`} onClick={() => setActive(n.id)}>
              <span>{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="settings-panels">

          {/* Site */}
          {active === 'site' && (
            <div className="settings-section">
              <div className="settings-section-header">
                <div className="settings-section-title">Cài đặt trang web</div>
                <div className="settings-section-desc">Thông tin cơ bản hiển thị với người dùng</div>
              </div>
              <div className="settings-section-body">
                <div className="settings-form-grid">
                  <div className="field">
                    <label>Tên trang web</label>
                    <input value={cfg.site.name} onChange={e => set('site','name', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Slogan</label>
                    <input value={cfg.site.tagline} onChange={e => set('site','tagline', e.target.value)} />
                  </div>
                </div>
                <div className="settings-row">
                  <div className="settings-row-info">
                    <div className="settings-row-label">Chế độ bảo trì</div>
                    <div className="settings-row-desc">Tạm thời ẩn trang với người dùng thông thường</div>
                  </div>
                  <button className={`toggle${cfg.site.maintenanceMode ? ' on' : ''}`} onClick={() => set('site','maintenanceMode', !cfg.site.maintenanceMode)} />
                </div>
              </div>
              <div className="settings-section-footer">
                <button className="btn btn--primary" onClick={() => handleSave('site', cfg.site)}>Lưu thay đổi</button>
              </div>
            </div>
          )}

          {/* Notifications */}
          {active === 'notif' && (
            <div className="settings-section">
              <div className="settings-section-header">
                <div className="settings-section-title">Thông báo qua email</div>
                <div className="settings-section-desc">Cấu hình khi nào admin nhận email</div>
              </div>
              <div className="settings-section-body">
                {[
                  { key: 'emailOnReport',  label: 'Có báo cáo mới',        desc: 'Gửi email khi có báo cáo vi phạm' },
                  { key: 'emailOnNewUser', label: 'Người dùng mới đăng ký', desc: 'Thông báo khi có tài khoản mới'   },
                  { key: 'emailOnComment', label: 'Bình luận bị gắn cờ',   desc: 'Khi bình luận bị báo cáo'         },
                ].map(row => (
                  <div key={row.key} className="settings-row">
                    <div className="settings-row-info">
                      <div className="settings-row-label">{row.label}</div>
                      <div className="settings-row-desc">{row.desc}</div>
                    </div>
                    <button className={`toggle${cfg.notifications[row.key] ? ' on' : ''}`} onClick={() => set('notifications', row.key, !cfg.notifications[row.key])} />
                  </div>
                ))}
                <div className="field">
                  <label>Slack Webhook URL</label>
                  <input value={cfg.notifications.slackWebhook} onChange={e => set('notifications','slackWebhook', e.target.value)} placeholder="https://hooks.slack.com/..." />
                  <span className="field-hint">Để trống nếu không dùng Slack</span>
                </div>
              </div>
              <div className="settings-section-footer">
                <button className="btn btn--primary" onClick={() => handleSave('notifications', cfg.notifications)}>Lưu thay đổi</button>
              </div>
            </div>
          )}

          {/* Storage */}
          {active === 'storage' && (
            <div className="settings-section">
              <div className="settings-section-header">
                <div className="settings-section-title">Lưu trữ</div>
                <div className="settings-section-desc">Dung lượng hệ thống</div>
              </div>
              <div className="settings-section-body">
                <div className="usage-bar-wrap">
                  <div className="usage-bar-labels">
                    <span>Đã dùng: {cfg.storage.used} {cfg.storage.unit}</span>
                    <span>Tổng: {cfg.storage.total} {cfg.storage.unit}</span>
                  </div>
                  <div className="usage-bar-track">
                    <div className="usage-bar-fill" style={{ width: `${(cfg.storage.used/cfg.storage.total*100).toFixed(0)}%` }} />
                  </div>
                  <span className="field-hint">{(cfg.storage.used/cfg.storage.total*100).toFixed(0)}% dung lượng đã sử dụng</span>
                </div>
              </div>
            </div>
          )}

          {/* API */}
          {active === 'api' && (
            <div className="settings-section">
              <div className="settings-section-header">
                <div className="settings-section-title">API & Tích hợp</div>
                <div className="settings-section-desc">Quản lý API keys và webhook</div>
              </div>
              <div className="settings-section-body">
                <div className="field">
                  <label>API Key</label>
                  <div className="api-key-field">
                    <input className="api-key-input" value={cfg.apiKey} readOnly />
                    <button className="btn btn--sm">Tạo mới</button>
                  </div>
                  <span className="field-hint">Không chia sẻ API key với bất kỳ ai</span>
                </div>
              </div>
            </div>
          )}

          {/* Danger zone */}
          {active === 'danger' && (
            <div className="settings-section danger-zone">
              <div className="settings-section-header">
                <div className="settings-section-title">Vùng nguy hiểm</div>
                <div className="settings-section-desc">Những hành động không thể hoàn tác</div>
              </div>
              <div className="settings-section-body">
                {[
                  { label: 'Xoá tất cả bình luận',   desc: 'Xoá vĩnh viễn toàn bộ bình luận trong hệ thống' },
                  { label: 'Reset thống kê',          desc: 'Đặt lại toàn bộ dữ liệu thống kê về 0' },
                  { label: 'Xoá dữ liệu người dùng',  desc: 'Xoá toàn bộ tài khoản người dùng (không thể phục hồi)' },
                ].map(item => (
                  <div key={item.label} className="danger-item">
                    <div>
                      <div className="danger-item-label">{item.label}</div>
                      <div className="danger-item-desc">{item.desc}</div>
                    </div>
                    <button className="btn btn--danger btn--sm" onClick={() => alert('Chức năng này đã bị khoá trong môi trường demo')}>
                      {item.label}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}