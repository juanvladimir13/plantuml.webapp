# PlantUML Client

Editor web de diagramas PlantUML con syntax highlighting, renderizado SVG en tiempo real y tema oscuro.

## Requisitos

| Herramienta | Versión | Uso |
|-------------|---------|-----|
| **PHP** | >= 7.4 | Servidor embebido y codificación PlantUML |
| **Composer** | >= 2.x | Gestión de dependencias PHP |
| **Node.js / npm** | >= 16.x | Herramientas de build (minificación) |

## Estructura del proyecto

```
plantuml-client/
├── .env.php                     # Configuración del servidor PlantUML
├── .gitignore
├── composer.json                # Dependencias PHP + scripts de build
├── README.md
├── public/                      # Document root
│   ├── index.html               # Página principal
│   ├── server.php               # Backend: codifica PlantUML → URL SVG
│   ├── css/
│   │   ├── base.css             # Estilos fuente
│   │   └── base.min.css         # (generado) CSS minificado
│   └── js/
│       ├── plantuml-mode.js     # Modo de sintaxis CodeMirror para PlantUML
│       ├── fecthPlantUML.js     # Lógica del cliente (fetch + render)
│       └── base.min.js          # (generado) JS combinado y minificado
├── src/                         # Clases PHP (PSR-4: Plantuml\)
└── vendor/                      # Dependencias de Composer
```

## Tecnologías

- **Frontend**: HTML5, Vanilla CSS, Vanilla JavaScript
- **Editor**: [CodeMirror 5](https://codemirror.net/5/) (CDN) con tema `material-darker`
- **Backend**: PHP (servidor embebido)
- **Codificación**: [jawira/plantuml-encoding](https://github.com/jawira/plantuml-encoding)
- **Diagramas**: [PlantUML Server](https://plantuml.com/server)

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/juanvladimir13/plantuml.webapp.git
cd plantuml.webapp
```

### 2. Instalar dependencias PHP

```bash
composer install
```

> Instala `jawira/plantuml-encoding` — librería para codificar texto PlantUML en el formato que acepta el servidor.

### 3. Instalar herramientas de build (npm global)

```bash
npm install -g clean-css-cli terser
```

| Paquete | Propósito |
|---------|-----------|
| `clean-css-cli` | Minifica `base.css` → `base.min.css` |
| `terser` | Minifica y combina JS → `base.min.js` |

#### Producción (build)

```bash
composer css
composer js
```

> Los archivos minificados (`*.min.css`, `*.min.js`) deben generarse en cada despliegue.

### 4. Levantar el servidor PlantUML

#### Instalar OpenJDK

```bash
sudo apt-get install openjdk-25-jre
```

#### Crear una carpeta para la APP
```bash
sudo mkdir /opt/plantuml
sudo chmod 777 /opt/plantuml
```

#### Descargar el archivo plantuml.jar
```bash
curl -o /opt/plantuml/plantuml.jar https://github.com/plantuml/plantuml/releases/download/v1.2026.2/plantuml-lgpl-1.2026.2.jar
```

#### Modificar los permisos de la carpeta plantuml
```bash
sudo chmod 777 -R /opt/plantuml
```

#### Levantar el servidor PlantUML
```bash
java -jar /opt/plantuml/plantuml.jar -picoweb:8889:0.0.0.0 &
```

> El servidor PlantUML debe estar en `http://localhost:8889`. Si necesitas otro host o puerto, edita `.env.php`.

### 5. Configuración del entorno

El archivo `.env.php` define la conexión al servidor PlantUML:

```php
<?php
 return [
   'server' => 'http://localhost',
   'port' => '8889',
 ];
```

## Scripts de Composer

| Comando | Descripción |
|---------|-------------|
| `composer start` | Inicia el servidor PHP en `http://localhost:8888` |
| `composer css` | Minifica `public/css/base.css` → `public/css/base.min.css` |
| `composer js` | Minifica y combina `plantuml-mode.js` + `fecthPlantUML.js` → `public/js/base.min.js` |

## Licencia

MIT — Juan Vladimir
