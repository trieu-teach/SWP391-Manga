import { useState, useEffect } from 'react'
import { api } from '../../../api/index.js'
import './Manga.css'

const STATUS_LABEL = {
  ongoing:   { label: 'Đang ra',    cls: 'badge--ongoing'   },
  completed: { label: 'Hoàn thành', cls: 'badge--completed' },
  hiatus:    { label: 'Tạm dừng',   cls: 'badge--hiatus'    },
}

const STATUS_OPTIONS = [
  { value: '',          label: 'Tất cả trạng thái' },
  { value: 'ongoing',   label: 'Đang ra'    },
  { value: 'completed', label: 'Hoàn thành' },
  { value: 'hiatus',    label: 'Tạm dừng'   },
]

function formatReads(n) {
  if (n >= 1000000) return `${(n/1000000).toFixed(1)}M`
  if (n >= 1000)    return `${(n/1000).toFixed(1)}K`
  return n
}

// ── Modal thêm / sửa truyện ──
function MangaModal({ manga, onClose, onSave }) {
  const isEdit = !!manga?.id
  const [form, setForm] = useState({
    title:  manga?.title  ?? '',
    author: manga?.author ?? '',
    genre:  manga?.genre?.join(', ') ?? '',
    status: manga?.status ?? 'ongoing',
  })
  const [saving, setSaving] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function handleSave() {
    if (!form.title.trim()) return
    setSaving(true)
    const payload = { ...form, genre: form.genre.split(',').map(s => s.trim()).filter(Boolean) }
    await (isEdit ? api.updateManga(manga.id, payload) : api.createManga(payload))
    setSaving(false)
    onSave()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEdit ? 'Sửa truyện' : 'Thêm truyện mới'}</h3>
          <button className="btn btn--ghost btn--sm" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="chapter-form-grid">
            <div className="field full">
              <label>Tên truyện *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Nhập tên truyện..." />
            </div>
            <div className="field">
              <label>Tác giả</label>
              <input value={form.author} onChange={e => set('author', e.target.value)} placeholder="Tên tác giả" />
            </div>
            <div className="field">
              <label>Trạng thái</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="ongoing">Đang ra</option>
                <option value="completed">Hoàn thành</option>
                <option value="hiatus">Tạm dừng</option>
              </select>
            </div>
            <div className="field full">
              <label>Thể loại</label>
              <input value={form.genre} onChange={e => set('genre', e.target.value)} placeholder="Hành động, Isekai, ..." />
              <span className="field-hint">Phân cách bằng dấu phẩy</span>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn" onClick={onClose}>Huỷ</button>
          <button className="btn btn--primary" onClick={handleSave} disabled={saving || !form.title.trim()}>
            {saving ? 'Đang lưu...' : isEdit ? 'Lưu thay đổi' : 'Thêm truyện'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Drawer chi tiết truyện ──
function MangaDrawer({ manga, onClose, onEdit, onDelete }) {
  const st = STATUS_LABEL[manga.status]
  return (
    <div className="manga-detail-panel">
      <div className="manga-detail-header">
        <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-h)' }}>{manga.title}</span>
        <button className="btn btn--ghost btn--sm" onClick={onClose}>✕</button>
      </div>
      <div className="manga-detail-body">
        <div className="manga-detail-cover" style={{ background: manga.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 48, fontWeight: 700 }}>
          {manga.initials}
        </div>
        <div className="manga-detail-info">
          <div className="manga-detail-row"><div className="manga-detail-row-label">Tên</div><div className="manga-detail-row-val">{manga.title}</div></div>
          <div className="manga-detail-row"><div className="manga-detail-row-label">Tác giả</div><div className="manga-detail-row-val">{manga.author}</div></div>
          <div className="manga-detail-row">
            <div className="manga-detail-row-label">Thể loại</div>
            <div className="genre-tags">{manga.genre.map(g => <span key={g} className="genre-tag">{g}</span>)}</div>
          </div>
          <div className="manga-detail-row"><div className="manga-detail-row-label">Trạng thái</div><span className={`badge ${st.cls}`}>{st.label}</span></div>
          <div className="manga-detail-row"><div className="manga-detail-row-label">Số chương</div><div className="manga-detail-row-val">{manga.chapters}</div></div>
          <div className="manga-detail-row"><div className="manga-detail-row-label">Lượt đọc</div><div className="manga-detail-row-val">{formatReads(manga.reads)}</div></div>
          <div className="manga-detail-row"><div className="manga-detail-row-label">Ngày tạo</div><div className="manga-detail-row-val">{manga.createdAt}</div></div>
          <div className="manga-detail-row"><div className="manga-detail-row-label">Cập nhật</div><div className="manga-detail-row-val">{manga.updatedAt}</div></div>
        </div>
      </div>
      <div className="manga-detail-footer">
        <button className="btn btn--sm" onClick={onEdit}>✏ Sửa</button>
        <button className="btn btn--danger btn--sm" onClick={onDelete}>🗑 Xoá</button>
      </div>
    </div>
  )
}

export default function Manga() {
  const [list, setList]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [view, setView]         = useState('table') // 'table' | 'grid'
  const [selected, setSelected] = useState(null)    // drawer
  const [modal, setModal]       = useState(null)    // null | {} | {id,...}

  useEffect(() => {
    api.getMangaList().then(d => { setList(d); setLoading(false) })
  }, [])

  async function handleSave() {
    setModal(null)
    setLoading(true)
    const d = await api.getMangaList()
    setList(d)
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm('Xoá truyện này?')) return
    await api.deleteManga(id)
    setSelected(null)
    setList(l => l.filter(m => m.id !== id))
  }

  const filtered = list.filter(m => {
    const q = search.toLowerCase()
    const matchSearch = !q || m.title.toLowerCase().includes(q) || m.author.toLowerCase().includes(q)
    const matchStatus = !statusFilter || m.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="page">
      <div className="page-title">
        <h2>Quản lý truyện</h2>
        <p>{list.length} bộ truyện trong hệ thống</p>
      </div>

      {/* Toolbar */}
      <div className="table-toolbar">
        <input style={{ width: 220 }} placeholder="🔍 Tìm theo tên, tác giả..." value={search} onChange={e => setSearch(e.target.value)} />
        <select style={{ width: 160 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <div className="table-toolbar-right">
          <div className="view-toggle">
            <button className={`view-toggle-btn${view === 'table' ? ' active' : ''}`} onClick={() => setView('table')}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="14" height="3" rx="1"/><rect x="1" y="6.5" width="14" height="3" rx="1"/><rect x="1" y="12" width="14" height="3" rx="1"/></svg>
            </button>
            <button className={`view-toggle-btn${view === 'grid' ? ' active' : ''}`} onClick={() => setView('grid')}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
            </button>
          </div>
          <button className="btn btn--primary btn--sm" onClick={() => setModal({})}>+ Thêm truyện</button>
        </div>
      </div>

      {/* Loading */}
      {loading && <div className="page-empty"><div className="page-empty__icon">⏳</div><div className="page-empty__text">Đang tải...</div></div>}

      {/* Grid view */}
      {!loading && view === 'grid' && (
        <div className="manga-grid">
          {filtered.map(m => {
            const st = STATUS_LABEL[m.status]
            return (
              <div key={m.id} className="manga-card" onClick={() => setSelected(m)}>
                <div className="manga-card-cover" style={{ background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 32, fontWeight: 700 }}>
                  {m.initials}
                </div>
                <div className="manga-card-body">
                  <div className="manga-card-title">{m.title}</div>
                  <div className="manga-card-meta">
                    <span className="manga-card-chapters">{m.chapters} chương</span>
                    <span className={`badge ${st.cls}`} style={{ fontSize: 10 }}>{st.label}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Table view */}
      {!loading && view === 'table' && (
        <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="manga-table" style={{ fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ width: 36, padding: '10px 12px' }}></th>
                <th>Tên truyện</th>
                <th>Thể loại</th>
                <th>Chương</th>
                <th>Lượt đọc</th>
                <th>Trạng thái</th>
                <th>Cập nhật</th>
                <th style={{ width: 80 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => {
                const st = STATUS_LABEL[m.status]
                return (
                  <tr key={m.id}>
                    <td style={{ padding: '8px 12px' }}><div className="manga-table__cover" style={{ background: m.bg }}>{m.initials}</div></td>
                    <td>
                      <div className="manga-table__title">{m.title}</div>
                      <div className="manga-table__genre">{m.author}</div>
                    </td>
                    <td><div className="genre-tags">{m.genre.map(g => <span key={g} className="genre-tag">{g}</span>)}</div></td>
                    <td>{m.chapters}</td>
                    <td>{formatReads(m.reads)}</td>
                    <td><span className={`badge ${st.cls}`}>{st.label}</span></td>
                    <td style={{ fontSize: 12, opacity: 0.6 }}>{m.updatedAt}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn--ghost btn--sm" onClick={() => setSelected(m)}>👁</button>
                        <button className="btn btn--ghost btn--sm" onClick={() => setModal(m)}>✏</button>
                        <button className="btn btn--ghost btn--sm" onClick={() => handleDelete(m.id)}>🗑</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="page-empty" style={{ border: 'none' }}>
              <div className="page-empty__icon">🔍</div>
              <div className="page-empty__text">Không tìm thấy kết quả</div>
            </div>
          )}
        </div>
      )}

      {/* Drawer */}
      {selected && (
        <MangaDrawer
          manga={selected}
          onClose={() => setSelected(null)}
          onEdit={() => { setModal(selected); setSelected(null) }}
          onDelete={() => handleDelete(selected.id)}
        />
      )}

      {/* Modal */}
      {modal !== null && (
        <MangaModal manga={modal.id ? modal : null} onClose={() => setModal(null)} onSave={handleSave} />
      )}
    </div>
  )
}