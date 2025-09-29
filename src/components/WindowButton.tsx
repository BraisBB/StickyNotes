interface WindowButtonProps {
  type: 'minimize' | 'close';
  onClick?: () => void;
}

export const WindowButton = ({ type, onClick }: WindowButtonProps) => {
  const getButtonConfig = () => {
    switch (type) {
      case 'minimize':
        return {
          icon: '−',
          title: 'Minimizar',
          hoverClass: 'btn-warning',
          hoverTextColor: '#000',
          defaultAction: () => window.electronAPI?.minimizeWindow?.()
        };
      case 'close':
        return {
          icon: '✕',
          title: 'Cerrar',
          hoverClass: 'btn-danger',
          hoverTextColor: '',
          defaultAction: () => window.electronAPI?.closeWindow?.()
        };
      default:
        return {
          icon: '',
          title: '',
          hoverClass: '',
          hoverTextColor: '',
          defaultAction: () => {}
        };
    }
  };

  const config = getButtonConfig();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      config.defaultAction();
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.remove('btn-secondary');
    e.currentTarget.classList.add(config.hoverClass);
    if (config.hoverTextColor) {
      e.currentTarget.style.color = config.hoverTextColor;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.remove(config.hoverClass);
    e.currentTarget.classList.add('btn-secondary');
    e.currentTarget.style.color = '';
  };

  return (
    <button
      className="btn btn-secondary btn-sm d-flex align-items-center justify-content-center p-0"
      style={{ width: '20px', height: '20px', fontSize: '12px', lineHeight: '1' }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={config.title}
    >
      {config.icon}
    </button>
  );
};
