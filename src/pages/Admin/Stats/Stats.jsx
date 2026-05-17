import { useState, useEffect } from 'react'
import { api } from '../../../api/index.js'
import './Stats.css'

function formatNum(n) {
  if (n >= 1000000) return `${(n/1000000).toFixed(1)}M`
  if (n >= 1000)    return `${(n/1000).toFixed(0)}K`
  return n
}

export default function Stats() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [range, setRange]     = useState('6m')

  useEffect(() => { api.getStats().then(d => { setData(d); setLoading(false) }) }, [])

  if (loading) return <div className="page"><div className="page-empty"><div className="page-empty__icon">⏳</div><div className="page-empty__text">Đang tải...</div></div></div>

  const maxReads = Math.max(...data.monthly.map(m => m.reads))
  const maxUsers = Math.max(...data.monthly.map(m => m.users))
  const maxTop   = data.topManga[0].reads

  // Donut for device split (CSS conic-gradient)
  const conicStop = data.deviceSplit.reduce((acc, d, i) => {
    const prev = acc.total
    acc.total += d.pct
    acc.parts.push(`${d.color} ${prev}% ${acc.total}%`)
    return acc
  }, { total: 0, parts: [] })

  return (
    <div className="page">
      <div className="page-title">
        <h2>Thống kê</h2>
        <p>Tổng quan hoạt động của hệ thống</p>
      </div>

      {/* Date range */}
      <div className="table-toolbar">
        <div className="date-range-picker">
          {[['7d','7 ngày'],['1m','1 tháng'],['6m','6 tháng'],['1y','1 năm']].map(([v,l]) => (
            <button key={v} className={`date-range-btn${range === v ? ' active' : ''}`} onClick={() => setRange(v)}>{l}</button>
          ))}
        </div>
      </div>

      {/* Overview stats */}
      <div className="dashboard__stats">
        {data.overview.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-card__label">{s.label}</div>
            <div className="stat-card__value">{s.value}</div>
            <div className={`stat-card__delta stat-card__delta--${s.dir}`}>{s.dir === 'up' ? '↑' : '↓'} {s.delta}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="stats-layout">
        {/* Monthly reads bar chart */}
        <div className="panel full">
          <div className="panel__title">Lượt đọc theo tháng</div>
          <div className="chart-legend" style={{ marginBottom: 8 }}>
            <div className="legend-item"><div className="legend-dot purple" />Lượt đọc</div>
            <div className="legend-item"><div className="legend-dot teal" />Người dùng mới</div>
          </div>
          <div className="chart-container">
            {data.monthly.map((m, i) => (
              <div key={i} className="chart-bar-group">
                <div className="chart-bar-series purple" style={{ height: Math.round((m.reads / maxReads) * 160) }} title={formatNum(m.reads)} />
                <div className="chart-bar-series teal"   style={{ height: Math.round((m.users / maxUsers) * 160) }} title={m.users} />
              </div>
            ))}
          </div>
          <div className="chart-x-labels">
            {data.monthly.map((m, i) => <div key={i} className="chart-x-label">{m.month}</div>)}
          </div>
        </div>

        {/* Top manga */}
        <div className="panel">
          <div className="panel__title">Top truyện được đọc nhiều nhất</div>
          <div className="stats-top-list">
            {data.topManga.map((m, i) => (
              <div key={i} className="stats-top-item">
                <div className="stats-top-rank">#{i+1}</div>
                <div className="stats-top-bar-wrap">
                  <div className="stats-top-name">{m.title}</div>
                  <div className="stats-top-bar-track">
                    <div className="stats-top-bar-fill" style={{ width: `${Math.round(m.reads/maxTop*100)}%` }} />
                  </div>
                </div>
                <div className="stats-top-val">{formatNum(m.reads)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Device split donut */}
        <div className="panel">
          <div className="panel__title">Thiết bị truy cập</div>
          <div className="donut-wrap">
            <div className="donut" style={{ background: `conic-gradient(${conicStop.parts.join(',')})` }}>
              <div className="donut-center">{data.deviceSplit[0].pct}%</div>
            </div>
            <div className="donut-legend">
              {data.deviceSplit.map(d => (
                <div key={d.label} className="donut-legend-item">
                  <div className="donut-legend-color" style={{ background: d.color }} />
                  {d.label}
                  <span className="donut-legend-val">{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}