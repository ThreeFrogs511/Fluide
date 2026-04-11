'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
type SessionState = 'idle' | 'running' | 'paused' | 'complete'

// Each phase describes one segment of the breathing cycle.

const PHASES = [
  {
    duration: 2000,
    label: 'Inhale',
    subLabel: 'Through your nose',
    startSize: 80,
    endSize: 116,     
    startColor: '#B4B2A9', // warm grey (rest)
    endColor: '#5DCAA5',   // muted teal (mid inhale)
  },
  {
    duration: 2000,
    label: 'Inhale deeper',
    subLabel: 'Fill your lungs fully',
    startSize: 116,
    endSize: 160,      // maximum size
    startColor: '#5DCAA5',
    endColor: '#185FA5', // slate blue (full inhale)
  },
  {
    duration: 8000,   
    label: 'Exhale',
    subLabel: 'Slowly through your mouth',
    startSize: 160,
    endSize: 80,       // back to rest size
    startColor: '#185FA5',
    endColor: '#B4B2A9', // back to warm grey (rest)
  },
]


const TOTAL_CYCLES = 25

// returns the size of the circle and/or the circle color at an instant t  
//a = circle size/color start value, b = circle size/color end value, t = progress (0 to 1), calculated in the tick function
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

// converts an hex color at an instant T into RGB values in order to do math with (can't do that with HEX directly)
//How it works: slices the hex colour into three pairs
//then converts each pair from hex to decimal using parseInt with a radix of 16 (hexadecimal)
//e.g. #B4B2A9 becomes [180, 178, 169]
//
function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}

// Uses lerp() and hexToRgb() to return the color of the circle at an instant t 
// First, we convert the start and end hex colors to RGB using hexToRgb().
//Then we use lerp() to determine the red, green, and blue components separately based on the progress t (for the color transition).
//Finally, we construct an RGB color string in the format "rgb(r, g, b)" to be used in the circle's style.
//colorA = start color, colorB = end color, t = progress (0 to 1)
//color A and color B stays the same for the entire phase, only t changes and determines the color at a specific moment in the phase
function lerpColor(colorA: string, colorB: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(colorA)
  const [r2, g2, b2] = hexToRgb(colorB)
  return `rgb(${Math.round(lerp(r1, r2, t))}, ${Math.round(lerp(g1, g2, t))}, ${Math.round(lerp(b1, b2, t))})`
}

