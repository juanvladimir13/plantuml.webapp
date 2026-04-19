/**
 * CodeMirror Simple Mode para PlantUML
 * Resalta keywords, tipos de diagrama, flechas, strings, comentarios y estereotipos.
 */
CodeMirror.defineSimpleMode('plantuml', {
  start: [
    // Comentarios de línea
    { regex: /'.*$/, token: 'comment' },

    // Comentarios de bloque
    { regex: /\/\'/, token: 'comment', push: 'comment_block' },

    // Strings entre comillas
    { regex: /"(?:[^\\"]|\\.)*"/, token: 'string' },

    // Estereotipos <<...>>
    { regex: /<<[^>]+>>/, token: 'attribute' },

    // Directivas de diagrama (inicio/fin)
    {
      regex: /\b(@startuml|@enduml|@startmindmap|@endmindmap|@startsalt|@endsalt|@startjson|@endjson|@startyaml|@endyaml|@startgantt|@endgantt)\b/,
      token: 'meta',
    },

    // Tipos de diagrama / keywords principales
    {
      regex: /\b(participant|actor|boundary|control|entity|database|collections|queue|usecase|component|package|node|folder|frame|cloud|rectangle|storage|artifact|interface|enum|abstract|class|object|state|note|legend|title|header|footer|caption|newpage|namespace|partition|together|skinparam)\b/,
      token: 'keyword',
    },

    // Keywords de flujo y relaciones
    {
      regex: /\b(if|then|else|elseif|endif|while|endwhile|repeat|backward|end|fork|again|kill|detach|stop|start|floating|as|is|of|on|over|top|bottom|left|right|end\s+note|end\s+legend|activate|deactivate|destroy|create|return|alt|loop|group|critical|break|par|ref|opt)\b/,
      token: 'keyword',
    },

    // Tipos de datos / visibilidad
    {
      regex: /\b(public|private|protected|static|final|void|int|string|boolean|float|double|long)\b/,
      token: 'type',
    },

    // Colores
    {
      regex: /#[0-9a-fA-F]{3,8}\b/,
      token: 'number',
    },

    // Flechas (-->, ->>, <--, etc.)
    {
      regex: /[<>o*x]?(?:-+(?:right|left|up|down)?-+|\.\.\.*)[>o*x|]?/,
      token: 'operator',
    },

    // Dos puntos para etiquetas de mensajes
    { regex: /:/, token: 'operator' },
  ],

  comment_block: [
    { regex: /.*?\'\//, token: 'comment', pop: true },
    { regex: /.*/, token: 'comment' },
  ],

  meta: {
    lineComment: "'",
  },
});
