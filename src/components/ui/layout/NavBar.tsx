import BatAnimation from '../BatAnimation/BatAnimation';
import { TaskCounter } from '../shared/TaskCounter';
import { WindowButton } from '../shared/WindowButton';
import { StickyNote } from '../../../types';

interface NavBarProps {
  notes: StickyNote[];
}

export const NavBar = ({ notes }: NavBarProps) => {
  return (
    <div className="drag-area bg-light border-bottom d-flex align-items-center justify-content-between px-3">
      <BatAnimation />
      <div className="d-flex align-items-center gap-3">
        <TaskCounter notes={notes} />
        
        {/* Botones de control de ventana */}
        <div className="window-controls d-flex gap-1">
          <WindowButton type="minimize" />
          <WindowButton type="close" />
        </div>
      </div>
    </div>
  );
};
