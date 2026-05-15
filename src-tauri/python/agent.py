import json
from typing import TypedDict, Annotated, Sequence
from langgraph.graph import StateGraph, END
from langchain_community.llms import Ollama
from langchain_core.prompts import PromptTemplate
from database import query_db

llm = Ollama(model="gemma2")

class GraphState(TypedDict):
    input_data: dict
    current_chapter: str
    generated_text: str
    feedback: str
    valid: bool
    iterations: int

def validate_input(state: GraphState):
    """The Guard: Validates user inputs against required guidelines."""
    # Simplified validation: ensure inputs aren't completely empty
    data = state["input_data"]
    valid = True
    feedback = ""

    if state["current_chapter"] == "capitolo1":
         if not data["context"]["ptof"] and not data["context"]["rav"]:
             valid = False
             feedback = "Manca il contesto (PTOF o RAV) per generare il capitolo 1."

    return {"valid": valid, "feedback": feedback, "iterations": state.get("iterations", 0)}

def plan_structure(state: GraphState):
    """The Architect: Analyzes the total required length and plans structure."""
    # Dummy logic for now
    return {}

def generate_chunk(state: GraphState):
    """The Modular Writer: Generates text section-by-section using RAG."""
    chapter = state["current_chapter"]
    data = state["input_data"]

    # Retrieve relevant context from DB
    rag_context = query_db(f"linee guida e esempi per {chapter}")
    rag_text = "\n".join(rag_context) if rag_context else "Nessuna guida specifica trovata nel database."

    prompt = PromptTemplate(
        template="""
        Sei un esperto pedagogista e formatore. Genera il {chapter} per una relazione di tirocinio.
        Usa un tono accademico, formale ma riflessivo.

        Contesto utente: {user_data}
        Linee guida e contesto RAG: {rag_context}
        Feedback precedente (se presente): {feedback}

        Genera il testo:
        """,
        input_variables=["chapter", "user_data", "rag_context", "feedback"]
    )

    formatted_prompt = prompt.format(
        chapter=chapter,
        user_data=json.dumps(data, ensure_ascii=False),
        rag_context=rag_text,
        feedback=state.get("feedback", "")
    )

    response = llm.invoke(formatted_prompt)

    return {"generated_text": response, "iterations": state["iterations"] + 1}

def review_chunk(state: GraphState):
    """The Critic: Audits the text for tone, length, and style."""
    text = state["generated_text"]
    char_count = len(text)

    valid = True
    feedback = ""

    # Very basic validation rule
    if char_count < 1000:
        valid = False
        feedback = "Il testo è troppo corto. Aggiungi più dettagli pedagogici e riflessioni personali."

    if state["iterations"] >= 3:
        # Max retries reached
        valid = True

    return {"valid": valid, "feedback": feedback}

def should_continue(state: GraphState):
    if state["valid"]:
        return END
    else:
        return "generate_chunk"

def build_graph():
    workflow = StateGraph(GraphState)

    workflow.add_node("validate_input", validate_input)
    workflow.add_node("plan_structure", plan_structure)
    workflow.add_node("generate_chunk", generate_chunk)
    workflow.add_node("review_chunk", review_chunk)

    workflow.set_entry_point("validate_input")

    def check_input(state):
        if state["valid"]:
            return "plan_structure"
        return END

    workflow.add_conditional_edges("validate_input", check_input)
    workflow.add_edge("plan_structure", "generate_chunk")
    workflow.add_edge("generate_chunk", "review_chunk")

    workflow.add_conditional_edges("review_chunk", should_continue)

    return workflow.compile()

def run_agent(input_data: dict, chapter: str):
    app = build_graph()
    initial_state = {
        "input_data": input_data,
        "current_chapter": chapter,
        "generated_text": "",
        "feedback": "",
        "valid": False,
        "iterations": 0
    }

    result = app.invoke(initial_state)
    return result
