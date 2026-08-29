import { useState, useCallback, useEffect } from 'react'
import type { Page, WorkCategory, Project } from './data/siteData'
import { PROJECTS } from './data/siteData'
import { Nav } from './components/Nav'
import { HomeSection } from './components/HomeSection'
import { WorkSection } from './components/WorkSection'
import { ProjectDetail } from './components/ProjectDetail'
import { AboutPage } from './components/AboutPage'
import { ContactPage } from './components/ContactPage'

/* ─── URL helpers ─────────────────────────────────────────────────────────── */

/*
 * Convert project title into a clean URL slug.
 *
 * Example:
 * "Summer Campaign 2026" → "summer-campaign-2026"
 * "My Project!" → "my-project"
 */
function slugify(title: string): string {
  return title
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}\-_]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/*
 * Find a project using its URL slug.
 */
function getProjectFromSlug(slug: string): Project | null {
  const decodedSlug = decodeURIComponent(slug)

  return (
    PROJECTS.find(
      (project) => slugify(project.title) === decodedSlug
    ) ?? null
  )
}

function getPageFromURL(): {
  page: Page
  projectId: string | null
  category: WorkCategory | null
} {
  const path =
    window.location.pathname.replace(/\/+$/, '') || '/'

  if (path.startsWith('/project/')) {
    const projectSlug = decodeURIComponent(
      path.split('/project/')[1] || ''
    )

    return {
      page: 'project',
      projectId: projectSlug,
      category: null,
    }
  }

  if (path === '/contact') {
    return {
      page: 'contact',
      projectId: null,
      category: null,
    }
  }

  if (path === '/about') {
    return {
      page: 'about',
      projectId: null,
      category: null,
    }
  }

  if (path === '/work' || path === '/projects') {
    return {
      page: 'work',
      projectId: null,
      category: null,
    }
  }

  /*
   * Services is intentionally kept in the codebase
   * but is currently hidden from the website.
   */
  if (path === '/services') {
    return {
      page: 'home',
      projectId: null,
      category: null,
    }
  }

  return {
    page: 'home',
    projectId: null,
    category: null,
  }
}

function getURL(
  page: Page,
  project?: Project | null,
  category?: WorkCategory | null
) {
  if (page === 'project' && project) {
    return `/project/${encodeURIComponent(
      slugify(project.title)
    )}`
  }

  if (page === 'work') {
    if (category) {
      return `/projects?category=${encodeURIComponent(category)}`
    }

    return '/projects'
  }

  if (page === 'about') return '/about'
  if (page === 'contact') return '/contact'

  return '/'
}

/* ─── App ─────────────────────────────────────────────────────────────────── */

export default function App() {
  const initialURL = getPageFromURL()

  const initialProject =
    initialURL.projectId
      ? getProjectFromSlug(initialURL.projectId)
      : null

  const [page, setPage] = useState<Page>(
    initialURL.page === 'project' && !initialProject
      ? 'work'
      : initialURL.page
  )

  const [activeCat, setActiveCat] =
    useState<WorkCategory | null>(
      initialURL.category
    )

  const [activeProject, setActiveProject] =
    useState<Project | null>(
      initialProject
    )

  /* ── Browser back / forward ── */

  useEffect(() => {
    const handlePopState = () => {
      const currentURL = getPageFromURL()

      const project =
        currentURL.projectId
          ? getProjectFromSlug(
              currentURL.projectId
            )
          : null

      setPage(
        currentURL.page === 'project' && !project
          ? 'work'
          : currentURL.page
      )

      setActiveCat(currentURL.category)
      setActiveProject(project)

      window.scrollTo({
        top: 0,
        behavior: 'instant',
      })
    }

    window.addEventListener(
      'popstate',
      handlePopState
    )

    return () => {
      window.removeEventListener(
        'popstate',
        handlePopState
      )
    }
  }, [])

  /* ── Navigation ── */

  const navigate = useCallback(
    (p: Page, cat?: WorkCategory) => {
      /*
       * Services is temporarily disabled.
       * The page/component itself is not deleted.
       */
      if (p === 'services') {
        return
      }

      const url = getURL(
        p,
        null,
        cat ?? null
      )

      window.history.pushState({}, '', url)

      setPage(p)
      setActiveCat(cat ?? null)

      if (p !== 'project') {
        setActiveProject(null)
      }

      window.scrollTo({
        top: 0,
        behavior: 'instant',
      })
    },
    []
  )

  /* ── Open project ── */

  const openProject = useCallback(
    (project: Project) => {
      const url = getURL(
        'project',
        project
      )

      window.history.pushState(
        {},
        '',
        url
      )

      setActiveProject(project)
      setPage('project')
      setActiveCat(null)

      window.scrollTo({
        top: 0,
        behavior: 'instant',
      })
    },
    []
  )

  /* ── Back to work ── */

  const goToWork = useCallback(() => {
    window.history.pushState(
      {},
      '',
      '/projects'
    )

    setPage('work')
    setActiveProject(null)
    setActiveCat(null)

    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
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
          <HomeSection
            navigate={navigate}
          />
        )}

        {page === 'work' && (
          <WorkSection
            initialCategory={activeCat}
            onProjectOpen={openProject}
          />
        )}

        {page === 'project' &&
          activeProject && (
            <ProjectDetail
              project={activeProject}
              onBack={goToWork}
              onOpenProject={openProject}
            />
          )}

        {page === 'about' && (
          <AboutPage />
        )}

        {page === 'contact' && (
          <ContactPage />
        )}

      </main>

    </div>
  )
}
