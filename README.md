# 🎥 YouTube RAG Q&A

A **Retrieval-Augmented Generation (RAG)** web application that allows users to ask questions about the content of a YouTube video.

The application retrieves the video's transcript, splits it into relevant chunks, stores the chunks as vector embeddings, retrieves the most relevant information for a user's question, and uses an LLM to generate an answer.

## 🚀 Features

* 🔗 Enter a YouTube video URL or video ID
* 📝 Automatically retrieve the video transcript
* ✂️ Split transcript into smaller chunks
* 🧠 Generate vector embeddings from transcript chunks
* 🗄️ Store and search embeddings using a vector database
* 🔍 Retrieve relevant transcript sections for each question
* 🤖 Generate answers using an LLM
* 🌐 Simple Flask-based web interface
* 💬 Interactive question-and-answer chat interface
* 📺 Embedded YouTube video player

## 🏗️ RAG Pipeline

```text
YouTube Video
      ↓
Transcript
      ↓
Text Splitting
      ↓
Embeddings
      ↓
Vector Store
      ↓
Retriever
      ↓
Relevant Context
      ↓
LLM
      ↓
Answer
```

## 📂 Project Structure

```text
YouTube-RAG/
│
├── app.py
├── youtube.py
├── vectorstore.py
├── rag.py
├── requirements.txt
│
├── templates/
│   └── index.html
│
└── static/
    ├── app.js
    └── style.css
```

### File Description

| File                   | Description                                   |
| ---------------------- | --------------------------------------------- |
| `app.py`               | Flask application and API routes              |
| `youtube.py`           | Retrieves YouTube video transcripts           |
| `vectorstore.py`       | Creates the vector store from transcript data |
| `rag.py`               | Builds the RAG chain and generates answers    |
| `templates/index.html` | Web interface                                 |
| `static/app.js`        | Frontend logic and API communication          |
| `static/style.css`     | Frontend styling                              |
| `requirements.txt`     | Python dependencies                           |

## 🛠️ Technologies Used

* **Python**
* **Flask**
* **LangChain**
* **YouTube Transcript API**
* **Vector Database**
* **Embeddings**
* **LLM**
* **HTML**
* **CSS**
* **JavaScript**

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YouTube-RAG
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

### 3. Activate the virtual environment

Windows:

```bash
.venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure environment variables

Create a `.env` file in the project root:

```env
GOOGLE_API_KEY=your_api_key
```

Add any other API keys required by your selected LLM or embedding model.

**Do not upload your `.env` file to GitHub.**

## ▶️ Run the Application

Start the Flask server:

```bash
python app.py
```

Then open:

```text
http://127.0.0.1:5000
```

Paste a YouTube video URL and start asking questions about the video.

## 💡 Example Questions

After loading a video, you can ask questions such as:

```text
What is the main topic of this video?
```

```text
What does the speaker say about artificial intelligence?
```

```text
What are the main points discussed in the video?
```

```text
Can you summarize the explanation about machine learning?
```

## 🔐 Environment Variables

The project may require API credentials depending on the embedding and LLM providers being used.

Example:

```env
GOOGLE_API_KEY=your_api_key
```

Keep your API keys private and use `.gitignore` to prevent `.env` from being committed.

## 📌 Future Improvements

* [ ] Add timestamp-based sources to answers
* [ ] Highlight the exact transcript sections used by the RAG system
* [ ] Support multiple videos in the same session
* [ ] Add persistent vector database storage
* [ ] Improve transcript chunking
* [ ] Add conversation history
* [ ] Add streaming LLM responses
* [ ] Deploy the application online
* [ ] Add support for videos without manually provided transcripts

## 🎯 Learning Goals

This project was built to practice and understand:

* Retrieval-Augmented Generation (RAG)
* Document loading and processing
* Text chunking
* Embeddings
* Vector databases
* Semantic search
* Retrievers
* LLM integration
* LangChain
* Flask API development
* Connecting a Python backend with a web frontend

## 👨‍💻 Author

**Asad Ajaz**

This project was built as part of my journey into **Machine Learning, Deep Learning, Generative AI, and RAG systems**.

```

For the GitHub repo description, I'd use:

> **A Flask-based YouTube RAG application that lets users ask questions about video content using transcript retrieval, vector search, and LLMs.**

And a good topic/tag set would be:

`python` `rag` `langchain` `llm` `flask` `generative-ai` `youtube` `vector-database` `machine-learning` `nlp`
```
