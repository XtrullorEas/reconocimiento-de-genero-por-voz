# API de Reconocimiento de Género por Voz

API REST desarrollada con Flask para detectar el género (masculino/femenino) a partir de archivos de audio.

## Características

- 🎤 Detección de género por voz usando Machine Learning
- 📁 Subida de archivos de audio (WAV, MP3, FLAC, M4A)
- 🔊 Grabación desde micrófono del servidor
- 📊 Niveles de confianza en las predicciones
- 🌐 API REST con CORS habilitado

## Endpoints

### `GET /`
Verificación de salud de la API

### `POST /predict`
Predice el género desde un archivo de audio
- **Body**: FormData con campo `file`
- **Response**: JSON con género, probabilidades y confianza

### `POST /record`
Graba audio desde el micrófono del servidor y predice género
- **Response**: JSON con género, probabilidades y confianza

## Uso Local

```bash
pip install -r requirements.txt
python api.py
```

## Deployment

Esta API está optimizada para deployment en Render, Railway o Heroku.

## Modelo

Utiliza un modelo de red neuronal entrenado con características MEL del espectrograma para clasificación binaria de género.
