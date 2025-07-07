# 🎤 Cliente Web - Reconocimiento de Género por Voz

Cliente web desarrollado para consumir la API de reconocimiento de género por voz.

## Características

- 🌐 Interfaz web moderna y responsiva
- 📁 Drag & drop para subir archivos de audio
- 🎤 Grabación desde micrófono del navegador
- 📊 Visualización de resultados con barras de progreso
- 🔗 Configuración flexible de URL de API
- 💾 Guarda configuraciones en localStorage

## Uso

1. Abre `index.html` en tu navegador
2. Configura la URL de tu API (ejemplo: `https://tu-api.onrender.com`)
3. Prueba la conexión
4. Sube archivos de audio o graba desde el micrófono

## Deployment en Netlify

Este frontend puede ser desplegado directamente en Netlify:

1. Arrastra la carpeta `frontend` a Netlify
2. O conecta tu repositorio de GitHub
3. Deploy automático

## Formatos de Audio Soportados

- WAV
- MP3  
- FLAC
- M4A

## Requisitos

- Navegador moderno con soporte para:
  - MediaRecorder API (para grabación)
  - Fetch API
  - ES6+
