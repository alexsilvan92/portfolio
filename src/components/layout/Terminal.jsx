'use client';

import { useTranslations } from 'next-intl';
import { PERSONAL_INFO } from '@/lib/constants';

export default function Terminal() {
  const t = useTranslations('terminal');
  const tAria = useTranslations('aria');

  const BOOT_LINES = [
    { prompt: false, text: `${t('welcome')} ${PERSONAL_INFO.name}` },
    { prompt: false, text: '─────────────────────────────────────' },
    { prompt: true, text: t('whoami') },
    {
      prompt: false,
      text: `${PERSONAL_INFO.role} · ${PERSONAL_INFO.location}`,
    },
    { prompt: true, text: t('catStack') },
    { prompt: false, text: t('stack') },
    { prompt: true, text: t('echoStatus') },
    { prompt: false, text: t('status') },
    { prompt: true, text: '_' },
  ];

  return (
    <div className="terminal" aria-label={tAria('terminal')}>
      <div className="terminal-header">
        <div className="terminal-tabs">
          <span className="terminal-tab active">{t('terminalTab')}</span>
          <span className="terminal-tab">{t('problemsTab')}</span>
          <span className="terminal-tab">{t('outputTab')}</span>
        </div>
      </div>

      <div className="terminal-body">
        {BOOT_LINES.map((line, i) => (
          <div key={i} className="terminal-line">
            {line.prompt && (
              <span className="terminal-prompt">
                <span className="terminal-user">alex@portfolio</span>
                <span className="terminal-colon">:</span>
                <span className="terminal-path">~/portfolio</span>
                <span className="terminal-dollar"> $</span>
              </span>
            )}
            <span className={line.prompt ? 'terminal-cmd' : 'terminal-output'}>
              {line.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
