// src/hooks/useCanvasTamaño.js
import { useState } from "react";

const useCanvasTamaño = (anchoInicial = "100%", altoInicial = "600px") => {
  const [canvasWidth, setCanvasWidth] = useState(anchoInicial);
  const [canvasHeight, setCanvasHeight] = useState(altoInicial);

  const editarCanvas = () => {
    const nuevoAncho = prompt("Nuevo ancho del canvas (ej: 100%, 800px):", canvasWidth);
    const nuevoAlto = prompt("Nuevo alto del canvas (ej: 600px):", canvasHeight);

    if (nuevoAncho) setCanvasWidth(nuevoAncho);
    if (nuevoAlto) setCanvasHeight(nuevoAlto);
  };

  return { canvasWidth, canvasHeight, editarCanvas };
};

export default useCanvasTamaño;
