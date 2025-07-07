class GenderRecognitionApp {
    constructor() {
        this.apiUrl = '';
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        
        this.initializeElements();
        this.bindEvents();
        this.loadSavedApiUrl();
    }

    initializeElements() {
        this.apiUrlInput = document.getElementById('apiUrl');
        this.testBtn = document.getElementById('testBtn');
        this.uploadZone = document.getElementById('uploadZone');
        this.fileInput = document.getElementById('fileInput');
        this.recordBtn = document.getElementById('recordBtn');
        this.recordIcon = document.getElementById('recordIcon');
        this.recordText = document.getElementById('recordText');
        this.recordingStatus = document.getElementById('recordingStatus');
        this.loading = document.getElementById('loading');
        this.results = document.getElementById('results');
        this.error = document.getElementById('error');
        this.errorMessage = document.getElementById('errorMessage');
        this.genderIcon = document.getElementById('genderIcon');
        this.genderText = document.getElementById('genderText');
        this.confidenceText = document.getElementById('confidenceText');
        this.maleProgress = document.getElementById('maleProgress');
        this.femaleProgress = document.getElementById('femaleProgress');
        this.malePercent = document.getElementById('malePercent');
        this.femalePercent = document.getElementById('femalePercent');
    }

    bindEvents() {
        this.apiUrlInput.addEventListener('input', (e) => {
            this.apiUrl = e.target.value.trim();
            this.saveApiUrl();
            this.updateRecordButtonState();
        });

        this.uploadZone.addEventListener('click', () => this.fileInput.click());
        this.uploadZone.addEventListener('dragover', this.handleDragOver.bind(this));
        this.uploadZone.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.uploadZone.addEventListener('drop', this.handleDrop.bind(this));
        
        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
    }

    loadSavedApiUrl() {
        const saved = localStorage.getItem('genderApiUrl');
        if (saved) {
            this.apiUrl = saved;
            this.apiUrlInput.value = saved;
            this.updateRecordButtonState();
        }
    }

    saveApiUrl() {
        localStorage.setItem('genderApiUrl', this.apiUrl);
    }

    updateRecordButtonState() {
        this.recordBtn.disabled = !this.apiUrl;
    }

    async testConnection() {
        if (!this.apiUrl) {
            this.showError('Por favor ingresa la URL de la API');
            return;
        }

        this.testBtn.textContent = 'Probando...';
        this.testBtn.disabled = true;

        try {
            const response = await fetch(`${this.apiUrl}/`);
            const data = await response.json();
            
            if (response.ok && data.status === 'saludable') {
                this.showSuccess('✅ Conexión exitosa con la API');
                this.updateRecordButtonState();
            } else {
                throw new Error(data.message || 'API no disponible');
            }
        } catch (error) {
            this.showError(`Error de conexión: ${error.message}`);
        } finally {
            this.testBtn.textContent = 'Probar Conexión';
            this.testBtn.disabled = false;
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadZone.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadZone.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadZone.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    async processFile(file) {
        if (!this.apiUrl) {
            this.showError('Por favor configura la URL de la API primero');
            return;
        }

        // Validar tipo de archivo
        const validTypes = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/flac', 'audio/x-m4a'];
        if (!validTypes.some(type => file.type.includes(type.split('/')[1]))) {
            this.showError('Tipo de archivo no válido. Usa WAV, MP3, FLAC o M4A');
            return;
        }

        // Validar tamaño (16MB max)
        if (file.size > 16 * 1024 * 1024) {
            this.showError('Archivo muy grande. Máximo 16MB');
            return;
        }

        this.hideResults();
        this.showLoading();

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${this.apiUrl}/predict`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                this.displayResults(data);
            } else {
                throw new Error(data.error || 'Error procesando archivo');
            }
        } catch (error) {
            this.showError(`Error: ${error.message}`);
        } finally {
            this.hideLoading();
        }
    }

    async toggleRecording() {
        if (!this.isRecording) {
            await this.startRecording();
        } else {
            this.stopRecording();
        }
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];
            
            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };
            
            this.mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                await this.processRecordedAudio(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };
            
            this.mediaRecorder.start();
            this.isRecording = true;
            this.updateRecordingUI();
            
        } catch (error) {
            this.showError(`Error accediendo al micrófono: ${error.message}`);
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.updateRecordingUI();
        }
    }

    updateRecordingUI() {
        if (this.isRecording) {
            this.recordBtn.classList.add('recording');
            this.recordIcon.textContent = '⏹️';
            this.recordText.textContent = 'Detener Grabación';
            this.recordingStatus.textContent = '🔴 Grabando... Habla ahora';
        } else {
            this.recordBtn.classList.remove('recording');
            this.recordIcon.textContent = '🎤';
            this.recordText.textContent = 'Grabar Audio';
            this.recordingStatus.textContent = '';
        }
    }

    async processRecordedAudio(audioBlob) {
        this.hideResults();
        this.showLoading();

        try {
            const formData = new FormData();
            formData.append('file', audioBlob, 'grabacion.wav');

            const response = await fetch(`${this.apiUrl}/predict`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                this.displayResults(data);
            } else {
                throw new Error(data.error || 'Error procesando grabación');
            }
        } catch (error) {
            this.showError(`Error: ${error.message}`);
        } finally {
            this.hideLoading();
        }
    }

    displayResults(data) {
        const genderText = data.gender === 'male' ? 'Masculino' : 'Femenino';
        const genderIcon = data.gender === 'male' ? '👨' : '👩';
        const malePercent = Math.round(data.male_probability * 100);
        const femalePercent = Math.round(data.female_probability * 100);
        
        let confidenceText = '';
        let confidenceColor = '';
        
        switch(data.confidence) {
            case 'alto':
                confidenceText = '🟢 Confianza Alta';
                confidenceColor = '#22543d';
                break;
            case 'medio':
                confidenceText = '🟡 Confianza Media';
                confidenceColor = '#744210';
                break;
            case 'bajo':
                confidenceText = '🔴 Confianza Baja';
                confidenceColor = '#9b2c2c';
                break;
        }

        this.genderIcon.textContent = genderIcon;
        this.genderText.textContent = `Género: ${genderText}`;
        this.confidenceText.textContent = confidenceText;
        this.confidenceText.style.color = confidenceColor;
        
        this.maleProgress.style.width = `${malePercent}%`;
        this.femaleProgress.style.width = `${femalePercent}%`;
        this.malePercent.textContent = `${malePercent}%`;
        this.femalePercent.textContent = `${femalePercent}%`;

        this.showResults();
    }

    showLoading() {
        this.loading.classList.remove('hidden');
    }

    hideLoading() {
        this.loading.classList.add('hidden');
    }

    showResults() {
        this.results.classList.remove('hidden');
        this.error.classList.add('hidden');
    }

    hideResults() {
        this.results.classList.add('hidden');
        this.error.classList.add('hidden');
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.error.classList.remove('hidden');
        this.results.classList.add('hidden');
    }

    showSuccess(message) {
        // Crear elemento de éxito temporal
        const successDiv = document.createElement('div');
        successDiv.className = 'success';
        successDiv.textContent = message;
        
        const container = document.querySelector('.container');
        container.insertBefore(successDiv, container.children[1]);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}

// Funciones globales para eventos onclick
let app;

function testConnection() {
    app.testConnection();
}

function toggleRecording() {
    app.toggleRecording();
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    app = new GenderRecognitionApp();
});
