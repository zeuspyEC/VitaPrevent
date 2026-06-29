import { useCallback, useEffect, useRef } from 'react'

let announcerEl = null

function getAnnouncer() {
  if (announcerEl) return announcerEl
  announcerEl = document.createElement('div')
  announcerEl.setAttribute('aria-live', 'polite')
  announcerEl.setAttribute('aria-atomic', 'true')
  announcerEl.className = 'sr-only'
  announcerEl.id = 'global-announcer'
  document.body.appendChild(announcerEl)
  return announcerEl
}

export function useAnnouncer() {
  const timerRef = useRef(null)

  useEffect(() => {
    getAnnouncer()
    return () => clearTimeout(timerRef.current)
  }, [])

  const announce = useCallback((message, delay = 100) => {
    const el = getAnnouncer()
    clearTimeout(timerRef.current)
    el.textContent = ''
    timerRef.current = setTimeout(() => {
      el.textContent = message
    }, delay)
  }, [])

  return announce
}
