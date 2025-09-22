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
    saveNotes(notes);
  }, [notes]);

  // Redimensionar ventana automáticamente según contenido
  useEffect(() => {
    const resizeWindow = () => {
      // Calcular altura necesaria basada en contenido
      const baseHeight = 120; // Header + padding base
      const noteHeight = 280; // Altura aproximada por nota
      
      // Calcular número total de tareas
      const totalTasks = notes.reduce((sum, note) => sum + note.tasks.length, 0);
      const taskHeight = totalTasks * 35; // ~35px por tarea
      
      const calculatedHeight = baseHeight + (notes.length * noteHeight) + taskHeight;
      const finalHeight = Math.max(200, Math.min(calculatedHeight, 800)); // Entre 200px y 800px
      
      // Redimensionar ventana si estamos en Electron
      if ((window as any).electronAPI?.resizeWindow) {
        (window as any).electronAPI.resizeWindow(300, finalHeight);
      }
    };

    // Pequeño delay para que el DOM se actualice
    const timer = setTimeout(resizeWindow, 100);
    return () => clearTimeout(timer);
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
    updateNoteColor,
    addTask,
    toggleTask,
    deleteTask,
  };
};
