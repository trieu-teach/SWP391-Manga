import { useState, useEffect } from 'react'
import { api } from '../../../api/index.js'
import './Comments.css'

export default function Comments() {
  const [list, setList]       = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all') // 'all' | 'flagged'
  const [selected, setSelected] = useState([])  // bulk select ids

  useEffect(() => { api.getComments().then(d => { setList(d); setLoading(false) }) }, [])

  async function handleDelete(id) {
    await api.deleteComment(id)
    setList(l => l.filter(c => c.id !== id))
    setSelected(s => s.filter(i => i !== id))
  }

  async function handleApprove(id) {
    await api.approveComment(id)
    setList(l => l.map(c => c.id === id ? { ...c, flagged: false } : c))
  }

  async function handleBulkDelete() {
    if (!confirm(`Xoá ${selected.length} bình luận đã chọn?`)) return
    await Promise.all(selected.map(id => api.deleteComment(id)))
    setList(l => l.filter(c => !selected.includes(c.id)))
    setSelected([])
  }

  function toggleSelect(id) {
    setSelected(s => s.includes(id) ? s.filter(i => i !== id) : [...s, id])
  }

  function toggleAll() {
    const ids = filtered.map(c => c.id)
    setSelected(s => s.length === ids.length ? [] : ids)
  }

  const filtered = list.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !q || c.user.toLowerCase().includes(q) || c.content.toLowerCase().includes(q) || c.mangaTitle.toLowerCase().includes(q)
    const matchFilter = filter === 'all' || (filter === 'flagged' && c.flagged)
    return matchSearch && matchFilter
  })

  return (
    <div className="page">
      <div className="page-title">
        <h2>Bình luận</h2>
        <p>{list.filter(c => c.flagged).length} bình luận bị báo cáo</p>
      </div>

      <div className="table-toolbar">
        <input style={{ width: 220 }} placeholder="🔍 Tìm nội dung, người dùng..." value={search} onChange={e => setSearch(e.target.value)} />
        <div style={{ display: 'flex', gap: 4 }}>
          {['all','flagged'].map(f => (
            <button key={f} className={`btn btn--sm${filter === f ? ' btn--primary' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'Tất cả' : '🚩 Bị báo cáo'}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk bar */}
      {selected.length > 0 && (
        <div className="bulk-bar">
          <span className="bulk-bar-count">Đã chọn {selected.length} bình luận</span>
          <button className="btn btn--danger btn--sm" onClick={handleBulkDelete}>🗑 Xoá tất cả</button>
          <button className="btn btn--ghost btn--sm" onClick={() => setSelected([])}>Bỏ chọn</button>
        </div>
      )}

      {loading && <div className="page-empty"><div className="page-empty__icon">⏳</div><div className="page-empty__text">Đang tải...</div></div>}

      {!loading && (
        <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="manga-table">
            <thead>
              <tr>
                <th style={{ width: 36, padding: '10px 12px' }}>
                  <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} />
                </th>
                <th>Người dùng</th>
                <th>Nội dung</th>
                <th>Truyện</th>
                <th>Thích</th>
                <th>Thời gian</th>
                <th style={{ width: 120 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className={c.flagged ? 'flagged-row' : ''}>
                  <td style={{ padding: '8px 12px' }}>
                    <input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggleSelect(c.id)} />
                  </td>
                  <td>
                    <div className="user-cell">
                      <div className="user-cell-avatar" style={{ width: 28, height: 28, fontSize: 11 }}>{c.userInitials}</div>
                      <span className="user-cell-name" style={{ fontSize: 13 }}>{c.user}</span>
                    </div>
                  </td>
                  <td className="comment-text-cell">
                    <div className={`comment-text-preview${c.flagged ? '' : ''}`}>{c.content}</div>
                    {c.flagged && <span style={{ fontSize: 11, color: 'var(--red-text)', background: 'var(--red-soft)', padding: '1px 6px', borderRadius: 4 }}>🚩 Bị báo cáo</span>}
                  </td>
                  <td>
                    <div style={{ fontSize: 13, color: 'var(--text-h)' }}>{c.mangaTitle}</div>
                    <div style={{ fontSize: 11.5, opacity: 0.6 }}>Ch.{c.chapter}</div>
                  </td>
                  <td style={{ fontSize: 13 }}>♥ {c.likes}</td>
                  <td style={{ fontSize: 12, opacity: 0.6 }}>{c.createdAt}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {c.flagged && <button className="btn btn--sm" style={{ fontSize: 11 }} onClick={() => handleApprove(c.id)}>✓ Duyệt</button>}
                      <button className="btn btn--danger btn--sm" onClick={() => handleDelete(c.id)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="page-empty" style={{ border: 'none' }}>
              <div className="page-empty__icon">💬</div>
              <div className="page-empty__text">Không có bình luận nào</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}