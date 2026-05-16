'use client';

import { useTranslations } from 'next-intl';
import { GitBranchIcon, CircleCheckIcon } from '@/components/icons';
import { PERSONAL_INFO } from '@/lib/constants';

export default function StatusBar({ activeTab }) {
  const t = useTranslations('statusbar');

  return (
    <footer className="statusbar" aria-label="Status bar">
      <div className="statusbar-left">
        <div className="statusbar-item">
          <GitBranchIcon size={12} />
          <span>main</span>
        </div>
        <div className="statusbar-item">
          <CircleCheckIcon size={12} />
          <span>{t('errors')}</span>
        </div>
      </div>

      <div className="statusbar-right">
        {activeTab && <span className="statusbar-item">{activeTab.name}</span>}
        <span className="statusbar-item">UTF-8</span>
        <span className="statusbar-item">Spaces: 2</span>
        <span className="statusbar-item">JavaScript React</span>
        <span className="statusbar-badge">
          ● {PERSONAL_INFO.available ? t('openToWork') : t('notAvailable')}
        </span>
      </div>
    </footer>
  );
}
