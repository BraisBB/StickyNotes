import { useState } from 'react';
import { AVAILABLE_COLORS, DEFAULT_COLOR } from '../../types';

// Props que recibe el componente
interface NoteFormProps {
  onCreateNote: (title: string, color: string) => void;
  onCancel: () => void;
}

// Componente para crear nuevas notas
export const NoteForm = ({ onCreateNote, onCancel }: NoteFormProps) => {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR);

  // Debug: Verificar que los colores se están importando correctamente
  console.log('NoteForm - AVAILABLE_COLORS:', AVAILABLE_COLORS);
  console.log('NoteForm - DEFAULT_COLOR:', DEFAULT_COLOR);
  console.log('NoteForm - selectedColor:', selectedColor);

  // Crear nota
  const handleSubmit = () => {
    if (title.trim()) {
      onCreateNote(title.trim(), selectedColor);
      setTitle('');
      setSelectedColor(DEFAULT_COLOR);
    }
  };

  return (
    <div className="card mb-3 shadow-sm border-primary">
      <div className="card-body">
        <h6 className="card-title text-primary">Nueva Nota</h6>
        
        {/* Input para título */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Título de la nota..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
        </div>

        {/* Selector de colores */}
        <div className="mb-3">
          <small className="text-muted">Seleccionar color:</small>
          <div className="d-flex gap-1 mt-1">
            {AVAILABLE_COLORS.map(color => (
              <button
                key={color}
                className={`btn btn-sm ${selectedColor === color ? 'border border-dark border-2' : ''}`}
                style={{ 
                  backgroundColor: color, 
                  width: '30px', 
                  height: '30px',
                  padding: '0'
                }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        {/* Botones */}
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSubmit}
            disabled={!title.trim()}
          >
            Crear Nota
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
