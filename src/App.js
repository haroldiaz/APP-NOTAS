import React, { useState } from "react";
import Canvas from "./components/Canvas";
import BarraDeBotones from "./components/BarraDeBotones";
import useCargarDatosIniciales from "./Hooks/useCargarDatosIniciales.js";
import useCanvasTamaño from "./Hooks/useCanvasTamaño";
const App = () => {
  const [boards, setBoards] = useState({ default: [] });
  const [historialBoards, setHistorialBoards] = useState([]);
  const [currentBoardId, setCurrentBoardId] = useState("default");
  

 // Custom hook para cargar datos desde localStorage
  useCargarDatosIniciales({ setBoards, setCurrentBoardId, setHistorialBoards });

  const guardarDatos = () => {
    try {
      const data = {
        boards,
        currentBoardId,
        historialBoards,
      };
      localStorage.setItem("milanoteApp", JSON.stringify(data));
    } catch (error) {
      console.error("Error al guardar en localStorage:", error);
    }
  };
  //hook para el canvas
  const { canvasWidth, canvasHeight, editarCanvas } = useCanvasTamaño();

  const notas = Array.isArray(boards[currentBoardId]) ? boards[currentBoardId] : [];

  const setNotas = (nuevasNotas) => {
    setBoards((prev) => ({
      ...prev,
      [currentBoardId]: nuevasNotas,
    }));
  };

  const agregarNota = () => {
    const nuevaNota = {
      id: Date.now(),
      tipo: "texto",
      x: 20,
      y: 20,
      width: 200,
      height: 150,
      contenido: "",
    };
    setNotas([...notas, nuevaNota]);
  };

  const agregarToDo = () => {
    const nuevaNota = {
      id: Date.now(),
      tipo: "todo",
      x: 40,
      y: 40,
      width: 220,
      height: 180,
      tareas: [{ texto: "Nueva tarea", completado: false }],
    };
    setNotas([...notas, nuevaNota]);
  };

  const agregarBoardComoNota = () => {
    const nombre = prompt("Nombre del nuevo board:");
    if (nombre && !boards[nombre]) {
      setBoards((prev) => ({ ...prev, [nombre]: [] }));
      const nuevaNota = {
        id: Date.now(),
        tipo: "board",
        destino: nombre,
        x: 100,
        y: 100,
        width: 200,
        height: 120,
        contenido: nombre,
      };
      setNotas([...notas, nuevaNota]);
    }
  };

  const actualizarNota = (id, cambios) => {
    setNotas(notas.map((n) => (n.id === id ? { ...n, ...cambios } : n)));
  };

  const eliminarNota = (id) => {
    setNotas(notas.filter((n) => n.id !== id));
  };

  const duplicarNota = (idOriginal) => {
    const original = notas.find((n) => n.id === idOriginal);
    if (!original) return;

    const copia = {
      ...original,
      id: Date.now(),
      x: original.x + 30,
      y: original.y + 30,
    };

    setNotas([...notas, copia]);
  };

  const entrarABoard = (nuevoId) => {
    setHistorialBoards((prev) => [...prev, currentBoardId]);
    setCurrentBoardId(nuevoId);
  };

  const volverAtras = () => {
    if (historialBoards.length > 0) {
      const anterior = historialBoards[historialBoards.length - 1];
      setHistorialBoards((prev) => prev.slice(0, -1));
      setCurrentBoardId(anterior);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          padding: "10px",
          background: "#f0f0f0",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {historialBoards.length > 0 && (
          <button onClick={volverAtras}>← Volver</button>
        )}
        <strong>{currentBoardId}</strong>
      </div>

      <BarraDeBotones
        onAgregarNota={agregarNota}
        onAgregarToDo={agregarToDo}
        onAgregarBoard={agregarBoardComoNota}
        onGuardarDatos={guardarDatos}
        onEditarCanvas={editarCanvas}
      />

      <Canvas
        notes={notas}
        actualizarNota={actualizarNota}
        eliminarNota={eliminarNota}
        duplicarNota={duplicarNota}
        width={canvasWidth}
        height={canvasHeight}
        onBoardClick={entrarABoard}
      />
    </div>
  );
};

export default App;
