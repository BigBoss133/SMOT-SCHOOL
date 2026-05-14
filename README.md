# Sistema Automatico Relazioni Scolastiche - SMOT SCHOOL

## Obiettivo
Sviluppare un sistema di generazione assistita per le relazioni di tirocinio e l'e-Portfolio professionale, rispettando rigorosamente le linee guida ministeriali/universitarie (Percorsi 60 CFU e 36 CFU).

## Analisi dei Requisiti (Linee Guida)

Il sistema deve supportare la generazione di due documenti principali:

### 1. Relazione Finale di Tirocinio
*   **Lunghezza**: Tra 15.000 e 20.000 caratteri (spazi inclusi).
*   **Struttura Obbligatoria**:
    *   **Capitolo I (Contesto Scuola)**: Analisi territoriale, documenti emblematici (PTOF, PI, RAV, PDM), osservazione partecipata.
    *   **Capitolo II (Contesto Classe)**: Setting d'aula, corpo docenti, approccio metodologico, digitale, dinamiche relazionali del gruppo classe e criticità.
    *   **Capitolo III (Attività Svolte)**: Macro-obiettivi, rendicontazione di 2-4 attività specifiche (Obiettivi $ightarrow$ Strategie $ightarrow$ Attività Studenti $ightarrow$ Esiti).
    *   **Conclusioni**: Considerazioni finali e spunti di miglioramento del profilo docente.

### 2. e-Portfolio Professionale
*   **Sezione 1-2**: Presentazione e contesto.
*   **Sezione 3**: Evidenze di osservazione (almeno 5 attività osservate) e organi collegiali.
*   **Sezione 4**: Attività progettate personalmente (5 attività dettagliate con obiettivi, strategie, esiti e ambiti di competenza).
*   **Sezione 5**: Bilancio finale e piano di sviluppo professionale.

## Architettura Tecnica Aggiornata

### 1. Core IA & Prompting
*   **Modello**: `Gemma 2 9B` o `Llama 3.1 8B` (via Ollama).
*   **Strategia**: **Modular Prompting**. L'IA non genererà l'intera relazione in un colpo solo (per evitare allucinazioni e perdita di dettaglio), ma lavorerà per **sezioni/paragrafi**, validando la lunghezza e il contenuto di ogni blocco rispetto alle tracce.
*   **Stile**: Few-shot prompting basato su esempi di alta qualità per garantire il tono pedagogico richiesto.

### 2. UI/UX (Sviluppo in Tauri)
L'interfaccia sarà strutturata come un **Wizard (Guida Passo-Passo)**:
*   **Step 1: Setup**: Inserimento dati anagrafici e contesto scuola.
*   **Step 2: Input Dati**: Form differenziati per ogni capitolo (es. campi specifici per PTOF/RAV nel Cap. I).
*   **Step 3: Generazione Iterativa**: L'IA propone una bozza per paragrafo $ightarrow$ L'utente revisiona/modifica $ightarrow$ L'utente conferma.
*   **Step 4: Validazione**: Controllo automatico del conteggio caratteri (target 15k-20k).
*   **Step 5: Export**: Generazione del PDF tramite template Carbone.io.

## Stack Tecnologico

| Componente | Tecnologia | Ruolo |
| :--- | :--- | :--- |
| **LLM** | `Gemma 2 9B` | Generazione testo per sezione. |
| **Runtime IA** | `Ollama` | Hosting locale. |
| **Frontend** | `Tauri + React + TS` | App desktop con gestione file locale. |
| **Templating** | `Carbone.io` | Export PDF professionale con layout fisso. |
| **Logica** | `Python/Rust` | Orchestrazione prompt e validazione lunghezze. |
