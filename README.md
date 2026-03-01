PDF RAG QA using Endee Vector Database
This project is a simple backend implementation of a Retrieval-Augmented Generation (RAG) system that allows users to upload PDF files and ask questions based on their content.

Instead of sending the entire document to an LLM every time, the system extracts the text from the PDF, splits it into smaller chunks, converts those chunks into vector embeddings, and stores them inside a high-performance vector database (Endee). When a user asks a question, the system retrieves only the most relevant chunks from the database and uses them to generate a context-aware response.

The goal of this project is to demonstrate how modern LLM-powered document question answering systems actually work behind the scenes.

What this Project Does
Accepts a PDF file upload from the user.

Extracts text content from the uploaded PDF.

Breaks the extracted text into smaller chunks.

Converts each chunk into a vector embedding using Gemini API.

Stores those embeddings inside the Endee vector database.

Accepts user questions related to the uploaded document.

Retrieves the most relevant stored chunks based on the question.

Uses the retrieved context to generate an answer.

This ensures that responses are based on the document itself rather than general model knowledge.

Tech Stack Used
Node.js

Express.js

Multer (for PDF uploads)

PDF.js (for text extraction)

Google Gemini API (for embeddings and generation)

Endee Vector Database (for vector storage and retrieval)

Postman (for API testing)

Project Structure
projects/pdf-rag-qa/
│
├── server.js
├── embedder.js
├── retriever.js
├── pdfProcessor.js
├── uploads/
├── .env
├── .gitignore
├── package.json
└── README.md
Setup Instructions
1. Clone the Repository
git clone https://github.com/your-username/endee.git
cd endee/projects/pdf-rag-qa
2. Install Dependencies
npm install
3. Setup Environment Variables
Create a .env file inside projects/pdf-rag-qa/

GEMINI_API_KEY=your_gemini_api_key
4. Start the Backend Server
node server.js
The server will start on:

http://localhost:5000
API Endpoints
Upload PDF
POST /upload-pdf

Upload a PDF file using form-data.

Key: pdf
Type: File

This will:

Extract text

Chunk the content

Generate embeddings

Store vectors inside Endee

Ask Question
POST /ask

Send a JSON body:

{
  "question": "Your question related to the uploaded PDF"
}
This will:

Convert question to embedding

Retrieve relevant chunks

Generate an answer based on stored content

How RAG Works Here
Traditional LLM calls do not "know" your document unless you pass it every time.

RAG solves this by:

Pre-processing the document into embeddings

Storing them in a vector database

Retrieving only the relevant context at query time

This makes responses faster, cheaper, and grounded in actual document data.

Notes
Do not commit .env, uploads, or node_modules to GitHub.

Make sure Endee is running locally before storing or retrieving vectors.

This project is intended as a backend prototype for document-based QA systems.

Future Improvements
Add authentication for uploaded documents

Support multiple PDFs

Add frontend interface

Implement document deletion

Improve chunking strategy

Deploy vector database and backend

You can now upload a document and ask questions based strictly on its content.

