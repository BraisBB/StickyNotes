// Exportar todas las funciones de storage
export {
  saveNotes,
  loadNotes,
  clearStorage,
} from './storage';

// Exportar todas las funciones de generators
export {
  generateNoteId,
  generateTaskId,
} from './generators';

// Ahora puedes importar todo desde: import { saveNotes, generateNoteId } from '../utils'
