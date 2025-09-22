import { StickyNote, STORAGE_KEY } from '../types';

// Guardar todas las notas en localStorage
export const saveNotes = (notes: StickyNote[]): void => {
  try {
    const jsonData = JSON.stringify(notes);
    localStorage.setItem(STORAGE_KEY, jsonData);
  } catch (error) {
    console.error('Error al guardar notas:', error);
    alert('No se pudieron guardar las notas. El almacenamiento podría estar lleno.');
  }
};

// Cargar todas las notas desde localStorage
export const loadNotes = (): StickyNote[] => {
  try {
    const jsonData = localStorage.getItem(STORAGE_KEY);
    
    // Si no hay datos guardados, retornar array vacío
    if (!jsonData) {
      return [];
    }
    
    // Convertir de JSON a objetos
    const notes: StickyNote[] = JSON.parse(jsonData);
    return notes;
    
  } catch (error) {
    console.error('Error al cargar notas:', error);
    alert('Los datos guardados están corruptos. Se empezará con notas vacías.');
    return [];
  }
};

