import { useState, useEffect } from 'react'
import { api } from '../../../api/index.js'
import './Dashboard.css'

const STATUS_LABEL = {
  ongoing: { label: 'Đang ra', cls: 'badge--ongoing' },
  completed: { label: 'Hoàn thành', cls: 'badge--completed' },
  hiatus: { label: 'Tạm dừng', cls: 'badge--hiatus' },
}

function StatsRow({ stats }) {
  return (
    <div className="dashboard__stats">
      {stats.map(s => (
        <div key={s.label} className="stat-card">
          <div className="stat-card__label">{s.label}</div>
          <div className="stat-card__value">{s.value}</div>
          <div className={`stat-card__delta stat-card__delta--${s.dir}`}>
            {s.dir === 'up' ? '↑' : '⚠'} {s.delta}
          </div>
        </div>
      ))}
    </div>
  )
}

function BarChart({ data }) {
  const maxReads = Math.max(...data.map(d => d.reads))
  return (
    <div className="panel">
      <div className="panel__title">
        Lượt đọc 7 ngày qua
        <button className="panel__link">Xem chi tiết →</button>
      </div>
      <div className="chart__bars">
        {data.map(d => {
          const readH = Math.round((d.reads / maxReads) * 110)
          const newH = Math.round((d.newCh / maxReads) * 110)
          return (
            <div key={d.day} className="chart__group">
              <div className="chart__pair">
                <div className="chart__bar chart__bar--reads" style={{ height: readH }} />
                <div className="chart__bar chart__bar--new" style={{ height: newH }} />
              </div>
              <div className="chart__day-label">{d.day}</div>
            </div>
          )
        })}
      </div>
      <div className="chart__legend">
        <div className="chart__legend-item"><div className="chart__legend-dot" style={{ background: 'var(--red)' }} />Lượt đọc</div>
        <div className="chart__legend-item"><div className="chart__legend-dot" style={{ background: 'var(--gold)' }} />Chương mới</div>
      </div>
    </div>
  )
}

function GenrePanel({ genres }) {
  return (
    <div className="panel">
      <div className="panel__title">Thể loại phổ biến</div>
      <div className="genre__list">
        {genres.map(g => (
          <div key={g.name}>
            <div className="genre__top">
              <span className="genre__name">{g.name}</span>
              <span className="genre__pct">{g.pct}%</span>
            </div>
            <div className="genre__track">
              <div className="genre__fill" style={{ width: `${g.pct}%`, background: g.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MangaTable({ topManga }) {
  return (
    <div className="panel">
      <div className="panel__title">
        Truyện nổi bật
        <button className="panel__link">Xem tất cả →</button>
      </div>
      <table className="manga-table">
        <thead>
          <tr>
            <th style={{ width: 36 }}></th>
            <th>Tên truyện</th>
            <th>Chương</th>
            <th>Lượt đọc</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {topManga.map(m => {
            const st = STATUS_LABEL[m.status]
            return (
              <tr key={m.title}>
                <td><div className="manga-table__cover" style={{ background: m.bg }}>{m.initials}</div></td>
                <td>
                  <div className="manga-table__title">{m.title}</div>
                  <div className="manga-table__genre">{m.genre}</div>
                </td>
                <td>{m.chapters}</td>
                <td>{m.reads}</td>
                <td><span className={`badge ${st.cls}`}>{st.label}</span></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function ActivityFeed({ activities }) {
  function renderText(a) {
    if (!a.bold?.length) return a.text
    let result = a.text
    const parts = []
    let remaining = a.text
    a.bold.forEach(word => {
      const idx = remaining.indexOf(word)
      if (idx === -1) return
      if (idx > 0) parts.push(remaining.slice(0, idx))
      parts.push(<strong key={word}>{word}</strong>)
      remaining = remaining.slice(idx + word.length)
    })
    if (remaining) parts.push(remaining)
    return parts.length ? parts : result
  }

  return (
    <div className="panel">
      <div className="panel__title">
        Hoạt động gần đây
        <button className="panel__link">Tất cả →</button>
      </div>
      <div className="activity__list">
        {activities.map((a, i) => (
          <div key={i} className="activity__item">
            <div className={`activity__icon activity__icon--${a.type}`}>{a.icon}</div>
            <div>
              <div className="activity__text">{renderText(a)}</div>
              <div className="activity__time">{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { api.getDashboard().then(d => { setData(d); setLoading(false) }) }, [])

  if (loading) return (
    <div className="dashboard">
      <div className="page-title"><h2>Dashboard</h2></div>
      <div className="page-empty"><div className="page-empty__icon">⏳</div><div className="page-empty__text">Đang tải...</div></div>
    </div>
  )

  return (
    <div className="dashboard">
      <div className="page-title">
        <h2>Dashboard</h2>
        <p>{new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <StatsRow stats={data.stats} />
      <div className="dashboard__middle">
        <BarChart data={data.chartData} />
        <GenrePanel genres={data.genres} />
      </div>
      <div className="dashboard__bottom">
        <MangaTable topManga={data.topManga} />
        <ActivityFeed activities={data.activities} />
      </div>
    </div>
  )
}