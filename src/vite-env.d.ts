/// <reference types="vite/client" />

// Tipos para la API de Electron
declare global {
  interface Window {
    electronAPI?: {
      resizeWindow: (width: number, height: number) => void;
    };
  }
}