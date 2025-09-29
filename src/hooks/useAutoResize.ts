import { useRef, useEffect } from 'react';

interface UseAutoResizeOptions {
  maxHeight: number;
  minHeight: number;
  width: number;
}

export const useAutoResize = (options: UseAutoResizeOptions) => {
  const { maxHeight, minHeight, width } = options;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !window.electronAPI?.resizeWindow) return;

    const resize = () => {
      if (!containerRef.current) return;
      
      const appContainer = containerRef.current;
      const contentHeight = appContainer.offsetHeight;
      
      const finalHeight = Math.max(minHeight, Math.min(contentHeight, maxHeight));
      
      window.electronAPI?.resizeWindow(width, finalHeight);
    };

    // ResizeObserver detecta automáticamente cambios en el contenido
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(containerRef.current);

    // Redimensionar inicialmente
    resize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [width, minHeight, maxHeight]);

  return { ref: containerRef };
};