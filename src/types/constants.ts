// Colores disponibles para las notas adhesivas - Tema Halloween
export const AVAILABLE_COLORS = [
  "#ff6b35",  // Naranja vibrante
  "#ffa500",  // Naranja dorado
  "#6b46c1",  // Púrpura oscuro
] as const;

// Color por defecto para nuevas notas
export const DEFAULT_COLOR = "#8b5cf6";

// Color del botón "Nueva Nota"
export const NEW_NOTE_BUTTON_COLOR = "#ff6b6b";

// Debug: Verificar que los colores se están exportando correctamente
console.log('AVAILABLE_COLORS:', AVAILABLE_COLORS);
console.log('DEFAULT_COLOR:', DEFAULT_COLOR);
console.log('NEW_NOTE_BUTTON_COLOR:', NEW_NOTE_BUTTON_COLOR);

// Clave para guardar en localStorage
export const STORAGE_KEY = 'sticky_notes';
