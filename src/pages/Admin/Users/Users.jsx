import { useState, useEffect } from 'react'
import { api } from '../../../api/index.js'
import './Users.css'

const ROLE_LABEL   = { admin: 'Admin', mod: 'Mod', user: 'User' }
const ROLE_CLS     = { admin: 'role-admin', mod: 'role-mod', user: 'role-user' }
const STATUS_LABEL = { active: 'Hoạt động', banned: 'Đã khoá' }
const STATUS_CLS   = { active: 'badge--ongoing', banned: 'badge--hiatus' }

function UserDrawer({ user, onClose, onBan, onUnban, onChangeRole }) {
  return (
    <div className="user-detail-panel">
      <div className="manga-detail-header" style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-h)' }}>Chi tiết người dùng</span>
        <button className="btn btn--ghost btn--sm" onClick={onClose}>✕</button>
      </div>
      <div className="user-detail-profile">
        <div className="user-detail-avatar">{user.initials}</div>
        <div className="user-detail-name">{user.name}</div>
        <div className="user-detail-email">{user.email}</div>
        <span className={`badge ${ROLE_CLS[user.role]}`}>{ROLE_LABEL[user.role]}</span>
      </div>
      <div className="user-detail-stats">
        <div className="user-stat"><div className="user-stat-val">{user.readCount.toLocaleString()}</div><div className="user-stat-lbl">Lượt đọc</div></div>
        <div className="user-stat"><div className="user-stat-val">{user.comments}</div><div className="user-stat-lbl">Bình luận</div></div>
        <div className="user-stat"><div className="user-stat-val">{user.reports}</div><div className="user-stat-lbl">Báo cáo</div></div>
      </div>
      <div className="user-detail-body">
        <div>
          <div className="user-detail-section-title">Thông tin</div>
          <div className="user-detail-row"><span className="user-detail-row-label">Ngày tham gia</span><span className="user-detail-row-val">{user.joinDate}</span></div>
          <div className="user-detail-row"><span className="user-detail-row-label">Trạng thái</span><span className={`badge ${STATUS_CLS[user.status]}`}>{STATUS_LABEL[user.status]}</span></div>
        </div>
        <div>
          <div className="user-detail-section-title">Đổi vai trò</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['user','mod','admin'].map(r => (
              <button key={r} className={`btn btn--sm${user.role === r ? ' btn--primary' : ''}`} onClick={() => onChangeRole(user.id, r)}>
                {ROLE_LABEL[r]}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: '14px 18px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
        {user.status === 'active'
          ? <button className="btn btn--danger btn--sm" onClick={() => onBan(user.id)}>🔒 Khoá tài khoản</button>
          : <button className="btn btn--sm" onClick={() => onUnban(user.id)}>🔓 Mở khoá</button>
        }
      </div>
    </div>
  )
}

export default function Users() {
  const [list, setList]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => { api.getUsers().then(d => { setList(d); setLoading(false) }) }, [])

  async function handleBan(id) {
    await api.updateUserStatus(id, 'banned')
    setList(l => l.map(u => u.id === id ? { ...u, status: 'banned' } : u))
    setSelected(s => s?.id === id ? { ...s, status: 'banned' } : s)
  }

  async function handleUnban(id) {
    await api.updateUserStatus(id, 'active')
    setList(l => l.map(u => u.id === id ? { ...u, status: 'active' } : u))
    setSelected(s => s?.id === id ? { ...s, status: 'active' } : s)
  }

  async function handleChangeRole(id, role) {
    await api.updateUserRole(id, role)
    setList(l => l.map(u => u.id === id ? { ...u, role } : u))
    setSelected(s => s?.id === id ? { ...s, role } : s)
  }

  const filtered = list.filter(u => {
    const q = search.toLowerCase()
    return (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
        && (!roleFilter || u.role === roleFilter)
  })

  return (
    <div className="page">
      <div className="page-title">
        <h2>Độc giả</h2>
        <p>{list.length} tài khoản trong hệ thống</p>
      </div>

      <div className="table-toolbar">
        <input style={{ width: 220 }} placeholder="🔍 Tìm tên, email..." value={search} onChange={e => setSearch(e.target.value)} />
        <select style={{ width: 140 }} value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="">Tất cả vai trò</option>
          <option value="user">User</option>
          <option value="mod">Mod</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {loading && <div className="page-empty"><div className="page-empty__icon">⏳</div><div className="page-empty__text">Đang tải...</div></div>}

      {!loading && (
        <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="manga-table">
            <thead>
              <tr>
                <th>Người dùng</th>
                <th>Vai trò</th>
                <th>Lượt đọc</th>
                <th>Bình luận</th>
                <th>Báo cáo</th>
                <th>Tham gia</th>
                <th>Trạng thái</th>
                <th style={{ width: 60 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-cell-avatar">{u.initials}</div>
                      <div>
                        <div className="user-cell-name">{u.name}</div>
                        <div className="user-cell-email">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`badge ${ROLE_CLS[u.role]}`}>{ROLE_LABEL[u.role]}</span></td>
                  <td>{u.readCount.toLocaleString()}</td>
                  <td>{u.comments}</td>
                  <td style={{ color: u.reports > 0 ? 'var(--red-text)' : undefined }}>{u.reports}</td>
                  <td style={{ fontSize: 12, opacity: 0.7 }}>{u.joinDate}</td>
                  <td><span className={`badge ${STATUS_CLS[u.status]}`}>{STATUS_LABEL[u.status]}</span></td>
                  <td><button className="btn btn--ghost btn--sm" onClick={() => setSelected(u)}>👁</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <UserDrawer
          user={selected}
          onClose={() => setSelected(null)}
          onBan={handleBan}
          onUnban={handleUnban}
          onChangeRole={handleChangeRole}
        />
      )}
    </div>
  )
}