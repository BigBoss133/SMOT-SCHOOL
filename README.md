# Sistema Automatico Relazioni Scolastiche

## Obiettivo
Creare un sistema automatizzato per la generazione di relazioni scolastiche di alta qualità, integrando intelligenza artificiale locale e templating documentale professionale.

## Architettura Tecnica

### 1. Core IA (Local LLM)
*   **Modello Consigliato**: `Gemma 2 9B` o `Llama 3.1 8B`.
*   **Runtime**: [Ollama](https://ollama.ai/) per l'esecuzione locale.
*   **Strategia di Ottimizzazione**: Utilizzo di **Few-Shot Prompting** basato sullo stile **Camoscio**. Invece di un fine-tuning complesso, vengono forniti al modello esempi di relazioni "ottimali" per guidare il tono, la grammatica e la struttura pedagogica.

### 2. Workflow di Generazione
Il sistema segue un flusso lineare:
**Input $\rightarrow$ Elaborazione $\rightarrow$ Documento Finale**

1.  **Input**: Raccolta di dati grezzi (Nome studente, materia, voti, note su comportamento e competenze) tramite file CSV o modulo.
2.  **Elaborazione**: Script Python che interagisce con l'API di Ollama utilizzando prompt strutturati per trasformare le note in un testo formale e costruttivo.
3.  **Output**: Utilizzo di [Carbone.io](https://carbone.io/) per iniettare il testo generato in un template `.docx` ufficiale della scuola, esportando il risultato finale in **PDF**.

## Stack Tecnologico

| Componente | Tecnologia | Ruolo |
| :--- | :--- | :--- |
| **LLM** | `Gemma 2 9B` | Generazione del testo in italiano. |
| **Orchestratore** | `Python` + `LangChain` | Gestione flussi, prompt e integrazioni. |
| **Runtime IA** | `Ollama` | Hosting locale del modello. |
| **Templating** | `Carbone.io` | Conversione da JSON/Dati a PDF professionale. |
| **Stile** | `Camoscio Examples` | Definizione del tono pedagogico via few-shot. |
