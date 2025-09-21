import './App.css'

function App() {
  return (
    <div className="app-container shadow-lg">
      {/* Área para arrastrar - usando clases de Bootstrap */}
      <div className="drag-area bg-light border-bottom d-flex align-items-center justify-content-center">
        <span className="fw-semibold text-muted small">StickyNotes</span>
      </div>
      
      {/* Contenido principal */}
      <div className="no-drag p-3">
        <p className="text-center text-muted mb-0">
          ¡Tu aplicación de notas adhesivas está lista!
        </p>
      </div>
    </div>
  )
}

export default App