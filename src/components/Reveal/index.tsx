'use client'

import React, {
  Children,
  createContext,
  Fragment,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from '@/utilities/ui'

/* ============================================================================
   Motion presets — tweak these and every Reveal component follows.
   ============================================================================ */
const MOTION_CLASSES =
  'motion-safe:transition-[opacity,transform] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:duration-850 will-change-transform' // expo-out: fast start, gentle landing
const HIDDEN_CLASSES = 'motion-safe:opacity-0 motion-safe:translate-y-7' // start 28px lower + invisible
const SHOWN_CLASSES = 'motion-safe:opacity-100 motion-safe:translate-y-0' // final: normal position

const DEFAULT_STAGGER_MS = 100 // gap between sibling items
const MAX_STAGGER_MS = 700 // never make late items wait longer than this
const OBSERVER_THRESHOLD = 0.15
const OBSERVER_ROOT_MARGIN = '0px 0px -40px 0px' // trigger as element enters bottom edge

type RevealContextValue = { visible: boolean; step: number }

const RevealContext = createContext<RevealContextValue | null>(null)

/* ============================================================================
   Reveal — animate a single element when it scrolls into view.
   ============================================================================ */
type RevealProps = {
  children: ReactNode
  className?: string
  /** Extra delay before this element animates (ms). Also used standalone for stagger via parent data. */
  delay?: number
  /** Root element tag (defaults to a div). */
  as?: ElementType
  /** Override the IntersectionObserver threshold. */
  threshold?: number
} & React.HTMLAttributes<HTMLDivElement>

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
  threshold = OBSERVER_THRESHOLD,
  ...rest
}) => {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      // SSR / very old browsers: show content immediately
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() // reveal once, never replay
        }
      },
      { threshold, rootMargin: OBSERVER_ROOT_MARGIN },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {}

  return (
    <Tag
      ref={ref as never}
      style={style}
      className={cn(MOTION_CLASSES, visible ? SHOWN_CLASSES : HIDDEN_CLASSES, className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ============================================================================
   RevealGroup — a container that observes itself once and staggers its
   direct <RevealItem> children top-to-bottom when it enters the viewport.
   ============================================================================ */
type RevealGroupProps = {
  children: ReactNode
  className?: string
  /** ms between each child's animation start (stagger step). */
  stagger?: number
  /** Override the IntersectionObserver threshold (0–1, % of element visible). */
  threshold?: number
  /** Root element tag (defaults to a div). */
  as?: ElementType
} & React.AllHTMLAttributes<HTMLElement>

export const RevealGroup: React.FC<RevealGroupProps> = ({
  children,
  className,
  stagger = DEFAULT_STAGGER_MS,
  threshold = OBSERVER_THRESHOLD,
  as: Tag = 'div',
  ...rest
}) => {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() // reveal once, never replay
        }
      },
      { threshold, rootMargin: OBSERVER_ROOT_MARGIN },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const context = useMemo<RevealContextValue>(
    () => ({ visible, step: stagger }),
    [visible, stagger],
  )

  const indexedChildren = useMemo(() => assignIndices(children), [children])

  return (
    <RevealContext.Provider value={context}>
      <Tag ref={ref as never} className={className} {...rest}>
        {indexedChildren}
      </Tag>
    </RevealContext.Provider>
  )
}

/* ============================================================================
   RevealItem — a single staggered child of <RevealGroup>.
   Renders fully visible when used OUTSIDE a group (safe default).
   ============================================================================ */
type RevealItemProps = {
  children: ReactNode
  className?: string
  /** Root tag, useful for <li>, <section>, <tr> etc. (defaults to div). */
  as?: ElementType
  /** Manually force an index (auto-assigned when a direct child of RevealGroup). */
  index?: number
  /** Extra delay for THIS item on top of its auto index (ms). */
  delay?: number
} & React.AllHTMLAttributes<HTMLElement>

export const RevealItem: React.FC<RevealItemProps> = ({
  children,
  className,
  as: Tag = 'div',
  index,
  delay = 0,
  ...rest
}) => {
  const context = useContext(RevealContext)

  const visible = context ? context.visible : true
  const step = context ? context.step : 0
  const transitionDelay = Math.min((index ?? 0) * step + delay, MAX_STAGGER_MS)

  return (
    <Tag
      {...rest}
      style={{ transitionDelay: `${transitionDelay}ms` }}
      className={cn(MOTION_CLASSES, visible ? SHOWN_CLASSES : HIDDEN_CLASSES, className)}
    >
      {children}
    </Tag>
  )
}

/* ============================================================================
   assignIndices — walk a group's children and stamp 0,1,2… onto every direct
   <RevealItem>. Handles mapped arrays and <>…</> fragments (one level deep).
   ============================================================================ */
function assignIndices(node: ReactNode): ReactNode {
  let counter = 0

  const walk = (child: ReactNode): ReactNode =>
    Children.map(child, (c) => {
      if (!isValidElement(c)) return c

      if (c.type === RevealItem) {
        const props = c.props as { index?: number }
        const index = props.index ?? counter++

        return React.cloneElement(c as ReactElement<{ index?: number }>, { index })
      }

      // Descend into fragments so "<>…</>" groups still get numbered
      if (c.type === Fragment) {
        const props = c.props as { children?: ReactNode }
        return React.cloneElement(c as ReactElement, { children: walk(props.children) } as never)
      }

      return c
    })

  return walk(node)
}

export default Reveal