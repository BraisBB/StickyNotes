import { Task } from '../../types';

// Props que recibe el componente
interface TaskItemProps {
  task: Task;
  onToggle: () => void;        // Función para marcar/desmarcar
  onDelete: () => void;        // Función para eliminar
}

// Componente para mostrar una tarea individual
export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <div className="d-flex align-items-center mb-2">
      {/* Checkbox para completar tarea */}
      <input
        type="checkbox"
        className="form-check-input me-2"
        checked={task.completed}
        onChange={onToggle}
      />
      
      {/* Texto de la tarea */}
      <span
        className={`flex-grow-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}
        style={{ fontSize: '14px' }}
      >
        {task.text}
      </span>
      
      {/* Botón eliminar */}
      <button
        className="btn btn-outline-danger btn-sm ms-2"
        onClick={onDelete}
        style={{ fontSize: '12px' }}
      >
        ✕
      </button>
    </div>
  );
};
