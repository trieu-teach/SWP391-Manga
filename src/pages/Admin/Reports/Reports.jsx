import { useState, useEffect } from 'react'
import { api } from '../../../api/index.js'
import './Reports.css'

const SEV_CLS    = { high: 'severity-high badge', medium: 'severity-medium badge', low: 'severity-low badge' }
const SEV_LABEL  = { high: 'Nghiêm trọng', medium: 'Trung bình', low: 'Nhẹ' }
const STATUS_CLS = { pending: 'badge--hiatus', reviewing: 'badge--ongoing', resolved: 'badge--completed' }
const STATUS_LABEL = { pending: 'Chờ xử lý', reviewing: 'Đang xem xét', resolved: 'Đã xử lý' }

const RESOLUTIONS = [
  { value: 'warn',   label: 'Cảnh cáo người dùng', desc: 'Gửi email cảnh báo về hành vi vi phạm' },
  { value: 'ban7',   label: 'Khoá 7 ngày',         desc: 'Tạm khoá tài khoản trong 7 ngày' },
  { value: 'ban30',  label: 'Khoá 30 ngày',        desc: 'Tạm khoá tài khoản trong 30 ngày' },
  { value: 'remove', label: 'Xoá nội dung',         desc: 'Xoá nội dung vi phạm và thông báo' },
  { value: 'ignore', label: 'Bỏ qua',               desc: 'Báo cáo không hợp lệ, không có hành động' },
]

function ResolveModal({ report, onClose, onResolve }) {
  const [pick, setPick] = useState('')
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleResolve() {
    if (!pick) return
    setSaving(true)
    const res = RESOLUTIONS.find(r => r.value === pick)
    await onResolve(report.id, { resolution: res.label + (note ? ` — ${note}` : '') })
    setSaving(false)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Xử lý báo cáo {report.id}</h3>
          <button className="btn btn--ghost btn--sm" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: 'var(--text-h)', marginBottom: 6 }}>{report.description}</div>
          </div>
          <div className="field" style={{ marginBottom: 14 }}>
            <label>Hành động xử lý</label>
            <div className="resolution-options">
              {RESOLUTIONS.map(r => (
                <div key={r.value} className={`resolution-option${pick === r.value ? ' selected' : ''}`} onClick={() => setPick(r.value)}>
                  <div className="resolution-option-radio" />
                  <div>
                    <div className="resolution-option-label">{r.label}</div>
                    <div className="resolution-option-desc">{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Ghi chú (tuỳ chọn)</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Ghi chú thêm về quyết định xử lý..." rows={3} />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn" onClick={onClose}>Huỷ</button>
          <button className="btn btn--primary" onClick={handleResolve} disabled={!pick || saving}>
            {saving ? 'Đang xử lý...' : 'Xác nhận xử lý'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Reports() {
  const [list, setList]       = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState('all')
  const [modal, setModal]     = useState(null)

  useEffect(() => { api.getReports().then(d => { setList(d); setLoading(false) }) }, [])

  async function handleResolve(id, data) {
    await api.resolveReport(id, data)
    setList(l => l.map(r => r.id === id ? { ...r, status: 'resolved', ...data } : r))
  }

  const filtered = list.filter(r => filter === 'all' || r.status === filter)
  const counts = { pending: list.filter(r => r.status === 'pending').length, reviewing: list.filter(r => r.status === 'reviewing').length, resolved: list.filter(r => r.status === 'resolved').length }

  return (
    <div className="page">
      <div className="page-title">
        <h2>Báo cáo</h2>
        <p>{counts.pending} báo cáo đang chờ xử lý</p>
      </div>

      {/* Stats row */}
      <div className="report-stats-row">
        {[
          { label: 'Chờ xử lý',    val: counts.pending,   icon: '⏳', cls: 'badge--hiatus'    },
          { label: 'Đang xem xét', val: counts.reviewing, icon: '🔍', cls: 'badge--ongoing'   },
          { label: 'Đã xử lý',     val: counts.resolved,  icon: '✅', cls: 'badge--completed' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-card__label">{s.label}</div>
            <div className="stat-card__value">{s.val}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="table-toolbar">
        {['all','pending','reviewing','resolved'].map(f => (
          <button key={f} className={`btn btn--sm${filter === f ? ' btn--primary' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'Tất cả' : STATUS_LABEL[f]}
          </button>
        ))}
      </div>

      {loading && <div className="page-empty"><div className="page-empty__icon">⏳</div><div className="page-empty__text">Đang tải...</div></div>}

      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(r => (
            <div key={r.id} className="report-card">
              <div className="report-card-header">
                <div className="report-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                </div>
                <div className="report-card-meta">
                  <div className="report-card-type">{r.type}</div>
                  <div className="report-card-id">{r.id}</div>
                </div>
                <span className={SEV_CLS[r.severity]}>{SEV_LABEL[r.severity]}</span>
                <span className={`badge ${STATUS_CLS[r.status]}`}>{STATUS_LABEL[r.status]}</span>
              </div>
              <div className="report-card-body">{r.description}</div>
              <div className="report-card-footer">
                <div className="report-card-reporter">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                  {r.reporter} → {r.target}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="report-card-date">{r.createdAt}</span>
                  {r.status !== 'resolved' && (
                    <button className="btn btn--primary btn--sm" onClick={() => setModal(r)}>Xử lý →</button>
                  )}
                  {r.status === 'resolved' && (
                    <span style={{ fontSize: 12, color: 'var(--teal-text)' }}>✓ {r.resolution}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="page-empty">
              <div className="page-empty__icon">🎉</div>
              <div className="page-empty__text">Không có báo cáo nào</div>
            </div>
          )}
        </div>
      )}

      {modal && <ResolveModal report={modal} onClose={() => setModal(null)} onResolve={handleResolve} />}
    </div>
  )
}