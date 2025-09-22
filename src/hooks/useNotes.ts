import { useState, useEffect } from 'react';
import { StickyNote, Task, DEFAULT_COLOR } from '../types';
import { saveNotes, loadNotes, generateNoteId, generateTaskId } from '../utils';

// Custom hook para manejar todas las notas
export const useNotes = () => {
  // Estado principal: array de todas las notas
  const [notes, setNotes] = useState<StickyNote[]>([]);

  // Cargar notas al iniciar la aplicación
  useEffect(() => {
    const savedNotes = loadNotes();
    setNotes(savedNotes);
  }, []);

  // Auto-guardar cuando cambien las notas
  useEffect(() => {
    if (notes.length > 0) {
      saveNotes(notes);
    }
  }, [notes]);

  // Agregar nueva nota
  const addNote = (title: string, color: string = DEFAULT_COLOR) => {
    const newNote: StickyNote = {
      id: generateNoteId(),
      title,
      tasks: [],
      color,
    };
    
    setNotes(prevNotes => [...prevNotes, newNote]);
  };

  // Eliminar nota
  const deleteNote = (noteId: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  };

  // Actualizar título de nota
  const updateNoteTitle = (noteId: string, newTitle: string) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId 
          ? { ...note, title: newTitle }
          : note
      )
    );
  };

  // Cambiar color de nota
  const updateNoteColor = (noteId: string, newColor: string) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId 
          ? { ...note, color: newColor }
          : note
      )
    );
  };

  // Agregar tarea a una nota
  const addTask = (noteId: string, taskText: string) => {
    const newTask: Task = {
      id: generateTaskId(),
      text: taskText,
      completed: false,
    };

    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId 
          ? { ...note, tasks: [...note.tasks, newTask] }
          : note
      )
    );
  };

  // Marcar/desmarcar tarea como completada
  const toggleTask = (noteId: string, taskId: string) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId 
          ? {
              ...note,
              tasks: note.tasks.map(task => 
                task.id === taskId 
                  ? { ...task, completed: !task.completed }
                  : task
              )
            }
          : note
      )
    );
  };

  // Eliminar tarea
  const deleteTask = (noteId: string, taskId: string) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === noteId 
          ? { ...note, tasks: note.tasks.filter(task => task.id !== taskId) }
          : note
      )
    );
  };

  // Retornar estado y funciones
  return {
    notes,
    addNote,
    deleteNote,
    updateNoteTitle,
    updateNoteColor,
    addTask,
    toggleTask,
    deleteTask,
  };
};
