import os
import chromadb
from langchain_community.embeddings import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document

DB_DIR = os.path.join(os.path.dirname(__file__), "data", "knowledge_base")

def get_chroma_db():
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    vectorstore = Chroma(
        collection_name="smot_knowledge",
        embedding_function=embeddings,
        persist_directory=DB_DIR
    )
    return vectorstore

def ingest_data(documents: list[Document]):
    db = get_chroma_db()
    db.add_documents(documents)

def query_db(query: str, k: int = 3):
    db = get_chroma_db()
    results = db.similarity_search(query, k=k)
    return [doc.page_content for doc in results]
