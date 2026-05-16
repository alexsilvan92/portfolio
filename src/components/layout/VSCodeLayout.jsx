'use client';

import { useEffect } from 'react';
import { useEditor } from '@/hooks/useEditor';
import { useSettings } from '@/hooks/useSettings';
import Titlebar from '@/components/layout/Titlebar';
import ActivityBar from '@/components/layout/ActivityBar';
import Sidebar from '@/components/layout/Sidebar';
import TabBar from '@/components/layout/TabBar';
import EditorArea from '@/components/layout/EditorArea';
import StatusBar from '@/components/layout/StatusBar';
import Terminal from '@/components/layout/Terminal';

export default function VSCodeLayout() {
  const editor = useEditor();
  const { toggleTerminal, toggleSidebar } = editor;
  const settingsApi = useSettings();

  // Atajos de teclado globales
  useEffect(() => {
    function handleKeyDown(e) {
      // Ctrl+J — alternar terminal
      if (e.ctrlKey && e.key === 'j') {
        e.preventDefault();
        toggleTerminal();
      }
      // Ctrl+B — alternar sidebar
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTerminal, toggleSidebar]);

  return (
    <div className="vscode-window">
      {/* Barra superior */}
      <Titlebar
        sidebarOpen={editor.sidebarOpen}
        terminalOpen={editor.terminalOpen}
        onToggleSidebar={editor.toggleSidebar}
        onToggleTerminal={editor.toggleTerminal}
      />

      {/* Cuerpo principal */}
      <div className="vscode-body">
        {/* Barra de actividad izquierda */}
        <ActivityBar  settingsApi={settingsApi} />

        {/* Explorador de archivos */}
        <Sidebar
          open={editor.sidebarOpen}
          activeTab={editor.activeTab}
          onOpenTab={editor.openTab}
        />

        {/* Zona del editor */}
        <div className="vscode-editor-wrap">
          {/* Pestañas */}
          <TabBar
            tabs={editor.openTabs}
            activeTab={editor.activeTab}
            onSelectTab={editor.openTab}
            onCloseTab={editor.closeTab}
          />

          {/* Contenido de la sección activa */}
          <EditorArea activeTab={editor.activeTab} />

          {/* Terminal inferior */}
          {editor.terminalOpen && <Terminal />}
        </div>
      </div>

      {/* Barra de estado inferior */}
      <StatusBar activeTab={editor.activeTab} />
    </div>
  );
}
