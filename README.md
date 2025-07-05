# Reconocimiento de Género por Voz

Un sistema de reconocimiento de género que utiliza Deep Learning con TensorFlow 2 para identificar el género de un hablante a partir de su audio.

## 📋 Descripción

Este proyecto implementa un modelo de red neuronal profunda que puede determinar si una voz corresponde a un hombre o una mujer. El sistema utiliza características espectrales extraídas del audio (Mel-spectrograms) para realizar la clasificación.

## 🚀 Características

- ✅ Reconocimiento en tiempo real usando micrófono
- ✅ Análisis de archivos de audio (formato WAV recomendado)
- ✅ Modelo preentrenado incluido
- ✅ Interfaz de línea de comandos simple
- ✅ Probabilidades de confianza en las predicciones

## 📦 Requisitos

### Dependencias principales:
- TensorFlow 2.x.x
- Scikit-learn
- NumPy
- Pandas
- PyAudio
- Librosa

### Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/XtrullorEas/reconocimiento-de-genero-por-voz
   cd reconocimiento-de-genero-por-voz
   ```

2. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

## 📁 Estructura del Proyecto

```
📦 reconocimiento-de-genero-por-voz/
├── 📄 test.py              # Script principal para predicciones
├── 📄 utils.py             # Funciones auxiliares y modelo
├── 📄 requirements.txt     # Dependencias
├── 📄 balanced-all.csv     # Dataset con rutas y etiquetas
├── 📄 README.md           # Este archivo
├── 📁 results/            # Modelo entrenado y características
│   ├── model.h5          # Modelo de TensorFlow entrenado
│   ├── features.npy      # Características extraídas
│   └── labels.npy        # Etiquetas correspondientes
├── 📁 data/              # Datos de entrenamiento (archivos .npy)
│   ├── cv-other-train/
│   ├── cv-other-dev/
│   ├── cv-other-test/
│   ├── cv-valid-train/
│   ├── cv-valid-dev/
│   └── cv-valid-test/
├── 📁 test-samples/      # Muestras de audio para pruebas
│   ├── hombre.wav
│   ├── mujer1.wav
│   └── mujer2.wav
└── 📁 dev/               # Archivos de desarrollo (opcional)
    ├── train.py          # Script para entrenar modelo
    ├── preparation.py    # Script para procesar datos
    ├── README.md         # Descripción de archivos de desarrollo
    └── LICENSE           # Archivo de licencia
```

## 🎯 Uso

### 1. Reconocimiento usando tu voz (micrófono)

```bash
python test.py
```

El sistema te pedirá que hables. Comienza a hablar cuando veas el mensaje "Por favor habla" y automáticamente se detendrá cuando detecte silencio.

### 2. Análisis de archivo de audio

```bash
python test.py --file "ruta/al/archivo.wav"
```

**Ejemplo:**
```bash
python test.py --file "test-samples/hombre.wav"
```

**Salida esperada:**
```
Resultado: hombre
Probabilidades:     Hombre: 96.36%    Mujer: 3.64%
```

### 3. Ver ayuda

```bash
python test.py --help
```

## 📊 Dataset

El proyecto utiliza el dataset [Mozilla's Common Voice](https://www.kaggle.com/mozillaorg/common-voice) con las siguientes características:

- **Muestras filtradas:** Solo se incluyen muestras válidas etiquetadas
- **Dataset balanceado:** Igual número de muestras masculinas y femeninas
- **Características:** Mel-spectrograms extraídos de archivos de audio
- **Formato:** Archivos .npy con vectores de características de longitud fija

## 🧠 Arquitectura del Modelo

El modelo utiliza una red neuronal profunda con la siguiente arquitectura:

```
Entrada (128 características)
    ↓
Dense(256) + Dropout(0.3)
    ↓
Dense(256, ReLU) + Dropout(0.3)
    ↓
Dense(128, ReLU) + Dropout(0.3)
    ↓
Dense(128, ReLU) + Dropout(0.3)
    ↓
Dense(64, ReLU) + Dropout(0.3)
    ↓
Dense(1, Sigmoid)
    ↓
Salida (0=Mujer, 1=Hombre)
```

## 📈 Rendimiento

- **Función de pérdida:** Binary Crossentropy
- **Optimizador:** Adam
- **Métrica:** Accuracy
- **Técnica de regularización:** Dropout (0.3)

## 🔧 Archivos del Proyecto

### Archivos Necesarios para Funcionamiento:
- ✅ `test.py` - Script principal
- ✅ `utils.py` - Funciones auxiliares
- ✅ `requirements.txt` - Dependencias
- ✅ `balanced-all.csv` - Dataset
- ✅ `results/model.h5` - Modelo entrenado
- ✅ `data/` - Datos de características

### Archivos de Desarrollo (Carpeta `dev/`):
- 🔧 `dev/train.py` - Para entrenar modelo desde cero
- 🔧 `dev/preparation.py` - Para procesar archivos de audio originales
- 🔧 `dev/LICENSE` - Archivo de licencia

**Nota:** Los archivos en la carpeta `dev/` son opcionales y solo necesarios para desarrollo avanzado.

## 🛠️ Entrenamiento (Opcional)

Si deseas entrenar el modelo desde cero:

```bash
python dev/train.py
```

**Nota:** El modelo preentrenado ya está incluido en `results/model.h5`.

## 🔨 Desarrollo Avanzado

### Carpeta `dev/`

La carpeta `dev/` contiene herramientas adicionales para desarrollo:

- **`dev/train.py`** - Script para entrenar el modelo desde cero con tus propios datos
- **`dev/preparation.py`** - Script para procesar archivos de audio originales y extraer características
- **`dev/LICENSE`** - Información de licencia del proyecto

Estos archivos no son necesarios para el funcionamiento básico del reconocimiento de género, pero son útiles si quieres:
- Entrenar el modelo con nuevos datos
- Modificar la arquitectura del modelo
- Procesar tus propios archivos de audio

### Preparación de Datos Personalizados

Si tienes archivos de audio propios y quieres entrenar un modelo personalizado:

1. Organiza tus archivos según la estructura esperada
2. Ejecuta `python dev/preparation.py` para extraer características
3. Ejecuta `python dev/train.py` para entrenar el modelo

## 🎵 Características de Audio Soportadas

El sistema extrae las siguientes características espectrales:

- **MEL Spectrogram:** Características principales utilizadas
- **MFCC:** Coeficientes Cepstrales en Frecuencias Mel
- **Chroma:** Características tonales
- **Spectral Contrast:** Contraste espectral
- **Tonnetz:** Representación armónica

## 📝 Notas Importantes

1. **Formato de audio recomendado:** WAV a 16kHz
2. **Duración:** El sistema funciona mejor con grabaciones de 2-10 segundos
3. **Calidad:** Audio claro sin ruido de fondo produce mejores resultados
4. **Idioma:** Entrenado principalmente con audio en inglés

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia especificada en el archivo `dev/LICENSE`.

## 🔗 Referencias

- [Tutorial original](https://www.thepythoncode.com/article/gender-recognition-by-voice-using-tensorflow-in-python)
- [Dataset Mozilla Common Voice](https://www.kaggle.com/mozillaorg/common-voice)
- [Librosa Documentation](https://librosa.github.io/)
- [TensorFlow Documentation](https://www.tensorflow.org/)

---

**Desarrollado con ❤️ usando TensorFlow y Python**