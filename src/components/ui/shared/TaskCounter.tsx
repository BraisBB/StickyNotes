import { StickyNote } from '../../../types';

// Props que recibe el componente
interface TaskCounterProps {
  notes: StickyNote[];
}

// Componente para mostrar el contador de tareas pendientes
export const TaskCounter = ({ notes }: TaskCounterProps) => {
  // Calcular tareas pendientes (no completadas)
  const pendingTasksCount = notes.reduce((total, note) => {
    return total + note.tasks.filter(task => !task.completed).length;
  }, 0);

  // Generar texto dinámico
  const getCounterText = () => {
    if (pendingTasksCount === 0) {
      return "Sin tareas pendientes";
    }
    
    const taskWord = pendingTasksCount === 1 ? 'tarea' : 'tareas';
    const pendingWord = pendingTasksCount === 1 ? 'pendiente' : 'pendientes';
    
    return `${pendingTasksCount} ${taskWord} ${pendingWord}`;
  };

  return (
    <small className="text-muted">
      {getCounterText()}
    </small>
  );
};
