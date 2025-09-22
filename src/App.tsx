import { useState } from 'react';
import './App.css';
import { useNotes } from './hooks';
import { NoteItem, NoteForm, TaskCounter } from './components';

function App() {
  // Hook personalizado para manejar todas las notas
  const { 
    notes, 
    addNote, 
    deleteNote, 
    updateNoteColor, 
    addTask, 
    toggleTask, 
    deleteTask 
  } = useNotes();

  // Estado para mostrar/ocultar formulario de nueva nota
  const [showForm, setShowForm] = useState(false);

  // Crear nueva nota
  const handleCreateNote = (title: string, color: string) => {
    addNote(title, color);
    setShowForm(false);
  };

  return (
    <div className="app-container shadow-lg">
      {/* Área para arrastrar - usando clases de Bootstrap */}
      <div className="drag-area bg-light border-bottom d-flex align-items-center justify-content-between px-3">
        <span className="fw-semibold text-muted small">StickyNotes</span>
        <div className="d-flex align-items-center gap-2">
          <TaskCounter notes={notes} />
          
          {/* Botones de control de ventana */}
          <div className="window-controls d-flex gap-1">
            <button
              className="btn btn-secondary btn-sm d-flex align-items-center justify-content-center p-0"
              style={{ width: '20px', height: '20px', fontSize: '12px', lineHeight: '1' }}
              onClick={() => (window as any).electronAPI?.minimizeWindow?.()}
              onMouseEnter={(e) => {
                e.currentTarget.classList.remove('btn-secondary');
                e.currentTarget.classList.add('btn-warning');
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove('btn-warning');
                e.currentTarget.classList.add('btn-secondary');
                e.currentTarget.style.color = '';
              }}
              title="Minimizar"
            >
              −
            </button>
            <button
              className="btn btn-secondary btn-sm d-flex align-items-center justify-content-center p-0"
              style={{ width: '20px', height: '20px', fontSize: '12px', lineHeight: '1' }}
              onClick={() => (window as any).electronAPI?.closeWindow?.()}
              onMouseEnter={(e) => {
                e.currentTarget.classList.remove('btn-secondary');
                e.currentTarget.classList.add('btn-danger');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove('btn-danger');
                e.currentTarget.classList.add('btn-secondary');
              }}
              title="Cerrar"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="no-drag p-3">
        
        {/* Botón para agregar nueva nota */}
        {!showForm && (
          <div className="text-center mb-3">
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setShowForm(true)}
            >
              ➕ Nueva Nota
            </button>
          </div>
        )}

        {/* Formulario para nueva nota */}
        {showForm && (
          <NoteForm
            onCreateNote={handleCreateNote}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Lista de notas */}
        {notes.length === 0 && !showForm ? (
          <div className="text-center text-muted">
            <p className="mb-2">¡No hay notas aún!</p>
            <p className="small">Haz clic en "Nueva Nota" para empezar</p>
          </div>
        ) : (
          <div>
            {notes.map(note => (
              <NoteItem
                key={note.id}
                note={note}
                onDeleteNote={() => deleteNote(note.id)}
                onUpdateColor={(color) => updateNoteColor(note.id, color)}
                onAddTask={(taskText) => addTask(note.id, taskText)}
                onToggleTask={(taskId) => toggleTask(note.id, taskId)}
                onDeleteTask={(taskId) => deleteTask(note.id, taskId)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App