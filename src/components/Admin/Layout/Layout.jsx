import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './Layout.css'

export default function Layout({ children, activePage, onNavigate }) {
  return (
    <div className="layout">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <div className="layout__body">
        <Header onNavigate={onNavigate} />
        <main className="layout__content">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}