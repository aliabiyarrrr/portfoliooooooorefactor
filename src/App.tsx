import { useState, useCallback, useEffect } from 'react'
import type { Page, WorkCategory, Project } from './data/siteData'
import { PROJECTS } from './data/siteData'
import { Nav } from './components/Nav'
import { HomeSection } from './components/HomeSection'
import { WorkSection } from './components/WorkSection'
import { ProjectDetail } from './components/ProjectDetail'
import { ServicesPage } from './components/ServicesPage'
import { AboutPage } from './components/AboutPage'
import { ContactPage } from './components/ContactPage'

/* ─── URL helpers ─────────────────────────────────────────────────────────── */

function getPageFromURL(): {
  page: Page
  projectId: string | null
  category: WorkCategory | null
} {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (path.startsWith('/project/')) {
    const projectId = decodeURIComponent(path.split('/project/')[1] || '')
    return {
      page: 'project',
      projectId,
      category: null,
    }
  }

  if (path === '/contact') {
    return { page: 'contact', projectId: null, category: null }
  }

  if (path === '/about') {
    return { page: 'about', projectId: null, category: null }
  }

  if (path === '/services') {
    return { page: 'services', projectId: null, category: null }
  }

  if (path === '/work' || path === '/projects') {
    return { page: 'work', projectId: null, category: null }
  }

  return { page: 'home', projectId: null, category: null }
}

function getURL(
  page: Page,
  project?: Project | null,
  category?: WorkCategory | null
) {
  if (page === 'project' && project) {
    return `/project/${encodeURIComponent(project.id)}`
  }

  if (page === 'work') {
    if (category) {
      return `/work?category=${encodeURIComponent(category)}`
    }
    return '/work'
  }

  if (page === 'about') return '/about'
  if (page === 'services') return '/services'
  if (page === 'contact') return '/contact'

  return '/'
}

/* ─── App ─────────────────────────────────────────────────────────────────── */

export default function App() {
  const initialURL = getPageFromURL()

  const initialProject =
    initialURL.projectId
      ? PROJECTS.find((p) => p.id === initialURL.projectId) ?? null
      : null

  const [page, setPage] = useState<Page>(
    initialURL.page === 'project' && !initialProject
      ? 'work'
      : initialURL.page
  )

  const [activeCat, setActiveCat] = useState<WorkCategory | null>(
    initialURL.category
  )

  const [activeProject, setActiveProject] = useState<Project | null>(
    initialProject
  )

  /* ── Browser back / forward ── */

  useEffect(() => {
    const handlePopState = () => {
      const currentURL = getPageFromURL()

      const project = currentURL.projectId
        ? PROJECTS.find((p) => p.id === currentURL.projectId) ?? null
        : null

      setPage(
        currentURL.page === 'project' && !project
          ? 'work'
          : currentURL.page
      )

      setActiveCat(currentURL.category)
      setActiveProject(project)

      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  /* ── Navigation ── */

  const navigate = useCallback(
    (p: Page, cat?: WorkCategory) => {
      const url = getURL(p, null, cat ?? null)

      window.history.pushState({}, '', url)

      setPage(p)
      setActiveCat(cat ?? null)

      if (p !== 'project') {
        setActiveProject(null)
      }

      window.scrollTo({ top: 0, behavior: 'instant' })
    },
    []
  )

  /* ── Open project ── */

  const openProject = useCallback((project: Project) => {
    const url = getURL('project', project)

    window.history.pushState({}, '', url)

    setActiveProject(project)
    setPage('project')
    setActiveCat(null)

    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  /* ── Back to work ── */

  const goToWork = useCallback(() => {
    window.history.pushState({}, '', '/work')

    setPage('work')
    setActiveProject(null)
    setActiveCat(null)

    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="min-h-screen bg-[#0c0c0b]">

      <Nav
        page={page}
        navigate={navigate}
        onWorkClick={goToWork}
      />

      <main>

        {page === 'home' && (
          <HomeSection navigate={navigate} />
        )}

        {page === 'work' && (
          <WorkSection
            initialCategory={activeCat}
            onProjectOpen={openProject}
          />
        )}

        {page === 'project' && activeProject && (
          <ProjectDetail
            project={activeProject}
            onBack={goToWork}
            onOpenProject={openProject}
          />
        )}

        {page === 'services' && (
          <ServicesPage
            onContact={() => navigate('contact')}
          />
        )}

        {page === 'about' && (
          <AboutPage />
        )}

        {page === 'contact' && (
          <ContactPage />
        )}

      </main>

      {page !== 'home' &&
        page !== 'about' &&
        page !== 'project' &&
        page !== 'services' &&
        page !== 'contact' && (
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
