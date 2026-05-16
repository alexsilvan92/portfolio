'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { THEMES, FONT_SIZES } from '@/hooks/useSettings';
import {
  SettingsIcon,
  ChevronRightSmallIcon,
  CheckMarkIcon,
} from '@/components/icons';

export default function SettingsMenu({ settingsApi }) {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState(null); // 'theme' | 'fontSize' | 'locale'
  const menuRef = useRef(null);
  const t = useTranslations('settings');
  const router = useRouter();
  const pathname = usePathname();
  const { settings, setTheme, setFontSize, setLocale } = settingsApi;

  // Cerrar al clicar fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
        setSubmenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLocale(locale) {
    setLocale(locale);
    router.replace(pathname, { locale });
    setOpen(false);
    setSubmenu(null);
  }

  function handleTheme(theme) {
    setTheme(theme);
    setOpen(false);
    setSubmenu(null);
  }

  function handleFontSize(size) {
    setFontSize(size);
    setOpen(false);
    setSubmenu(null);
  }

  return (
    <div className="settings-menu-wrap" ref={menuRef}>
      <button
        className={`activity-bar-btn ${open ? 'active' : ''}`}
        onClick={() => {
          setOpen((o) => !o);
          setSubmenu(null);
        }}
        aria-label={t('label')}
        title={t('label')}
      >
        <SettingsIcon size={28} />
      </button>

      {open && (
        <div className="settings-menu">
          {/* Tema de color */}
          <div
            className="settings-menu-item has-submenu"
            onMouseEnter={() => setSubmenu('theme')}
          >
            <span>{t('theme')}</span>
            <ChevronRightSmallIcon />
            {submenu === 'theme' && (
              <div className="settings-submenu">
                {Object.entries(THEMES).map(([key, theme]) => (
                  <button
                    key={key}
                    className="settings-menu-item"
                    onClick={() => handleTheme(key)}
                  >
                    <span
                      className="theme-dot"
                      style={{ background: theme['--teal'] }}
                    />
                    <span>{theme.name}</span>
                    {settings.theme === key && <CheckMarkIcon />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tamaño de fuente */}
          <div
            className="settings-menu-item has-submenu"
            onMouseEnter={() => setSubmenu('fontSize')}
          >
            <span>{t('fontSize')}</span>
            <ChevronRightSmallIcon />
            {submenu === 'fontSize' && (
              <div className="settings-submenu">
                {Object.entries(FONT_SIZES).map(([key, px]) => (
                  <button
                    key={key}
                    className="settings-menu-item"
                    onClick={() => handleFontSize(key)}
                  >
                    <span>{t(`fontSizes.${key}`)}</span>
                    <span className="settings-menu-hint">{px}px</span>
                    {settings.fontSize === key && <CheckMarkIcon />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="settings-menu-sep" />

          {/* Idioma */}
          <div
            className="settings-menu-item has-submenu"
            onMouseEnter={() => setSubmenu('locale')}
          >
            <span>{t('language')}</span>
            <ChevronRightSmallIcon />
            {submenu === 'locale' && (
              <div className="settings-submenu">
                <button
                  className="settings-menu-item"
                  onClick={() => handleLocale('es')}
                >
                  <span>🇪🇸 Español</span>
                  {settings.locale === 'es' && <CheckMarkIcon />}
                </button>
                <button
                  className="settings-menu-item"
                  onClick={() => handleLocale('en')}
                >
                  <span>🇬🇧 English</span>
                  {settings.locale === 'en' && <CheckMarkIcon />}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
