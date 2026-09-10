'use client'
import React from 'react'

type State = { hasError: boolean; error?: Error }

export class BlockErrorBoundary extends React.Component<
  { blockType?: string; children: React.ReactNode },
  State
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error(`[BlockErrorBoundary] Block "${this.props.blockType}" failed:`, error)
  }

  render() {
    if (this.state.hasError) {
      if (process.env.NODE_ENV !== 'production') {
        return (
          <div
            style={{
              border: '2px dashed red',
              padding: '1rem',
              margin: '0.5rem 0',
              color: 'red',
              fontSize: '12px',
            }}
          >
            [Preview Error: Block &quot;{this.props.blockType}&quot; failed to render —{' '}
            {this.state.error?.message}]
          </div>
        )
      }
      return null
    }
    return this.props.children
  }
}
