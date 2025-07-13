import React from "react";
import Note from "./Note";
import "../styles/canvas.css";

const Canvas = ({
  notes,
  actualizarNota,
  eliminarNota,
  duplicarNota, // si lo usas
  width,
  height,
  onBoardClick,
}) => {
  return (
    <div className="canvas-container" style={{ width, height }}>
      {!Array.isArray(notes) ? (
        <div style={{ color: "red", padding: "10px" }}>
          ⚠️ Error: las notas no son un array.
        </div>
      ) : (
        notes.map((nota) => (
          <Note
            key={nota.id}
            nota={nota}
            actualizarNota={actualizarNota}
            eliminarNota={eliminarNota}
            duplicarNota={duplicarNota} // si usas duplicar
            onBoardClick={onBoardClick}
          />
        ))
      )}
    </div>
  );
};

export default Canvas;
