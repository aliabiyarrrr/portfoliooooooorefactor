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
 * Convert project title to a clean URL slug.
 *
 * Example:
 * "Red Season"      → "red-season"
 * "Noir Study"      → "noir-study"
 * "My New Project!" → "my-new-project"
 */
function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/*
 * Convert category name to URL slug.
 *
 * Fashion              → fashion
 * Commercial           → commercial
 * Portraits            → portraits
 * Cafe & Restaurants   → cafe-restaurants
 * Videos               → videos
 */
function categorySlug(category: WorkCategory): string {
  return slugify(category)
}

/*
 * Find the original WorkCategory from its URL slug.
 */
function categoryFromSlug(slug: string): WorkCategory | null {
  const category = WORK_CATEGORIES.find(
    (cat) => categorySlug(cat) === slug
  )

  return category ?? null
}

/*
 * We import the categories separately here so the URL parser
 * can validate category slugs.
 */
import { WORK_CATEGORIES } from './data/siteData'

function getPageFromURL(): {
  page: Page
  projectId: string | null
  category: WorkCategory | null
} {
  const path =
    window.location.pathname.replace(/\/+$/, '') || '/'

  /* ── Project URL ─────────────────────────────────────────────────────── */

  /*
   * Expected:
   * /projects/fashion/red-season
   * /projects/commercial/rosehip-campaign
   * /projects/cafe-restaurants/the-hearth
   */
  if (path.startsWith('/projects/')) {
    const parts = path
      .split('/')
      .filter(Boolean)

    /*
     * parts:
     * ["projects", "fashion", "red-season"]
     */
    if (parts.length >= 3) {
      const categorySlugValue = decodeURIComponent(parts[1])
      const projectSlug = decodeURIComponent(
        parts.slice(2).join('/')
      )

      const category =
        categoryFromSlug(categorySlugValue)

      if (category) {
        const project = PROJECTS.find(
          (p) =>
            p.category === category &&
            slugify(p.title) === projectSlug
        )

        if (project) {
          return {
            page: 'project',
            projectId: project.id,
            category,
          }
        }
      }
    }
  }

  /* ── Legacy project URL support ─────────────────────────────────────── */

  /*
   * This keeps old URLs such as:
   * /project/red-season
   *
   * working if someone has an old link.
   */
  if (path.startsWith('/project/')) {
    const projectId = decodeURIComponent(
      path.split('/project/')[1] || ''
    )

    const project = PROJECTS.find(
      (p) =>
        p.id === projectId ||
        slugify(p.title) === projectId
    )

    return {
      page: project ? 'project' : 'work',
      projectId: project?.id ?? null,
      category: project?.category ?? null,
    }
  }

  /* ── Contact ─────────────────────────────────────────────────────────── */

  if (path === '/contact') {
    return {
      page: 'contact',
      projectId: null,
      category: null,
    }
  }

  /* ── About ───────────────────────────────────────────────────────────── */

  if (path === '/about') {
    return {
      page: 'about',
      projectId: null,
      category: null,
    }
  }

  /* ── Work / Projects ────────────────────────────────────────────────── */

  if (path === '/work' || path === '/projects') {
    const params = new URLSearchParams(
      window.location.search
    )

    const categoryParam = params.get('category')

    const category = categoryParam
      ? categoryFromSlug(categoryParam) ??
        (WORK_CATEGORIES.includes(
          categoryParam as WorkCategory
        )
          ? (categoryParam as WorkCategory)
          : null)
      : null

    return {
      page: 'work',
      projectId: null,
      category,
    }
  }

  /* ── Services ────────────────────────────────────────────────────────── */

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

  /* ── Home ────────────────────────────────────────────────────────────── */

  return {
    page: 'home',
    projectId: null,
    category: null,
  }
}

/* ─── URL generator ──────────────────────────────────────────────────────── */

function getURL(
  page: Page,
  project?: Project | null,
  category?: WorkCategory | null
) {
  /* ── Project ─────────────────────────────────────────────────────────── */

  if (page === 'project' && project) {
    const categoryPath = categorySlug(
      project.category
    )

    const projectPath = slugify(
      project.title
    )

    return `/projects/${categoryPath}/${projectPath}`
  }

  /* ── Work ────────────────────────────────────────────────────────────── */

  if (page === 'work') {
    if (category) {
      return `/projects?category=${encodeURIComponent(
        categorySlug(category)
      )}`
    }

    return '/projects'
  }

  /* ── Other pages ─────────────────────────────────────────────────────── */

  if (page === 'about') {
    return '/about'
  }

  if (page === 'contact') {
    return '/contact'
  }

  return '/'
}

/* ─── App ─────────────────────────────────────────────────────────────────── */

export default function App() {
  const initialURL = getPageFromURL()

  const initialProject =
    initialURL.projectId
      ? PROJECTS.find(
          (p) => p.id === initialURL.projectId
        ) ?? null
      : null

  const [page, setPage] = useState<Page>(
    initialURL.page === 'project' &&
    !initialProject
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

  /* ── Browser back / forward ─────────────────────────────────────────── */

  useEffect(() => {
    const handlePopState = () => {
      const currentURL = getPageFromURL()

      const project =
        currentURL.projectId
          ? PROJECTS.find(
              (p) =>
                p.id === currentURL.projectId
            ) ?? null
          : null

      setPage(
        currentURL.page === 'project' &&
        !project
          ? 'work'
          : currentURL.page
      )

      setActiveCat(
        currentURL.category
      )

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

  /* ── Navigation ─────────────────────────────────────────────────────── */

  const navigate = useCallback(
    (
      p: Page,
      cat?: WorkCategory
    ) => {
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

      window.history.pushState(
        {},
        '',
        url
      )

      setPage(p)

      setActiveCat(
        cat ?? null
      )

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

  /* ── Open project ───────────────────────────────────────────────────── */

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

  /* ── Back to work ───────────────────────────────────────────────────── */

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

  /* ── Render ──────────────────────────────────────────────────────────── */

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
