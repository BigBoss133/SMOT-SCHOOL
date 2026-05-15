from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import sys
import os
import json
from agent import run_agent
from exporter import generate_docx

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
    try:
        data = json.loads(req.context)
        # Parse chapter from prompt "Genera capitolo1"
        chapter = req.prompt.split(" ")[1] if " " in req.prompt else "capitolo_default"

        result = run_agent(data, chapter)

        if not result.get("valid") and result.get("iterations") == 0:
             return {"response": f"[Errore di Validazione]: {result.get('feedback')}"}

        return {"response": result.get("generated_text", "Errore durante la generazione.")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/export")
async def export_document(request: Request):
    try:
        data = await request.json()
        file_stream = generate_docx(data)

        return StreamingResponse(
            file_stream,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={"Content-Disposition": "attachment; filename=relazione.docx"}
        )
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
