import { useState, useEffect } from 'react'
import { api } from '../../../api/index.js'
import './Profile.css'

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getProfile()
      .then(setProfile)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page-empty"><div className="page-empty__text">Đang tải...</div></div>

  return (
    <div className="page">
      <div className="page-title">
        <h2>Hồ sơ</h2>
        <p>Thông tin tài khoản Admin</p>
      </div>

      <div className="profile-wrap">

        <div className="panel profile-card">
          <div className="profile-avatar">{profile.initials}</div>
          <div className="profile-name">{profile.name}</div>
          <div className="profile-role">{profile.role}</div>
        </div>

        <div className="panel profile-info">
          <div className="panel-title">Thông tin cá nhân</div>

          <div className="profile-field">
            <div className="profile-field__label">Họ tên</div>
            <div className="profile-field__value">{profile.name}</div>
          </div>
          <div className="profile-field">
            <div className="profile-field__label">Email</div>
            <div className="profile-field__value">{profile.email}</div>
          </div>
          <div className="profile-field">
            <div className="profile-field__label">Vai trò</div>
            <div className="profile-field__value">
              <span className="profile-badge">{profile.role}</span>
            </div>
          </div>
          <div className="profile-field">
            <div className="profile-field__label">Ngày tạo</div>
            <div className="profile-field__value">{profile.createdAt}</div>
          </div>
          <div className="profile-field">
            <div className="profile-field__label">Trạng thái</div>
            <div className="profile-field__value">
              <span className={`profile-badge ${profile.status === 'active' ? 'profile-badge--green' : ''}`}>
                {profile.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
              </span>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn btn--primary btn--sm">✏️ Chỉnh sửa</button>
            <button className="btn btn--sm">🔑 Đổi mật khẩu</button>
          </div>
        </div>

      </div>
    </div>
  )
}