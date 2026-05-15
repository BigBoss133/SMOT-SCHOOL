from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys

app = FastAPI(title="SMOT-SCHOOL AI Sidecar")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for dev, restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    prompt: str
    context: str = ""

@app.get("/health")
def health_check():
    return {"status": "ok", "version": "0.1.0"}

@app.post("/generate")
def generate_text(req: GenerateRequest):
    # Dummy implementation for now
    try:
        response_text = f"Mock generated text for prompt: '{req.prompt}'. This will be replaced by the LangGraph/Ollama logic."
        return {"response": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Tauri will pass arguments, we can parse them if needed.
    # For now, default to a port that Tauri can connect to, or let Tauri assign it.
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass
    uvicorn.run(app, host="127.0.0.1", port=port)
