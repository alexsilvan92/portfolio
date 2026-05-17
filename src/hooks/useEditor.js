import { useState, useCallback } from 'react';
import { FILES } from '@/data/navigation';

// La pestaña inicial al cargar la web
const INITIAL_TAB = FILES[0];

export function useEditor() {
  // Pestañas abiertas — empieza con hero.jsx
  const [openTabs, setOpenTabs] = useState([INITIAL_TAB]);

  // Pestaña activa
  const [activeTab, setActiveTab] = useState(INITIAL_TAB);

  // Sidebar visible o no
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Terminal visible o no
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Abrir un archivo del explorador
  const openTab = useCallback((file) => {
    setOpenTabs((prev) => {
      // Si ya está abierta, no la duplicamos
      const exists = prev.find((t) => t.section === file.section);
      if (exists) return prev;
      return [...prev, file];
    });
    setActiveTab(file);
  }, []);

  // Cerrar una pestaña con la X
  const closeTab = useCallback(
    (file, e) => {
      // Paramos la propagación para que no active la pestaña al cerrarla
      e?.stopPropagation();

      setOpenTabs((prev) => {
        const remaining = prev.filter((t) => t.section !== file.section);

        if (remaining.length === 0) {
          // Sin pestañas — vaciar el editor como VS Code real
          setActiveTab(null);
        } else if (activeTab.section === file.section) {
          // Cerrar la activa — activar la anterior o la siguiente
          const closedIndex = prev.findIndex((t) => t.section === file.section);
          const nextTab = remaining[closedIndex - 1] ?? remaining[0];
          setActiveTab(nextTab);
        }

        return remaining;
      });
    },
    [activeTab],
  );

  // Alternar sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  // Alternar terminal
  const toggleTerminal = useCallback(() => {
    setTerminalOpen((prev) => !prev);
  }, []);

  return {
    openTabs,
    activeTab,
    sidebarOpen,
    terminalOpen,
    openTab,
    closeTab,
    toggleSidebar,
    toggleTerminal,
  };
}
