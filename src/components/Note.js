import React, { useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "../styles/note.css";

const Note = ({ nota, actualizarNota, eliminarNota, duplicarNota, onBoardClick }) => {
  const nodeRef = useRef(null);

  const handleDrag = (e, data) => {
    actualizarNota(nota.id, { x: data.x, y: data.y });
  };

  const handleResize = (e, { size }) => {
    actualizarNota(nota.id, { width: size.width, height: size.height });
  };

  const handleEliminarClick = (e) => {
    e.stopPropagation();
    eliminarNota(nota.id);
  };

  const handleDuplicarClick = (e) => {
    e.stopPropagation();
    duplicarNota(nota.id); // ✅ Corrección aquí
  };

  const handleBoardClick = () => {
    if (nota.tipo === "board" && onBoardClick) {
      onBoardClick(nota.destino);
    }
  };

  const handleAgregarTarea = () => {
    const nuevasTareas = [...(nota.tareas || []), { texto: "", completado: false }];
    actualizarNota(nota.id, { tareas: nuevasTareas });
  };

  const handleEditarTarea = (index, nuevoTexto) => {
    const nuevasTareas = nota.tareas.map((tarea, i) =>
      i === index ? { ...tarea, texto: nuevoTexto } : tarea
    );
    actualizarNota(nota.id, { tareas: nuevasTareas });
  };

  const handleEliminarTarea = (index) => {
    const nuevasTareas = nota.tareas.filter((_, i) => i !== index);
    actualizarNota(nota.id, { tareas: nuevasTareas });
  };

  const handleToggleTarea = (index) => {
    const nuevasTareas = nota.tareas.map((tarea, i) =>
      i === index ? { ...tarea, completado: !tarea.completado } : tarea
    );
    actualizarNota(nota.id, { tareas: nuevasTareas });
  };

  const handleTituloChange = (e) => {
    actualizarNota(nota.id, { titulo: e.target.value });
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".note-header"
      position={{ x: nota.x, y: nota.y }}
      onStop={handleDrag}
    >
      <div ref={nodeRef} style={{ position: "absolute", zIndex: 1 }}>
        <ResizableBox
          width={nota.width}
          height={nota.height}
          onResizeStop={handleResize}
          minConstraints={[100, 80]}
          className={`note ${nota.tipo === "board" ? "note-board" : ""}`}
          resizeHandles={["se"]}
        >
          <div className="note-header">
            <input
              className="note-title-input"
              type="text"
              value={nota.titulo || ""}
              onChange={handleTituloChange}
              placeholder="Título"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="note-duplicate-btn"
              onClick={handleDuplicarClick}
              title="Duplicar nota"
            >
              ⧉
            </button>
            <button
              className="note-close-btn"
              onClick={handleEliminarClick}
              title="Eliminar nota"
            >
              ×
            </button>
          </div>

          <div
            onClick={handleBoardClick}
            className={`note-content ${nota.tipo === "board" ? "board" : ""}`}
          >
            {nota.tipo === "todo" ? (
              <div>
                <ul className="todo-list">
                  {(nota.tareas || []).map((tarea, i) => (
                    <li key={i} className="todo-item">
                      <input
                        type="checkbox"
                        checked={tarea.completado}
                        onChange={() => handleToggleTarea(i)}
                      />
                      <input
                        type="text"
                        value={tarea.texto}
                        onChange={(e) => handleEditarTarea(i, e.target.value)}
                        className={tarea.completado ? "completado" : ""}
                      />
                      <button
                        onClick={() => handleEliminarTarea(i)}
                        title="Eliminar tarea"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
                <button onClick={handleAgregarTarea} className="todo-add-btn">
                  + Agregar
                </button>
              </div>
            ) : nota.tipo === "board" ? (
              <>
                <div className="note-content-icon">🗂️</div>
                <div className="note-name">{nota.contenido}</div>
              </>
            ) : (
              <textarea
                value={nota.contenido || ""}
                onChange={(e) =>
                  actualizarNota(nota.id, { contenido: e.target.value })
                }
                className="note-content-textarea"
              />
            )}
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default Note;
