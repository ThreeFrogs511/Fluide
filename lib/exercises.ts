import { ComponentType } from 'react'
import CyclicSighingWidget from '@/components/exercises/CyclicSighingWidget'

// The Exercise type is the contract between the registry and the page components.
// `component` holds a React component directly — no dynamic imports, no lazy loading.
// The exercise page receives it, assigns it to a capitalized variable, and renders it.
export type Exercise = {
  slug: string
  title: string
  description: string
  duration: string     // Human-readable, e.g. "5 min"
  component: ComponentType
}

// The single source of truth for all exercises.
// To add a new exercise: create its component in components/exercises/, then add one entry here.
// The index page and the dynamic route update automatically — nothing else needs to change.
export const exercises: Exercise[] = [
  {
    slug: 'cyclic-sighing',
    title: 'Cyclic Sighing',
    description:
      'A two-inhale, one-exhale technique shown by Stanford Medicine to reduce anxiety and improve mood in just 5 minutes.',
    duration: '5 min',
    component: CyclicSighingWidget,
  },
]

// Lookup by slug — returns undefined if not found, which triggers notFound() in the page.
export function getExercise(slug: string): Exercise | undefined {
  return exercises.find((e) => e.slug === slug)
}
