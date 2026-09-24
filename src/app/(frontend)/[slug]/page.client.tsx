'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

const normalizeHash = (hash: string) => hash.replace(/^#/, '').trim().toLowerCase()

const scrollToHash = (hash: string): boolean => {
  if (!hash) return false
  const el = document.getElementById(normalizeHash(hash))
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return Boolean(el)
}

const scrollToHashWithRetry = (hash: string, attempts = 12) => {
  let tries = 0
  const tick = () => {
    if (scrollToHash(hash)) return
    if (tries++ < attempts) requestAnimationFrame(tick)
  }
  tick()
}

const PageClient: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  useEffect(() => {
    // 1) Direct load / hard navigation with a hash
    scrollToHashWithRetry(window.location.hash)

    // 2) Back/forward or hash-only URL changes
    const onHashChange = () => scrollToHashWithRetry(window.location.hash)
    window.addEventListener('hashchange', onHashChange)

    const clean = (p: string) => (p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p)

    // 3) Capture phase (before next/link's handler, which calls
    //    preventDefault() and hands the URL to the router). The router
    //    treats a repeated click on the already-active "#hash" URL as a
    //    no-op, so we force the scroll ourselves on every click.
    const onClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = (e.target as Element).closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute('href') || ''
      const i = href.indexOf('#')
      if (i <= 0) return // bare "#" or no hash → leave to the browser
      const path = href.slice(0, i)
      const hash = href.slice(i)
      const samePage = path === '' || clean(path) === clean(window.location.pathname)
      if (!samePage || hash.length < 2) return
      if (scrollToHash(hash)) {
        e.preventDefault() // stop next/link swallowing it
        window.history.replaceState({}, '', `${window.location.pathname}${hash}`)
      }
    }
    document.addEventListener('click', onClick, true)

    return () => {
      window.removeEventListener('hashchange', onHashChange)
      document.removeEventListener('click', onClick, true)
    }
  }, [])

  return <React.Fragment />
}

export default PageClient