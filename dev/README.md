# Carpeta de Desarrollo (dev/)

Esta carpeta contiene herramientas y scripts adicionales para el desarrollo avanzado del proyecto de reconocimiento de género por voz.

## 📁 Contenido

### `train.py`
**Propósito:** Entrenar el modelo de reconocimiento de género desde cero.

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
**Propósito:** Procesar archivos de audio originales y extraer características.

**Uso:**
```bash
# Desde el directorio raíz del proyecto
python dev/preparation.py
```

**Funcionalidad:**
- Lee archivos CSV con información de audio
- Filtra y preprocesa los datos
- Extrae características espectrales (Mel-spectrograms) de archivos de audio
- Guarda las características en archivos .npy para entrenamiento rápido

### `LICENSE`
**Propósito:** Información de licencia del proyecto.

## 🔧 Requisitos para Desarrollo

Para utilizar estos scripts, necesitas todas las dependencias listadas en `../requirements.txt` más acceso a:

- Dataset original de Mozilla Common Voice (si usas `preparation.py`)
- GPU recomendada para entrenamiento (opcional pero acelera el proceso)

## 📝 Notas Importantes

1. **Orden de ejecución:** Si partes de archivos de audio originales:
   - Primero ejecuta `preparation.py` para extraer características
   - Luego ejecuta `train.py` para entrenar el modelo

2. **Tiempo de entrenamiento:** El entrenamiento puede tomar varias horas dependiendo del hardware

3. **Requisitos de memoria:** Asegúrate de tener suficiente RAM para cargar todo el dataset

4. **Rutas:** Los scripts están configurados para ejecutarse desde el directorio raíz del proyecto

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
