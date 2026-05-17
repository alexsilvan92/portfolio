import { createContext, useContext } from 'react';

export const EditorContext = createContext(null);

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (!context)
    throw new Error(
      'useEditorContext debe usarse dentro de EditorContext.Provider',
    );
  return context;
}
