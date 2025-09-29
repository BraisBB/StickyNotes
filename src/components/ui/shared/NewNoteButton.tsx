import { NEW_NOTE_BUTTON_COLOR } from '../../../types/constants';

interface NewNoteButtonProps {
  onClick: () => void;
}

export const NewNoteButton = ({ onClick }: NewNoteButtonProps) => {
  return (
    <div className="text-center mb-3">
      <button 
        className="btn btn-sm"
        style={{
          backgroundColor: NEW_NOTE_BUTTON_COLOR,
          color: 'white',
          border: 'none',
          borderRadius: '6px'
        }}
        onClick={onClick}
      >
        ➕ Nueva Nota
      </button>
    </div>
  );
};
