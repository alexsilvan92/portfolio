import { JsFileIcon, CloseIcon } from '@/components/icons'

const FILE_ICONS = {
  js: <JsFileIcon />,
}

export default function TabBar({ tabs, activeTab, onSelectTab, onCloseTab }) {
  if (tabs.length === 0) return null

  return (
    <div className="tabbar" role="tablist" aria-label="Pestañas abiertas">
      {tabs.map((tab) => {
        const isActive = activeTab?.section === tab.section

        return (
          <button
            key={tab.section}
            role="tab"
            aria-selected={isActive}
            className={`tabbar-tab ${isActive ? 'active' : ''}`}
            onClick={() => onSelectTab(tab)}
          >
            {/* Icono del archivo */}
            {FILE_ICONS[tab.icon]}

            {/* Nombre del archivo */}
            <span className="tabbar-tab-name">{tab.name}</span>

            {/* Botón cerrar */}
            <span
              className="tabbar-tab-close"
              role="button"
              aria-label={`Cerrar ${tab.name}`}
              onClick={(e) => onCloseTab(tab, e)}
            >
              <CloseIcon size={12} />
            </span>
          </button>
        )
      })}
    </div>
  )
}