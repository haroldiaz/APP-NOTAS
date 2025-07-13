// src/hooks/useCargarDatosIniciales.js
import { useEffect } from "react";

const useCargarDatosIniciales = ({ setBoards, setCurrentBoardId, setHistorialBoards }) => {
  useEffect(() => {
    try {
      const data = localStorage.getItem("milanoteApp");
      if (data) {
        const parsed = JSON.parse(data);
        const boardsValidados = {};
        if (parsed.boards) {
          for (const key in parsed.boards) {
            boardsValidados[key] = Array.isArray(parsed.boards[key])
              ? parsed.boards[key]
              : [];
          }
        }
        setBoards(Object.keys(boardsValidados).length > 0 ? boardsValidados : { default: [] });
        setCurrentBoardId(parsed.currentBoardId || "default");
        setHistorialBoards(Array.isArray(parsed.historialBoards) ? parsed.historialBoards : []);
      } else {
        setBoards({ default: [] });
      }
    } catch (error) {
      console.error("Error al cargar desde localStorage:", error);
      setBoards({ default: [] });
    }
  }, []);
};

export default useCargarDatosIniciales;
