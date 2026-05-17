import { useState, useEffect } from 'react'
import { api } from '../../../api/index.js'
import './Chapters.css'

function ChapterModal({ mangaId, onClose, onSave }) {
  const [form, setForm] = useState({ number: '', title: '', pages: '' })
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function handleSave() {
    if (!form.number) return
    setSaving(true)
    await api.createChapter({ ...form, mangaId, uploadedBy: 'Admin', uploadedAt: new Date().toISOString().slice(0,10) })
    setSaving(false)
    onSave()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Thêm chương mới</h3>
          <button className="btn btn--ghost btn--sm" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="chapter-form-grid">
            <div className="field">
              <label>Số chương *</label>
              <input type="number" value={form.number} onChange={e => set('number', e.target.value)} placeholder="143" />
            </div>
            <div className="field">
              <label>Số trang</label>
              <input type="number" value={form.pages} onChange={e => set('pages', e.target.value)} placeholder="24" />
            </div>
            <div className="field full">
              <label>Tiêu đề chương</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Tên chương (tuỳ chọn)" />
            </div>
            <div className="field full">
              <label>Tải ảnh lên</label>
              <div className="upload-zone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 16l4-4 4 4 4-8 4 8"/><rect x="2" y="3" width="20" height="18" rx="2"/></svg>
                <p>Kéo thả ảnh vào đây</p>
                <span>PNG, JPG, WEBP — tối đa 50MB</span>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn" onClick={onClose}>Huỷ</button>
          <button className="btn btn--primary" onClick={handleSave} disabled={saving || !form.number}>
            {saving ? 'Đang lưu...' : 'Thêm chương'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Chapters() {
  const [mangaList, setMangaList]   = useState([])
  const [selectedManga, setSelectedManga] = useState(null)
  const [chapters, setChapters]     = useState([])
  const [loading, setLoading]       = useState(false)
  const [modal, setModal]           = useState(false)

  useEffect(() => {
    api.getMangaList().then(d => {
      setMangaList(d)
      if (d.length > 0) setSelectedManga(d[0])
    })
  }, [])

  useEffect(() => {
    if (!selectedManga) return
    setLoading(true)
    api.getChaptersByManga(selectedManga.id).then(d => { setChapters(d); setLoading(false) })
  }, [selectedManga])

  async function handleDelete(id) {
    if (!confirm('Xoá chương này?')) return
    await api.deleteChapter(id)
    setChapters(c => c.filter(ch => ch.id !== id))
  }

  async function handleSave() {
    setModal(false)
    setLoading(true)
    const d = await api.getChaptersByManga(selectedManga.id)
    setChapters(d)
    setLoading(false)
  }

  return (
    <div className="page">
      <div className="page-title">
        <h2>Chương truyện</h2>
        <p>Quản lý chương cho từng bộ truyện</p>
      </div>

      {/* Manga selector */}
      {selectedManga && (
        <div className="manga-selector">
          <div className="manga-selector-cover" style={{ background: selectedManga.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>
            {selectedManga.initials}
          </div>
          <div className="manga-selector-info">
            <div className="manga-selector-name">{selectedManga.title}</div>
            <div className="manga-selector-count">{selectedManga.chapters} chương</div>
          </div>
          <select
            style={{ width: 200 }}
            value={selectedManga.id}
            onChange={e => setSelectedManga(mangaList.find(m => m.id === Number(e.target.value)))}
          >
            {mangaList.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
          </select>
        </div>
      )}

      {/* Toolbar */}
      <div className="table-toolbar">
        <span style={{ fontSize: 13, color: 'var(--text)', opacity: 0.7 }}>{chapters.length} chương</span>
        <div className="table-toolbar-right">
          <button className="btn btn--primary btn--sm" onClick={() => setModal(true)}>+ Thêm chương</button>
        </div>
      </div>

      {loading && <div className="page-empty"><div className="page-empty__icon">⏳</div><div className="page-empty__text">Đang tải...</div></div>}

      {!loading && (
        <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="manga-table">
            <thead>
              <tr>
                <th>Chương</th>
                <th>Tiêu đề</th>
                <th>Số trang</th>
                <th>Đăng bởi</th>
                <th>Ngày đăng</th>
                <th style={{ width: 80 }}></th>
              </tr>
            </thead>
            <tbody>
              {chapters.map(ch => (
                <tr key={ch.id}>
                  <td><span className="ch-number">#{ch.number}</span></td>
                  <td>{ch.title || <span style={{ opacity: 0.4 }}>—</span>}</td>
                  <td>
                    <div className="pages-preview">
                      <span className="pages-count">{ch.pages} trang</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, opacity: 0.7 }}>{ch.uploadedBy}</td>
                  <td style={{ fontSize: 12, opacity: 0.7 }}>{ch.uploadedAt}</td>
                  <td>
                    <button className="btn btn--danger btn--sm" onClick={() => handleDelete(ch.id)}>🗑 Xoá</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {chapters.length === 0 && !loading && (
            <div className="page-empty" style={{ border: 'none' }}>
              <div className="page-empty__icon">📭</div>
              <div className="page-empty__text">Chưa có chương nào</div>
            </div>
          )}
        </div>
      )}

      {modal && selectedManga && (
        <ChapterModal mangaId={selectedManga.id} onClose={() => setModal(false)} onSave={handleSave} />
      )}
    </div>
  )
}