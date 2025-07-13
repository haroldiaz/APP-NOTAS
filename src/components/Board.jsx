import React from "react";
import Note from "./Note";
import "../styles/board.css";

const Board = ({ notas, actualizarNota, eliminarNota }) => {
  return (
    <div className="board">
      {notas.map((nota) => (
        <Note
          key={nota.id}
          nota={nota}
          actualizarNota={actualizarNota}
          eliminarNota={eliminarNota}
        />
      ))}
    </div>
  );
};

export default Board;
