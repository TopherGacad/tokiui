import { SiNextdotjs, SiVite, SiRemix } from 'react-icons/si'

const frameworks = [
  {
    name: 'Next.js',
    description: 'App Router or Pages Router',
    href: '#nextjs',
    icon: <SiNextdotjs aria-hidden="true" />,
    color: 'currentColor',
  },
  {
    name: 'Vite',
    description: 'React + TypeScript template',
    href: '#vite',
    icon: <SiVite aria-hidden="true" />,
    color: '#646CFF',
  },
  {
    name: 'Remix',
    description: 'Full-stack React framework',
    href: '#remix',
    icon: <SiRemix aria-hidden="true" />,
    color: 'currentColor',
  },
]

export function FrameworkCards() {
  return (
    <div className="framework-grid">
      {frameworks.map((fw) => (
        <a key={fw.href} href={fw.href} className="framework-card">
          <span className="framework-card__icon" style={{ color: fw.color }}>
            {fw.icon}
          </span>
          <span className="framework-card__name">{fw.name}</span>
          <span className="framework-card__desc">{fw.description}</span>
        </a>
      ))}
    </div>
  )
}
