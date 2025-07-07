import os
import sys
from tensorflow.keras.callbacks import ModelCheckpoint, TensorBoard, EarlyStopping

# Obtener la ruta del directorio padre (raíz del proyecto)
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Añadir el directorio padre al path para importar utils
sys.path.append(project_root)
from utils import load_data, split_data, create_model

# cargar el dataset
X, y = load_data()
# dividir los datos en conjuntos de entrenamiento, validación y prueba
data = split_data(X, y, test_size=0.1, valid_size=0.1)
# construir el modelo
model = create_model()

# usar tensorboard para ver métricas
log_dir = os.path.join(project_root, "logs")
tensorboard = TensorBoard(log_dir=log_dir)
# definir parada temprana para detener el entrenamiento después de 5 épocas sin mejora
early_stopping = EarlyStopping(mode="min", patience=5, restore_best_weights=True)

batch_size = 64
epochs = 100

# entrenar el modelo usando el conjunto de entrenamiento y validando con el conjunto de validación
model.fit(data["X_train"], data["y_train"], epochs=epochs, batch_size=batch_size, validation_data=(data["X_valid"], data["y_valid"]),
          callbacks=[tensorboard, early_stopping])

# guardar el modelo en un archivo
model_path = os.path.join(project_root, "results", "model.h5")
print(f"Guardando modelo en: {model_path}")
model.save(model_path)

# evaluar el modelo usando el conjunto de prueba
print(f"Evaluando el modelo usando {len(data['X_test'])} muestras...")
loss, accuracy = model.evaluate(data["X_test"], data["y_test"], verbose=0)
print(f"Pérdida: {loss:.4f}")
print(f"Precisión: {accuracy*100:.2f}%")