export default function CyclicSighingWidget() {
  // --- State (causes re-renders — kept to the minimum needed to update the UI) ---

  const [sessionState, setSessionState] = useState<SessionState>('idle')
  const [phaseLabel, setPhaseLabel] = useState('Ready')
  const [phaseSubLabel, setPhaseSubLabel] = useState("Press start when you're ready")
  const [cycleCount, setCycleCount] = useState(0)

  // --- Refs (never cause re-renders — used to drive the animation loop) ---

  // Used to change the circle DOM element without causing rerenders
  const circleRef = useRef<HTMLDivElement>(null)
  // ID returned by requestAnimationFrame — needed to cancel the tick loop on pause/stop/unmount.
  const rafIdRef = useRef<number>(0)
  // Which phase we are currently in (0 = first inhale, 1 = second inhale, 2 = exhale).
  const phaseIndexRef = useRef(0)
  // Which cycle we are currently on (1-based). Ref version avoids stale closure in the RAF loop.
  const cycleCountRef = useRef(0)
  // The timestamp (from requestAnimationFrame) when the current phase started.
  // null means "not yet started" — set on the very first tick.
  const phaseStartRef = useRef<number | null>(null)
  // How many milliseconds had elapsed in the current phase when the user paused.
  // Used to resume from exactly where we left off.
  const pausedElapsedRef = useRef(0)

  const tickRef = useRef<((timestamp: number) => void) | undefined>(undefined)

  // --- Animation loop ---

  //this is where the magic happens
  //this main function calculates the size and color of the circle at any given moment in time (timestamp) 
  // based on which phase we are in and how far through that phase we are (t).
  // we call this function on every frame via requestAnimationFrame

  useEffect(() => {

    tickRef.current = (timestamp: number) => {
      // On the very first tick, record the phase start time.
      if (phaseStartRef.current === null) {
        phaseStartRef.current = timestamp
      }

      const phase = PHASES[phaseIndexRef.current]
      const elapsed = timestamp - phaseStartRef.current
      // t is a 0–1 progress value. Math.min clamps it so it never exceeds 1.
      const t = Math.min(elapsed / phase.duration, 1)

      // Calculate the size and color of the circle for this exact frame.
      const size = lerp(phase.startSize, phase.endSize, t)
      const color = lerpColor(phase.startColor, phase.endColor, t)

      // Write directly to the DOM element's style through refs, bypassing React's render cycle for better performance.
      // transform: scale() is used instead of width/height to avoid triggering browser layout on every frame.
      // Base is 80px (the rest size), so scale(1) = 80px rest, scale(2) = 160px max.
      if (circleRef.current) {
        circleRef.current.style.transform = `scale(${size / 80})`
        circleRef.current.style.backgroundColor = color
      }

      // Phase transition: once t reaches 1, the phase is complete.
      if (t >= 1) {
        const nextPhaseIndex = phaseIndexRef.current + 1 // next phase

        if (nextPhaseIndex >= PHASES.length) {
          // We finished the last phase (exhale) — that's one full cycle.
          const nextCycle = cycleCountRef.current + 1
          if (nextCycle > TOTAL_CYCLES) {
            // All 25 cycles done — end the session.
            setSessionState('complete')
            setPhaseLabel('Session complete')
            setPhaseSubLabel('Well done — 5 minutes done')
            return // Don't request the next frame — the loop stops here.
          }
          // Start the next cycle from the first phase.
          cycleCountRef.current = nextCycle
          setCycleCount(nextCycle) // This is the one setState call per cycle — fine.
          phaseIndexRef.current = 0
        } else {
          // Move to the next phase within the same cycle.
          phaseIndexRef.current = nextPhaseIndex
        }

        // Carry any overshoot forward into the next phase so timing stays accurate across all 75 transitions.
        phaseStartRef.current = (phaseStartRef.current ?? timestamp) + phase.duration
        // Update the UI labels for the new phase.
        const newPhase = PHASES[phaseIndexRef.current]
        setPhaseLabel(newPhase.label)
        setPhaseSubLabel(newPhase.subLabel)
      }

      // Schedule the next frame. We call tickRef.current (not tick directly)
      // because that is how a function stored in a ref calls itself recursively.
      rafIdRef.current = requestAnimationFrame(tickRef.current!)
    }
  }, [])

  // --- Session controls ---

  // Resets all animation refs to their initial values.
  // Called by stopSession and startSession to guarantee a clean slate.
  const resetRefs = useCallback(() => {
    phaseIndexRef.current = 0
    cycleCountRef.current = 0
    phaseStartRef.current = null
    pausedElapsedRef.current = 0
  }, [])

  // Resets the circle's visual appearance back to the rest state.
  // Written via ref.current.style rather than setState to match the animation pattern.
  const resetCircle = useCallback(() => {
    if (circleRef.current) {
      circleRef.current.style.transform = 'scale(1)' // 80 / 80 = 1 (rest size)
      circleRef.current.style.backgroundColor = '#B4B2A9'
    }
  }, [])

  const stopSession = useCallback(() => {
    cancelAnimationFrame(rafIdRef.current) // Halt the loop immediately.
    resetRefs()
    resetCircle()
    setSessionState('idle')
    setPhaseLabel('Ready')
    setPhaseSubLabel("Press start when you're ready")
    setCycleCount(0)
  }, [resetRefs, resetCircle])

  const startSession = useCallback(() => {
    // Cancel any loop that might still be running (e.g. "Start again" after completing).
    cancelAnimationFrame(rafIdRef.current)
    resetRefs()
    cycleCountRef.current = 1 // We are now in cycle 1 (1-based, shown in the counter).
    setSessionState('running')
    setPhaseLabel(PHASES[0].label)
    setPhaseSubLabel(PHASES[0].subLabel)
    setCycleCount(1)
    rafIdRef.current = requestAnimationFrame(tickRef.current!)
  }, [resetRefs])

  const pauseSession = useCallback(() => {
    cancelAnimationFrame(rafIdRef.current)
    // Record how far we are into the current phase so we can resume from the same point.
    pausedElapsedRef.current =
      phaseStartRef.current !== null ? performance.now() - phaseStartRef.current : 0
    setSessionState('paused')
    setPhaseLabel('Paused')
    setPhaseSubLabel('')
  }, [])

  const resumeSession = useCallback(() => {
    // Shift phaseStartRef forward by the time we were paused, so elapsed stays continuous.
    // e.g. if a phase started at t=100 and we paused after 500ms (elapsed=500),
    // and we resume at t=2000, we set phaseStartRef to 2000-500=1500,
    // so on the next tick elapsed = 2000-1500 = 500 — exactly where we left off.
    phaseStartRef.current = performance.now() - pausedElapsedRef.current
    setSessionState('running')
    const phase = PHASES[phaseIndexRef.current]
    setPhaseLabel(phase.label)
    setPhaseSubLabel(phase.subLabel)
    rafIdRef.current = requestAnimationFrame(tickRef.current!)
  }, [])

  // Cleanup: cancel the RAF loop if the component unmounts mid-session.
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  return (
    <div className="flex flex-col items-center py-12 px-4">
      {/* Instruction block — static context shown above the interactive card */}
      <p className="text-neutral-500 text-sm leading-relaxed text-center max-w-sm mb-10">
        Two inhales through the nose, then one long exhale through the mouth.
        Repeat for 5 minutes — based on research from Stanford Medicine.
      </p>

      {/* Card */}
      <div className="bg-white border border-neutral-200 rounded-2xl px-10 py-10 flex flex-col items-center w-full max-w-sm">

        {/* Fixed 180×180 wrapper keeps the card stable as the circle grows and shrinks */}
        <div className="w-45 h-45 flex items-center justify-center mb-8">
          {/* Circle is fixed at 80px (its rest size) so layout never changes.
              Size is animated via transform: scale() relative to that base — this avoids
              layout on every frame. will-change promotes the element to its own compositing
              layer, isolating its repaints from the rest of the document.
              Once the animation starts, requestAnimationFrame overrides transform/backgroundColor
              via ref.current.style on every frame. */}
          <div
            ref={circleRef}
            className="rounded-full w-20 h-20 bg-[#B4B2A9] will-change-[transform,background-color]"
          />
        </div>

        {/* Phase label — changes at the start of each phase */}
        <p className="text-[15px] text-neutral-500 tracking-wide mb-1">
          {phaseLabel}
        </p>

        {/* Sub-label — min-h-5 reserves space so the card doesn't shift when it's empty (paused) */}
        <p className="text-[13px] text-neutral-400 mb-6 min-h-5">
          {phaseSubLabel}
        </p>

        {/* Cycle counter — shows — before the session starts, then 1/25, 2/25, etc. */}
        <p className="text-[13px] text-neutral-400 mb-8">
          {cycleCount === 0 ? '— / 25' : `${cycleCount} / 25`}
        </p>

        {/* Controls — rendered conditionally based on sessionState.
            Primary style (dark bg) = main action. Secondary style (border only) = destructive/cancel. */}
        <div className="flex gap-3">
          {sessionState === 'idle' && (
            <button
              onClick={startSession}
              className="px-6 py-2.5 bg-[#2C2C2A] text-[#EDE8D0] text-sm rounded-lg cursor-pointer"
            >
              Start
            </button>
          )}

          {sessionState === 'running' && (
            <>
              <button
                onClick={pauseSession}
                className="px-6 py-2.5 bg-[#2C2C2A] text-[#EDE8D0] text-sm rounded-lg cursor-pointer"
              >
                Pause
              </button>
              <button
                onClick={stopSession}
                className="px-6 py-2.5 border border-neutral-300 text-neutral-600 text-sm rounded-lg cursor-pointer"
              >
                Stop
              </button>
            </>
          )}

          {sessionState === 'paused' && (
            <>
              <button
                onClick={resumeSession}
                className="px-6 py-2.5 border border-neutral-300 text-neutral-600 text-sm rounded-lg cursor-pointer"
              >
                Resume
              </button>
              <button
                onClick={stopSession}
                className="px-6 py-2.5 border border-neutral-300 text-neutral-600 text-sm rounded-lg cursor-pointer"
              >
                Stop
              </button>
            </>
          )}

          {sessionState === 'complete' && (
            <button
              onClick={startSession}
              className="px-6 py-2.5 bg-[#2C2C2A] text-[#EDE8D0] text-sm rounded-lg cursor-pointer"
            >
              Start again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
