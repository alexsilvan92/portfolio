import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import TechStack from '@/components/sections/TechStack'
import Experience from '@/components/sections/Experience'
import Hobbies from '@/components/sections/Hobbies'
import Contact from '@/components/sections/Contact'

const SECTIONS = {
  hero:       <Hero />,
  about:      <About />,
  projects:   <Projects />,
  stack:      <TechStack />,
  experience: <Experience />,
  hobbies:    <Hobbies />,
  contact:    <Contact />,
}

export default function EditorArea({ activeTab }) {
  if (!activeTab) return <EmptyEditor />

  const content = SECTIONS[activeTab.section]

  if (!content) return <EmptyEditor />

  return (
    <div className="editor-area" role="tabpanel" aria-label={activeTab.name}>

      {/* Breadcrumb */}
      <div className="editor-breadcrumb" aria-label="Ruta del archivo">
        <span className="breadcrumb-segment">src</span>
        <span className="breadcrumb-sep" aria-hidden="true">›</span>
        <span className="breadcrumb-segment breadcrumb-active">{activeTab.name}</span>
      </div>

      {/* Contenido de la sección */}
      <div className="editor-content">
        {content}
      </div>

    </div>
  )
}

function EmptyEditor() {
  return (
    <div className="editor-empty" aria-label="Editor vacío">
      <p className="editor-empty-text">Abre un archivo del explorador</p>
    </div>
  )
}