# Carpeta de Desarrollo (dev/)

Esta carpeta contiene herramientas y scripts adicionales para el desarrollo avanzado del proyecto de reconocimiento de género por voz.

## 📁 Contenido

### `train.py`
**Propósito:** Entrenar el modelo de reconocimiento de género desde cero.

**⚠️ IMPORTANTE:** Antes de ejecutar, renombra el archivo `model.h5` existente en la carpeta `results/` (ej: `model_backup.h5`) para evitar sobrescribirlo.

**Uso:**
```bash
# Desde el directorio raíz del proyecto
python dev/train.py
```

**Funcionalidad:**
- Carga el dataset desde `balanced-all.csv`
- Divide los datos en conjuntos de entrenamiento, validación y prueba
- Entrena una red neuronal profunda
- Guarda el modelo entrenado en `../results/model.h5`
- Muestra métricas de evaluación

### `preparation.py`
**Propósito:** Procesar archivos de audio originales de Kaggle/Mozilla Common Voice y extraer características.

**⚠️ NOTA:** Este script se utiliza ÚNICAMENTE con archivos de audio originales (formato .wav/.mp3) descargados de Kaggle/Mozilla Common Voice. No es necesario ejecutarlo si ya tienes la carpeta `data/` con archivos `.npy`.

**Uso:**
```bash
# Desde el directorio raíz del proyecto
python dev/preparation.py
```

**Funcionalidad:**
- Lee archivos CSV con información de audio original
- Filtra y preprocesa los datos (solo géneros 'male' y 'female')
- Extrae características espectrales (Mel-spectrograms) de archivos de audio originales
- **Genera la carpeta `data/` con archivos `.npy`** que contienen las características procesadas
- Convierte archivos de audio pesados en vectores de características para entrenamiento rápido

### `LICENSE`
**Propósito:** Información de licencia del proyecto.

## 🔧 Requisitos para Desarrollo

Para utilizar estos scripts, necesitas todas las dependencias listadas en `../requirements.txt` más acceso a:

- **Para `preparation.py`:** Dataset original de Mozilla Common Voice descargado de Kaggle (archivos de audio .wav/.mp3)
- **Para `train.py`:** Carpeta `data/` ya generada con archivos `.npy` (resultado de `preparation.py`)
- GPU recomendada para entrenamiento (opcional pero acelera el proceso)

## 📝 Notas Importantes

1. **Orden de ejecución:** Si partes de archivos de audio originales de Kaggle:
   - Primero ejecuta `preparation.py` para extraer características y generar la carpeta `data/`
   - Luego ejecuta `train.py` para entrenar el modelo

2. **Respaldo importante:** Antes de entrenar, renombra el `model.h5` existente para evitar perder el modelo preentrenado

3. **Tiempo de entrenamiento:** El entrenamiento puede tomar varias horas dependiendo del hardware

4. **Requisitos de memoria:** Asegúrate de tener suficiente RAM para cargar todo el dataset

5. **Rutas:** Los scripts están configurados para ejecutarse desde el directorio raíz del proyecto

## 🚀 Desarrollo Personalizado

Si quieres modificar el modelo:

1. Edita la función `create_model()` en `../utils.py`
2. Ajusta los hiperparámetros en `train.py`
3. Ejecuta el entrenamiento con `python dev/train.py`

## 📊 Monitoreo del Entrenamiento

El script de entrenamiento utiliza:
- **TensorBoard:** Para visualizar métricas durante el entrenamiento
- **Early Stopping:** Para evitar sobreentrenamiento
- **Model Checkpointing:** Para guardar el mejor modelo

Logs de TensorBoard se guardan en la carpeta `logs/`.
