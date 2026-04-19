const ENDPOINT = '/server.php';
const DEBOUNCE_MS = 3000;
const STORAGE_KEY = 'plantuml_juanvladimir13';

let currentBlobUrl = null;
let cmEditor = null;

/**
 * Envía el código PlantUML al backend PHP para obtener la URL codificada del SVG.
 */
async function encodePlantUML(code) {
  const body = new URLSearchParams({ m: `!theme toy\n@startuml\n${code}\n@enduml` });

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) {
    throw new Error(`Error al codificar PlantUML: ${response.status}`);
  }

  return response.text();
}

/**
 * Obtiene el contenido SVG desde el servidor PlantUML usando la URL codificada.
 */
async function fetchSvgContent(svgUrl) {
  const response = await fetch(svgUrl);

  if (!response.ok) {
    throw new Error(`Error al obtener SVG: ${response.status}`);
  }

  return response.text();
}

/**
 * Renderiza el contenido SVG en el contenedor #diagram.
 */
function renderSvg(svgContent) {
  const diagram = document.getElementById('diagram');

  if (currentBlobUrl) {
    URL.revokeObjectURL(currentBlobUrl);
  }

  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  currentBlobUrl = URL.createObjectURL(blob);

  const img = new Image();
  img.src = currentBlobUrl;

  diagram.innerHTML = '';
  diagram.appendChild(img);
}

/**
 * Orquesta el flujo completo: codificar → obtener SVG → renderizar.
 * Solo ejecuta si el contenido cambió respecto al último guardado.
 */
async function processEditor() {
  const code = cmEditor.getValue().trim();

  if (!code || code === localStorage.getItem(STORAGE_KEY)) {
    return;
  }

  localStorage.setItem(STORAGE_KEY, code);

  try {
    const svgUrl = await encodePlantUML(code);
    const svgContent = await fetchSvgContent(svgUrl);
    renderSvg(svgContent);
  } catch (error) {
    console.error('[PlantUML]', error.message);
  }
}

/**
 * Crea una versión debounced de una función.
 */
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

const debouncedProcess = debounce(processEditor, DEBOUNCE_MS);

document.addEventListener('DOMContentLoaded', () => {
  const savedCode = localStorage.getItem(STORAGE_KEY) || '';

  cmEditor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: 'plantuml',
    theme: 'material-darker',
    lineNumbers: false,
    lineWrapping: true,
    autofocus: true,
  });

  if (savedCode) {
    cmEditor.setValue(savedCode);
  }

  cmEditor.on('changes', debouncedProcess);
  processEditor();
});