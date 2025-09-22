// Interfaz para cada tarea individual dentro de una nota
export interface Task {
  id: string;           // Identificador único: "task_1"
  text: string;         // Contenido de la tarea: "Comprar leche"
  completed: boolean;   // Estado: true si está completada, false si no
}

// Interfaz principal para una nota adhesiva
export interface StickyNote {
  id: string;           // Identificador único: "note_1"
  title: string;        // Título de la nota: "Lista de compras"
  tasks: Task[];        // Array de tareas que contiene la nota
  color: string;        // Color de fondo: "#ffeb3b"
}
