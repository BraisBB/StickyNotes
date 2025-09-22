// Generar ID único para una nueva nota
export const generateNoteId = (): string => {
  return `note_${Date.now()}`;
};

// Generar ID único para una nueva tarea
export const generateTaskId = (): string => {
  return `task_${Date.now()}`;
};
