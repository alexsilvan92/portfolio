import { useTranslations } from 'next-intl';
import {
  FilesIcon,
  SearchIcon,
  GitIcon,
  ExtensionsIcon,
  ProfileIcon,
  SettingsIcon,
} from '@/components/icons';
import SettingsMenu from '@/components/layout/SettingsMenu';

export default function ActivityBar({ settingsApi }) {
  const tAria = useTranslations('aria');

  const TOP_ICONS = [
    { id: 'explorer', label: tAria('explorer'), Icon: FilesIcon },
    { id: 'search', label: tAria('search'), Icon: SearchIcon },
    { id: 'git', label: tAria('git'), Icon: GitIcon },
    { id: 'extensions', label: tAria('extensions'), Icon: ExtensionsIcon },
  ];

  const BOTTOM_ICONS = [
    { id: 'profile', label: tAria('profile'), Icon: ProfileIcon },
  ];
  return (
    <aside className="activity-bar" aria-label="Barra de actividad">
      <div className="activity-bar-top">
        {TOP_ICONS.map((item, index) => (
          <button
            key={item.id}
            className={`activity-bar-btn ${index === 0 ? 'active' : ''}`}
            title={item.label}
            aria-label={item.label}
          >
            <item.Icon size={28} />
          </button>
        ))}
      </div>
      <div className="activity-bar-bottom">
        {BOTTOM_ICONS.map((item) => (
          <button
            key={item.id}
            className="activity-bar-btn"
            title={item.label}
            aria-label={item.label}
          >
            <item.Icon size={28} />
          </button>
        ))}
      </div>
      <div className="activity-bar-bottom">
        <SettingsMenu settingsApi={settingsApi} />
      </div>
    </aside>
  );
}
