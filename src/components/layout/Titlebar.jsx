'use client';

import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/constants';
import {
  VscodeIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SidebarLeftIcon,
  SidebarRightIcon,
  PanelBottomIcon,
  LayoutIcon,
} from '@/components/icons';

export default function Titlebar({
  sidebarOpen,
  terminalOpen,
  onToggleSidebar,
  onToggleTerminal,
}) {
  const t = useTranslations('menu');
  const tTitlebar = useTranslations('titlebar');
  const tAria = useTranslations('aria');

  const MENU_ITEMS = [
    t('file'),
    t('edit'),
    t('selection'),
    t('view'),
    t('go'),
    t('run'),
    t('terminal'),
    t('help'),
  ];

  return (
    <header className="titlebar">
      {/* Icono VS Code */}
      <div className="titlebar-icon">
        <VscodeIcon />
      </div>

      {/* Menú */}
      <nav className="titlebar-menu" aria-label={tAria('mainMenu')}>
        {MENU_ITEMS.map((item) => (
          <span key={item} className="titlebar-menu-item">
            {item}
          </span>
        ))}
      </nav>

      {/* Centro: flechas + searchbar */}
      <div className="titlebar-center">
        <div className="titlebar-nav">
          <button
            className="titlebar-nav-btn disabled"
            aria-label={tAria('navBack')}
          >
            <ChevronLeftIcon size={16} />
          </button>
          <button className="titlebar-nav-btn" aria-label={tAria('navForward')}>
            <ChevronRightIcon size={16} />
          </button>
        </div>
        <div
          className="titlebar-search"
          role="button"
          aria-label={tAria('quickSearch')}
        >
          <SearchIcon size={12} />
          <span className="titlebar-search-text">{tTitlebar('search')}</span>
          <kbd className="titlebar-search-kbd">Ctrl+P</kbd>
        </div>
      </div>

      {/* Botones de layout */}
      <div className="titlebar-actions">
        <button
          className={`titlebar-action-btn ${sidebarOpen ? 'active' : ''}`}
          onClick={onToggleSidebar}
          title={tAria('toggleSidebar')}
          aria-label={tAria('toggleSidebar')}
        >
          <SidebarLeftIcon size={18} />
        </button>
        <button
          className="titlebar-action-btn"
          title={tAria('toggleSecondarySidebar')}
          aria-label={tAria('toggleSecondarySidebar')}
        >
          <SidebarRightIcon size={18} />
        </button>
        <button
          className={`titlebar-action-btn ${terminalOpen ? 'active' : ''}`}
          onClick={onToggleTerminal}
          title={tAria('toggleTerminal')}
          aria-label={tAria('toggleTerminal')}
        >
          <PanelBottomIcon size={18} />
        </button>
        <button
          className="titlebar-action-btn"
          title={tAria('customizeLayout')}
          aria-label={tAria('customizeLayout')}
        >
          <LayoutIcon size={18} />
        </button>

        <div className="titlebar-sep" aria-hidden="true" />

        {/* Controles de ventana */}
        <div
          className="titlebar-window-controls"
          aria-label={tAria('windowControls')}
        >
          <button
            className="wc-btn"
            title={tAria('minimize')}
            aria-label={tAria('minimize')}
          >
            ─
          </button>
          <button
            className="wc-btn"
            title={tAria('maximize')}
            aria-label={tAria('maximize')}
          >
            □
          </button>
          <button
            className="wc-btn wc-close"
            title={tAria('close')}
            aria-label={tAria('close')}
          >
            ✕
          </button>
        </div>
      </div>
    </header>
  );
}
