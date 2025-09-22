import { useState } from 'react';
import { StickyNote, AVAILABLE_COLORS } from '../../types';
import { TaskItem } from './TaskItem';

// Props que recibe el componente
interface NoteItemProps {
  note: StickyNote;
  onDeleteNote: () => void;
  onUpdateColor: (color: string) => void;
  onAddTask: (taskText: string) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

// Componente para mostrar una nota completa
export const NoteItem = ({
  note,
  onDeleteNote,
  onUpdateColor,
  onAddTask,
  onToggleTask,
  onDeleteTask
}: NoteItemProps) => {
  const [newTaskText, setNewTaskText] = useState('');

  // Agregar nueva tarea
  const handleAddTask = () => {
    if (newTaskText.trim()) {
      onAddTask(newTaskText.trim());
      setNewTaskText('');
    }
  };

  return (
    <div 
      className="card mb-3 shadow-sm"
      style={{ backgroundColor: note.color, minHeight: '200px' }}
    >
      <div className="card-body">
        {/* Header con título y botón eliminar */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">{note.title}</h5>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={onDeleteNote}
          >
            🗑️
          </button>
        </div>

        {/* Selector de colores */}
        <div className="mb-3">
          <small className="text-muted">Color:</small>
          <div className="d-flex gap-1 mt-1">
            {AVAILABLE_COLORS.map(color => (
              <button
                key={color}
                className={`btn btn-sm ${note.color === color ? 'border border-dark' : ''}`}
                style={{ 
                  backgroundColor: color, 
                  width: '25px', 
                  height: '25px',
                  padding: '0'
                }}
                onClick={() => onUpdateColor(color)}
              />
            ))}
          </div>
        </div>

        {/* Lista de tareas */}
        <div className="mb-3">
          {note.tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => onToggleTask(task.id)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}
        </div>

        {/* Formulario para agregar tarea */}
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Nueva tarea..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAddTask}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
