'use client'

// Scrolls smoothly to the element with id="widget" when clicked.
// Extracted into its own client component so the exercise page stays a server component.
export default function ScrollToWidget() {
  return (
    <button
      onClick={() => document.getElementById('widget')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
      className="mt-6 text-sm text-neutral-500 underline underline-offset-4 cursor-pointer"
    >
      Start the exercise ↓
    </button>
  )
}
