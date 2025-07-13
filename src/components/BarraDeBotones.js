import React from "react";
import "../styles/barra.css";

const BarraDeBotones = ({ 
  onAgregarNota, 
  onAgregarToDo, 
  onAgregarBoard,
  onGuardarDatos,
  onEditarCanvas
}) => {
  return (
    <div className="barra-container">
      <button onClick={onAgregarNota}>
        📝 <span>Agregar Nota Texto</span>
      </button>
      <button onClick={onAgregarToDo}>
        ✅ <span>Agregar Nota ToDo</span>
      </button>
      <button onClick={onAgregarBoard}>
        📁 <span>Agregar Board</span>
      </button>
      <button onClick={onGuardarDatos} className="guardar-btn">
        💾 <span>Guardar</span>
      </button>
      <button onClick={onEditarCanvas}>
        🎨 <span>Editar Canvas</span>
      </button>
    </div>
  );
};

export default BarraDeBotones;
