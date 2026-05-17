import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Layout from '../components/Admin/Layout/Layout'
import Dashboard from '../pages/Admin/Dashboard/Dashboard'
import Manga from '../pages/Admin/Manga/Manga'
import Chapters from '../pages/Admin/Chapters/Chapters'
import Users from '../pages/Admin/Users/Users'
import Comments from '../pages/Admin/Comments/Comments'
import Reports from '../pages/Admin/Reports/Reports'
import Stats from '../pages/Admin/Stats/Stats'
import Settings from '../pages/Admin/Settings/Settings'
import Profile from '../pages/Admin/Profile/Profile'   // ← thêm

export default function AdminRoutes() {
  const navigate = useNavigate()
  const location = useLocation()
  const activePage = location.pathname.split('/').pop() || 'dashboard'

  return (
    <Layout activePage={activePage} onNavigate={(id) => navigate(`/admin/${id}`)}>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="manga"     element={<Manga />} />
        <Route path="chapters"  element={<Chapters />} />
        <Route path="users"     element={<Users />} />
        <Route path="comments"  element={<Comments />} />
        <Route path="reports"   element={<Reports />} />
        <Route path="stats"     element={<Stats />} />
        <Route path="settings"  element={<Settings />} />
        <Route path="profile"   element={<Profile />} />  {/* ← thêm */}
        <Route path="*"         element={<Navigate to="dashboard" />} />
      </Routes>
    </Layout>
  )
}