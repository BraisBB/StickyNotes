import { useState } from 'react';
import './App.css';
import { useNotes, useAutoResize } from './hooks';
import { NoteItem, NoteForm, NewNoteButton, NavBar } from './components';

function App() {
  const { 
    notes, 
    addNote, 
    deleteNote, 
    updateNoteColor, 
    addTask, 
    toggleTask, 
    deleteTask 
  } = useNotes();

  const [showForm, setShowForm] = useState(false);
  
  // Hook de auto-resize automático
  const { ref: appContainerRef } = useAutoResize({
    maxHeight: 900,
    minHeight: 250,
    width: 300
  });

  const handleCreateNote = (title: string, color: string) => {
    addNote(title, color);
    setShowForm(false);
  };

  return (
    // Contenedor principal - se redimensiona automáticamente según el contenido
    <div ref={appContainerRef} className="app-container" style={{ height: 'auto' }}>
      {/* Barra de navegación */}
      <NavBar notes={notes} />
      
      {/* Contenido principal - crece naturalmente */}
      <div className="no-drag p-3" style={{ minHeight: 'auto' }}>
        {/* Botón para agregar nueva nota */}
        {!showForm && (
          <NewNoteButton onClick={() => setShowForm(true)} />
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
            <p className="small">Sin notas</p>
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