import { useState, useEffect } from 'react';
import './App.css';
import { useNotes } from './hooks';
import { NoteItem, NoteForm, NewNoteButton, NavBar } from './components';

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

  // Redimensionar ventana automáticamente
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      // Calcular altura basándose en contenido real, no en scrollHeight
      let totalHeight = 40; // NavBar
      totalHeight += 24; // Padding del contenedor
      
      if (notes.length === 0 && !showForm) {
        totalHeight += 45 + 80; // Botón + mensaje vacío
      } else {
        if (!showForm) totalHeight += 45; // Botón Nueva Nota
        if (showForm) totalHeight += 180; // Formulario
        
        // Cada nota: altura base + tareas
        notes.forEach(note => {
          totalHeight += 200; // Altura base de la nota
          totalHeight += note.tasks.length * 40; // Cada tarea
          totalHeight += 12; // Margen inferior
        });
      }
      
      const finalHeight = Math.max(250, Math.min(totalHeight, 900));
      window.electronAPI?.resizeWindow?.(300, finalHeight);
    });
    
    return () => cancelAnimationFrame(frame);
  }, [notes, showForm]);

  // Crear nueva nota
  const handleCreateNote = (title: string, color: string) => {
    addNote(title, color);
    setShowForm(false);
  };

  return (
    <div className="app-container shadow-lg">
      {/* Barra de navegación */}
      <NavBar notes={notes} />
      
      {/* Contenido principal */}
      <div className="no-drag p-3">
        
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