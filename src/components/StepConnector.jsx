import { useInView } from '../hooks/useInView'

export default function StepConnector() {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className="hidden md:flex flex-1 items-center px-2"
      aria-hidden="true"
    >
      <div
        className="h-px flex-1 transition-all duration-700 ease-out"
        style={{
          background: 'var(--accent)',
          opacity: inView ? 0.4 : 0,
          transform: inView ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transitionProperty: 'opacity, transform',
        }}
      />
    </div>
  )
}
