import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})

// Exponer API para controlar la ventana
contextBridge.exposeInMainWorld('electronAPI', {
  resizeWindow: (width: number, height: number) => {
    // Validar que los argumentos sean números válidos
    if (typeof width === 'number' && typeof height === 'number' && 
        !isNaN(width) && !isNaN(height) && 
        width > 0 && height > 0) {
      ipcRenderer.send('resize-window', Math.round(width), Math.round(height))
    } else {
      console.error('resizeWindow: argumentos inválidos', { width, height })
    }
  },
  minimizeWindow: () => {
    ipcRenderer.send('minimize-window')
  },
  closeWindow: () => {
    ipcRenderer.send('close-window')
  }
})