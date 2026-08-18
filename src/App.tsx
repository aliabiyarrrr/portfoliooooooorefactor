import { useState, useCallback } from 'react'
import type { Page, WorkCategory, Project } from './data/siteData'
import { Nav } from './components/Nav'
import { HomeSection } from './components/HomeSection'
import { WorkSection } from './components/WorkSection'
import { ProjectDetail } from './components/ProjectDetail'
import { ServicesPage } from './components/ServicesPage'
import { AboutPage } from './components/AboutPage'
import { ContactPage } from './components/ContactPage'

/* ─── App ─────────────────────────────────────────────────────────────────── */

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [activeCat, setActiveCat] = useState<WorkCategory | null>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const navigate = useCallback((p: Page, cat?: WorkCategory) => {
    setPage(p)
    if (cat) setActiveCat(cat)
    if (p !== 'project') setActiveProject(null)
    window.scrollTo({ top: 0 })
  }, [])

  const openProject = useCallback((project: Project) => {
    setActiveProject(project)
    setPage('project')
    window.scrollTo({ top: 0 })
  }, [])

  const goToWork = useCallback(() => {
    setPage('work')
    setActiveProject(null)
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <div className="min-h-screen bg-[#0c0c0b]">
      <Nav
        page={page}
        navigate={navigate}
        onWorkClick={goToWork}
      />

      <main>
        {page === 'home' && <HomeSection navigate={navigate} />}
        {page === 'work' && (
          <WorkSection
            initialCategory={activeCat}
            onProjectOpen={openProject}
          />
        )}
        {page === 'project' && activeProject && (
          <ProjectDetail project={activeProject} onBack={goToWork} onOpenProject={openProject} />
        )}
        {page === 'services' && <ServicesPage onContact={() => navigate('contact')} />}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage />}
      </main>

      {page !== 'home' && page !== 'about' && page !== 'project' && page !== 'services' && page !== 'contact' && (
        <footer className="border-t border-[rgba(240,237,232,0.07)] px-8 md:px-12 py-7 flex items-center justify-between">
          <p className="text-[rgba(240,237,232,0.2)] text-[0.6rem] tracking-[0.14em] uppercase">
            © 2024 Ali Abiyar
          </p>
          <button
            onClick={() => navigate('home')}
            className="text-[rgba(240,237,232,0.2)] text-[0.6rem] tracking-[0.14em] uppercase hover:text-[rgba(240,237,232,0.5)] transition-colors"
          >
            Back to top ↑
          </button>
        </footer>
      )}
    </div>
  )
}
