'use client'

import { useTranslations } from 'next-intl'
import { FILES, EXTRA_FILES } from '@/data/navigation'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FolderOpenIcon,
  FolderIcon,
  JsFileIcon,
  CssFileIcon,
  MdFileIcon,
  JsonFileIcon,
} from '@/components/icons'

const FILE_ICONS = {
  js:   <JsFileIcon />,
  css:  <CssFileIcon />,
  md:   <MdFileIcon />,
  json: <JsonFileIcon />,
}

export default function Sidebar({ open, activeTab, onOpenTab }) {
  const t = useTranslations('nav')
  const tAria = useTranslations('aria')

  if (!open) return null

  return (
    <aside className="sidebar" aria-label={t('explorer')}>

      <div className="sidebar-title">
        <span>{t('explorer')}</span>
      </div>

      <div className="sidebar-tree">

        {/* Carpeta raíz */}
        <div className="sidebar-folder">
          <ChevronDownIcon size={12} />
          <FolderOpenIcon size={14} className="sidebar-folder-icon" />
          <span>PORTFOLIO</span>
        </div>

        {/* Carpeta src */}
        <div className="sidebar-folder sidebar-folder--nested">
          <ChevronDownIcon size={12} />
          <FolderOpenIcon size={14} className="sidebar-folder-icon" />
          <span>src</span>
        </div>

        {/* Archivos de secciones */}
        {FILES.map((file) => (
          <button
            key={file.section}
            className={`sidebar-file ${activeTab?.section === file.section ? 'active' : ''}`}
            onClick={() => onOpenTab(file)}
            aria-label={`${tAria('openFile')} ${file.name}`}
            aria-current={activeTab?.section === file.section ? 'true' : undefined}
          >
            {FILE_ICONS[file.icon]}
            <span>{file.name}</span>
          </button>
        ))}

        {/* Carpeta data */}
        <div className="sidebar-folder sidebar-folder--root">
          <ChevronRightIcon size={12} />
          <FolderIcon size={14} className="sidebar-folder-icon" />
          <span>data</span>
        </div>

        {/* Carpeta public */}
        <div className="sidebar-folder sidebar-folder--root">
          <ChevronRightIcon size={12} />
          <FolderIcon size={14} className="sidebar-folder-icon" />
          <span>public</span>
        </div>

        {/* Archivos extra */}
        {EXTRA_FILES.map((file) => (
          <div key={file.name} className="sidebar-file sidebar-file--root">
            {FILE_ICONS[file.icon]}
            <span>{file.name}</span>
          </div>
        ))}

      </div>
    </aside>
  )
}