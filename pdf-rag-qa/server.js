require("dotenv").config();

const express = require("express");
const multer = require("multer");

const { extractTextFromPDF, chunkText } = require("./pdfProcessor");
const { generateEmbeddings } = require("./embedder");
const { storeInEndee } = require("./retriever");

const app = express();
app.use(express.json());

// Storage config for uploaded PDFs
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Health check route
app.get("/", (req, res) => {
    res.send("PDF RAG QA Server Running 🚀");
});

// Upload PDF route
app.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const filePath = req.file.path;
        console.log("PDF Uploaded:", filePath);

        // STEP 1: Extract text
        const text = await extractTextFromPDF(filePath);

        if (!text) {
            return res.status(500).json({ message: "PDF text extraction failed" });
        }

        // STEP 2: Chunk text
        const chunks = chunkText(text);
        console.log("Number of chunks:", chunks.length);

        // STEP 3: Generate embeddings
        const embeddings = await generateEmbeddings(chunks);
        console.log("Embeddings created:", embeddings.length);

        // STEP 4: Store in Endee
        const stored = await storeInEndee(chunks, embeddings);
        console.log("Stored in Endee:", stored.length);

        res.json({
            message: "PDF processed, embedded and stored in Endee",
            chunksCreated: chunks.length,
            embeddingsCreated: embeddings.length,
            storedVectors: stored.length
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Upload failed" });
    }
});

// Ask question route
app.post("/ask", async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Question required" });
        }

        console.log("User asked:", question);

        res.json({
            message: "Question received. Retrieval step coming next."
        });

    } catch (err) {
        res.status(500).json({ message: "Error processing question" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});