# Project Plan: SMOT-SCHOOL - Automated School Report System

## 🎯 Goal
Create a professional, automated system for generating school reports (Relazioni di Tirocinio and e-Portfolios) for Italian teaching certifications (60/36 CFU), ensuring a pedagogical tone, strict adherence to guidelines, and a length of 15k-20k characters.

---

## 🛠 Technical Stack

### Frontend & App Shell
- **Framework**: [Tauri](https://tauri.app/) (Rust + TypeScript)
- **UI Pattern**: Step-by-step Wizard for data collection.
- **Purpose**: Native desktop experience, local file system access, and secure sidecar management.

### Backend & AI Orchestration
- **Language**: Python (as a Tauri Sidecar).
- **AI Framework**: [LangGraph](https://www.langchain.com/langgraph) for agentic state-machine workflows.
- **Prompt Optimization**: [DSPy](https://dspy.ai/) for programmatic prompt refinement.
- **LLM**: Ollama (Gemma 2 9B / Llama 3.1) running locally.
- **Memory/Knowledge**: Vector Database (**ChromaDB** or **FAISS**) for RAG (Retrieval-Augmented Generation).

### Output & Formatting
- **PDF Engine**: [Carbone.io](https://carbone.io/) (separating content from design via `.docx` templates).

---

## 🧠 The "Perfect Logic" Pipeline

To ensure zero hallucinations and professional quality, the system follows a strict state-machine flow:

1. **The Guard (Input Validator)**: 
   - Validates user inputs against required guidelines.
   - If inputs are too vague, the system prompts the user for more detail *before* generating text.

2. **The Architect (Structure Planner)**:
   - Analyzes the total required length (15k-20k chars).
   - Distributes the character budget across chapters (e.g., Introduction: 2k, Analysis: 5k, etc.).

3. **The Modular Writer (Chunk Generation)**:
   - Generates text section-by-section.
   - Uses RAG to inject specific terminology and examples from the "Golden Examples" library.

4. **The Critic (Reviewer Agent)**:
   - A separate AI agent that audits the text for:
     - Tone (Pedagogical vs. Colloquial).
     - Length compliance.
     - Adherence to the Camoscio dataset style.
   - If failures are found, the text is sent back to the Writer.

5. **The User (Final Approval)**:
   - User reviews each module and provides final tweaks.

---

## 🚀 Text Generation Strategy

| Feature | Implementation | Benefit |
| :--- | :--- | :--- |
| **Context Precision** | RAG via Vector DB | Prevents generic AI-sounding text; uses real guidelines. |
| **Iterative Quality** | LangGraph Loops | Ensures the text is refined through a Writer $\rightarrow$ Critic cycle. |
| **Prompt Engineering**| DSPy | Moves from "guessing" prompts to "compiling" them based on examples. |
| **Consistency** | Low Temperature (0.2) | Reduces randomness; ensures a formal, stable academic tone. |

---

## 📅 Implementation Roadmap

### Phase 1: Core Infrastructure
- [ ] Set up Tauri project with Python sidecar bridge.
- [ ] Integrate Ollama API for basic text generation.
- [ ] Establish the basic communication protocol between Rust and Python.

### Phase 2: Knowledge Base (RAG)
- [ ] Implement Vector DB (ChromaDB).
- [ ] Ingest "Golden Examples" and official guidelines into the DB.
- [ ] Create a retrieval pipeline that fetches relevant context based on the current chapter.

### Phase 3: Agentic Logic (LangGraph)
- [ ] Build the state machine: `Guard` $\rightarrow$ `Architect` $\rightarrow$ `Writer` $\rightarrow$ `Critic`.
- [ ] Implement the character-count sentry (The Guard).
- [ ] Develop the Writer $\rightarrow$ Critic loop.

### Phase 4: UI Development (The Wizard)
- [ ] Design the multi-step input form in Tauri.
- [ ] Implement "Live Preview" of the generated text.
- [ ] Create a "Review Mode" for user corrections.

### Phase 5: Document Assembly & Export
- [ ] Integrate Carbone.io for PDF generation.
- [ ] Map the modular AI output to `.docx` templates.
- [ ] Implement local PDF saving and naming conventions.

### Phase 6: Optimization & Testing
- [ ] Use DSPy to optimize the prompt chain based on 5-10 "Golden" reports.
- [ ] Performance tuning for local LLM latency.
- [ ] Final validation of the 15k-20k character constraint.
